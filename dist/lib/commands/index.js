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
const project_1 = __importDefault(require("../meta/project"));
const file_1 = __importDefault(require("../meta/common/file"));
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const getName = function (dir) {
    const packagePath = path.join(dir, 'package.json');
    let name = path.basename(dir);
    if (fs.existsSync(packagePath)) {
        name = new file_1.default(packagePath).loadJSON().name;
    }
    return name;
};
function default_1(root) {
    const project = new project_1.default(getName(root), root);
    return {
        pages(answers) {
            return [];
        },
        'page.add'(answers) {
            return project.addPage({
                name: answers.name,
                title: answers.title,
                layout: answers.layout,
            });
        },
        'page.remove'(answers) {
            return project.removePage({
                name: answers.name,
            });
        }
    };
}
exports.default = default_1;
