// State Management
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type ValidationState = 'valid' | 'invalid' | 'warning';
export type ProcessState = 'pending' | 'processing' | 'completed' | 'failed';

export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    timestamp?: number;
}

export type StateUpdater<T> = (prev: T) => T;
export type AsyncStateUpdater<T> = (prev: AsyncState<T>) => AsyncState<T>;

// Action types
export type ActionType<T extends string, P = void> = P extends void
    ? { type: T }
    : { type: T; payload: P };

export type DispatchFunction<A> = (action: A) => void;