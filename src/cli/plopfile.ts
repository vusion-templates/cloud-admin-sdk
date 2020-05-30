import promptDirectory from 'inquirer-directory';
import componentGenerator from '../plop/component/add';
import addPageGenerator from '../plop/page/add';
import removePageGenerator from '../plop/page/remove';
import addModuleGenerator from '../plop/module/add';
import removeModuleGenerator from '../plop/module/remove';

module.exports = function (plop): void {
    plop.setPrompt('directory', promptDirectory);
    plop.setGenerator('global component', componentGenerator(plop));
    plop.setGenerator('add-page', addPageGenerator(plop));
    plop.setGenerator('remove-page', removePageGenerator(plop));
    plop.setGenerator('add-module', addModuleGenerator(plop));
    plop.setGenerator('remove-module', removeModuleGenerator(plop));
};
