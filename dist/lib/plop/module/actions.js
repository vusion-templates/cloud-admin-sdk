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
const utils_1 = require("../../utils");
const config_1 = require("../../functions/module/config");
exports.default = {
    add(answers, root) {
        const base = path.join(__dirname, '../../../../template/module');
        const pagePath = path.join(root, './src/views', answers.page);
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
                destination: utils_1.fixSlash(path.join(pagePath, answers.name)),
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
        const viewsRoot = path.join(root, './src/views');
        const pagePath = path.join(viewsRoot, answers.page);
        const dest = path.join(pagePath, answers.name);
        return [
            function () {
                fs.removeSync(dest);
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
