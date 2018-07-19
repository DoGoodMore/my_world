<template>
    <div class="">
        <el-table :key='tableKey'
                  :data="list"
                  element-loading-text="loading"
                  v-loading="tableLoading"
                  :row-class-name="isFinishClassName"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%;">
            <el-table-column type="index"></el-table-column>

            <el-table-column align="center"
                             label="事项标题">
                <template slot-scope="scope">
                    <span>{{scope.row.todoTitle}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center"
                             label="当前状态">
                <template slot-scope="scope">
                    <el-tag type="success"
                            v-if="scope.row.isFinish">已完成</el-tag>
                    <el-tag type="warning"
                            v-else>未完成</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="计划完成时间">
                <template slot-scope="scope">
                    <span>{{ changTime(scope.row.finishDate, true) }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" width="350" label="待办内容">
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
                               v-if="!scope.row.isFinish"
                               @click="finishTodo( scope.row )">完成</el-button>
                    <el-button size="mini"
                               type="success"
                               v-if="!scope.row.isFinish"
                               @click="updateTodo( scope.row )">编辑</el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="handleDelete( scope.row )">删除</el-button>
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
            <el-button type="primary"
                       style="position: absolute;right: 40px;top: 0;"
                       @click="showDialog">添加</el-button>
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

        <el-dialog :title="todoDialogTitle"
                   custom-class="todo-dialog"
                   append-to-body
                   center
                   width="30%"
                   :visible.sync="todoDialog">
            <el-form :rules="rules"
                     :ref="`form`"
                     :model="form"
                     label-position="left"
                     label-width="25%"
                     style='width:100%;;padding-bottom: 0;'>
                <el-form-item label="待办类型"
                              prop="todoType">
                    <el-input v-model="form.todoType"></el-input>
                </el-form-item>
                <el-form-item label="事项标题" prop="todoTitle">
                    <el-input v-model="form.todoTitle"></el-input>
                </el-form-item>
                <el-form-item label="计划日期" prop="finishDate">
                    <el-date-picker v-model="form.finishDate"
                                    type="date"
                                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="待办内容" prop="content">
                    <el-input v-model="form.content"
                              :rows="4"
                              type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="todoDialog = false">取 消</el-button>
                <el-button @click="handleAdd"
                           v-if="todoDialogTitle === '新增待办事项'"
                           type="primary">确 定</el-button>
                <el-button @click="handleEditSubmit"
                           v-else
                           type="primary">修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { updateArticleHot } from "@/api/article" ;
    import { lookMessage } from "@/api/message" ;
    import { addTodo, getTodosPage, finishTodo, deleteTodo, updateTodo } from "@/api/todos" ;
    export default {
        name: "message-manager",
        data() {
            return {
                form: {
                    todoTitle: '',
                    todoType: '',
                    finishDate: '',
                    content: ''
                },
                todoDialogTitle: '新增待办事项',
                todoDialog: false,
                list: [],
                tableLoading: false,
                tableKey: 0,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    isFinish: false
                },
                total: 0,
                messageDetailDialogVisible: false,
                messageInfo: {},
                rules: {
                    todoTitle: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                    todoType: [{ required: true, message: '请输入待办事项的类型', trigger: 'blur' }],
                    finishDate: [{ required: true, message: '请选择计划完成的日期', trigger: 'blur' }],
                    content: [{ required: true, message: '请输入待办的具体内容', trigger: 'blur' }]
                }
            }
        },
        methods: {
            finishTodo( row ) {
                this.tableLoading = true ;
                finishTodo( { _id: row._id } ).then( res => {
                    const { status } = res ;
                    if ( status === 0 ) {
                        this.$message( {
                            message: '操作成功',
                            type: 'success'
                        } )
                    }
                    this.getList() ;
                } ) ;
            },
            updateTodo( row ) {
                this.todoDialogTitle = '修改待办事项' ;
                this.form = Object.assign( this.form, row ) ;
                this.todoDialog = true ;
                this.$nextTick( () => {
                    this.$refs[ `form` ].clearValidate() ;
                } )
            },
            showDialog() {
                this.todoDialogTitle = '新增待办事项' ;
                this.todoDialog = true ;
                this.$nextTick( () => {
                    this.$refs[ `form` ].resetFields() ;
                } )
            },
            handleAdd() {
                this.$refs[`form`].validate((valid) => {
                    if (valid) {
                        //todo: 对用户输入的内容进行正则验证
                        addTodo( this.form ).then( res => {
                            const { status } = res ;
                            if ( status === 0 ) {
                                this.$message( {
                                    message: '添加成功',
                                    type: 'success'
                                } ) ;
                                this.getList() ;
                                this.todoDialog = false ;
                            }
                        } )
                    }
                });
            },
            handleEditSubmit() {
                this.$refs[`form`].validate((valid) => {
                    if (valid) {
                        this.tableLoading = true ;
                        updateTodo( this.form ).then( res => {
                            const { status } = res ;
                            if ( status === 0 ) {
                                this.$message( {
                                    message: '更新成功',
                                    type: 'success'
                                } ) ;
                                this.getList() ;
                                this.todoDialog = false ;
                            }
                        } )
                    }
                });
            },
            isFinishClassName( scope ) {
                return scope.row[ `isFinish` ] ? '' : 'no-finish'
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
                getTodosPage( this.listQuery ).then( res => {
                    const { status, data, total } = res ;
                    if ( status === 0 ) {
                        this.list = data ;
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
                    deleteTodo( { _id: row._id } ).then( res => {
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
    .no-finish {
        background: oldlace!important;
    }
    .todo-dialog .el-dialog__body {
        padding-bottom: 0px;
    }
</style>
