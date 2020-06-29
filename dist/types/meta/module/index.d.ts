import Service, { AddService, RemoveService } from '../service';
import { PlopConfig } from '../utils';
import { Layout } from './config';
import Page from '../page';
import { ProjectPath } from '../common';
import Tree from '../common/tree';
export interface AddModule {
    name: string;
    title?: string;
    page: string;
    addToSidebar: Layout;
}
export interface RemoveModule {
    name: string;
    page: string;
}
export default class Module extends Tree implements ProjectPath {
    cacheServices: Service[];
    constructor(name: string, root: string, parent: Page);
    loadServices(): Service[];
    addService(answers: AddService): ReturnType<typeof Service.add>;
    removeService(answers: RemoveService): ReturnType<typeof Service.remove>;
    static add(answers: AddModule, config: PlopConfig): Promise<any>;
    static remove(answers: RemoveModule, config: PlopConfig): Promise<any>;
    renameService(oldName: string, newName: string): void;
}
