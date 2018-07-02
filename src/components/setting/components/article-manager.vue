<template>
    <div class="">
        <el-table :key='tableKey'
                  :data="list"
                  element-loading-text="loading"
                  v-loading="tableLoading"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%;">
            <el-table-column type="index" width="50"></el-table-column>

            <el-table-column align="center" label="标题">
                <template slot-scope="scope">
                    <span>{{scope.row.title}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="描述">
                <template slot-scope="scope">
                    <span>{{scope.row.description}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="标签列表">
                <template slot-scope="scope">
                    <span>{{scope.row.tags.join( ',' )}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" width="200" label="创建时间">
                <template slot-scope="scope">
                    <span>{{changTime( scope.row.create )}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" width="200" label="更新时间">
                <template slot-scope="scope">
                    <span>{{changTime( scope.row.update )}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作"
                             width="250"
                             class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="danger"
                               @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "article-manager",
        data() {
            return {
                list: [],
                tableLoading: false,
                tableKey: 0
            }
        },
        methods: {
            handleDelete( row ) {

            },
            changTime(time, day) {
                if (!time) {
                    return '暂无数据'
                }
                const testTime = new Date( time )
                const year = testTime.getFullYear()
                const month = testTime.getMonth() + 1
                const date = testTime.getDate()
                const hour = testTime.getHours()
                const minutes = testTime.getMinutes()
                const seconds = testTime.getSeconds()
                return day ? `${year}年${month}月${date}日` : `${year}年${month}月${date}日-${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
            },
        }
    }
</script>

<style scoped>

</style>
