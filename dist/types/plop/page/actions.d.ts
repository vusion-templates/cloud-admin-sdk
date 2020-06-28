import { Layout } from '../../functions/page/config';
interface PageInfo {
    name: string;
    title: string;
    layout: Layout;
    auth: boolean;
}
declare const _default: {
    add(pageInfo: PageInfo, root: string): Array<Function | object | string>;
    remove(pageInfo: PageInfo, root: string): Array<Function | object | string>;
};
export default _default;
