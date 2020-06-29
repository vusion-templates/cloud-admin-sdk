import Module from '../module';
import { ProjectPath } from '../common';
import Tree from '../common/tree';
interface ServicePath {
    root: string;
    name: string;
}
export interface AddService extends ServicePath {
    api?: string;
}
export declare type RemoveService = ServicePath;
declare type serviceContent = {
    api?: string;
    config?: string;
    index?: string;
};
export default class Service extends Tree implements ProjectPath {
    private subFiles;
    constructor(name: string, root: string, parent: Module);
    getFullPath(): string;
    load(): serviceContent;
    save(content: serviceContent): void;
    rename(newName: string): void;
    static add(answers: AddService): void;
    static remove(answers: RemoveService): void;
}
export {};
