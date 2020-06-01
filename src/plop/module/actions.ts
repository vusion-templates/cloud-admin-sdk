import * as path from 'path';
import * as fs from 'fs-extra';
import { fixSlash, getModuleOrder, setModuleOrder, templatePath } from '../../utils';
import { Layout } from '../../meta/module/config';

export default {
    add(answers, root: string): Array<Function|object|string> {
        const base = path.join(templatePath, 'module');
        const pagePath = path.join(root, './src/views', answers.page);
        return [
            function(): void|Error {
                if (!answers.name) {
                    throw new Error('name 为空');
                } else if (!Layout[answers.layout]) {
                    throw new Error('layout 设置错误');
                }
            },
            {
                type: 'addMany',
                destination: fixSlash(path.join(pagePath, answers.name)),
                base: fixSlash(base),
                templateFiles: fixSlash(base + '/**'),
            },
            function (): void {
                const modulesOrder = getModuleOrder(pagePath);
                if (modulesOrder) {
                    if (modulesOrder[answers.layout])
                        modulesOrder[answers.layout].push(answers.name);
                    modulesOrder.normal.push(answers.name);
                    setModuleOrder(pagePath, modulesOrder);
                }
            },
        ];
    },
    remove(answers, root: string): Array<Function|object|string> {
        const viewsRoot = path.join(root, './src/views');
        const pagePath = path.join(viewsRoot, answers.page);
        const dest = path.join(pagePath, answers.name);

        return [
            function (): void {
                fs.removeSync(dest);
                const modulesOrder = getModuleOrder(pagePath);
                if (modulesOrder) {
                    Object.keys(modulesOrder).forEach((key) => {
                        const indexOf = modulesOrder[key].indexOf(answers.name);
                        ~indexOf && modulesOrder[key].splice(indexOf, 1);
                    });
                    setModuleOrder(pagePath, modulesOrder);
                }
            },
        ];
    }
}