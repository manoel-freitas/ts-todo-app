import { ValidatorConfig, RuleConfig } from '../types/validators';

export class ValidatorBag {
    private static instance : ValidatorBag

    private constructor(private validatorConfig: ValidatorConfig = {}) {

    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ValidatorBag();
        return this.instance;
    }

    get config() {
        return this.validatorConfig;
    }

    addValidator(propertyToValidate: string, validatorRule: RuleConfig) {
        this.validatorConfig[propertyToValidate] = this.validatorConfig[propertyToValidate]
            ? [...this.validatorConfig[propertyToValidate], validatorRule]
            : [validatorRule];
    }

}