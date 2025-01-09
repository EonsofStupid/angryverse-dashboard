import { RealtimeState, RealtimeUpdateConfig, ThemeUpdateEvent } from './types/realtime';
import { supabase } from '@/integrations/supabase/client';

class RealtimeThemeManager {
  private state: RealtimeState = {
    enabled: true,
    config: {
      channels: ['all'],
      debounce: 100,
      batch: true,
      priority: 'normal',
    },
    status: 'disconnected',
  };

  private updateCallbacks: ((event: ThemeUpdateEvent) => void)[] = [];
  private debounceTimeout: NodeJS.Timeout | null = null;
  private batchedUpdates: ThemeUpdateEvent[] = [];

  constructor() {
    this.initialize();
  }

  private initialize() {
    const channel = supabase.channel('theme_updates')
      .on('presence', { event: 'sync' }, () => {
        console.log('Theme presence sync');
      })
      .on('broadcast', { event: 'theme_update' }, (payload) => {
        this.handleThemeUpdate(payload.payload as ThemeUpdateEvent);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          this.state.status = 'connected';
          console.log('Connected to theme updates channel');
        }
      });
  }

  private handleThemeUpdate(event: ThemeUpdateEvent) {
    if (this.state.config.batch) {
      this.batchedUpdates.push(event);
      
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      
      this.debounceTimeout = setTimeout(() => {
        this.processBatchedUpdates();
      }, this.state.config.debounce);
    } else {
      this.notifyUpdate(event);
    }
  }

  private processBatchedUpdates() {
    if (this.batchedUpdates.length === 0) return;
    
    // Sort updates by timestamp and priority
    const sortedUpdates = this.batchedUpdates.sort((a, b) => {
      if (a.timestamp !== b.timestamp) {
        return a.timestamp - b.timestamp;
      }
      return this.getPriorityWeight(a) - this.getPriorityWeight(b);
    });
    
    sortedUpdates.forEach((update) => {
      this.notifyUpdate(update);
    });
    
    this.batchedUpdates = [];
  }

  private getPriorityWeight(event: ThemeUpdateEvent): number {
    switch (this.state.config.priority) {
      case 'high': return 0;
      case 'normal': return 1;
      case 'low': return 2;
      default: return 1;
    }
  }

  private notifyUpdate(event: ThemeUpdateEvent) {
    this.updateCallbacks.forEach((callback) => callback(event));
  }

  public onUpdate(callback: (event: ThemeUpdateEvent) => void) {
    this.updateCallbacks.push(callback);
    return () => {
      this.updateCallbacks = this.updateCallbacks.filter((cb) => cb !== callback);
    };
  }

  public updateConfig(config: Partial<RealtimeUpdateConfig>) {
    this.state.config = { ...this.state.config, ...config };
  }
}

export const realtimeThemeManager = new RealtimeThemeManager();