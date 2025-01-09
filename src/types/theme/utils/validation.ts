// Type Guards and Validators
export type TypeGuard<T> = (value: unknown) => value is T;
export type Validator<T> = (value: T) => boolean;
export type AsyncValidator<T> = (value: T) => Promise<boolean>;

export interface ValidationResult {
    isValid: boolean;
    errors?: string[];
    warnings?: string[];
}

export interface ValidationOptions {
    strict?: boolean;
    allowUnknown?: boolean;
    abortEarly?: boolean;
}

// Schema Validation
export type SchemaValidator<T> = {
    [P in keyof T]: TypeGuard<T[P]>;
};

export interface ValidationContext {
    path: string[];
    value: unknown;
    parent: unknown;
    options?: ValidationOptions;
}