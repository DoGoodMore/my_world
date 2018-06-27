<template>
    <div class="width container">
        <el-row :gutter="20">
            <!--技术文章跑马灯块-->
            <el-col :span="18">
                <el-carousel height="300px"
                             :interval="5000"
                             arrow="never">
                    <el-carousel-item :key="index"
                                      v-for="(item, index) in imgArr">
                        <img :src="item" alt="img">
                    </el-carousel-item>
                </el-carousel>
                <!--置顶卡片项-->
                <el-card class="box-card"
                         style="margin-top: 10px;"
                         shadow="never">
                    博主置顶
                </el-card>

                <!--发布内容概览-->

                <el-card class="box-card"
                         style="margin-top: 10px;"
                         shadow="never">
                    <div slot="header"
                         class="clear-fix">
                        <span>最新发布</span>
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
    import imgTest1 from '../../static/img/img-test-1.jpg' ;
    import imgTest2 from '../../static/img/img-test-2.jpg' ;
    import rightShow from '../home/components/right-show' ;
    export default {
        components: { rightShow },
        data() {
            return {
                imgArr: [ imgTest1, imgTest2, imgTest1, imgTest2 ],
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
                tagsHot: [
                    {
                        type: 'success',
                        text: 'Javascript'
                    },
                    {
                        type: 'error',
                        text: 'Node'
                    },
                    {
                        type: 'warning',
                        text: 'CSS3'
                    },
                    {
                        type: 'info',
                        text: 'H5'
                    },
                    {
                        type: 'warning',
                        text: 'CSS3'
                    },
                    {
                        type: 'info',
                        text: 'H5'
                    },
                    {
                        type: 'success',
                        text: 'Javascript'
                    },
                    {
                        type: 'error',
                        text: 'Node'
                    },
                    {
                        type: 'warning',
                        text: 'CSS3'
                    },
                    {
                        type: 'info',
                        text: 'H5'
                    }
                ],
                hotArticle: [
                    {
                        title: '排序算法之冒泡排序 － java实现',
                        type: 'JAVA'
                    },
                    {
                        title: '快速搭建基于二进制日志文件的 mysql 复制',
                        type: 'JAVA'
                    },
                    {
                        title: '排序算法之冒泡排序 － java实现',
                        type: 'JAVA'
                    },
                    {
                        title: '使用 redis 和 spring-session 实现 tomcat、glassfish 等 web 服务器集群 session 共享',
                        type: 'JAVA'
                    },
                    {
                        title: '排序算法之冒泡排序 － java实现',
                        type: 'JAVA'
                    }
                ]
            }
        },
        methods: {
            testClick() {
                console.log( 1111111 )
            }
        }
    }
</script>

<style scoped>
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
</style>
