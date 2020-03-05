import { StateProject } from './../store/Store';
import { ErrorBag } from './../types/validators';
import { validate } from './../utils/validate';
import { Required, Min, Max, Maxlength, Minlength } from './../decorators/validators';
import { ContainerComponent } from './../interfaces/ComponentContainer';
import { StaticComponent } from "../decorators/staticComponent"
import { AutoBind } from '../decorators/autoBind';

@StaticComponent({
    selector: '#app',
    template: '#project-input'
})
export class ProjectInput implements ContainerComponent {
    private titleInput: HTMLInputElement | null = null
    private descriptionInput: HTMLInputElement | null = null
    private peopleInput: HTMLInputElement | null = null
    @Required() @Maxlength(20) @Minlength(5) private title: string = ''
    @Required() @Maxlength(50) @Minlength(5) private description: string = ''
    @Required() @Max(50) @Min(10) private people: number = 0
    private stateProject: StateProject

    constructor() {
        this.stateProject = StateProject.getInstance()
    }

    render(el: HTMLElement): HTMLElement {
        const elementForm = el as HTMLFormElement
        elementForm.id = 'user-input'
        this.titleInput = elementForm.querySelector('#title')! as HTMLInputElement
        this.descriptionInput = elementForm.querySelector('#description')! as HTMLInputElement
        this.peopleInput = elementForm.querySelector('#people')! as HTMLInputElement
        this.configure(elementForm)
        return el
    }

    private gatherUserInput() {
        this.title = this.titleInput!.value
        this.description = this.descriptionInput!.value
        this.people = +this.peopleInput!.value
    }
    private resetForm() {
        this.titleInput!.value = ''
        this.descriptionInput!.value = ''
        this.peopleInput!.value = ''
    }

    @AutoBind
    private submitHandler(e: Event) {
        e.preventDefault()
        this.resetErrorMessages()
        this.gatherUserInput()
        const formValidated = validate(this)
        if (formValidated.invalid) {
            return this.setErrorMessages(formValidated)
        }
        this.stateProject.addProject(
            this.title,
            this.description,
            this.people,
        )
        this.resetForm()
    }

    private setErrorMessages(errorbag: ErrorBag) {
        errorbag.errors.forEach(error => {
            const spanError = document.querySelector(`#${error.property}-error`) as HTMLSpanElement
            if (!spanError) {
                return
            }
            spanError.innerHTML += `${error.message} <br>`
        })
    }
    private resetErrorMessages() {
        ['title', 'description', 'people'].forEach(error => {
            const spanError = document.querySelector(`#${error}-error`) as HTMLSpanElement
            if (!spanError) {
                return
            }
            spanError.innerHTML = ``

        })
    }

    private configure(el: HTMLFormElement) {
        el.addEventListener('submit', this.submitHandler)
    }
}
