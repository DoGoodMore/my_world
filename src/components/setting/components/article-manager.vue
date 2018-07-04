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
                             width="280"
                             class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="success"
                               @click="$router.push( `/home/edit-article?id=${scope.row._id}` )">编辑</el-button>
                    <el-button size="mini"
                               v-if="!scope.row.hot"
                               type="success"
                               @click="handleAddHot(scope.row)">添加热门</el-button>
                    <el-button size="mini"
                               v-else
                               type="warning"
                               @click="handleAddHot(scope.row)">删除热门</el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container"
             style="text-align: center;margin-top: 20px;position: relative;">
            <el-pagination background
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="listQuery.pageNum"
                           :page-sizes="[10,20,30,50]"
                           :page-size="listQuery.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import { getArticleListPage, delArticle, updateArticleHot } from "@/api/article";
    export default {
        name: "article-manager",
        data() {
            return {
                list: [],
                tableLoading: false,
                tableKey: 0,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10
                },
                total: 0
            }
        },
        methods: {
            handleSizeChange(val) {
                this.listQuery.pageSize = val ;
                this.getList() ;
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val ;
                this.getList() ;
            },
            getList() {
                this.tableLoading = true ;
                getArticleListPage( this.listQuery ).then( res => {
                    const { status, data, total } = res ;
                    if ( status === 0 ) {
                        this.list = data ;
                        this.total = total ;
                        this.tableLoading = false ;
                    }
                } ).catch( err => console.log( err ) )
            },
            handleAddHot( row ) {
                updateArticleHot( { _id: row._id, hot: !row.hot } ).then( res => {
                    const { status } = res ;
                    if ( status === 0 ) {
                        this.$message( {
                            message: '操作成功',
                            type: 'success'
                        } ) ;
                        this.getList() ;
                    }
                } )
            },
            handleDelete( row ) {
                const _this = this ;
                _this.$confirm(`确定要删除吗`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    delArticle( { _id: row._id } ).then( res => {
                        const { status } = res ;
                        if ( status === 0 ) {
                            this.$message( {
                                message: '操作成功',
                                type: 'success'
                            } ) ;
                            this.getList() ;
                        }
                    } )
                } ).catch( () => {} )
            },
            changTime(time, day) {
                if (!time) {
                    return '暂无数据'
                }
                const testTime = new Date( time ) ;
                const year = testTime.getFullYear() ;
                const month = testTime.getMonth() + 1 ;
                const date = testTime.getDate() ;
                const hour = testTime.getHours() ;
                const minutes = testTime.getMinutes() ;
                const seconds = testTime.getSeconds() ;
                return day ? `${year}年${month}月${date}日` : `${year}年${month}月${date}日-${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
            }
        },
        created() {
            this.getList() ;
        }
    }
</script>

<style scoped>

</style>
