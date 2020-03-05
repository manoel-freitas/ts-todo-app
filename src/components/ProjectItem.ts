import { StateProject } from './../store/Store';
import { ProjectStatus } from './../enums/projectStatus';
import { Draggable } from './../interfaces/Dragglable';
import { SimpleComponent } from "../models/SimpleComponent"
import { AutoBind } from '../decorators/autoBind';
import { Project } from '../models/Project';

export class ProjectItem extends SimpleComponent<HTMLUListElement, HTMLLIElement> implements Draggable {
    private stateProject: StateProject

    get persons() {
        if (this.project.people === 1) {
            return '1 person'
        }
        return `${this.project.people} people`
    }

    constructor(hostElementId: string, private project: Project) {
        super('single-project', hostElementId, false, project.id)
        this.stateProject = StateProject.getInstance()
        this.configure()
        this.renderContent()
    }

    @AutoBind
    dblClickHandler() {
        const newStatus = this.project.status === ProjectStatus.ACTIVE ? ProjectStatus.FINISHED : ProjectStatus.ACTIVE
        this.stateProject.updateProject(this.project.title, newStatus)
    }

    configure() {
        this.element.addEventListener('dblclick', this.dblClickHandler)
        this.element.addEventListener('dragstart', this.dragStartHandler)
    }
    renderContent() {
        this.element.querySelector('span')!.textContent = `# ${this.project.id}`
        this.element.querySelector('h2')!.textContent = this.project.title
        this.element.querySelector('h3')!.textContent = `Capacity of ${this.persons} `
        this.element.querySelector('p')!.textContent = this.project.description
    }
    @AutoBind
    dragEndHandler(_: DragEvent) {

    }
    @AutoBind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.title);
        event.dataTransfer!.effectAllowed = 'move';
    }
}
