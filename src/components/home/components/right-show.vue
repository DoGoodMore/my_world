<template>
    <el-col :span="6">
        <el-card class="box-card" shadow="hover">
            <div>站点公告</div>
            <p class="overView">个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中个人网站正在建设中。。。</p>
        </el-card>

        <!--热门标签-->
        <el-card style="margin-top: 20px;min-height: 150px;" shadow="hover">
            <div style="margin-bottom: 10px;">热门标签</div>
            <a href="javascript:;"
               class="margin-top-tag"
               style="display: inline-block;"
               :key="item.value"
               v-for="item in tagsHot">
                <span class="tag"
                      :style="{ background: changeColorToRgb( item.background, .2 ), color: item.color, borderColor: changeColorToRgb( item.color, .1 ) }">{{item.label}}</span>
            </a>
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
    import { getHotTags } from "@/api/tags" ;

    export default {
        name: "right-show",
        data() {
            return {
                tagsHot: [],
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
            getHotTags() {
                getHotTags( {} ).then( res => {
                    const { status, data } = res ;
                    if ( status === 0 ) {
                        this.tagsHot = data ;
                    }
                } )
            }
        },
        created() {
            this.getHotTags() ;
        }
    }
</script>

<style scoped>
.tag {
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.margin-top-tag {
    margin-top: 10px;
    margin-right: 10px;
}
</style>
