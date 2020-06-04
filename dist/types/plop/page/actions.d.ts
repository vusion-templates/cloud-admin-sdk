import { Layout } from '../../functions/page/config';
interface PageInfo {
    name: string;
    title: string;
    layout: Layout;
}
declare const _default: {
    add(pageInfo: PageInfo, root: string): (string | object | Function)[];
    remove(pageInfo: PageInfo, root: string): (string | object | Function)[];
};
export default _default;
