import { AddService, RemoveService } from '../service';
import { PlopConfig } from '../utils';
import { Layout } from './config';
import { ProjectPath } from '../common';
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
export default class Module<T> implements ProjectPath {
    name: string;
    page: string;
    root: string;
    parent?: T;
    constructor(name: string, page: string, root: string, parent?: T);
    getFullPath(): string;
    addService(answers: AddService): Promise<string>;
    removeService(answers: RemoveService): Promise<boolean>;
    static add(answers: AddModule, config: PlopConfig): Promise<any>;
    static remove(answers: RemoveModule, config: PlopConfig): Promise<any>;
}
