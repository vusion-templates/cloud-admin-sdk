<template>
    <u-linear-layout direction="vertical">
        <u-linear-layout>
            {{ title }}模块的列表页。
        </u-linear-layout>
        <u-linear-layout>
            <u-button color="primary" icon="create" to="/{{ name }}/create">创建{{ title }}</u-button>
            <u-button square icon="refresh" @click="$refs.tableView.reload()"></u-button>
        </u-linear-layout>
        <u-table-view ref="tableView" :data-source="$services.{{name}}.default.loadList">
            <u-table-view-column type="checkbox" width="8%"></u-table-view-column>
            <u-table-view-column title="名称">
                <template slot="cell" slot-scope="{ item }">
                    名称
                </template>
            </u-table-view-column>
            <u-table-view-column title="操作">
                <template slot="cell" slot-scope="scope">
                    <u-linear-layout>
                        <u-link :to="{ path: '/{{ name }}/detail', query: {id: scope.item.id}}">
                            查看详情
                        </u-link>
                    </u-linear-layout>
                </template>
            </u-table-view-column>
        </u-table-view>
    </u-linear-layout>
</template>

<script>
export default {
    data() {
        return {

        };
    },
};
</script>
<style module>
.root {}
</style>
