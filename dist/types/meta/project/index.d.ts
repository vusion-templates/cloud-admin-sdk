import Page, { AddPage, RemovePage } from '../page';
import Component, { AddComponent } from '../component';
import { PlopConfig } from '../utils';
import { ProjectPath } from '../common';
import Tree from '../common/tree';
export default class Project extends Tree implements ProjectPath {
    client: string;
    server: string;
    cachePages: Page[];
    constructor(name: string, root: string);
    getFullPath(): string;
    private getSubPath;
    addComponent(answers: AddComponent, config?: PlopConfig): ReturnType<typeof Component.add>;
    addPage(answers: AddPage, config?: PlopConfig): ReturnType<typeof Page.add>;
    removePage(answers: RemovePage, config?: PlopConfig): ReturnType<typeof Page.remove>;
    loadPages(): Page[];
}
