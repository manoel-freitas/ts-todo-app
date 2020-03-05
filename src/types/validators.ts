export type ValidatorConfig = {
    [propertyToValidate: string]: RuleConfig[]
}

export type RuleError = {
    name: string;
    message: string;
    property: string;
}

export type RuleConfig = {
    error: RuleError
    param?: any;
}
export type ErrorBag = {
    errors: RuleError[];
    invalid: boolean;
}