import Project from '../meta/project';
import File from '../meta/common/file';
import * as fs from 'fs-extra';
import * as path from 'path';
export interface Command {
    [prop: string]: any;
}
const getName = function(dir): string {
    const packagePath = path.join(dir, 'package.json');
    let name = path.basename(dir);
    if (fs.existsSync(packagePath)) {
        name = new File(packagePath).loadJSON().name; 
    }
    return name;
}
export default function(root: string): Command {
    const project = new Project(getName(root), root);
    return {
        pages(answers) {
            return [];
        },
        'page.add'(answers): ReturnType<typeof project.addPage> {
            return project.addPage({
                name: answers.name,
                title: answers.title,
                layout: answers.layout,
            });
        },
        'page.remove'(answers): ReturnType<typeof project.removePage> {
            return project.removePage({
                name: answers.name,
            });
        }
    };
}