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
const metaData_1 = __importDefault(require("./metaData"));
const utils_1 = __importDefault(require("../utils"));
const tree_1 = __importDefault(require("../common/tree"));
const directory_1 = __importDefault(require("../common/directory"));
const common_1 = require("../common");
const module_1 = __importDefault(require("../module"));
const routes_1 = __importDefault(require("../routes"));
class Page extends tree_1.default {
    constructor(name, root, parent) {
        super(name, root, common_1.LEVEL_ENUM.page, parent);
        this.metaData = new metaData_1.default(root, name);
        this.routes = new routes_1.default(root);
    }
    getFullPath() {
        return path.join(this.root, 'src/views', this.name);
    }
    loadModules() {
        const currentPath = this.fullPath;
        const directory = new directory_1.default(currentPath);
        this.cacheModules = directory.dir().map((moduleName) => {
            return new module_1.default(moduleName, currentPath, this);
        });
        return this.cacheModules;
    }
    addModule(answers, config) {
        answers.page = this.name;
        return module_1.default.add(answers, Object.assign({ root: this.root }, config));
    }
    removeModule(answers, config) {
        answers.page = this.name;
        return module_1.default.remove(answers, Object.assign({ root: this.root }, config));
    }
    static add(answers, config) {
        const plop = utils_1.default.getPlop(config);
        return plop.getGenerator('add-page').runActions(answers);
    }
    static remove(answers, config) {
        const plop = utils_1.default.getPlop(config);
        return plop.getGenerator('remove-page').runActions(answers);
    }
}
exports.default = Page;
