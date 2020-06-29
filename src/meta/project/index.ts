import Page, { AddPage, RemovePage } from '../page';
import Component, { AddComponent } from '../component';
import { PlopConfig } from '../utils';
import { ProjectPath, LEVEL_ENUM } from '../common';
import Tree from '../common/tree';
import Directory from '../common/directory';
import * as path from 'path';
import * as fs from 'fs-extra';
export default class Project extends Tree implements ProjectPath {

    public client: string;
    public server: string;
    public cachePages: Page[];

    constructor(name: string, root: string) {
        super(name, root, LEVEL_ENUM.project, null);
        this.client = this.getSubPath('client');
        const server = this.getSubPath('server');
        this.server = server === root ? '' : server;
    }
    getFullPath(): string{
        return this.root;
    }
    private getSubPath(subPath: string): string {
        const clientPath = path.join(this.fullPath, subPath);
        if (fs.existsSync(clientPath)){
            return clientPath;
        }
        return this.fullPath;
    }
    public addComponent(answers: AddComponent, config?: PlopConfig): ReturnType<typeof Component.add> {
        return Component.add(answers, {
            root: this.client,
            ...config,
        });
    }
    public addPage(answers: AddPage, config?: PlopConfig): ReturnType<typeof Page.add> {
        return Page.add(answers, {
            root: this.client,
            ...config,
        });
    }
    public removePage(answers: RemovePage, config?: PlopConfig): ReturnType<typeof Page.remove> {
        return Page.remove(answers, {
            root: this.client,
            ...config,
        });
    }
    public loadPages(): Page[] {
        const subDirList = new Directory(this.client).dir();
        this.cachePages = subDirList.map((pageName) => {
            return new Page(pageName, this.client, this);
        });
        return this.cachePages;
    }
}