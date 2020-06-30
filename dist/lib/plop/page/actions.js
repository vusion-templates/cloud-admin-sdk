"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const config_1 = require("../../functions/page/config");
const utils_1 = require("../../utils");
const utils = {
    loadPage(root) {
        return JSON.parse(fs.readFileSync(path.join(root, './pages.json')).toString());
    },
    setPage(root, pages) {
        fs.writeFileSync(path.join(root, './pages.json'), JSON.stringify(pages, null, 4));
    },
};
exports.default = {
    add(pageInfo, root) {
        const { name, layout, title } = pageInfo;
        const dest = path.join(root, './src/views', pageInfo.name);
        const base = path.join(__dirname, '../../../../template/page');
        return [
            function () {
                if (!name) {
                    throw new Error('name 为空');
                }
                else if (!config_1.Layout[layout]) {
                    throw new Error('layout 设置错误');
                }
                else {
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
                    };
                    utils.setPage(root, pages);
                }
            },
            {
                type: 'addMany',
                destination: utils_1.fixSlash(dest),
                base: utils_1.fixSlash(path.join(base, 'src')),
                templateFiles: utils_1.fixSlash(path.join(base, 'src/**')),
            },
            {
                type: 'add',
                path: path.join(root, './src/pages', name + '.html'),
                base,
                templateFile: path.join(base, 'index.html'),
            },
            function () {
                const modulesOrder = utils_1.getModuleOrder(dest);
                if (layout === config_1.Layout.noNav) {
                    modulesOrder.sidebar = [];
                    modulesOrder.navbar = [];
                }
                if (layout === config_1.Layout.navbar) {
                    modulesOrder.navbar = modulesOrder.sidebar;
                    modulesOrder.sidebar = [];
                }
                utils_1.setModuleOrder(dest, modulesOrder);
            },
        ];
    },
    remove(pageInfo, root) {
        const { name } = pageInfo;
        const viewsRoot = path.join(root, './src/views');
        const dest = path.join(viewsRoot, name);
        return [
            function () {
                fs.removeSync(dest);
                fs.removeSync(path.join(root, './src/pages', name + '.html'));
                const pages = utils.loadPage(root);
                delete pages[name];
                utils.setPage(root, pages);
            },
        ];
    }
};
