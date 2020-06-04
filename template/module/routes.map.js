export default {
    '': {
        meta: {
            title: '',
            crumb: '{{ title }}',
        },
    },
    'list': {
        first: true,
        meta: {
            title: '{{ title }}列表',
            crumb: '列表',
        },
    },
    'create': {
        meta: {
            title: '创建{{ title }}',
            crumb: '创建',
        },
    },
    'setting': {
        meta: {
            title: '设置{{ title }}',
            crumb: '设置{{ title }}',
        },
    },
    'detail': {
        meta: {
            title: '{{ title }}详情',
            crumb: '{{ title }}详情',
        },
    },
    'detail.info': {
        meta: {
            title: '详细信息',
            crumb: '详细信息',
        },
    },
}