"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("../../utils");
const config_1 = require("../../functions/module/config");
const actions_1 = __importDefault(require("./actions"));
function default_1(plop) {
    const dest = plop.getDestBasePath();
    const viewsRoot = path_1.default.join(dest, './src/views');
    const pages = [];
    fs_1.default.readdirSync(viewsRoot).forEach((innerDir) => {
        const stat = fs_1.default.statSync(path_1.default.resolve(viewsRoot, innerDir));
        if (stat.isDirectory()) {
            pages.push(innerDir);
        }
    });
    return {
        prompts: [
            {
                type: 'input',
                name: 'name',
                required: true,
                message: '请输入模块名（将作为文件夹名、路径名等使用）',
                validate(value) {
                    if (value) {
                        return true;
                    }
                    return '模块名必填';
                },
            },
            {
                type: 'input',
                name: 'title',
                message: '请输入模块标题（可选，用于替换模块中的常见文案）',
            },
            {
                type: 'list',
                name: 'page',
                required: true,
                message: '添加至',
                choices: pages,
                when() {
                    return pages.length > 1;
                },
            },
            {
                type: 'list',
                name: 'addToSidebar',
                choices: Object.values(config_1.Layout),
                default(answers) {
                    const pagePath = path_1.default.join(viewsRoot, answers.page || pages[0]);
                    const appConfig = utils_1.getAppConfig(pagePath);
                    if (appConfig.layout) {
                        if (config_1.Layout[appConfig.layout]) {
                            return config_1.Layout[appConfig.layout];
                        }
                    }
                    return 'sidebar';
                },
                message: '是否添加到导航栏',
            },
        ],
        actions(answers) {
            answers.page = answers.page || pages[0];
            answers.title = answers.title || answers.name;
            const name = chalk_1.default.blue(answers.name);
            answers.layout = Object.keys(config_1.Layout)[Object.values(config_1.Layout).indexOf(answers.addToSidebar)];
            return [
                ...actions_1.default.add(answers, dest),
                [
                    `模块 ${name} 已经添加成功。`,
                    `需要注意以下几点：`,
                    `  模块路径在 ${chalk_1.default.yellow(`src/views/${answers.page}/${answers.name}`)}`,
                    `  如果要修改模块的排序：${chalk_1.default.yellow(`src/views/${answers.page}/modules.order.js`)}`,
                    `  如果要修改模块标题和其它配置：${chalk_1.default.yellow(`src/views/${answers.page}/${answers.name}/module/base.js`)}`,
                ].join('\n'),
            ];
        },
    };
}
exports.default = default_1;
