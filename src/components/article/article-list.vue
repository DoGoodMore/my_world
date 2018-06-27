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
                <el-card class="box-card"
                         style="margin-top: 10px;"
                         shadow="never">
                    <div slot="header"
                         class="clear-fix">
                        <span>所有文章</span>
                        <el-button type="primary"
                                   size="mini"
                                   @click="createArticle"
                                   class="create-article-btn">发表文章</el-button>
                    </div>
                    <el-card class="box-card"
                             v-for="( item, index ) in cardDataArr"
                             :key="index"
                             style="margin-top: 20px;"
                             shadow="hover">
                        <div style="position: relative;"
                             @click="$router.push( '/home/article-detail' )"
                             class="clear-fix">
                            <div class="card-left">
                                <div class="card-title">{{item.title}}</div>
                                <el-tag v-for="( itemInner, indexInner ) in item.tags"
                                        style="margin-right: 5px;"
                                        size="mini"
                                        :key="indexInner"
                                        :type="itemInner.type">{{itemInner.text}}</el-tag>
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
                </el-card>
            </el-col>
            <right-show></right-show>
        </el-row>
    </div>
</template>

<script>
    import rightShow from '../home/components/right-show' ;
    export default {
        components : { rightShow },
        name: "article-detail",
        data() {
            return {
                cardDataArr: [
                    {
                        title: '使用 Nginx 实现 tomcat、glassfish 等 web 服务器负载均衡',
                        tags: [
                            {
                                type: 'info',
                                text: 'Nginx'
                            },
                            {
                                type: 'success',
                                text: 'Node'
                            }
                        ],
                        content: '1.web服务器负载均衡简介web服务器负载均衡是指将多台可用单节点服务器组合成web服务器集群，然后通过负载均衡器将客户端请求均匀的转发到不同的单节点web服务器上，从而增加整个web服务器集群的吞吐量...',
                        imgUrl: null,
                        author: 'xyzzzzz',
                        readCount: 666,
                        comments: 18,
                        releaseTime: '2016-12-25'
                    },
                    {
                        title: '使用 Nginx 实现 tomcat、glassfish 等 web 服务器负载均衡',
                        tags: [
                            {
                                type: 'info',
                                text: 'Nginx'
                            },
                            {
                                type: 'success',
                                text: 'Node'
                            }
                        ],
                        content: '1.web服务器负载均衡简介web服务器负载均衡是指将多台可用单节点服务器组合成web服务器集群，然后通过负载均衡器将客户端请求均匀的转发到不同的单节点web服务器上，从而增加整个web服务器集群的吞吐量...',
                        imgUrl: 'http://www.17sucai.com/preview/705993/2018-01-18/Blog_html/img/slider/Aj6bieY.jpg',
                        author: 'xyzzzzz',
                        readCount: 666,
                        comments: 18,
                        releaseTime: '2016-12-25'
                    },
                    {
                        title: '使用 Nginx 实现 tomcat、glassfish 等 web 服务器负载均衡',
                        tags: [
                            {
                                type: 'info',
                                text: 'Nginx'
                            },
                            {
                                type: 'success',
                                text: 'Node'
                            }
                        ],
                        content: '1.web服务器负载均衡简介web服务器负载均衡是指将多台可用单节点服务器组合成web服务器集群，然后通过负载均衡器将客户端请求均匀的转发到不同的单节点web服务器上，从而增加整个web服务器集群的吞吐量...',
                        imgUrl: 'http://www.17sucai.com/preview/705993/2018-01-18/Blog_html/img/slider/Aj6bieY.jpg',
                        author: 'xyzzzzz',
                        readCount: 666,
                        comments: 18,
                        releaseTime: '2016-12-25'
                    },
                    {
                        title: '使用 Nginx 实现 tomcat、glassfish 等 web 服务器负载均衡',
                        tags: [
                            {
                                type: 'info',
                                text: 'Nginx'
                            },
                            {
                                type: 'success',
                                text: 'Node'
                            }
                        ],
                        content: '1.web服务器负载均衡简介web服务器负载均衡是指将多台可用单节点服务器组合成web服务器集群，然后通过负载均衡器将客户端请求均匀的转发到不同的单节点web服务器上，从而增加整个web服务器集群的吞吐量...',
                        imgUrl: 'http://www.17sucai.com/preview/705993/2018-01-18/Blog_html/img/slider/Aj6bieY.jpg',
                        author: 'xyzzzzz',
                        readCount: 666,
                        comments: 18,
                        releaseTime: '2016-12-25'
                    }
                ],
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
                ]
            }
        },
        methods: {
            handleSelect(_, __) {
                console.log( _, __ )
            },
            createArticle() {
                this.$router.push( '/home/add-article' )
            }
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
</style>
