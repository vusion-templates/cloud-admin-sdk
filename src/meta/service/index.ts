// import { PlopConfig } from '../utils';
import * as path from 'path';
import * as fs from 'fs-extra';
import { ProjectPath } from '../common';
import Utils from '../utils';
import { templatePath } from '../../utils';
interface ServicePath {
    root: string;
    page: string;
    module: string;
}
export interface AddService extends ServicePath {
    name: string;
    content: object;
}
export interface RemoveService extends ServicePath {
    name: string;
}
export default class Service<T> implements ProjectPath{
    public name: string;
    public module: string;
    public page: string;
    public root: string;
    public parent?: T;

    constructor(name: string, module: string, page: string, root: string, parent?: T) {
        this.name = name;
        this.module = module;
        this.page = page;
        this.root = root;
        if (parent) {
            this.parent = parent;
        }
    }
    getFullPath(): string {
        return path.join(this.root, this.page, this.module, 'service', this.name);
    }
    public load() {
        // todo
    }
    public save() {
        // todo
    }
    public remove() {
        // todo
    }
    static add(answers: AddService): string {
        const dir = path.join(Utils.getServicePath(answers), answers.name);
        const tplPath = path.resolve(templatePath, 'service');
        fs.copySync(tplPath, dir);
        return path.join(dir, 'api.json');
    }
    static remove(answers: RemoveService): void {
        const dir = path.join(Utils.getServicePath(answers), answers.name);
        fs.removeSync(dir);
    }
}