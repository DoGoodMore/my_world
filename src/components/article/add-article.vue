<template>
    <div class="components-container">
        <!--
                 :rules="rules"-->
        <el-form :label-position="`left`"
                 label-width="100px"
                 :model="form">
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"
                          placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tag">
                <el-select v-model="form.tags"
                           style="width: 100%;"
                           multiple
                           placeholder="请选择对应标签">
                    <el-option
                        v-for="(item, index) in tagsList"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片" prop="poster">
                <el-upload
                    :before-upload="beforeUpload"
                    :file-list="fileList"
                    :on-change="changeImgList"
                    action="http://172.16.28.97:3001/posts"
                    accept="image/*"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :http-request="uploadHttpRequest"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input type="textarea"
                          rows="6"
                          placeholder="请输入描述文字"
                          v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <div>
                    <tinymce :height="300" v-model="form.content"></tinymce>
                </div>
            </el-form-item>
            <el-form-item label="" prop="review">
                <div class="editor-content" v-html="form.content"></div>
            </el-form-item>
            <el-form-item label="" prop="add">
                <el-button type="primary" @click="addArticleSubmit">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Tinymce from '@/components/Tinymce'
    import { addImg } from '@/api/article'
    export default {
        name: 'tinymce-demo',
        components: { Tinymce },
        data() {
            return {
                tagsList: [
                    {
                        label: 'Javascript',
                        value: '1'
                    },
                    {
                        label: 'Node',
                        value: '2'
                    }
                ],
                fileList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                form: {
                    description: '',
                    tags: [],
                    content: ``,
                    title: ``,
                    imgFile: '',
                    fileType: ''
                }
            }
        },
        methods: {
            addArticleSubmit() {
                console.log( this.form )
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url ;
                this.dialogVisible = true ;
            },
            changeImgList( _, __ ) {
                this.$set( this, `fileList`, __ ) ;
            },
            beforeUpload() {
                console.log( this.fileList.length )
                if ( this.fileList.length - 1 ) {
                    this.$message( {
                        message: '封面图片只能上传一张...',
                        type: "error"
                    } )
                    return false
                }
            },
            uploadHttpRequest( option ) {
                const _this = this
                const { file } = option
                return new Promise(function(resolve, reject) {
                    _this.parseBase64(file).then(result => {
                        _this.form.imgFile = result ? result.split(';')[1].split(',')[1] : ''
                        _this.form.fileType = file.type
                        addImg(_this.form).then(response => {
                            resolve()
                        }).catch(() => {
                            reject()
                        })
                    })
                })
            },
            parseBase64(file) {
                return new Promise(function(resolve, reject) {
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onload = function() {
                        resolve(this.result)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .editor-content{
        margin-top: 20px;
    }
</style>


