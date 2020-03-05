import { ValidatorBag } from '../utils/validatorBag';

export const Required = (message = 'Campo Obrigátorio') => (_: any, property: string) => ValidatorBag.getInstance().addValidator(property, { error: { name: 'required', message, property } });
export const Maxlength = (length: number, message = `Campo deve ter tamanho máximo de ${length}`) => (_: any, property: string) => ValidatorBag.getInstance().addValidator(property, { error: { name: 'maxlength', message, property }, param: length });
export const Minlength = (length: number, message = `Campo deve ter tamanho mínimo de ${length}`) => (_: any, property: string) => ValidatorBag.getInstance().addValidator(property, { error: { name: 'minlength', message, property }, param: length });
export const Max = (max: number, message = `Campo deve ser maior que ${max}`) => (_: any, property: string) => ValidatorBag.getInstance().addValidator(property, { error: { name: 'max', message, property }, param: max });
export const Min = (min: number, message = `Campo deve ser menor que ${min}`) => (_: any, property: string) => ValidatorBag.getInstance().addValidator(property, { error: { name: 'min', message, property }, param: min });