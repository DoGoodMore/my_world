<template>
    <div class="width">
        <go-to-top transitionName="fade"
                   :ref="`goTop`"
                   :customStyle="myBackToTopStyle"
                   :visibilityHeight="300"
                   :backPosition="0"></go-to-top>
        <el-menu :default-active="`2`"
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">所有文章</el-menu-item>
            <el-submenu index="3">
                <template slot="title">前端</template>
                <el-menu-item index="2-1">Javascript</el-menu-item>
                <el-menu-item index="2-2">HTML</el-menu-item>
                <el-menu-item index="2-3">CSS</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">前端框架</template>
                <el-menu-item index="4-1">Vue</el-menu-item>
                <el-menu-item index="4-2">React</el-menu-item>
                <el-menu-item index="4-3">Angular</el-menu-item>
                <el-menu-item index="4-4">JQuery</el-menu-item>
            </el-submenu>
            <el-menu-item index="5">Node</el-menu-item>
            <el-menu-item index="6">Linux</el-menu-item>
        </el-menu>
        <el-breadcrumb style="height: 50px;line-height: 50px;margin-top: 20px;background-color: rgb(240, 240, 240);"
                       separator=">">
            <el-breadcrumb-item><router-link to="/home/article-list">所有文章</router-link> </el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">前端</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">Javascript</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="javascript:;">初识javascript</a></el-breadcrumb-item>
        </el-breadcrumb>


        <el-row style="margin-top: 20px;" :gutter="20">
            <el-col :span="18">
                <div class="article-title">
                    {{articleData ? articleData.title : '数据获取失败'}}
                </div>
                <div class="article-from">
                    <div v-if="!articleData.original"
                         class="copyright-area">
                        原文出处：<a target="_blank"
                                :href="articleData ? articleData.from.fromUrl : 'javascript:;'">{{articleData ? articleData.from.author : '数据获取失败'}}</a>
                    </div>
                    <div v-else
                         class="copyright-area">文章为博主原创内容 如有转载请注明出处</div>
                </div>
                <div class="editor-content content" v-html="articleData ? articleData.content : '数据获取失败'"></div>
                <div style="margin-top: 30px;" class="bottom">
                    <div class="tips">
                        <span style="margin-right: 10px;">标签:</span>
                        <a href="javascript:;"
                           v-for="item in articleData.tags"
                           :key="item.value"
                           style="display: inline-block;margin-right: 10px;">
                            <span class="tag"
                                  :style="{ background: changeColorToRgb( item.background, .2 ), color: item.color, borderColor: changeColorToRgb( item.color, .1 ) }">{{item.label}}</span></a>
                    </div>
                    <div class="actions">
                        <a href="javascript:;"><i class="icon-good"></i>{{articleData[ `good` ]}}</a>
                        <a href="javascript:;"><i class="icon-not-good"></i>{{articleData[ `noGood` ]}}</a>
                        <a href="javascript:;"><i class="icon-coments"></i>{{articleData ? articleData.comments.length : 0}}</a>
                    </div>
                    <div class="pre-or-next">
                        <div class="pre">
                            <i class="icon-pre"></i>上一篇:
                            <a v-if="preArticle"
                               @click="articleChange(preArticle._id)"
                               href="javascript:;">{{preArticle.title}}</a>
                            <span v-else style="margin-left: 10px;">已经是第一篇啦</span>
                        </div>
                        <div class="next">
                            <i class="icon-next"></i>下一篇:
                            <a v-if="nextArticle"
                               @click="articleChange(nextArticle._id)"
                               href="javascript:;">{{nextArticle.title}}</a>
                            <span v-else style="margin-left: 10px;">已经是最后一篇啦</span>
                        </div>
                    </div>
                    <div class="comments">
                        <h4>评论列表</h4>
                        <ul v-if="articleData ? articleData.comments.length : false">
                            <li v-for="( comment, index ) in articleData.comments"
                                :key="index">
                                <div class="comment-header">
                                    #<span>{{index + 1}}</span>楼
                                    <span class="date">{{ changTime( comment.date ) }}</span>
                                    <i class="username">{{ comment.username }}</i>
                                </div>
                                <p class="comment-content">
                                    {{comment.content}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-comments" v-else>
                            暂无评论
                        </div>
                    </div>
                    <div class="related-articles">
                        <h4>相关文章</h4>
                        <ul v-if="likeArticles.length">
                            <li v-for="item in likeArticles"
                                :key="item._id">
                                <a @click="$router.push( `/home/article-detail?id=${item._id}` )"
                                   href="javascript:;">{{item.title}}</a>
                            </li>
                        </ul>
                        <div class="no-like-data"
                             v-else>
                            暂无其他相似文章
                        </div>
                    </div>
                </div>
            </el-col>
            <right-show></right-show>
        </el-row>
    </div>
</template>

<script>
    import rightShow from '../home/components/right-show' ;
    import { getArticleDetail, getLikeArticles } from '@/api/article' ;
    import { getAllTags } from '@/api/tags' ;
    import goToTop from '../components/go-to-top' ;
    export default {
        components : { rightShow, goToTop },
        name: "article-detail",
        data() {
            return {
                tagsArr: [
                    {
                        type: 'info',
                        text: 'Node'
                    },
                    {
                        type: 'success',
                        text: 'Javascript'
                    },
                    {
                        type: 'error',
                        text: 'Vue'
                    }
                ],
                articleId: '',
                articleData: {
                    comments: [],
                    content: '',
                    create: '',
                    description: '',
                    from: {},
                    good: '',
                    hot: '',
                    noGood: '',
                    original: '',
                    poster: '',
                    tags: [],
                    title: '',
                    update: '',
                    views: '',
                    __v: '',
                    _id: '',
                },
                preArticle: null,
                nextArticle: null,
                likeArticles: [],
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
                    background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
                },
                loading: null
            }
        },
        methods: {
            articleChange(id) {
                this.$router.push( `/home/article-detail?id=${id}` ) ;
                this.$refs[ 'goTop' ].backToTop() ;
                this.getData() ;
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
            handleSelect(_, __) {
                console.log( _, __ )
            },
            getArticleDetail() {
                return new Promise( ( resolve, reject ) => {
                    getArticleDetail( { id: this.articleId } ).then( res => {
                        const { status, data, pre, next } = res ;
                        if ( status === 0 ) {
                            this.preArticle = pre ;
                            this.nextArticle = next ;
                            resolve( data )
                        } else {
                            resolve( [] )
                        }
                    } ).catch( err => reject( err ) )
                } )
            },
            getTagList() {
                return new Promise( ( resolve, reject ) => {
                    getAllTags( {} )
                        .then( res => {
                            const { status, data } = res ;
                            if ( status === 0 ) {
                                resolve( data ) ;
                            } else {
                                resolve( [] ) ;
                            }
                        } )
                        .catch( err => reject( err ) )
                } )
            },
            getLikeArticles() {
                const tags = [] ;
                if ( this.articleData.tags && this.articleData.tags.length ) {
                    this.articleData.tags.map( item => {
                        tags.push( item.value ) ;
                    } )
                }
                return getLikeArticles( { tags, id: this.articleData._id } ).then( res => {
                    const { status, data } = res ;
                    if ( status === 0 ) {
                        this.likeArticles = data ;
                    }
                } )
            },
            getData() {
                this.loading = this.$loading( {
                    lock: true,
                    text: '加载中...',
                    background: 'rgba(0, 0, 0, .9)'
                } ) ;
                this.articleId = this.$route.query[ `id` ] ;
                if ( !this.articleId ) {
                    this.$message( {
                        message: '获取文章信息失败',
                        type: 'error'
                    } ) ;
                    this.$router.push( '/home/article' ) ;
                }
                Promise.all( [ this.getArticleDetail(), this.getTagList() ] )
                    .then( value => {
                        const article = value[ 0 ] ;
                        const tagsList = value[ 1 ] ;
                        const tags = [] ;
                        if ( article.tags.length && tagsList.length ) {
                            article.tags.map( tagValue => {
                                tagsList.find( tag => {
                                    if ( tagValue === tag.value ) {
                                        tags.push( tag ) ;
                                        return true ;
                                    }
                                } )
                            } )
                        }
                        article.tags = tags ;
                        this.articleData = article ;
                    } )
                    .catch( err => console.log( err ) )
                    .then( () => this.getLikeArticles() )
                    .then( () => this.loading.close() ) ;
            }
        },
        created() {
            this.getData() ;
        }
    }
</script>

<style scoped>
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
    font-size: 13px;
    line-height: 30px;
}
.content ul li {
    display: block;
    list-style-type: disc!important;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;
}
.content > ul > li {
    -webkit-padding-start: 0px;
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
    padding-bottom: 5px;
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
.no-comments{
    width: 100%;
    height: 60px;
    color: #999;
    text-align: center;
    line-height: 60px;
    border: 1px solid #ccc;
    border-top: none;
}
.no-like-data {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #999;
    border: 1px solid #ccc;
}
</style>
