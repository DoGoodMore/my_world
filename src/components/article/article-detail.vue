<template>
    <div class="width">
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
                    <div v-if="!articleData ? articleData.original : false"
                         class="copyright-area">
                        原文出处：<a target="_blank"
                                :href="articleData ? articleData.from.fromUrl : 'javascript:;'">{{articleData ? articleData.from.author : '数据获取失败'}}</a>
                    </div>
                    <div v-else
                         class="copyright-area">文章为博主原创内容 如有转载请注明出处</div>
                </div>
                <div class="editor-content content" v-html="articleData ? articleData.content : '数据获取失败'"></div>
                <!--<div class="content" v-html="articleData ? articleData.content : '数据获取失败'">
                    &lt;!&ndash;<ul>
                        <li><strong>单页面（SPA）</strong>
                            <ul>
                                <li>优点：体验好，路由之间跳转流程，可定制转场动画，使用了懒加载可有效减少首页白屏时间，相较于多页面减少了用户访问静态资源服务器的次数等。</li>
                                <li>缺点：初始会加载较大的静态资源，并且随着业务增长会越来越大，懒加载也有他的弊端，不做特殊处理不利于 SEO 等。</li>
                            </ul>
                        </li>
                        <li><strong>多页面（MPA）</strong>：
                            <ul>
                                <li>优点：对搜索引擎友好，开发难度较低。</li>
                                <li>缺点：资源请求较多，整页刷新体验较差，页面间传递数据只能依赖 URL，cookie，storage 等方式，较为局限。</li>
                            </ul>
                        </li>
                        <li><strong>SPA + MPA</strong>
                            <ul>
                                <li>这种方式常见于较老 MPA 项目迁移至 SPA 的情况，缺点结合两者，两种主体通信方式也只能以兼容MPA 为准</li>
                                <li>不过这种方式也有他的好处，假如你的 SPA 中，有类似文章分享这样（没有后端直出，后端返 HTML 串的情况下），想保证用户体验在 SPA 中开发一个页面，在 MPA 中也开发一个页面，去掉没用的依赖，或者直接用原生 JS 来开发，分享出去是 MPA 的文章页面，这样可以<strong>加快分享出去的打开速度，同时也能减少静态资源服务器的压力</strong>，因为如果分享出去的是 SPA 的文章页面，那 SPA 所需的静态资源至少都需要去进行协商请求,当然如果服务配置了强缓存就忽略以上所说。</li>
                            </ul>
                        </li>
                    </ul>
                    <div v-hljs>
                        <pre>
                            <code>
    &lt;html&gt;

    &lt;head&gt;
      &lt;script type=&quot;text/javascript&quot; src=&quot;loadxmldoc.js&quot;&gt;
    &lt;/script&gt;
    &lt;/head&gt;

    &lt;body&gt;
                                &lt;!&ndash; Crayon Syntax Highlighter v2.7.1.1 &ndash;&gt;
      &lt;script type=&quot;text/javascript&quot;&gt;
        xmlDoc = loadXMLDoc
    (&quot;books.xml&quot;);
        document.write(&quot;xmlDoc is loaded, ready for use&quot;);
      &lt;/script&gt;

    &lt;/body&gt;

    &lt;/html&gt;
                            </code>
                        </pre>
                    </div>
                    <ul>
                        <li><strong>单页面（SPA）</strong>
                            <ul>
                                <li>优点：体验好，路由之间跳转流程，可定制转场动画，使用了懒加载可有效减少首页白屏时间，相较于多页面减少了用户访问静态资源服务器的次数等。</li>
                                <li>缺点：初始会加载较大的静态资源，并且随着业务增长会越来越大，懒加载也有他的弊端，不做特殊处理不利于 SEO 等。</li>
                            </ul>
                        </li>
                        <li><strong>多页面（MPA）</strong>：
                            <ul>
                                <li>优点：对搜索引擎友好，开发难度较低。</li>
                                <li>缺点：资源请求较多，整页刷新体验较差，页面间传递数据只能依赖 URL，cookie，storage 等方式，较为局限。</li>
                            </ul>
                        </li>
                        <li><strong>SPA + MPA</strong>
                            <ul>
                                <li>这种方式常见于较老 MPA 项目迁移至 SPA 的情况，缺点结合两者，两种主体通信方式也只能以兼容MPA 为准</li>
                                <li>不过这种方式也有他的好处，假如你的 SPA 中，有类似文章分享这样（没有后端直出，后端返 HTML 串的情况下），想保证用户体验在 SPA 中开发一个页面，在 MPA 中也开发一个页面，去掉没用的依赖，或者直接用原生 JS 来开发，分享出去是 MPA 的文章页面，这样可以<strong>加快分享出去的打开速度，同时也能减少静态资源服务器的压力</strong>，因为如果分享出去的是 SPA 的文章页面，那 SPA 所需的静态资源至少都需要去进行协商请求,当然如果服务配置了强缓存就忽略以上所说。</li>
                            </ul>
                        </li>
                    </ul>
                    <div class="img">
                        <img
                            src="https://images2015.cnblogs.com/blog/643024/201611/643024-20161117105822107-1011418356.png"
                            alt="img">
                    </div>
                    <ul>
                        <li><strong>单页面（SPA）</strong>
                            <ul>
                                <li>优点：体验好，路由之间跳转流程，可定制转场动画，使用了懒加载可有效减少首页白屏时间，相较于多页面减少了用户访问静态资源服务器的次数等。</li>
                                <li>缺点：初始会加载较大的静态资源，并且随着业务增长会越来越大，懒加载也有他的弊端，不做特殊处理不利于 SEO 等。</li>
                            </ul>
                        </li>
                        <li><strong>多页面（MPA）</strong>：
                            <ul>
                                <li>优点：对搜索引擎友好，开发难度较低。</li>
                                <li>缺点：资源请求较多，整页刷新体验较差，页面间传递数据只能依赖 URL，cookie，storage 等方式，较为局限。</li>
                            </ul>
                        </li>
                        <li><strong>SPA + MPA</strong>
                            <ul>
                                <li>这种方式常见于较老 MPA 项目迁移至 SPA 的情况，缺点结合两者，两种主体通信方式也只能以兼容MPA 为准</li>
                                <li>不过这种方式也有他的好处，假如你的 SPA 中，有类似文章分享这样（没有后端直出，后端返 HTML 串的情况下），想保证用户体验在 SPA 中开发一个页面，在 MPA 中也开发一个页面，去掉没用的依赖，或者直接用原生 JS 来开发，分享出去是 MPA 的文章页面，这样可以<strong>加快分享出去的打开速度，同时也能减少静态资源服务器的压力</strong>，因为如果分享出去的是 SPA 的文章页面，那 SPA 所需的静态资源至少都需要去进行协商请求,当然如果服务配置了强缓存就忽略以上所说。</li>
                            </ul>
                        </li>
                    </ul>&ndash;&gt;
                </div>-->
                <div style="margin-top: 30px;" class="bottom">
                    <div class="tips">
                        <span style="margin-right: 10px;">标签:</span>
                        <a href="javascript:;"
                           v-for="item in articleData.tags"
                           :key="item.value"
                           style="display: inline-block;margin-right: 10px;">
                            <span class="tag"
                                  :style="{ background: changeColorToRgb( item.background, .2 ), color: item.color, borderColor: changeColorToRgb( item.color, .1 ) }">{{item.label}}</span></a>
                        <!--<el-tag v-for="( item, index ) in tagsArr"
                                :key="index"
                                size="mini"
                                :type="item.type"
                                style="margin-right: 10px;">{{item.text}}</el-tag>-->
                    </div>
                    <div class="actions">
                        <a href="javascript:;"><i class="icon-good"></i>{{articleData[ `good` ]}}</a>
                        <a href="javascript:;"><i class="icon-not-good"></i>{{articleData[ `noGood` ]}}</a>
                        <a href="javascript:;"><i class="icon-coments"></i>{{articleData ? articleData.comments.length : 0}}</a>
                    </div>
                    <div class="pre-or-next">
                        <div class="pre">
                            <i class="icon-pre"></i>上一篇:
                            <a href="javascript:;">Atom编辑器的插件</a>
                        </div>
                        <div class="next">
                            <i class="icon-next"></i>下一篇:
                            <a href="javascript:;">sublime text3好用的插件</a>
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
                        <ul>
                            <li>
                                <a href="javascript:;">手把手教你 vue-cli 单页到多页应用</a>
                            </li>
                            <li>
                                <a href="javascript:;">使用 Web3 和 Vue.js 来创建你的第一个以太坊 dAPP（二）</a>
                            </li>
                            <li>
                                <a href="javascript:;">使用 Web3 和 Vue.js 来创建你的第一个以太坊 dAPP（一）</a>
                            </li>
                            <li>
                                <a href="javascript:;">vue 生命周期深入</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </el-col>
            <right-show></right-show>
        </el-row>
    </div>
</template>

<script>
    import rightShow from '../home/components/right-show' ;
    import { getArticleDetail } from '@/api/article' ;
    import { getAllTags } from '@/api/tags' ;
    export default {
        components : { rightShow },
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
                }
            }
        },
        methods: {
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
                        const { status, data } = res ;
                        if ( status === 0 ) {
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
            }
        },
        created() {
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
                .catch( err => console.log( err ) ) ;
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
</style>
