export default {
    title: '{{ title }}',
    name: '{{ name }}',
    layout: '{{ layout }}',
    project: '{{ appName }}',
    auth: {{ auth }},
    router: {
        defaults: '/overview',
        notFound: '/overview',
        unauthorized: '/overview',
    },
};
