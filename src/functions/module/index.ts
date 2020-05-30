import Service, {AddService, RemoveService} from '../service';
import Utils, {PlopConfig} from '../utils';
import { Layout } from './config';
import { ProjectPath } from '../common';
import path from 'path';
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
export default class Module<T> implements ProjectPath{
    public name: string;
    public page: string;
    public root: string;
    public parent?: T;

    constructor(name: string, page: string, root: string, parent?: T) {
        this.name = name;
        this.page = page;
        this.root = root;
        if (parent) {
            this.parent = parent;
        }
    }
    getFullPath(): string {
        return path.join(this.root, this.page, this.name);
    }
    public addService(answers: AddService): Promise<string> {
        return Service.add({
            root: this.root,
            page: this.page,
            module: this.name,
            ...answers,
        });
    }
    public removeService(answers: RemoveService): Promise<boolean> {
        return Service.remove({
            root: this.root,
            page: this.page,
            module: this.name,
            ...answers,
        });
    }
    static add(answers: AddModule, config: PlopConfig): Promise<any> {
        const plop = Utils.getPlop(config);
        return plop.getGenerator('add-module').runActions(answers);
    }
    static remove(answers: RemoveModule, config: PlopConfig): Promise<any> {
        const plop = Utils.getPlop(config);
        return plop.getGenerator('remove-module').runActions(answers);
    }

}