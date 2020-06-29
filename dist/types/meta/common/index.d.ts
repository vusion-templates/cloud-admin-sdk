import Project from '../project';
import Page from '../page';
import Module from '../module';
export interface ProjectPath {
    getFullPath(): string;
}
export declare type LevelType = Project | Page | Module;
export declare enum LEVEL_ENUM {
    project = "project",
    page = "page",
    module = "module",
    service = "service"
}
