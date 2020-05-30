"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils_1 = require("../../utils");
const config_1 = require("../../functions/module/config");
exports.default = {
    add(answers, root) {
        const base = path_1.default.join(__dirname, '../../../../template/module');
        const pagePath = path_1.default.join(root, './src/views', answers.page);
        return [
            function () {
                if (!answers.name) {
                    throw new Error('name 为空');
                }
                else if (!config_1.Layout[answers.layout]) {
                    throw new Error('layout 设置错误');
                }
            },
            {
                type: 'addMany',
                destination: utils_1.fixSlash(path_1.default.join(pagePath, answers.name)),
                base: utils_1.fixSlash(base),
                templateFiles: utils_1.fixSlash(base + '/**'),
            },
            function () {
                const modulesOrder = utils_1.getModuleOrder(pagePath);
                if (modulesOrder) {
                    if (modulesOrder[answers.layout])
                        modulesOrder[answers.layout].push(answers.name);
                    modulesOrder.normal.push(answers.name);
                    utils_1.setModuleOrder(pagePath, modulesOrder);
                }
            },
        ];
    },
    remove(answers, root) {
        const viewsRoot = path_1.default.join(root, './src/views');
        const pagePath = path_1.default.join(viewsRoot, answers.page);
        const dest = path_1.default.join(pagePath, answers.name);
        return [
            function () {
                fs_extra_1.default.removeSync(dest);
                const modulesOrder = utils_1.getModuleOrder(pagePath);
                if (modulesOrder) {
                    Object.keys(modulesOrder).forEach((key) => {
                        const indexOf = modulesOrder[key].indexOf(answers.name);
                        ~indexOf && modulesOrder[key].splice(indexOf, 1);
                    });
                    utils_1.setModuleOrder(pagePath, modulesOrder);
                }
            },
        ];
    }
};
