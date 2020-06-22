export default {
    title: '{{ title }}',
    name: '{{ name }}',
    layout: '{{ layout }}',
    auth: {{ auth }},
    router: {
        defaults: '/overview',
        notFound: '/overview',
        unauthorized: '/overview',
    },
};
