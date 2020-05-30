"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("./page"));
class Project {
    constructor(root) {
        this.root = root;
    }
    addPage(answers, config) {
        return page_1.default.add(answers, Object.assign({ root: this.root }, config));
    }
    removePage(answers, config) {
        return page_1.default.remove(answers, Object.assign({ root: this.root }, config));
    }
    getPage(page) {
        return new page_1.default(page, this.root);
    }
    getPages(page) {
        return [new page_1.default(page, this.root)];
    }
}
exports.default = Project;
