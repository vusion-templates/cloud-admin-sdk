import * as path from 'path';
import * as fs from 'fs-extra';
import chalk = require('chalk');
import actions from './actions';

export default function(plop): any {
    const dest = plop.getDestBasePath();
    const viewsRoot = path.join(dest, './src/views');
    return {
    prompts: [
        {
            type: 'list',
            name: 'page',
            required: true,
            message: '请选择模块所在的入口页',
            choices(): string[] {
                const pages = [];
                fs.readdirSync(viewsRoot).forEach((innerDir) => {
                    const stat = fs.statSync(path.resolve(viewsRoot, innerDir));
                    if (stat.isDirectory()) {
                        pages.push(innerDir);
                    }
                });
                return pages;
            },
        },
        {
            type: 'list',
            name: 'name',
            required: true,
            message: '请选择要删除的模块',
            choices(answers): string[] {
                const modules = [];
                const pagePath = path.join(viewsRoot, answers.page);
                fs.readdirSync(pagePath).forEach((innerDir) => {
                    const stat = fs.statSync(path.resolve(pagePath, innerDir));
                    if (stat.isDirectory()) {
                        modules.push(innerDir);
                    }
                });
                return modules;
            },
        },
    ],
    actions(answers): ReturnType<typeof actions.remove>  {

        const name = chalk.blue(answers.name);

        return [
            ...actions.remove(answers, dest),
            [
                `模块 ${name} 已经被删除。`,
            ].join('\n'),
        ];
    },
};
}
