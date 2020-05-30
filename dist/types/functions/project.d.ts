import Page, { AddPage, RemovePage } from './page';
import { PlopConfig } from './utils';
export default class Project {
    root: string;
    constructor(root: any);
    addPage(answers: AddPage, config: PlopConfig): Promise<any>;
    removePage(answers: RemovePage, config: PlopConfig): Promise<any>;
    getPage(page: any): Page;
    getPages(page: any): Page[];
}
