export declare type NodePlop = any;
export declare type PlopConfig = {
    root: string;
    force?: boolean;
};
declare const _default: {
    loadPages(root: string): object;
    getPlop(config: PlopConfig): NodePlop;
    getPagePath(answer: any): string;
    getModulePath(answer: any): string;
    getServicePath(answer: any): string;
    getViewPath(answer: any): string;
};
export default _default;
