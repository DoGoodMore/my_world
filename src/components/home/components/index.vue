<template>
    <div class="wrapper">
        <el-carousel :height="`${carouselHeight}px`"
                     :autoplay="true"
                     @change="showAnimation"
                     :interval="5000"
                     arrow="never">
            <el-carousel-item label="1">
                <div :class="{ 'now-animation': nowIndex === 0 }" class="page-1-inner">
                    <h3>INDEX TITLE</h3>
                    <p>THIS IS DESCRIPTION</p>
                    <a href="javascript:;">LOOK DETAIL</a>
                </div>
                <img style="width: 100%;" :src="imgArr[0]" alt="img-item">
            </el-carousel-item>
            <el-carousel-item label="2">
                <div :class="{ 'now-animation': nowIndex === 1 }" class="page-2-inner">
                    <h3>INDEX TITLE</h3>
                    <p>THIS IS DESCRIPTION</p>
                    <a href="javascript:;">LOOK DETAIL</a>
                </div>
                <img style="width: 100%;" :src="imgArr[1]" alt="img-item">
            </el-carousel-item>
            <el-carousel-item label="3">
                <div :class="{ 'now-animation': nowIndex === 2 }" class="page-3-inner">
                    <h3>INDEX TITLE</h3>
                    <p>THIS IS DESCRIPTION</p>
                    <a href="javascript:;">LOOK DETAIL</a>
                </div>
                <video loop :ref='`video`' style="width: 100%;" :src="imgArr[2]"></video>
            </el-carousel-item>
            <el-carousel-item label="4">
                <div :class="{ 'now-animation': nowIndex === 3 }" class="page-4-inner">
                    <h3>INDEX TITLE</h3>
                    <p>THIS IS DESCRIPTION</p>
                    <a href="javascript:;">LOOK DETAIL</a>
                </div>
                <img style="width: 100%;" :src="imgArr[3]" alt="img-item">
            </el-carousel-item>
            <el-carousel-item label="5">
                <div :class="{ 'now-animation': nowIndex === 4 }" class="page-5-inner">
                    <h3>INDEX TITLE</h3>
                    <p>THIS IS DESCRIPTION</p>
                    <a href="javascript:;">LOOK DETAIL</a>
                </div>
                <img style="width: 100%;" :src="imgArr[4]" alt="img-item">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import imgTest1 from '../../../static/img/img-test-1.jpg' ;
    import imgTest2 from '../../../static/img/img-test-2.jpg' ;
    import video from '../../../static/video/video.mp4' ;
    export default {
        data() {
            return {
                carouselHeight: document.documentElement.clientHeight,
                imgArr: [ imgTest1, imgTest2, video, imgTest2, imgTest1 ],
                nowIndex: -1
            }
        },
        methods: {
            showAnimation(_, __) {
                setTimeout(() => {
                    this.nowIndex = _ ;
                    if ( this.nowIndex === 2 ) {
                        this.$refs[`video`].play() ;
                    }
                }, 300)
            }
        },
        created() {
        }
    }
</script>

<style scoped>
.inner {
    position: absolute;
    top: 0;
    left: 0;
}
.wrapper {
    position: fixed!important;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.page-1-inner,
.page-3-inner,
.page-4-inner,
.page-5-inner,
.page-2-inner {
    opacity: 0;
    position: absolute;
    top: 50%;
    height: 116px;
    transform: translate3d(-100px, -50%, 0);
    left: 100px;
    transition: all linear .4s;
}
.page-1-inner h3,
.page-2-inner h3,
.page-3-inner h3,
.page-4-inner h3,
.page-5-inner h3 {
    font-size: 25px;
    color: #fff;
    margin-bottom: 20px;
}
.page-1-inner p,
.page-2-inner p,
.page-3-inner p,
.page-4-inner p,
.page-5-inner p {
    font-size: 20px;
    color: #eee;
    margin-bottom: 20px;
}
.page-1-inner a,
.page-2-inner a,
.page-3-inner a,
.page-4-inner a,
.page-5-inner a {
    display: inline-block;
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    text-align: left;
    width: 100px;
    border: .5px solid #aaa;
    color: #BBBBBB;
    border-radius: 7px;
}
.page-2-inner {
    left: 400px;
}
.page-3-inner {
    left: 700px;
}
.page-4-inner {
    left: 1000px;
}
.page-5-inner {
    left: 1300px;
}
.now-animation {
    opacity: 1;
    transform: translate3d(0, -50%, 0);
}
</style>
