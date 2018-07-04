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
                       @click="articleTypeDialog = true ">添加</el-button>
        </div>

        <el-dialog title="新增类别"
                   :visible.sync="articleTypeDialog">
            <el-form :rules="rules"
                     ref="`form`"
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
                              :label="true">一级类别</el-radio>
                    <el-radio v-model="form.typeLevel"
                              :label="false">二级类别</el-radio>
                </el-form-item>
                <el-form-item label="父级类别" prop="upperType">
                    <el-select v-model="form.upperType"
                               :disabled="upperTypeDisable"
                               placeholder="请选择类型">
                        <el-option v-for="menu in typesData"
                                   :label="menu.label"
                                   :key="menu._id"
                                   :value="menu.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类别路径" prop="typePath">
                    <el-input v-model="form.typePath"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="articleTypeDialog = false">取 消</el-button>
                <el-button @click="handleAdd">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "article-type-manager",
        data() {
            return {
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
                    upperType: [{ required: true, message: '请选择父级类别', trigger: 'blur' }],
                    typePath: [{ required: true, message: '请输入类别路径', trigger: 'blur' }]
                },
                form: {
                    typeName: '',
                    typeLevel: true,
                    upperType: '',
                    typePath: ''
                },
                upperTypeDisable: true,
                typesData: []
            }
        },
        methods: {
            handleDelete( row ){

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

            }
        }
    }
</script>

<style scoped>

</style>
