"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const actions_1 = __importDefault(require("./actions"));
function default_1(plop) {
    const dest = plop.getDestBasePath();
    const viewsRoot = path_1.default.join(dest, './src/views');
    return {
        prompts: [
            {
                type: 'list',
                name: 'page',
                required: true,
                message: '请选择模块所在的入口页',
                choices() {
                    const pages = [];
                    fs_extra_1.default.readdirSync(viewsRoot).forEach((innerDir) => {
                        const stat = fs_extra_1.default.statSync(path_1.default.resolve(viewsRoot, innerDir));
                        if (stat.isDirectory()) {
                            pages.push(innerDir);
                        }
                    });
                    return pages;
                },
            },
            {
                type: 'list',
                name: 'name',
                required: true,
                message: '请选择要删除的模块',
                choices(answers) {
                    const modules = [];
                    const pagePath = path_1.default.join(viewsRoot, answers.page);
                    fs_extra_1.default.readdirSync(pagePath).forEach((innerDir) => {
                        const stat = fs_extra_1.default.statSync(path_1.default.resolve(pagePath, innerDir));
                        if (stat.isDirectory()) {
                            modules.push(innerDir);
                        }
                    });
                    return modules;
                },
            },
        ],
        actions(answers) {
            const name = chalk_1.default.blue(answers.name);
            return [
                ...actions_1.default.remove(answers, dest),
                [
                    `模块 ${name} 已经被删除。`,
                ].join('\n'),
            ];
        },
    };
}
exports.default = default_1;
