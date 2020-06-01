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
// import { PlopConfig } from '../utils';
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const utils_1 = __importDefault(require("../utils"));
const utils_2 = require("../../utils");
class Service {
    constructor(name, module, page, root, parent) {
        this.name = name;
        this.module = module;
        this.page = page;
        this.root = root;
        if (parent) {
            this.parent = parent;
        }
    }
    getFullPath() {
        return path.join(this.root, this.page, this.module, 'service', this.name);
    }
    load() {
        // todo
    }
    save() {
        // todo
    }
    remove() {
        // todo
    }
    static add(answers) {
        const dir = path.join(utils_1.default.getServicePath(answers), answers.name);
        const tplPath = path.resolve(utils_2.templatePath, 'service');
        fs.copySync(tplPath, dir);
        return path.join(dir, 'api.json');
    }
    static remove(answers) {
        const dir = path.join(utils_1.default.getServicePath(answers), answers.name);
        fs.removeSync(dir);
    }
}
exports.default = Service;
