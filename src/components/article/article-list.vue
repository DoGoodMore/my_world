<template>
    <div class="width">

        <el-menu :default-active="listQuery.articlePath"
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect">
            <template v-for="type in typeList">
                <el-submenu :key="type.value"
                            v-if="type.children.length"
                            :index="type.typePath">
                    <template slot="title">{{type.typeName}}</template>
                    <el-menu-item v-for="typeSub in type.children"
                                  :key="typeSub.value"
                                  :index="typeSub.typePath">{{typeSub.typeName}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else
                              :key="type.value"
                              :index="type.typePath">{{type.typeName}}</el-menu-item>
            </template>
        </el-menu>
        <el-breadcrumb style="height: 50px;line-height: 50px;padding-left: 20px;margin-top: 20px;background-color: rgb(240, 240, 240);"
                       separator=">">
            <el-breadcrumb-item v-for="item in breadcrumbData"
                                :key="item._id">
                {{item.typeName}}
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-row style="margin-top: 20px;" :gutter="20">
            <el-col :span="18">
                <el-card class="box-card"
                         style="margin-top: 10px;"
                         shadow="never">
                    <div slot="header"
                         class="clear-fix">
                        <span class="article-type-title">{{breadcrumbData[breadcrumbData.length - 1] ? breadcrumbData[breadcrumbData.length - 1].typeName : ``}}</span>
                        <el-button type="primary"
                                   size="mini"
                                   @click="createArticle"
                                   class="create-article-btn">发表文章</el-button>
                    </div>

                    <div v-if="cardDataArr.length">
                        <el-card class="box-card"
                                 v-for="( item, index ) in cardDataArr"
                                 :key="index"
                                 style="margin-top: 20px;"
                                 shadow="hover">
                            <div style="position: relative;"
                                 @click="$router.push( `/home/article-detail?id=${item.id}` )"
                                 class="clear-fix">
                                <div class="card-left">
                                    <div class="card-title">{{item.title}}</div>
                                    <a href="javascript:;"
                                       style="display: inline-block;margin-right: 8px;"
                                       :key="itemInner.value"
                                       v-for="itemInner in item.tags">
                                        <span class="tag"
                                              :style="{ background: changeColorToRgb( itemInner.background, .2 ), color: itemInner.color, borderColor: changeColorToRgb( itemInner.color, .1 ) }">{{itemInner.label}}</span>
                                    </a>
                                    <p style="margin-top: 10px;line-height: 20px;">{{item.content}}</p>
                                    <div :style="item.imgUrl ? { position: 'absolute', bottom: '0', left: '0' } : { marginTop: '20px' }"
                                         class="card-data-info">
                                        <a href="javascript:;">
                                            <i class="icon-author"></i>
                                            {{item.author}}
                                        </a>
                                        <a href="javascript:;">
                                            <i class="icon-views"></i>
                                            {{item.readCount}}
                                        </a>
                                        <a href="javascript:;">
                                            <i class="icon-coments"></i>
                                            {{item.comments}}
                                        </a>
                                        <a href="javascript:;">
                                            <i class="icon-date"></i>
                                            {{item.releaseTime}}
                                        </a>
                                    </div>
                                </div>
                                <div class="card-right">
                                    <img v-if="item.imgUrl" :src="item.imgUrl" alt="img">
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div v-else class="no-article-data">
                        <span>暂无数据</span>
                    </div>
                </el-card>
            </el-col>
            <right-show></right-show>
        </el-row>
    </div>
</template>

<script>
    import rightShow from '../home/components/right-show' ;
    import { getAllTypeList } from '@/api/type' ;
    import { getArticleListByType } from '@/api/article' ;
    import { getAllTags } from '@/api/tags' ;
    export default {
        components : { rightShow },
        name: "article-detail",
        data() {
            return {
                cardDataArr: [],
                tagsArr: [],
                typeList: [],
                breadcrumbData: [],
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    articlePath: '',
                },
                loading: null
            }
        },
        methods: {
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
            handleSelect(_) {
                if ( _ === this.listQuery.articlePath ) return ;
                this.$router.push( `/home/article-list?path=${ _ }` ) ;
                this.getDataList() ;
            },
            createArticle() {
                this.$router.push( '/home/add-article' )
            },
            getAllTypeList() {
                return new Promise( ( resolve, reject ) => {
                    getAllTypeList( {} ).then( res => {
                        const { status, data } = res ;
                        this.$set( this, 'typeList', [] ) ;
                        if ( status === 0 ) {
                            if ( data && data.length ) {
                                data.map( item => {
                                    if ( item.upperType === 1 ) {
                                        this.typeList.push( Object.assign( item, {
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
                                    } )
                                }
                                resolve() ;
                            }
                        }
                    } ).catch( err => reject( err ) ) ;
                } )
            },
            getAllTagsList() {
                return new Promise( ( (resolve, reject) => {
                    getAllTags( {} )
                        .then( res => {
                            const { status, data } = res ;
                            if ( status === 0 ) {
                                this.tagsArr = data ;
                                resolve()
                            } else {
                                reject( new Error( `服务器错误` ) )
                            }
                        } )
                        .catch( err => reject( err ) ) ;
                } ) )
            },
            changeColorToRgb(hex, op) {
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
                return "rgba(" + rgb.join(",") + ", " + ( op ? op : 1 ) + ")";
            },
            getDataList() {
                this.loading = this.$loading( {
                    lock: true,
                    text: '加载中...',
                    background: 'rgba(0, 0, 0, .9)'
                } ) ;
                this.listQuery.articlePath = this.$route.query[ `path` ] ? this.$route.query[ `path` ]
                    : this.typeList[ 0 ].children.length ? this.typeList[ 0 ].children[ 0 ].typePath
                        :  this.typeList[ 0 ].typePath ;
                if ( this.typeList && this.typeList.length ) {
                    this.$set( this, `breadcrumbData`, [] ) ;
                    if (
                        !this.typeList.find( item => {
                            if ( item.children && item.children.length ) {
                                return item.children.find( itemInner => {
                                    if ( itemInner.typePath === this.listQuery.articlePath ) {
                                        this.breadcrumbData.push( item ) ;
                                        this.breadcrumbData.push( itemInner ) ;
                                        return true
                                    }
                                } )
                            } else {
                                if ( item.typePath === this.listQuery.articlePath ) {
                                    this.breadcrumbData.push( item ) ;
                                    return true
                                }
                            }
                        } )
                    ) {
                        if (  this.typeList[ 0 ].children && this.typeList[ 0 ].children.length  ) {
                            this.breadcrumbData.push( this.typeList[ 0 ] ) ;
                            this.breadcrumbData.push( this.typeList[ 0 ].children[ 0 ] ) ;
                            this.listQuery.articlePath = this.typeList[ 0 ].children[ 0 ].typePath ;
                        } else {
                            this.breadcrumbData.push( this.typeList[ 0 ] ) ;
                            this.listQuery.articlePath = this.typeList[ 0 ].typePath ;
                        }
                        this.$message( {
                            message: `对不起,没有找到对应的文章类型`,
                            type: 'error'
                        } ) ;
                    }
                } else {
                    this.$message( {
                        message: `请联系博主添加文章类型`,
                        type: 'error'
                    } ) ;
                    this.$router.push( '/home/index' ) ;
                    return
                }
                getArticleListByType( this.listQuery )
                    .then( res => {
                        this.$set( this, 'cardDataArr', [] ) ;
                        const { status, data } = res ;
                        if ( status === 0 ) {
                            if ( data && data.length ) {
                                data.map( ( item, index ) => {
                                    this.cardDataArr.push( {
                                        id: item._id,
                                        title: item.title,
                                        tags: [],
                                        content: item.description,
                                        imgUrl: item.poster,
                                        author: item.author || 'xyzzzzz',
                                        readCount: item[ 'views' ],
                                        comments: item.comments.length,
                                        releaseTime: this.changTime( item.create )
                                    } ) ;
                                    if ( item.tags && item.tags.length ) {
                                        item.tags.map( itemTagValue => {
                                            this.tagsArr.find( itemTag => {
                                                if ( itemTagValue === itemTag.value ) {
                                                    this.cardDataArr[ index ].tags.push( itemTag ) ;
                                                    return true
                                                }
                                            } )
                                        } )
                                    }
                                } )
                            }
                            this.loading.close() ;
                        }
                    } )

            }
        },
        created() {
            this.loading = this.$loading( {
                lock: true,
                text: '加载中...',
                background: 'rgba(0, 0, 0, .9)'
            } ) ;
            Promise.all( [ this.getAllTypeList(), this.getAllTagsList() ] ).then( () => {
                this.getDataList() ;
            } ) ;
        }
    }
</script>

<style scoped>

    /*文章列表没有数据时展示盒模型的样式*/
    .no-article-data {
        height: 200px;
        border: 1px solid #ebeef5;
        position: relative;
    }
    .no-article-data > span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        height: 20px;
        width: auto;
    }


    .article-type-title {
        font-size: 14px;
        font-weight: bold;
    }
    .article-title {
        font-size: 24px;
        line-height: 30px;
        font-weight: normal;
        padding-bottom: 20px;
        border-bottom: 1px solid #e8e8e8;
        margin: 0px 0 20px 0;
        text-align: center;
        font-family: "Microsoft YaHei", 'Myriad Pro','Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    .copyright-area {
        background-color: #f0f0f0;
        padding: 10px;
        margin-bottom: 20px;
    }
    .content {
        font-size: 16px;
    }
    .actions {
        padding-left: 10px;
        margin-top: 20px;
        line-height: 30px;
        width: 300px;
        border: silver 1px dashed;
    }
    .actions > a {
        color: #666;
        font-weight: bold;
        margin-right: 10px;
    }
    .actions > a > i {
        font-weight: bold;
        margin-right: 2px;
        vertical-align: baseline;
    }
    .pre-or-next {
        line-height: 20px;
        margin-top: 20px;
    }
    .pre-or-next a {
        margin-left: 10px;
    }
    .comments {
        margin-top: 30px;
    }
    .comments > h4 {
        font-weight: bold;
        line-height: 20px;
        border-bottom: 1px solid #ccc;
    }
    .comments .comment-header {
        line-height: 30px;
        font-size: 14px;
    }
    .comments ul li {
        border-bottom: 1px solid #ccc;
    }
    .comments ul li .comment-content {
        padding: 20px 10px 20px 10px;
    }
    .related-articles {
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .related-articles h4 {
        margin-bottom: 10px;
    }
    .related-articles > ul li {
        line-height: 16px;
    }
    .related-articles > ul li a {
        font-size: 14px;
        color: blue;
    }
    .container {
        margin-top: 10px;
    }
    .card-left {
        float: left;
        width: 75%;
    }
    .card-right {
        float: right;
    }
    .card-right img {
        width: 160px;
        height: 160px;
    }
    .card-title {
        font-weight: bold;
        color: #333;
        font-size: 16px;
        margin-bottom: 10px;
    }
    .card-data-info > a {
        margin-right: 8px;
    }
    .card-data-info > a > i {
        font-weight: bold!important;
    }
    .create-article-btn {
        float: right;
        background: linear-gradient(to right, #6EE4E7, #c0e3e7);
        border: none;
    }
    .tag {
        display: inline-block;
        padding: 0 5px;
        height: 20px;
        line-height: 19px;
        font-size: 12px;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
    }
</style>
