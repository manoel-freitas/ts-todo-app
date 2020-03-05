import { StateProject } from './../store/Store';
import { ProjectStatus } from './../enums/projectStatus';
import { Project } from './../models/Project';
import { ProjectItem } from './ProjectItem';
import { DragTarget } from '../interfaces/Dragglable';
import { ContainerComponent } from '../interfaces/ComponentContainer';
import { StaticComponent } from "../decorators/staticComponent";
import { AutoBind } from '../decorators/autoBind';

@StaticComponent({
    selector: '#app',
    template: '#project-list'
})
export class ProjectList implements ContainerComponent, DragTarget {
    private stateManagement: StateProject
    assignedProjects: Project[] = []

    constructor(private type: 'active' | 'finished', private element?: HTMLElement) {
        this.stateManagement = StateProject.getInstance()
    }
    render(el: HTMLElement): HTMLElement {
        el.id = `${this.type}-projects`;
        const listId = `${this.type}-projects-list`;
        el.querySelector('ul')!.id = listId;
        el.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
        this.element = el
        this.configure()
        return el
    }

    configure() {
        this.element!.addEventListener('dragover', this.dragOverHandler)
        this.element!.addEventListener('dragleave', this.dragLeaveHandler)
        this.element!.addEventListener('drop', this.dropHandler)
        this.stateManagement.addListener((projects: Project[]) => {
            const relavantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.ACTIVE
                }
                return prj.status === ProjectStatus.FINISHED
            })
            this.assignedProjects = relavantProjects
            this.renderProjects()
        })
    }

    renderProjects() {
        const listTemplate = document.getElementById(`${this.type}-projects-list`)!
        listTemplate.innerHTML = ''
        this.assignedProjects.forEach((project: Project) => {
            new ProjectItem(`${this.type}-projects-list`, project)
        })
    }
    @AutoBind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element!.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }
    @AutoBind
    dropHandler(event: DragEvent): void {
        event.preventDefault()
        const prjTitle = event.dataTransfer?.getData('text/plain')!
        const projectStatus = this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
        this.stateManagement.updateProject(prjTitle, projectStatus)
    }
    @AutoBind
    dragLeaveHandler(_: DragEvent): void {
        const listEl = this.element!.querySelector('ul')!
        listEl.classList.remove('droppable')
    }
}
