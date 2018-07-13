<template>
    <div class="width container" style="">
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
                    <p class="topping-box">{{topping}}</p>
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
    import { getArticleListPage } from "@/api/article";
    import { getAllTags } from "@/api/tags" ;
    import { getFileInfo } from '@/api/common' ;

    export default {
        components: { rightShow },
        data() {
            return {
                topping: '',
                imgArr: [ imgTest1, imgTest2, imgTest1, imgTest2 ],
                cardDataArr: [],
                tagsHot: [],
                hotArticle: [],
                listQuery: {
                    pageNum: 1,
                    pageSize: 5
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
            getArticleListRecent() {
                return new Promise( ( (resolve, reject) => {
                    getArticleListPage( this.listQuery ).then( res => {
                        const { status, data } = res ;
                        if ( status === 0 ) {
                            resolve( data )
                        } else {
                            reject( new Error( `服务器错误` ) )
                        }
                    } )
                        .catch( err => reject( err ) )
                } ) )
            },
            getAllTagsList() {
                return new Promise( ( (resolve, reject) => {
                    getAllTags( {} )
                        .then( res => {
                            const { status } = res ;
                            if ( status === 0 ) {
                                resolve( res )
                            } else {
                                reject( new Error( `服务器错误` ) )
                            }
                        } )
                        .catch( err => reject( err ) ) ;
                } ) )
            },
            getFileInfo() {
                getFileInfo( {} ).then( res => {
                    const { status, data } = res ;
                    if ( status === 0 ) this.topping = data[ 'topping' ] ;
                } )
            }
        },
        created() {
            this.loading = this.$loading( {
                lock: true,
                text: '加载中...',
                background: 'rgba(0, 0, 0, .9)'
            } ) ;
            this.getFileInfo() ;
            Promise.all( [ this.getArticleListRecent(), this.getAllTagsList() ] )
                .then( value => {
                    const articleArr = value[ 0 ],
                          tagsArr = value[ 1 ].data ;
                    this.$set( this, 'cardDataArr', [] ) ;
                    if ( articleArr.length && tagsArr.length ) {
                        articleArr.map( ( item, index ) => {
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
                                    tagsArr.find( itemTag => {
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
                } )
                .catch( err => console.log( err ) ) ;
        }
    }
</script>

<style scoped>
.container {
    margin-top: 20px;
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
.topping-box {
    line-height: 20px;
    margin-top: 15px;
}
</style>
