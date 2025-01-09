import { TokenInjectionState, TokenInjectionConfig, TokenUpdateEvent } from './types/token-injection';
import { Theme } from '@/types/theme';

class TokenInjector {
  private state: TokenInjectionState = {
    enabled: true,
    tokens: [],
    scope: 'global',
    priority: 'normal',
  };

  private updateCallbacks: ((event: TokenUpdateEvent) => void)[] = [];

  constructor() {
    this.initialize();
  }

  private initialize() {
    const root = document.documentElement;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName?.startsWith('style')) {
          this.handleStyleChange(mutation);
        }
      });
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['style'],
    });
  }

  private handleStyleChange(mutation: MutationRecord) {
    const element = mutation.target as HTMLElement;
    const computedStyle = getComputedStyle(element);
    
    this.state.tokens.forEach((config) => {
      const oldValue = element.style.getPropertyValue(config.source);
      const newValue = computedStyle.getPropertyValue(config.source);
      
      if (oldValue !== newValue) {
        const event: TokenUpdateEvent = {
          token: config.source,
          oldValue,
          newValue,
          timestamp: Date.now(),
        };
        
        this.notifyUpdate(event);
      }
    });
  }

  private notifyUpdate(event: TokenUpdateEvent) {
    this.updateCallbacks.forEach((callback) => callback(event));
  }

  public addToken(config: TokenInjectionConfig) {
    this.state.tokens.push(config);
  }

  public removeToken(source: string) {
    this.state.tokens = this.state.tokens.filter((token) => token.source !== source);
  }

  public onUpdate(callback: (event: TokenUpdateEvent) => void) {
    this.updateCallbacks.push(callback);
    return () => {
      this.updateCallbacks = this.updateCallbacks.filter((cb) => cb !== callback);
    };
  }
}

export const tokenInjector = new TokenInjector();