declare const _default: {
    layoutMap: string[];
    getFile(filePath: string): object;
    getAppConfig(pagePath: string): {
        [prop: string]: string;
        layout: string;
    };
    getModuleOrder(pagePath: string): object;
    setModuleOrder(pagePath: string, modulesOrder: object): void;
    fixSlash(filePath: string): string;
};
export default _default;
