import fs from 'fs';
import path from 'path';
export default {
    loadPages: function (root) {
        return JSON.parse(fs.readFileSync(path.join(root, './pages.json')).toString());
    },
    setPages: function (root, pages, pageInfo) {
        var name = pageInfo.name, title = pageInfo.title;
        pages[name] = {
            entry: "./src/views/" + name + "/index.js",
            template: "./src/pages/" + name + ".html",
            filename: name + ".html",
            favicon: './src/pages/favicon.ico',
            title: title,
            inject: true,
            chunks: [
                'chunk-vendors',
                name,
            ],
            chunksSortMode: 'manual',
        };
        fs.writeFileSync(path.join(root, './pages.json'), JSON.stringify(pages, null, 4));
    },
    addHtml: function (root, pageInfo) {
        var name = pageInfo.name, title = pageInfo.title;
        path.join(root, './src/pages', name + '.html');
    }
};
