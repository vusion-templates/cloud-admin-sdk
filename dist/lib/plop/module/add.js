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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const chalk = require("chalk");
const utils_1 = require("../../utils");
const config_1 = require("../../functions/module/config");
const actions_1 = __importDefault(require("./actions"));
function default_1(plop) {
    const dest = plop.getDestBasePath();
    const viewsRoot = path.join(dest, './src/views');
    const pages = [];
    fs.readdirSync(viewsRoot).forEach((innerDir) => {
        const stat = fs.statSync(path.resolve(viewsRoot, innerDir));
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
                    const pagePath = path.join(viewsRoot, answers.page || pages[0]);
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
            const name = chalk.blue(answers.name);
            if (answers.addToSidebar) {
                answers.layout = Object.keys(config_1.Layout)[Object.values(config_1.Layout).indexOf(answers.addToSidebar)];
            }
            return [
                ...actions_1.default.add(answers, dest),
                [
                    `模块 ${name} 已经添加成功。`,
                    `需要注意以下几点：`,
                    `  模块路径在 ${chalk.yellow(`src/views/${answers.page}/${answers.name}`)}`,
                    `  如果要修改模块的排序：${chalk.yellow(`src/views/${answers.page}/modules.order.js`)}`,
                    `  如果要修改模块标题和其它配置：${chalk.yellow(`src/views/${answers.page}/${answers.name}/module/base.js`)}`,
                ].join('\n'),
            ];
        },
    };
}
exports.default = default_1;
