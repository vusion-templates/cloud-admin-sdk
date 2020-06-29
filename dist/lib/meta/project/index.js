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
const page_1 = __importDefault(require("../page"));
const component_1 = __importDefault(require("../component"));
const common_1 = require("../common");
const tree_1 = __importDefault(require("../common/tree"));
const directory_1 = __importDefault(require("../common/directory"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
class Project extends tree_1.default {
    constructor(name, root) {
        super(name, root, common_1.LEVEL_ENUM.project, null);
        this.client = this.getSubPath('client');
        const server = this.getSubPath('server');
        this.server = server === root ? '' : server;
    }
    getFullPath() {
        return this.root;
    }
    getSubPath(subPath) {
        const clientPath = path.join(this.fullPath, subPath);
        if (fs.existsSync(clientPath)) {
            return clientPath;
        }
        return this.fullPath;
    }
    addComponent(answers, config) {
        return component_1.default.add(answers, Object.assign({ root: this.client }, config));
    }
    addPage(answers, config) {
        return page_1.default.add(answers, Object.assign({ root: this.client }, config));
    }
    removePage(answers, config) {
        return page_1.default.remove(answers, Object.assign({ root: this.client }, config));
    }
    loadPages() {
        const subDirList = new directory_1.default(this.client).dir();
        this.cachePages = subDirList.map((pageName) => {
            return new page_1.default(pageName, this.client, this);
        });
        return this.cachePages;
    }
}
exports.default = Project;
