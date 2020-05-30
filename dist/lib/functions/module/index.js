"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../service"));
const utils_1 = __importDefault(require("../utils"));
const path_1 = __importDefault(require("path"));
class Module {
    constructor(name, page, root, parent) {
        this.name = name;
        this.page = page;
        this.root = root;
        if (parent) {
            this.parent = parent;
        }
    }
    getFullPath() {
        return path_1.default.join(this.root, this.page, this.name);
    }
    addService(answers) {
        return service_1.default.add(Object.assign({ root: this.root, page: this.page, module: this.name }, answers));
    }
    removeService(answers) {
        return service_1.default.remove(Object.assign({ root: this.root, page: this.page, module: this.name }, answers));
    }
    static add(answers, config) {
        const plop = utils_1.default.getPlop(config);
        return plop.getGenerator('add-module').runActions(answers);
    }
    static remove(answers, config) {
        const plop = utils_1.default.getPlop(config);
        return plop.getGenerator('remove-module').runActions(answers);
    }
}
exports.default = Module;
