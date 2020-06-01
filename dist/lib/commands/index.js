"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = __importDefault(require("../meta/project"));
function default_1(root) {
    const project = new project_1.default(root);
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
