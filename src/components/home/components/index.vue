<template>
    <div class="wrapper">
        <el-carousel :height="`${carouselHeight}px`"
                     :interval="5000"
                     arrow="never">
            <el-carousel-item>
                <div class="inner">
                </div>
                <img style="width: 100%;" :src="imgArr[0]" alt="img-item">
            </el-carousel-item>
            <el-carousel-item>
                <img style="width: 100%;" :src="imgArr[1]" alt="img-item">
            </el-carousel-item>
            <el-carousel-item>
                <img style="width: 100%;" :src="imgArr[2]" alt="img-item">
            </el-carousel-item>
            <el-carousel-item>
                <img style="width: 100%;" :src="imgArr[3]" alt="img-item">
            </el-carousel-item>
            <el-carousel-item>
                <img style="width: 100%;" :src="imgArr[4]" alt="img-item">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import imgTest1 from '../../../static/img/img-test-1.jpg' ;
    import imgTest2 from '../../../static/img/img-test-2.jpg' ;
    export default {
        data() {
            return {
                carouselHeight: document.documentElement.clientHeight,
                imgArr: [ imgTest1, imgTest2, imgTest1, imgTest2, imgTest1 ]
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
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
