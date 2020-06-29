"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../service"));
const utils_1 = __importDefault(require("../utils"));
const common_1 = require("../common");
const tree_1 = __importDefault(require("../common/tree"));
const directory_1 = __importDefault(require("../common/directory"));
class Module extends tree_1.default {
    constructor(name, root, parent) {
        super(name, root, common_1.LEVEL_ENUM.module, parent);
    }
    loadServices() {
        const currentPath = this.fullPath;
        const directory = new directory_1.default(currentPath);
        this.cacheServices = directory.dir().map((moduleName) => {
            return new service_1.default(moduleName, currentPath, this);
        });
        return this.cacheServices;
    }
    addService(answers) {
        return service_1.default.add(Object.assign({ root: this.fullPath, name: this.name }, answers));
    }
    removeService(answers) {
        return service_1.default.remove(Object.assign({ root: this.fullPath, name: this.name }, answers));
    }
    static add(answers, config) {
        const plop = utils_1.default.getPlop(config);
        return plop.getGenerator('add-module').runActions(answers);
    }
    static remove(answers, config) {
        const plop = utils_1.default.getPlop(config);
        return plop.getGenerator('remove-module').runActions(answers);
    }
    renameService(oldName, newName) {
        let hasNew = false;
        let hasOld = false;
        this.loadServices().forEach((service) => {
            if (service.name === newName) {
                hasNew = true;
            }
            if (service.name === oldName) {
                hasOld = true;
            }
        });
        if (!hasOld) {
            throw new Error(`not found service:${newName}`);
        }
        if (hasNew) {
            throw new Error(`service:${newName} already exists`);
        }
        const service = new service_1.default(oldName, this.fullPath, this);
        service.rename(newName);
        this.loadServices();
    }
}
exports.default = Module;
