<template>
    <div>
        <el-table :key='tableKey'
                  :data="list"
                  element-loading-text="loading"
                  v-loading="tableLoading"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%;">
            <el-table-column type="index" width="50"></el-table-column>

            <el-table-column align="center" label="类别名称">
                <template slot-scope="scope">
                    <span>{{scope.row.typeName}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="类别级别">
                <template slot-scope="scope">
                    <span>{{scope.row.typeLevel === 1 ? `顶级类别` : `子级类别`}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="类别值">
                <template slot-scope="scope">
                    <span>{{scope.row.value}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" width="200" label="创建时间">
                <template slot-scope="scope">
                    <span>{{changTime( scope.row.create )}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作"
                             width="280"
                             class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="primary"
                               @click="handleEdit(scope.row)">编辑</el-button>
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
            <el-button type="primary"
                       style="position: absolute;right: 40px;top: 0;"
                       @click="articleTypeDialogShow">添加</el-button>
        </div>

        <el-dialog :title="articleTypeDialogTitle"
                   append-to-body
                   :visible.sync="articleTypeDialog">
            <el-form :rules="rules"
                     :ref="`form`"
                     :model="form"
                     label-position="left"
                     label-width="90px"
                     style='width: 400px; margin-left:50px;'>
                <el-form-item label="类别名称"
                              prop="typeName">
                    <el-input v-model="form.typeName"></el-input>
                </el-form-item>
                <el-form-item label="类别类型" prop="typeLevel">
                    <el-radio v-model="form.typeLevel"
                              :disabled="articleTypeDialogTitle === '修改类别'"
                              @change="typeLevelChange"
                              :label="1">一级类别</el-radio>
                    <el-radio v-model="form.typeLevel"
                              :disabled="articleTypeDialogTitle === '修改类别'"
                              @change="typeLevelChange"
                              :label="2">二级类别</el-radio>
                </el-form-item>
                <el-form-item label="父级类别" prop="upperType">
                    <el-select v-model="form.upperType"
                               :disabled="upperTypeDisable"
                               placeholder="请选择类型">
                        <el-option v-for="menu in typesData"
                                   :label="menu.typeName"
                                   :key="menu._id"
                                   :value="menu.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类别路径" prop="typePath">
                    <el-input v-model="form.typePath"></el-input>
                </el-form-item>
                <el-form-item label="排序"
                              v-if="form.typeLevel === 1
                                && typesData.length
                                    && articleTypeDialogTitle === '修改类别'"
                              prop="typeSort">
                    <el-select v-model="form.typeSort"
                               placeholder="请选择类型">
                        <el-option v-for="( sort, index ) in typesData"
                                   :label="index + 1"
                                   :key="sort.value"
                                   :value="index + 1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序"
                              v-if="form.typeLevel === 1
                                && typesData.length
                                    && articleTypeDialogTitle === '新增类别'"
                              prop="typeSort">
                    <el-select v-model="form.typeSort"
                               placeholder="请选择类型">
                        <el-option v-for="( sort, index ) in typesData.length + 1"
                                   :label="sort"
                                   :key="index"
                                   :value="sort"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="articleTypeDialog = false">取 消</el-button>
                <el-button @click="handleAdd"
                           v-if="articleTypeDialogTitle === '新增类别'"
                           type="primary">确 定</el-button>
                <el-button @click="handleEditSubmit"
                           v-else
                           type="primary">修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { addTypes, getTypeListPage, getFirstTypeList, delType, updateType } from "@/api/type" ;

    export default {
        name: "article-type-manager",
        data() {
            return {
                articleTypeDialogTitle: '',
                tableKey: 0,
                list: [],
                tableLoading: false,
                listQuery: {
                    pageSize: 10,
                    pageNum: 1
                },
                articleTypeDialog: false,
                rules: {
                    typeName: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
                    typeLevel: [{ required: true, message: '请选择类别等级', trigger: 'blur' }],
                    upperType: [{ required: false, message: '请选择父级类别', trigger: 'blur' }],
                    typePath: [{ required: true, message: '请输入类别路径', trigger: 'blur' }]
                },
                form: {
                    typeName: '',
                    typeLevel: 1,
                    upperType: '',
                    typePath: '',
                    typeSort: ''
                },
                upperTypeDisable: true,
                typesData: [],
                total: 0,
            }
        },
        methods: {
            handleEditSubmit() {
                this.$refs[`form`].validate((valid) => {
                    if (valid) {
                        updateType( this.form )
                            .then( res => {
                                const { status } = res ;
                                if ( status === 0 ) {
                                    this.$message( {
                                        message: '修改成功',
                                        type: 'success'
                                    } ) ;
                                    this.articleTypeDialog = false ;
                                    this.getAllUpperTypeList() ;
                                    this.getDataList() ;
                                }
                            } )
                    } else {
                        return false ;
                    }
                }) ;
            },
            getAllUpperTypeList() {
                getFirstTypeList( {} ).then( res => {
                    const { status, data } = res ;
                    if ( status === 0 ) {
                        this.typesData = data ;
                    }
                } )
            },
            handleEdit( row ) {
                this.articleTypeDialogTitle = `修改类别` ;
                this.form = row ;
                this.upperTypeDisable = this.form.typeLevel === 1 ;
                if ( this.form.typeLevel === 1 ) {
                    this.form.upperType = '' ;
                    this.rules.upperType[ 0 ].required = false ;
                } else {
                    this.rules.upperType[ 0 ].required = true ;
                }
                if ( this.form.typeSort === 0 ) {
                    this.form.typeSort = '' ;
                }
                this.articleTypeDialog = true ;
                this.$nextTick( () => {
                    this.$refs[ `form` ].clearValidate() ;
                } )
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
            },
            resetForm() {
                this.form = {
                    typeName: '',
                    typeLevel: 1,
                    upperType: '',
                    typePath: '',
                    typeSort: ''
                } ;
                this.rules.upperType[ 0 ].required = false ;
            },
            articleTypeDialogShow() {
                this.resetForm() ;
                this.articleTypeDialogTitle = `新增类别` ;
                this.upperTypeDisable = true ;
                this.articleTypeDialog = true ;
                this.$nextTick( () => {
                    this.$refs[ `form` ].clearValidate() ;
                } )
            },
            handleAdd() {
                this.$refs[`form`].validate((valid) => {
                    if (valid) {
                        addTypes( this.form )
                            .then( res => {
                                const { status } = res ;
                                if ( status === 0 ) {
                                    this.$message( {
                                        message: '新增成功',
                                        type: 'success'
                                    } ) ;
                                    this.articleTypeDialog = false ;
                                    this.getAllUpperTypeList() ;
                                    this.getDataList() ;
                                }
                            } )
                    } else {
                        return false ;
                    }
                }) ;
            },
            handleDelete( row ){
                const _this = this
                _this.$confirm(`确定要删除吗`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    delType( { id: row._id } ).then( res => {
                        const { status } = res ;
                        if ( status === 0 ) {
                            this.$message( {
                                message: '成功删除',
                                type: 'success'
                            } ) ;
                            this.getAllUpperTypeList() ;
                            this.getDataList() ;
                        }
                    } )
                } )
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val ;
                this.getDataList()
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val ;
                this.getDataList()
            },
            getDataList() {
                this.tableLoading = true ;
                getTypeListPage( this.listQuery )
                    .then( res => {
                        const { status, data, total } = res ;
                        if ( status === 0 ) {
                            this.total = total ;
                            this.list = data ;
                            this.tableLoading = false ;
                        }
                    } )
            },
            typeLevelChange( typeLevel ) {
                typeLevel = typeLevel === 1 ;
                this.upperTypeDisable = typeLevel ;
                if ( typeLevel ) {
                    this.rules.upperType[ 0 ].required = false ;
                } else {
                    this.rules.upperType[ 0 ].required = true ;
                }
            }
        },
        created() {
            this.getAllUpperTypeList() ;
            this.getDataList() ;
        }
    }
</script>

<style scoped>

</style>
