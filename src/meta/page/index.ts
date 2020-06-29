import * as path from 'path';
import { Layout } from './config';
import MetaData from './metaData';
import Utils, {PlopConfig} from '../utils';
import Tree from '../common/tree';
import Directory from '../common/directory';
import { ProjectPath, LEVEL_ENUM } from '../common';
import Module, {AddModule, RemoveModule} from '../module';
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

export default class Page extends Tree implements ProjectPath{
    public cacheModules: Module[];
    public metaData: MetaData;
    public routes: Routes;

    constructor(name: string, root: string, parent: Project) {
        super(name, root, LEVEL_ENUM.page, parent);
        this.metaData = new MetaData(root, name);
        this.routes = new Routes(root);
    }

    public getFullPath(): string {
        return path.join(this.root, 'src/views', this.name);
    }

    public loadModules(): Module[] {
        const currentPath = this.fullPath;
        const directory = new Directory(currentPath);
        this.cacheModules = directory.dir().map((moduleName) => {
            return new Module(moduleName, currentPath, this);
        });
        return this.cacheModules;
    }

    public addModule(answers: AddModule, config: PlopConfig): ReturnType<typeof Module.add> {
        answers.page = this.name;
        return Module.add(answers, {
            root: this.root,
            ...config,
        });
    }
    public removeModule(answers: RemoveModule, config: PlopConfig): ReturnType<typeof Module.remove> {
        answers.page = this.name;
        return Module.remove(answers, {
            root: this.root,
            ...config,
        });
    }

    static add(answers: AddPage, config: PlopConfig): Promise<any> {
        const plop = Utils.getPlop(config);
        return plop.getGenerator('add-page').runActions(answers);
    }
    static remove(answers: RemovePage, config: PlopConfig): Promise<any> {
        const plop = Utils.getPlop(config);
        return plop.getGenerator('remove-page').runActions(answers);
    }
}