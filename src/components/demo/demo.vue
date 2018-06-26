<template>
    <div class="width">
        <el-tabs v-model="activeName">
            <el-tab-pane label="实例一" name="first"></el-tab-pane>
            <el-tab-pane label="实例二" name="second"></el-tab-pane>
            <el-tab-pane label="实例三" name="third"></el-tab-pane>
            <el-tab-pane label="实例四" name="fourth"></el-tab-pane>
        </el-tabs>
        <div class="content">
            <ul class="demo-list">
                <li style="left: 100px;" class="demo-list-item">
                    <a href="javascript:;">
                        <div class="demo-item-content">
                            <img :src="imgList" alt="img">
                            <div class="demo-item-inner">
                                <div class="demo-item-inner-txt">
                                    <h4>STU UNGER RISE</h4>
                                    <p>Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more</p>
                                    <a class="btn" href="javascript:;">View More</a>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
                <li style="right: 100px;" class="demo-list-item">
                    <a href="javascript:;">
                        <div class="demo-item-content">
                            <img :src="imgList" alt="img">
                            <div class="demo-item-inner">
                                <div class="demo-item-inner-txt">
                                    <h4>STU UNGER RISE</h4>
                                    <p>Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more</p>
                                    <a class="btn" href="javascript:;">View More</a>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
                <li style="left: 100px;top: 400px;" class="demo-list-item">
                    <a href="javascript:;">
                        <div class="demo-item-content">
                            <img :src="imgList" alt="img">
                            <div class="demo-item-inner">
                                <div class="demo-item-inner-txt">
                                    <h4>STU UNGER RISE</h4>
                                    <p>Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more</p>
                                    <a class="btn" href="javascript:;">View More</a>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
                <li style="right: 100px;top: 400px;" class="demo-list-item">
                    <a href="javascript:;">
                        <div class="demo-item-content">
                            <img :src="imgList" alt="img">
                            <div class="demo-item-inner">
                                <div class="demo-item-inner-txt">
                                    <h4>STU UNGER RISE</h4>
                                    <p>Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more</p>
                                    <a class="btn" href="javascript:;">View More</a>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
                <li style="left: 100px;top: 800px;" class="demo-list-item">
                    <a href="javascript:;">
                        <div class="demo-item-content">
                            <img :src="imgList" alt="img">
                            <div class="demo-item-inner">
                                <div class="demo-item-inner-txt">
                                    <h4>STU UNGER RISE</h4>
                                    <p>Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more</p>
                                    <a class="btn" href="javascript:;">View More</a>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
                <li style="right: 100px;top: 800px;" class="demo-list-item">
                    <a href="javascript:;">
                        <div class="demo-item-content">
                            <img :src="imgList" alt="img">
                            <div class="demo-item-inner">
                                <div class="demo-item-inner-txt">
                                    <h4>STU UNGER RISE</h4>
                                    <p>Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more</p>
                                    <a class="btn" href="javascript:;">View More</a>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import imgList from '../../static/img/demo-list.jpg' ;
    export default {
        name: "demo",
        data() {
            return {
                activeName: 'first',
                imgList
            }
        }
    }
</script>

<style scoped>
.demo-list {
    position: relative;
}
.demo-list .demo-list-item {
    position: absolute;
}
.demo-item-content {
    position: relative;
}
.demo-item-content:hover .demo-item-inner {
    opacity: 1;
}
.demo-item-content:hover .demo-item-inner .demo-item-inner-txt h4 {
    transform: translateY(-10px);
}
.demo-item-content:hover .demo-item-inner .demo-item-inner-txt .btn {
    transform: translateY(-10px);
}
.demo-item-inner {
    transition: opacity .4s ease-in-out;
    position: absolute;
    opacity: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
}
.demo-item-inner-txt {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 50%;
    left: 50%;
    margin-top: -65px;
    margin-left: -210px;
}
.demo-item-inner-txt h4 {
    font-family: "Quicksand", sans-serif;
    font-size: 1.618em;
    color: #fff;
    margin-top: 0;
    transform: translateY(-20px);
    transition: all 0.4s ease-in-out;
}
.demo-item-inner-txt p {
    font-family: "Quicksand", sans-serif;
    font-size: 1.3em;
    letter-spacing: 1px;
    line-height: 20px;
    color: #e1e1e1;
    margin-bottom: 35px;
}
.demo-item-inner-txt .btn {
    font-family: inherit;
    color: #000;
    font-size: 15px;
    line-height: 1.2;
    letter-spacing: 0.05em;
    text-decoration: none;
    text-align: center;
    white-space: nowrap;
    background: #c0e3e7;
    vertical-align: middle;
    padding: 8px 25px;
    display: inline-block;
    border-radius: 35px;
    border: 0;
    cursor: pointer;
    -webkit-appearance: none;
    box-shadow: transparent 0 0 0;
    transition: all 0.4s ease-in-out;
}
</style>
