import Project from '../meta/project';
export interface Command {
    [prop: string]: any;
}
export default function(root: string): Command {
    const project = new Project(root);
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