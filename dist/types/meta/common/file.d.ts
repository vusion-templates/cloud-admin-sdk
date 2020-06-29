export default class File {
    fileName: string;
    constructor(fileName: string);
    load(): string;
    save(content: string | object): void;
    loadJSON(): ReturnType<typeof JSON.parse>;
}
