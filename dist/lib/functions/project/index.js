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
const path = __importStar(require("path"));
class Project {
    constructor(root) {
        this.root = root;
    }
    getFullPath() {
        return path.join(this.root);
    }
    addComponent(answers, config) {
        return component_1.default.add(answers, Object.assign({ root: this.root }, config));
    }
    addPage(answers, config) {
        return page_1.default.add(answers, Object.assign({ root: this.root }, config));
    }
    removePage(answers, config) {
        return page_1.default.remove(answers, Object.assign({ root: this.root }, config));
    }
    getPage(page) {
        return new page_1.default(page, this.root, this);
    }
    getPages(page) {
        return [new page_1.default(page, this.root, this)];
    }
}
exports.default = Project;
