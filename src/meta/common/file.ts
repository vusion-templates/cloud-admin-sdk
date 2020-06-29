import * as path from 'path';
import * as fs from 'fs-extra';
export default class File {
    fileName: string;
    constructor(fileName: string) {
        this.fileName = fileName;
    }
    load(): string {
        return fs.readFileSync(this.fileName).toString();
    }
    save(content: string | object): void {
        return fs.writeFileSync(this.fileName, typeof content === 'string' ? content : JSON.stringify(content, null, 4));
    }
    loadJSON(): ReturnType<typeof JSON.parse>{
        const content = this.load();
        return JSON.parse(content);
    }
}