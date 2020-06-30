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
const service_1 = __importDefault(require("../service"));
const utils_1 = __importDefault(require("../utils"));
const path = __importStar(require("path"));
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
        return path.join(this.root, this.page, this.name);
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
