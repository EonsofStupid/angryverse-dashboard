import { Duration } from './animation';

// Cache Configuration
export interface CacheConfig<T> {
    maxSize: number;
    ttl: Duration;
    onEvict?: (key: string, value: T) => void;
}

// Debounce Configuration
export interface DebounceConfig {
    wait: Duration;
    leading?: boolean;
    trailing?: boolean;
}

// Throttle Configuration
export interface ThrottleConfig {
    limit: Duration;
    trailing?: boolean;
}

// Performance Metrics
export interface PerformanceMetrics {
    fps: number;
    memory: {
        used: number;
        total: number;
    };
    renderTime: Duration;
    loadTime: Duration;
}