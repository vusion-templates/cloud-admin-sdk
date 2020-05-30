"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = __importDefault(require("../module"));
const utils_1 = __importDefault(require("../utils"));
const path_1 = __importDefault(require("path"));
class Page {
    constructor(name, root, parent) {
        this.name = name;
        this.root = root;
        if (parent) {
            this.parent = parent;
        }
    }
    getFullPath() {
        return path_1.default.join(this.root, this.name);
    }
    addModule(answers, config) {
        answers.page = this.name;
        return module_1.default.add(answers, Object.assign({ root: this.root }, config));
    }
    removeModule(answers, config) {
        answers.page = this.name;
        return module_1.default.remove(answers, Object.assign({ root: this.root }, config));
    }
    getModule(module) {
        return new module_1.default(module, this.name, this.root, this);
    }
    getModules(module) {
        return [new module_1.default(module, this.name, this.root)];
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
