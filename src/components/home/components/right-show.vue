<template>
    <el-col :span="6">
        <el-card class="box-card" shadow="hover">
            <div>站点公告</div>
            <p class="overView">个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中。。。</p>
        </el-card>

        <!--热门标签-->
        <el-card style="margin-top: 20px;" shadow="hover">
            <div style="margin-bottom: 10px;">热门标签</div>
            <el-tag v-for="( item, index ) in tagsHot"
                    style="margin-right: 10px;margin-top: 10px;"
                    size="mini"
                    :key="index"
                    :type="item.type">{{item.text}}</el-tag>
        </el-card>

        <!--热门发布-->
        <el-card style="margin-top: 20px;" shadow="hover">
            <div style="margin-bottom: 10px;">热门发布</div>
            <div v-for="( item, index ) in hotArticle"
                 style="padding: 5px 0;line-height: 1.5;border-bottom: 1px solid #d8e6f8;"
                 :key="index">
                <a style="font-size: 14px" href="javascript:;">{{item.title}}</a>
            </div>
        </el-card>

        <!--微信链接-->
        <el-card style="margin-top: 20px;" shadow="hover">
            <div style="margin-bottom: 10px;">微信添加好友</div>
            <img style="width: 230px;height: 230px;" src="http://www.17sucai.com/preview/705993/2018-01-18/Blog_html/img/qrcode.jpg" alt="wechart-erweima">
        </el-card>
    </el-col>
</template>

<script>
    export default {
        name: "right-show",
        data() {
            return {
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
        }
    }
</script>

<style scoped>

</style>
