import config from './module/base';
import routes from './routes.map.js?scopeName={{ name }}';
export default {
    config,
    routes,
    services: require.context('./', true, /\/service\/(.*?)\.js$/),
};
