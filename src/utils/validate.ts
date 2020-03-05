import { ValidatorBag } from './validatorBag';
import { RuleConfig, ErrorBag, RuleError } from './../types/validators';


const errorsCheck = (validatorRule: RuleConfig, validatorObject: any, propertyToValidate: any) =>
    validatorRule.error.name === 'required' && validatorObject[propertyToValidate] ||
    validatorRule.error.name === 'max' && validatorObject[propertyToValidate] < validatorRule.param ||
    validatorRule.error.name === 'min' && validatorObject[propertyToValidate] > validatorRule.param ||
    validatorRule.error.name === 'maxlength' && validatorObject[propertyToValidate].length < validatorRule.param ||
    validatorRule.error.name === 'minlength' && validatorObject[propertyToValidate].length > validatorRule.param

export const validate = (validatorObject: any): ErrorBag => {
    const config = ValidatorBag.getInstance().config
    return Object.entries(config).reduce((accError, [propertyToValidate, validatorRules]) => {
        const errors = validatorRules.filter((validatorRule: RuleConfig) => !errorsCheck(validatorRule, validatorObject, propertyToValidate))
            .map(((ruleConfig: RuleConfig) => ruleConfig.error))

        const isValid = !validatorRules.every((validatorRule: RuleConfig) => errorsCheck(validatorRule, validatorObject, propertyToValidate))
        accError.errors = [...accError.errors, ...errors]
        return {
            ...accError,
            invalid: isValid
        }
    }, {
        errors: [] as RuleError[],
        invalid: false
    } as ErrorBag)
}