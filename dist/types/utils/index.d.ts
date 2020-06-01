export declare const fixSlash: (filePath: string) => string;
export declare const templatePath: string;
export declare const getFile: (filePath: string) => object;
export declare type ModuleOrder = {
    sidebar: string[];
    navbar: string[];
    normal: string[];
};
export declare const getModuleOrder: (pagePath: string) => void | ModuleOrder;
export declare const setModuleOrder: (pagePath: string, modulesOrder: object) => void;
export declare type AppConfig = {
    layout: string;
    [prop: string]: string;
};
export declare const getAppConfig: (pagePath: string) => AppConfig;
