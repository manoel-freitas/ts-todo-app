import { ProjectStatus } from './../enums/projectStatus';
import { Project } from './../models/Project';
import { State } from '../models/State';



export class StateProject extends State<Project> {
    private static instance: StateProject;
    private _projects: Project[] = [];

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new StateProject()
        return this.instance
    }

    private get projects() {
        return this._projects
    }

    addProject(title: string, description: string, people: number) {
        this._projects = [...this.projects, new Project(Math.random().toString(), title, description, people, ProjectStatus.ACTIVE)]
        this.listeners.forEach(listenerFn => listenerFn([...this.projects]))
    }

    updateProject(title: string, status: ProjectStatus) {
        const project = this._projects.find(proj => proj.title === title)
        if (project && project.status !== status) {
            project.status = status
            this.listeners.forEach(listenerFn => listenerFn([...this.projects]))
        }
    }

}