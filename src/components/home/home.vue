<template>
    <div>
      <header class="width clear-fix">
        <ul class="clear-fix">
          <li><router-link to="/home/index">网站首页</router-link></li>
          <li><router-link to="/home/demo">demo</router-link></li>
          <li><router-link to="/home/article">技术文章</router-link></li>
          <li><router-link to="/home/about">关于</router-link></li>
          <li><router-link to="/home/contact">联系我</router-link></li>
        </ul>
      </header>
      <router-view></router-view>
    </div>
</template>

<script>
    import { testRequest } from '@/api/common'
    export default {
        name: "home",
        created() {
            testRequest( { test: `test_1_1` } )
                .then( response => {
                    console.log( response )
                } )
        }
    }
</script>

<style scoped>
  .router-link-active {
    color: #000;
  }
  .router-link-active::before{
    width: 30px;
  }
  header {
    height: 60px;
    position: relative;
    z-index: 5;
  }
  header > ul {
    float: right;
  }
  header > ul > li {
    position: relative;
    float: left;
    margin-left: 30px;
    line-height: 60px;
  }
  header > ul > li a::before {
    content: '';
    display: block;
    position: absolute;
    transition: width .3s ease;
    width: 0;
    bottom: 5px;
    left: 0;
    height: 2px;
    background-color: rgb(245, 157, 53);
  }
  header > ul > li > a:hover {
    color: #000;
  }
  header > ul > li > a:hover::before {
    width: 30px;
  }
  header > ul > li a {
    display: inline-block;
    letter-spacing: 1px;
    width: 100%;
    height: 100%;
    color: #6f6f6f;
    font-size: 1.133em;
    font-weight: 700;
  }
</style>
