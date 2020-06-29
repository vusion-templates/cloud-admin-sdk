import { Layout } from './config';
import MetaData from './metaData';
import { PlopConfig } from '../utils';
import Tree from '../common/tree';
import { ProjectPath } from '../common';
import Module, { AddModule, RemoveModule } from '../module';
import Project from '../project';
import Routes from '../routes';
export interface AddPage {
    name: string;
    title: string;
    layout: Layout;
}
export interface RemovePage {
    name: string;
}
export default class Page extends Tree implements ProjectPath {
    cacheModules: Module[];
    metaData: MetaData;
    routes: Routes;
    constructor(name: string, root: string, parent: Project);
    getFullPath(): string;
    loadModules(): Module[];
    addModule(answers: AddModule, config: PlopConfig): ReturnType<typeof Module.add>;
    removeModule(answers: RemoveModule, config: PlopConfig): ReturnType<typeof Module.remove>;
    static add(answers: AddPage, config: PlopConfig): Promise<any>;
    static remove(answers: RemovePage, config: PlopConfig): Promise<any>;
}
