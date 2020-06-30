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
const actions_1 = __importDefault(require("./actions"));
function default_1(plop) {
    const dest = plop.getDestBasePath();
    const viewsRoot = path.join(dest, './src/views');
    return {
        prompts: [
            {
                type: 'list',
                name: 'page',
                required: true,
                message: '请选择模块所在的入口页',
                choices() {
                    const pages = [];
                    fs.readdirSync(viewsRoot).forEach((innerDir) => {
                        const stat = fs.statSync(path.resolve(viewsRoot, innerDir));
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
                    const pagePath = path.join(viewsRoot, answers.page);
                    fs.readdirSync(pagePath).forEach((innerDir) => {
                        const stat = fs.statSync(path.resolve(pagePath, innerDir));
                        if (stat.isDirectory()) {
                            modules.push(innerDir);
                        }
                    });
                    return modules;
                },
            },
        ],
        actions(answers) {
            const name = chalk.blue(answers.name);
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
