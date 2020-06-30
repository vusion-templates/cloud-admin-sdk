import * as path from 'path';
import * as fs from 'fs-extra';
import { Layout } from '../../functions/page/config';
import { fixSlash, getModuleOrder, setModuleOrder, ModuleOrder } from '../../utils';
interface PageInfo {
    name: string;
    title: string;
    layout: Layout;
    auth: boolean;
}
const utils = {
    loadPage(root: string): object {
        return JSON.parse(fs.readFileSync(path.join(root,'./pages.json')).toString());
    },
    setPage(root: string, pages: object): void {
        fs.writeFileSync(path.join(root, './pages.json'), JSON.stringify(pages, null, 4));
    },
}
export default {
    add(pageInfo: PageInfo, root: string): Array<Function|object|string> {
        const { name, layout, title } = pageInfo;
        const dest = path.join(root, './src/views', pageInfo.name);
        const base = path.join(__dirname, '../../../../template/page');
        return [
            function (): void|Error {
                if (!name) {
                    throw new Error('name 为空');
                } else if (!Layout[layout]) {
                    throw new Error('layout 设置错误');
                } else {
                    const pages = utils.loadPage(root);
                    if (pages[name]) {
                        throw new Error('该页面已经存在！');
                    }
                    pages[name] = {
                        entry: `./src/views/${name}/index.js`,
                        template: `./src/pages/${name}.html`,
                        filename: `${name}.html`,
                        favicon: './src/pages/favicon.ico',
                        title,
                        inject: true,
                        chunks: [
                            'chunk-vendors',
                            name,
                        ],
                        chunksSortMode: 'manual',
                    }
                    utils.setPage(root, pages);
                }
            },
            {
                type: 'addMany',
                destination: fixSlash(dest),
                base: fixSlash(path.join(base, 'src')),
                templateFiles: fixSlash(path.join(base, 'src/**')),
            },
            {
                type: 'add',
                path: path.join(root, './src/pages', name + '.html'),
                base,
                templateFile: path.join(base, 'index.html'),
            },
            function (): void {
                const modulesOrder = getModuleOrder(dest) as ModuleOrder;
                if (layout === Layout.noNav) {
                    modulesOrder.sidebar = [];
                    modulesOrder.navbar = [];
                }
                if (layout === Layout.navbar) {
                    modulesOrder.navbar = modulesOrder.sidebar;
                    modulesOrder.sidebar = [];
                }
                setModuleOrder(dest, modulesOrder);
            },
        ];


    },
    remove(pageInfo: PageInfo, root: string): Array<Function|object|string> {
        const { name } = pageInfo;
        const viewsRoot = path.join(root, './src/views');
        const dest = path.join(viewsRoot, name);
        return [
            function (): void {
                fs.removeSync(dest);
                fs.removeSync(path.join(root, './src/pages', name + '.html'));
                const pages = utils.loadPage(root);
                delete pages[name];
                utils.setPage(root, pages);
            },
        ];
    }
}