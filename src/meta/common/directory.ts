import * as fs from 'fs-extra';
import * as path from 'path';
export default class Directory {
    public directoryPath: string;
    constructor(directoryPath: string) {
        this.directoryPath = directoryPath;
    }
    remove(): ReturnType<typeof fs.removeSync> {
        return fs.removeSync(this.directoryPath);
    }
    dir(options?): string[]{
        return fs.readdirSync(this.directoryPath, options);
    }
    rename(name): ReturnType<typeof fs.renameSync> {
        return fs.renameSync(this.directoryPath, path.join(this.directoryPath, '..', name));
    }
}