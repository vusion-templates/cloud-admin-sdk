import Service, { AddService, RemoveService } from '../service';
import Utils, {PlopConfig} from '../utils';
import { Layout } from './config';
import Page from '../page';
import * as fs from 'fs-extra';
import * as path from 'path';
import { ProjectPath, LEVEL_ENUM } from '../common';
import Tree from '../common/tree';
import Directory from '../common/directory';
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
export default class Module extends Tree implements ProjectPath{
    public cacheServices: Service[];

    constructor(name: string, root: string, parent: Page) {
        super(name, root, LEVEL_ENUM.module, parent);
    }
    public loadServices(): Service[] {
        const currentPath = this.fullPath;
        const directory = new Directory(currentPath);
        this.cacheServices = directory.dir().map((moduleName) => {
            return new Service(moduleName, currentPath, this);
        });
        return this.cacheServices;
    }
    public addService(answers: AddService): ReturnType<typeof Service.add> {
        return Service.add({
            root: this.fullPath,
            name: this.name,
            ...answers,
        });
    }
    public removeService(answers: RemoveService): ReturnType<typeof Service.remove> {
        return Service.remove({
            root: this.fullPath,
            name: this.name,
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
    public renameService(oldName: string, newName: string): void {
        let hasNew = false;
        let hasOld = false;
        this.loadServices().forEach((service: Service) => {
            if (service.name === newName) {
                hasNew = true;
            }
            if (service.name === oldName) {
                hasOld = true;
            }
        });
        if (!hasOld) {
            throw new Error(`not found service:${newName}`);
        }
        if (hasNew) {
            throw new Error(`service:${newName} already exists`);
        }
        const service = new Service(oldName, this.fullPath, this);
        service.rename(newName);
        this.loadServices();
    }

}