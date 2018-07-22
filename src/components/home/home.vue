<template>
    <div class="home-container">
        <!--快速入口-->
      <div class="fast-entry"
           v-show="fastEntryShow"
           @click="showLoginOrToolBox">
          快速入口
      </div>
        <!-- 登录弹窗 -->
      <div class="login-in-box"
           v-loading="loginBoxLoading"
           :class="{ 'login-in-box-out': loginInBoxOut, 'login-in-box-in': loginInBoxIn }">
          <h4>登录信息</h4>
          <el-form :model="loginForm"
                   :rules="loginRules"
                   style="width: 85%;margin: 0 auto;"
                   :ref="`loginForm`"
                   :inline="false"
                   class="demo-ruleForm">
              <el-form-item label="用户名"
                            prop="username">
                  <el-input v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码"
                            prop="password">
                  <el-input type="password"
                            v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item style="text-align: center;">
                  <el-button type="primary"
                             @click="loginByUsername">提交</el-button>
                  <el-button @click="restLoginForm">重置</el-button>
              </el-form-item>
          </el-form>
          <a class="close-login-box"
             @click="hideLoginBox"
             href="javascript:;">
              <i class="el-icon-close"></i>
          </a>
      </div>
        <!-- canvas原子运动效果 -->
      <div :ref="`home-container`"
           class="canvas-nest"></div>
        <!-- 快速选项 -->
      <div class="common-menu"
           :style="{ transform: `translateX(${toolBoxTransform})` }">
          <h4>常用菜单</h4>
          <ul>
              <li>
                  <el-badge :value="messageCount"
                            class="item">
                      <a href="javascript:;"
                         @click="lookMyMessage">我的消息</a>
                  </el-badge>
              </li>
              <li>
                  <el-badge :value="99" class="item">
                      <a href="javascript:;" @click="commentsManager">评论管理</a>
                  </el-badge>
              </li>
              <li>
                  <router-link to="/home/add-article">发表文章</router-link>
              </li>
              <li>
                  <a href="javascript:;">系统设置</a>
              </li>
              <li>
                  <a href="javascript:;" @click="editNotice">修改站点公告</a>
              </li>
          </ul>
          <a class="close-tool-box-open"
             @click="hideToolBox"
             href="javascript:;">
              <i :style="{ transform: `rotate(${ arrowRotate })` }"
                 style="transition: transform .3s ease-in-out"
                 class="el-icon-arrow-left"></i>
          </a>
      </div>
        <!-- 主体内容区域 -->
      <div class="width" style="background-color: rgb(247, 247, 247);position: relative;z-index: 3;">
            <header class="width clear-fix">
                <ul class="clear-fix">
                    <li><router-link to="/home/index">网站首页</router-link></li>
                    <li><router-link to="/home/demo">demo</router-link></li>
                    <li><router-link to="/home/article">技术文章</router-link></li>
                    <li><router-link to="/home/settings" v-if="isLogin">网站设置</router-link></li>
                    <li><router-link to="/home/about">关于</router-link></li>
                    <li><router-link to="/home/contact">联系我</router-link></li>
                </ul>
            </header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import { loginByUsername } from '@/api/login' ;
    import { saveToken, login } from "../../util/util" ;
    import CanvasNest from 'canvas-nest.js';
    export default {
        name: "home",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                messageCount: 12,
                loginRules: {
                    username: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
                    password: [ { required: true, message: '请输入密码', trigger: 'blur' } ]
                },
                canvasNest: {
                    zIndex: 2,
                    count: 150,
                    opacity: 0.7
                },
                loginInBoxIsShow: false,
                loginInBoxOut: false,
                loginInBoxIn: false,
                canvasNestInstance: null,
                fastEntryShow: true,
                isLogin: !!window.localStorage.getItem( 'isLogin' ),
                toolBoxTransform: `-170px`,
                arrowRotate: "0deg",
                loginBoxLoading: false
            }
        },
        created() {
        },
        methods: {
            commentsManager() {
                //todo: 添加评论管理的接口
            },
            hideToolBox() {
                this.toolBoxTransform = `-170px` ;
                this.arrowRotate = "-180deg" ;
            },
            editNotice() {
                window.sessionStorage.setItem( 'tabActiveName', 'announcement-topping' ) ;
                this.$router.push( '/home/settings' ) ;
                this.hideToolBox() ;
            },
            lookMyMessage() {
                //todo: 无法正常跳转对应的tab
                window.sessionStorage.setItem( 'tabActiveName', 'message-manager' ) ;
                this.$router.push( '/home/settings' ) ;
                this.hideToolBox() ;
            },
            loginByUsername() {
                this.$refs[ `loginForm` ].validate((valid) => {
                    if ( valid ) {
                        this.loginBoxLoading = true ;
                        loginByUsername( this.loginForm )
                            .then( res => {
                                const { status, token, messageCount } = res ;
                                if ( status === 0 ) {
                                    saveToken( token ) ;
                                    login() ;
                                    this.$message( {
                                        message: '登录成功!',
                                        type: 'success'
                                    } ) ;
                                    this.hideLoginBox() ;
                                    this.messageCount = messageCount ;
                                    this.isLogin = true ;
                                    setTimeout( () => {
                                        this.loginBoxLoading = false ;
                                        this.showLoginOrToolBox() ;
                                    }, 300 ) ;
                                }
                            } )
                    }
                })
            },
            showLoginOrToolBox() {
                if ( !this.isLogin ) {
                    this.fastEntryShow = false ;
                    this.loginInBoxIn = true ;
                    this.loginInBoxOut = false ;
                    setTimeout( () => {
                        this.loginInBoxIsShow = true ;
                    }, 300 )
                } else {
                    this.toolBoxTransform = `0px` ;
                    this.arrowRotate = "0deg" ;
                }
            },
            hideLoginBox() {
                if ( !this.isLogin && this.loginInBoxIsShow ) {
                    this.loginInBoxIn = false ;
                    this.loginInBoxOut = true ;
                    setTimeout( () => {
                        this.loginInBoxIsShow = false ;
                        this.fastEntryShow = true ;
                        this.$nextTick( () => {
                            this.$refs[ `loginForm` ].resetFields() ;
                        } )
                    }, 300 )
                }
            },
            restLoginForm() {
                this.$refs[ `loginForm` ].resetFields() ;
            }
        },
        watch: {
            $route() {
                if ( this.isLogin ) {
                    this.hideToolBox() ;
                } else {
                    if ( this.loginInBoxIsShow ) this.hideLoginBox() ;
                }
            }
        },
        mounted() {
            this.canvasNestInstance = new CanvasNest(
                this.$refs[ `home-container` ],
                this.canvasNest
            ) ;
        }
    }
</script>

<style scoped>

@keyframes login-in-box-out {
    0% {
        transform: translateX(0);
    }
    30% {
        transform: translateX(200px);
    }
    100% {
        transform: translateX(-400px);
    }
}
@keyframes login-in-box-in {
    0% {
        transform: translateX(-400px);
    }
    30% {
        transform: translateX(200px);
    }
    100% {
        transform: translateX(0);
    }
}


.close-tool-box-open {
    position: absolute;
    width: 20px;
    height: 60px;
    background-color: #8AE3E7;
    top: 50%;
    font-size: 26px;
    line-height: 60px;
    text-align: center;
    border-radius: 0 10px 10px 0;
    transform: translateY(-50%);
    right: -20px;
}
.close-tool-box-open:hover {
    box-shadow: 1px 1px 10px #8AE3E7;
}
.common-menu {
    width: 150px;
    padding: 15px 0;
    transition: transform .3s ease-in-out;
    background: linear-gradient(to right bottom, #c0e3e7, #6EE4E7);
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    position: fixed;
    top: 185px;
    left: 0;
    text-align: center;
    z-index: 3;
}
.common-menu h4 {
    margin: 0 0 10px 0;
    font-size: 13px;
    color: #999;
}
.common-menu ul {

}
.common-menu ul > li {
    height: 35px;
    line-height: 35px;
    border-top: 1px solid #e1e1e1;
}
.common-menu ul > li:nth-last-of-type(1) {
    border-bottom: 1px solid #e1e1e1;
}
.common-menu ul > li a {
    display: inline-block;
    font-size: 15px;
    color: #888888;
    width: 100%;
    height: 100%;
}
.login-in-box-out {
    animation: login-in-box-out ease-in 300ms forwards;
}
.login-in-box-in {
    animation: login-in-box-in ease-in 300ms forwards;
}
.close-login-box {
    font-size: 18px;
    color: #999;
    transition: color .3s ease-in-out;
    position: absolute;
    right: 10px;
    top: 19px;
}
.close-login-box:hover {
    color: red;
}
.login-in-box {
    transform: translateX(-400px);
    position: fixed;
    top: 150px;
    z-index: 6;
    left: 0;
    width: 400px;
    height: 345px;
    background-color: #fff;
    border: 1px solid #e1e1e1;
    border-radius: 7px;
}
.login-in-box h4 {
    text-align: center;
    line-height: 30px;
    height: 30px;
    margin: 15px 0;
    font-weight: normal;
    font-size: 17px;
    color: #999999;
}
.fast-entry {
    position: fixed;
    top: 270px;
    left: 0;
    width: 30px;
    border-radius: 0 6px 6px 0;
    height: 120px;
    padding-left: 7px;
    cursor: pointer;
    z-index: 3;
    line-height: 17px;
    padding-top:30px;
    font-size: 13px;
    text-align: center;
    word-wrap: break-word;
    letter-spacing: 20px;
    background: linear-gradient(to bottom, #6EE4E7, #c0e3e7);
    color: #FFFFFF;
}
.fast-entry:hover {
    box-shadow: 1px 1px 10px #6EE4E7;
}
  .router-link-active {
    color: #000;
  }
  .router-link-active::before{
    width: 30px;
  }
  header {
    height: 60px;
    /*background-color: rgb( 247, 247, 247 );*/
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
.home-container {
    background-color: rgb( 247, 247, 247 );
}
</style>
