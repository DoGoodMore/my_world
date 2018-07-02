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
            <el-table-column align="center" label="内容">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input"
                                  size="small"
                                  v-model="scope.row.label"></el-input>
                    </template>
                    <span v-else>{{scope.row.label}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="背景">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-color-picker v-model="scope.row.background"></el-color-picker>
                    </template>
                    <div v-else>
                        <span>{{scope.row.background}}</span>
                        <span style="display: inline-block;width: 20px;height: 20px;vertical-align: middle;"
                              :style="{ background: scope.row.background }"></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="文字">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-color-picker v-model="scope.row.color"></el-color-picker>
                    </template>
                    <div v-else>
                        <span>{{scope.row.color}}</span>
                        <span style="display: inline-block;width: 20px;height: 20px;vertical-align: middle;"
                              :style="{ background: scope.row.color }"></span>
                    </div>
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
                               v-if="!scope.row.edit"
                               type="success"
                               @click="scope.row.edit = true">编辑</el-button>
                    <el-button size="mini"
                               v-else
                               type="success"
                               @click="handleUpdate(scope.row)">修改</el-button>

                    <el-button size="mini"
                               v-if="scope.row.hot"
                               type="warning"
                               @click="hotTagUpdate( scope.row )">取消热门</el-button>
                    <el-button size="mini"
                               v-else
                               type="success"
                               @click="hotTagUpdate( scope.row )">添加热门</el-button>
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
                       @click="handleAdd">添加</el-button>
        </div>

        <el-dialog title="新增标签" :visible.sync="addTagDialog">
            <el-form :ref="`form`"
                     :model="form"
                     label-position="left"
                     label-width="100px">
                <el-form-item label="名称" prop="label">
                    <el-input style="width: 300px;"
                              placeholder="请输入标签内容"
                              v-model="form.label"></el-input>
                </el-form-item>
                <el-form-item label="背景颜色" prop="background">
                    <el-color-picker v-model="form.background"></el-color-picker>
                </el-form-item>
                <el-form-item label="文字颜色" prop="color">
                    <el-color-picker v-model="form.color"></el-color-picker>
                </el-form-item>
                <el-form-item label="预览" prop="review">
                    <span class="tag-box"
                          v-if="!!form.label"
                          :style="{ background: form.background, color: form.color, borderColor: changeColorToRgb( form.color ) }">{{form.label}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addTagDialog = false">取 消</el-button>
                <el-button type="primary"
                           @click="createNewTag">添 加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { addNewTag, getList, updateTag, delTag, updateHotTags } from '@/api/tags' ;
    export default {
        name: "tag-manager",
        data() {
            return {
                tableLoading: false,
                list: [],
                tableKey: 0,
                total: 0,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10
                },
                addTagDialog: false,
                form: {
                    label: '',
                    background: '#000',
                    color: '#000'
                }
            }
        },
        methods: {
            hotTagUpdate( row ) {
                console.log( row )
                updateHotTags( { _id: row._id, hot: !row.hot } )
                    .then( res => {
                        const { status } = res ;
                        if ( status === 0 ) {
                            this.$message( {
                                message: '操作成功',
                                type: 'success'
                            } ) ;
                            this.getDataList() ;
                        }
                    } )
            },
            handleDelete(row) {
                const _this = this
                _this.$confirm(`确定要删除吗`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    delTag( { _id: row._id } )
                        .then( res => {
                            const { status } = res ;
                            if ( status === 0 ) {
                                this.$message( {
                                    message: '删除成功',
                                    type: 'success'
                                } ) ;
                                this.getDataList() ;
                            }
                        } )
                } )
                    .catch( () => {} )
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
            changeColorToRgb(hex) {
                let color = [], rgb = [];
                hex = hex.replace(/#/,"");

                if (hex.length === 3) { // 处理 "#abc" 成 "#aabbcc"
                    let tmp = [];
                    for (let i = 0; i < 3; i++) {
                        tmp.push(hex.charAt(i) + hex.charAt(i));
                    }
                    hex = tmp.join("");
                }

                for (let i = 0; i < 3; i++) {
                    color[i] = "0x" + hex.substr(i * 2, 2);
                    rgb.push(parseInt( Number( color[ i ] )) );
                }
                return "rgba(" + rgb.join(",") + ", .2)";
            },
            handleAdd() {
                this.handleResetAddTagForm() ;
                this.addTagDialog = true
            },
            handleResetAddTagForm() {
                this.form = Object.assign( this.form, {
                    label: '',
                    background: '#000',
                    color: '#000'
                } )
            },
            handleUpdate(row) {
                updateTag( row )
                    .then( res => {
                        const { status } = res ;
                        if ( status === 0 ) {
                            this.$message( {
                                message: '修改成功',
                                type: 'success'
                            } )
                            this.getDataList() ;
                        }
                    } )
            },
            getDataList() {
                this.tableLoading = true ;
                return getList( this.listQuery )
                    .then( res => {
                        const { status, data, total } = res ;
                        if ( status === 0 ) {
                            this.list = data ;
                            if ( this.list && this.list.length ) {
                                this.list.map( item => {
                                    item.edit = false ;
                                } )
                            }
                            this.total = total ;
                            this.tableLoading = false ;
                        }
                    } )
            },
            createNewTag() {
                if ( !this.form.label ) {
                    this.$message( {
                        message: '请输入文本内容',
                        type: 'error'
                    } )
                    return
                }

                addNewTag( this.form )
                    .then( res => {
                        if ( res.status === 0 ) {
                            this.$message( {
                                message: '操作成功',
                                type: 'success'
                            } ) ;
                            this.getDataList() ;
                            this.addTagDialog = false ;
                        }
                    } )
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.getDataList()
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val
                this.getDataList()
            },
        },
        created() {
            this.getDataList() ;
        }
    }
</script>

<style scoped>
.tag-box {
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    font-size: 12px;
    border-radius: 4px;
    height: 20px;
    padding: 0 5px;
    line-height: 19px;
}
</style>
