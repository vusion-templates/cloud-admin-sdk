"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.Service = exports.Module = exports.Page = exports.Project = void 0;
const project_1 = __importDefault(require("./meta/project"));
exports.Project = project_1.default;
const page_1 = __importDefault(require("./meta/page"));
exports.Page = page_1.default;
const module_1 = __importDefault(require("./meta/module"));
exports.Module = module_1.default;
const module_2 = __importDefault(require("./meta/module"));
exports.Service = module_2.default;
const component_1 = __importDefault(require("./meta/component"));
exports.Component = component_1.default;
