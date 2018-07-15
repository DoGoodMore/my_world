<template>
    <div class="">
        <el-table :key='tableKey'
                  :data="list"
                  element-loading-text="loading"
                  v-loading="tableLoading"
                  :row-class-name="isReadClassName"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%;">
            <el-table-column type="index"></el-table-column>

            <el-table-column align="center" label="发送人">
                <template slot-scope="scope">
                    <span>{{scope.row.username}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" width="200" label="发送时间">
                <template slot-scope="scope">
                    <span>{{scope.row.sendTime}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" width="500" label="发送内容">
                <template slot-scope="scope">
                    <span class="message-content">{{scope.row.content}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作"
                             width="280"
                             class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="success"
                               @click="lookDetailMessage( scope.row )">查看</el-button>
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

        <el-dialog title="提示"
                   append-to-body
                   :visible.sync="messageDetailDialogVisible"
                   width="30%"
                   center>
            <el-form :label-position="`left`"
                     label-width="80px"
                     :model="messageInfo">
                <el-form-item label="发送人">
                    <el-input disabled
                              v-model="messageInfo.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址">
                    <el-input disabled
                              v-model="messageInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="发送时间">
                    <el-input disabled
                              v-model="messageInfo.sendTime"></el-input>
                </el-form-item>
                <el-form-item label="发送内容">
                    <el-input disabled
                              type="textarea"
                              resize="vertical"
                              rows="5"
                              v-model="messageInfo.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="messageDetailDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="messageDetailDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { updateArticleHot } from "@/api/article" ;
    import { getMessagePage, deleteMessage, lookMessage } from "@/api/message" ;
    export default {
        name: "message-manager",
        data() {
            return {
                list: [],
                tableLoading: false,
                tableKey: 0,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10
                },
                total: 0,
                messageDetailDialogVisible: false,
                messageInfo: {}
            }
        },
        methods: {
            lookDetailMessage( row ) {
                this.messageInfo = row ;
                if ( !row[ `isRead` ] ) {
                    lookMessage( { id: row._id } ).then( res => {
                        const { status } = res ;
                        if ( status === 0 ) this.getList() ;
                    } )
                }
                this.messageDetailDialogVisible = true ;
            },
            isReadClassName( scope ) {
                return scope.row[ `isRead` ] ? '' : 'no-read'
            },
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
                getMessagePage( this.listQuery ).then( res => {
                    const { status, data, total } = res ;
                    if ( status === 0 ) {
                        this.list = data ;
                        if ( this.list && this.list.length ) {
                            this.list.map( item => {
                                item.sendTime = this.changTime( item.sendTime ) ;
                            } )
                        }
                        this.total = total ;
                        this.tableLoading = false ;
                    }
                } ).catch( err => console.log( err ) )
            },
            handleDelete( row ) {
                const _this = this ;
                _this.$confirm(`确定要删除吗`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    deleteMessage( { id: row._id } ).then( res => {
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

<style>
.message-content {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.no-read {
    background: oldlace!important;
}
</style>
