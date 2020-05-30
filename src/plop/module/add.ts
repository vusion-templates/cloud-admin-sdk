import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import {getAppConfig} from '../../utils';
import { Layout } from '../../functions/module/config';
import actions from './actions';

export default function(plop): any {
    const dest = plop.getDestBasePath();
    const viewsRoot = path.join(dest, './src/views');
    const pages = [];
    fs.readdirSync(viewsRoot).forEach((innerDir) => {
        const stat = fs.statSync(path.resolve(viewsRoot, innerDir));
        if (stat.isDirectory()) {
            pages.push(innerDir);
        }
    });
    return {
        prompts: [
            {
                type: 'input',
                name: 'name',
                required: true,
                message: '请输入模块名（将作为文件夹名、路径名等使用）',
                validate(value: string): boolean|string {
                    if (value) { return true; }
                    return '模块名必填';
                },
            },
            {
                type: 'input',
                name: 'title',
                message: '请输入模块标题（可选，用于替换模块中的常见文案）',
            },
            {
                type: 'list',
                name: 'page',
                required: true,
                message: '添加至',
                choices: pages,
                when(): boolean {
                    return pages.length > 1;
                },
            },
            {
                type: 'list',
                name: 'addToSidebar',
                choices: Object.values(Layout),
                default(answers): string {
                    const pagePath = path.join(viewsRoot, answers.page || pages[0]);
                    const appConfig = getAppConfig(pagePath);
                    if (appConfig.layout) {
                        if (Layout[appConfig.layout]) {
                            return Layout[appConfig.layout];
                        }
                    }
                    return 'sidebar';
                },
                message: '是否添加到导航栏',
            },
    ],
    actions(answers): ReturnType<typeof actions.add> {
        answers.page = answers.page || pages[0];
        answers.title = answers.title || answers.name;
        const name = chalk.blue(answers.name);
        answers.layout = Object.keys(Layout)[Object.values(Layout).indexOf(answers.addToSidebar)];
        return [
            ...actions.add(answers, dest),
            [
                `模块 ${name} 已经添加成功。`,
                `需要注意以下几点：`,
                `  模块路径在 ${chalk.yellow(`src/views/${answers.page}/${answers.name}`)}`,
                `  如果要修改模块的排序：${chalk.yellow(`src/views/${answers.page}/modules.order.js`)}`,
                `  如果要修改模块标题和其它配置：${chalk.yellow(`src/views/${answers.page}/${answers.name}/module/base.js`)}`,
            ].join('\n'),
        ];
    },
};
}
    
