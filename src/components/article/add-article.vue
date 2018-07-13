<template>
    <div class="components-container">
        <!--
                 :rules="rules"-->
        <el-form :label-position="`left`"
                 :ref="`form`"
                 label-width="100px"
                 :rules="rules"
                 :model="form">
            <el-form-item label="类别" prop="type">
                <el-cascader expand-trigger="hover"
                             :options="typeList"
                             :props="typeProps"
                             v-model="form.articleType"
                             @change="handleChangeType">
                </el-cascader>
            </el-form-item>
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"
                          placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tag">
                <el-select v-model="form.tags"
                           style="width: 100%;"
                           filterable
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
                    :before-remove="handleBeforeRemove"
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
            <el-form-item label="是否原创" prop="original">
                <el-radio v-model="form.original"
                          :label="true">是</el-radio>
                <el-radio v-model="form.original"
                          :label="false">否</el-radio>
            </el-form-item>
            <el-form-item v-if="!form.original"
                          label="原作者"
                          prop="fromAuthor">
                <el-input v-model="form.from.author"
                          placeholder="请输入原文作者"></el-input>
            </el-form-item>
            <el-form-item v-if="!form.original"
                          label="来源链接"
                          prop="fromUrl">
                <el-input v-model="form.from.fromUrl"
                          placeholder="请输入原文链接"></el-input>
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
    import { add } from '@/api/article' ;
    import { getAllTags } from "@/api/tags" ;
    import { getAllTypeList } from '@/api/type' ;
    export default {
        name: 'tinymce-demo',
        components: { Tinymce },
        data() {
            return {
                tagsList: [],
                fileList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                form: {
                    description: '',
                    tags: [],
                    content: ``,
                    title: ``,
                    imgFile: ``,
                    fileType: ``,
                    original: true,
                    from: {
                        author: ``,
                        fromUrl: ``
                    },
                    articleType: []
                },
                rules: {
                    description: [
                        { required: true, message: '请输入对应内容', trigger: 'blur' },
                    ],
                    content: [
                        { required: true, message: '请输入对应内容给', trigger: 'blur' },
                    ],
                    title: [
                        { required: true, message: '请输入文章标题', trigger: 'blur' },
                    ],
                    original: [
                        { required: true, message: '请选择是否为原创', trigger: 'blur' }
                    ]
                },
                typeList: [],
                typeProps: {
                    children: 'children',
                    label: 'typeName',
                    value: 'typePath',
                    disabled: 'disabled'
                }
            }
        },
        methods: {
            getAllTypeList() {
                return getAllTypeList( {} ).then( res => {
                    const { status, data } = res ;
                    this.$set( this, 'typeList', [] ) ;
                    if ( status === 0 ) {
                        if ( data && data.length ) {
                            data.map( item => {
                                if ( item.upperType === 1 ) {
                                    this.typeList.push( Object.assign( item, {
                                        disabled: false,
                                        children: []
                                    } ) )
                                }
                            } ) ;
                            if ( this.typeList.length ) {
                                data.map( item => {
                                    this.typeList.find( itemInner => {
                                        if ( itemInner.value === item.upperType ) {
                                            itemInner.children.push( item ) ;
                                        }
                                    } )
                                } ) ;
                                this.typeList.sort( (a, b) => {
                                    return a.typeSort - b.typeSort ;
                                } ) ;
                                this.typeList.map( item => {
                                    if ( !item.children.length ) {
                                        item.disabled = true ;
                                    }
                                } )
                            }
                        }
                    }
                } )
            },
            handleChangeType(_, __) {
                console.log( _, __ ) ;
                console.log( this.form.articleType ) ;
            },
            addArticleSubmit() {
                this.$refs[`form`].validate((valid) => {
                    if (valid) {
                        if ( !this.form.tags.length ) {
                            this.$message( {
                                message: '请选择正确的标签列表',
                                type: 'error'
                            } ) ;
                            return
                        }
                        if ( !this.form.original ) {
                            if ( !this.form.from.author || !this.form.from.fromUrl) {
                                this.$message( {
                                    message: '请输入正确的来源信息',
                                    type: 'error'
                                } ) ;
                                return
                            }
                        }
                        if ( !this.form.articleType.length ) {
                            if ( !this.form.from.author || !this.form.from.fromUrl) {
                                this.$message( {
                                    message: '请选择正确的文章类型',
                                    type: 'error'
                                } ) ;
                                return
                            }
                        }
                        this.form.articleType = this.form.articleType[ this.form.articleType.length - 1 ] ;
                        add( this.form )
                            .then( res => {
                                const { status } = res ;
                                if ( status === 0 ) {
                                    this.$message( {
                                        message: '操作成功',
                                        type: 'success'
                                    } ) ;
                                    this.$router.push( '/home/article-list' ) ;
                                }
                            } )
                            .catch( err => console.log( err ) )
                    }
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleBeforeRemove(  ) {
                this.$set( this, `fileList`, [] ) ;
                return false ;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url ;
                this.dialogVisible = true ;
            },
            changeImgList( _, __ ) {
                this.$set( this, `fileList`, __ ) ;
            },
            beforeUpload() {
                if ( this.fileList.length - 1 ) {
                    this.$message( {
                        message: '封面图片只能上传一张...',
                        type: "error"
                    } ) ;
                    return false
                }
            },
            uploadHttpRequest( option ) {
                const _this = this ;
                const { file } = option ;
                return new Promise(function(resolve, reject) {
                    _this.parseBase64(file).then(result => {
                        _this.form.imgFile = result ? result.split(';')[1].split(',')[1] : '' ;
                        _this.form.fileType = file.type
                    })
                })
            },
            parseBase64(file) {
                return new Promise(function(resolve, reject) {
                    const reader = new FileReader() ;
                    reader.readAsDataURL(file) ;
                    reader.onload = function() {
                        resolve(this.result)
                    }
                })
            },
            getTagList() {
                getAllTags( {} )
                    .then( res => {
                        const { status, data } = res ;
                        if ( status === 0 ) {
                            this.tagsList = data ;
                        }
                    } )
            }
        },
        created() {
            this.getTagList() ;
            this.getAllTypeList() ;
        }
    }
</script>

<style scoped>
    .editor-content{
        margin-top: 20px;
    }
</style>


