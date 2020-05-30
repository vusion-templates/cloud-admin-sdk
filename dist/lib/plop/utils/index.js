"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const stringify = require('javascript-stringify').stringify;
exports.default = {
    layoutMap: ['sidebar', 'navbar', 'noNav'],
    getFile(filePath) {
        let obj;
        if (fs_1.default.existsSync(filePath)) {
            const content = fs_1.default.readFileSync(filePath, 'utf8').trim().replace(/export default |module\.exports +=/, '');
            try {
                // eslint-disable-next-line no-eval
                obj = eval('(function(){return ' + content + '})()');
            }
            catch (e) {
                // do noting
            }
        }
        return obj;
    },
    getAppConfig(pagePath) {
        const appConfig = this.getFile(path_1.default.join(pagePath, 'app.config.js'));
        return appConfig;
    },
    getModuleOrder(pagePath) {
        const modulesOrder = this.getFile(path_1.default.join(pagePath, 'modules.order.js'));
        if (modulesOrder) {
            if (!Array.isArray(modulesOrder.sidebar))
                return;
            if (!Array.isArray(modulesOrder.navbar))
                return;
            if (!Array.isArray(modulesOrder.normal))
                return;
        }
        return modulesOrder;
    },
    setModuleOrder(pagePath, modulesOrder) {
        const modulesOrderPath = path_1.default.join(pagePath, 'modules.order.js');
        fs_1.default.writeFileSync(modulesOrderPath, 'export default ' + stringify(modulesOrder, null, 4) + ';\n', 'utf8');
    },
    fixSlash(filePath) {
        return filePath.split(path_1.default.sep).join('/');
    },
};
