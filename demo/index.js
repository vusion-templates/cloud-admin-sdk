const { Project } = require('../dist/lib/index');
const path = require('path');
async function b() {
    const project = new Project(path.join(__dirname, '../../cloud-admin-lite'));
    await project.addPage({
        name: 'aaa',
        title: 'xxx',
        layout: 'sidebar',
    });
    console.log('addPage');
    try {
        const page = await project.getPage('aaa');
        page.addModule({
            name: 'bbb',
            title: 'bbb',
            layout: 'sidebar',
        });
        console.log('addModule');
        await page.removeModule({
            name: 'bbb',
        });
        console.log('removeModule');
        await project.removePage({
            name: 'aaa'
        });
        console.log('removePage');
    } catch (error) {
        console.log(error);
        await project.removePage({
            name: 'aaa'
        });
        console.log('removePage');
    }
    
}
b();

