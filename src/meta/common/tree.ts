import { LEVEL_ENUM, LevelType } from './index';
import * as path from 'path';
export default class Tree {
    public parent?: LevelType;
    public level: LEVEL_ENUM;
    public name: string;
    public root: string;
    public fullPath: string;
    constructor(name: string, root: string, level: LEVEL_ENUM, parent?: LevelType) {
        this.level = level;
        this.name = name;
        this.root = root;
        this.fullPath = this.getFullPath();
        this.parent = parent;
    }
    public getFullPath(): string {
        return path.join(this.root, this.name);
    }
    public getLevel(level: LEVEL_ENUM): LevelType {
        let p = this as any;
        while(p.level !== level) {
            p = p.parent;
        }
        return p as LevelType;
    }
}