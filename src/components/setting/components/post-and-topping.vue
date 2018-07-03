<template>
    <div class="">
        <el-form :label-position="`left`"
                 label-width="100px"
                 :ref="`formPost`"
                 :rules="rulesPost"
                 :model="formPost">
            <el-form-item label="公告内容" prop="post">
                <el-input type="textarea"
                          rows="8"
                          maxlength="80"
                          placeholder="请输入网站公告内容, 最多不超过200个字"
                          v-model="formPost.post"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="changePostSend"
                           type="primary">确定</el-button>
                <el-button @click="formPost.post = ''"
                           type="primary">清空</el-button>
                <el-button @click="resetFormPost"
                           type="primary">还原</el-button>
            </el-form-item>
        </el-form>
        <el-form :label-position="`left`"
                 label-width="100px"
                 :ref="`formTopping`"
                 :rules="rulesTopping"
                 :model="formTopping">
            <el-form-item label="置顶内容" prop="Topping">
                <el-input type="textarea"
                          rows="8"
                          maxlength="50"
                          placeholder="请输入网站置顶内容, 最多不超过150个字"
                          v-model="formTopping.Topping"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="changeToppingSend"
                           type="primary">确定</el-button>
                <el-button @click="formTopping.Topping = ''"
                           type="primary">清空</el-button>
                <el-button @click="resetFormTopping"
                           type="primary">还原</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { getFileInfo, changePostFile, changeToppingFile } from "@/api/common" ;

    export default {
        name: "post-and-topping",
        data() {
            return {
                rulesPost: {
                    post: [ { required: true, message: '公告内容不能为空', trigger: 'blur' } ]
                },
                formPost: {
                    post: ''
                },
                rulesTopping: {
                    Topping: [ { required: true, message: '置顶内容不能为空', trigger: 'blur' } ]
                },
                formTopping : {
                    Topping: ''
                },
                fileInfo: {}
            }
        },
        methods: {
            changePostSend() {
                this.$refs[ `formPost` ].validate((valid) => {
                    if (valid) {
                        changePostFile( { post: this.formPost.post } ).then( res => {
                            const { status } = res ;
                            if ( status === 0 ) {
                                this.$message( {
                                    message: '修改成功',
                                    type: 'success'
                                } )
                            }
                            getFileInfo( {} ).then( res => {
                                const { status, data } = res ;
                                if ( status === 0 ) this.formPost.post = data.post ;
                            } )
                        } )
                    } else {
                        return false;
                    }
                });
            },
            changeToppingSend() {
                this.$refs[`formTopping`].validate((valid) => {
                    if (valid) {
                        changeToppingFile( { topping: this.formTopping.Topping } ).then( res => {
                            const { status } = res ;
                            if ( status === 0 ) {
                                this.$message( {
                                    message: '修改成功',
                                    type: 'success'
                                } )
                            }
                            getFileInfo( {} ).then( res => {
                                const { status, data } = res ;
                                if ( status === 0 ) this.formTopping.Topping = data[ 'topping' ] ;
                            } )
                        } )
                    } else {
                        return false;
                    }
                });
            },
            resetFormPost() {
                if ( this.fileInfo && ( this.fileInfo.post || this.fileInfo.post === '' ) ) this.formPost.post = this.fileInfo.post ;
            },
            resetFormTopping() {
                if ( this.fileInfo && ( this.fileInfo.topping ||  this.fileInfo.topping === '' ) ) this.formTopping.Topping = this.fileInfo[ `topping` ] ;
            },
            getFileInfo() {
                getFileInfo( {} ).then( res => {
                    const { status, data } = res ;
                    if ( status === 0 ) {
                        this.fileInfo = data ;
                        this.formPost.post = data.post ;
                        this.formTopping.Topping = data[ 'topping' ] ;
                    }
                } )
            }
        },
        created() {
            this.getFileInfo() ;
        }
    }
</script>

<style scoped>

</style>
