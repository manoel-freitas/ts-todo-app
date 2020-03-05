import { ContainerComponent } from '../interfaces/ComponentContainer';
import { ComponentConfig } from './../types/componentConfig';

export function StaticComponent(componentConfig: ComponentConfig) {
    const hookEl = document.querySelector(componentConfig.template) as HTMLTemplateElement
    const selector = document.querySelector(componentConfig.selector) as HTMLElement
    let element: HTMLElement;
    if (!hookEl) {
        throw new Error('Template element not found');
    }
    if (!selector) {
        throw new Error('Host element not found');
    }
    return function <T extends { new(...args: any[]): ContainerComponent }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(...args: any[]) {
                super(...args)
                const importedNode = document.importNode(hookEl.content, true)
                element = importedNode.firstElementChild as HTMLElement
                selector.appendChild(this.render(element))
            }
        }
    }
}