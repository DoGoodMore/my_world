import Vue from 'vue' ;
import router from './router/router' ;
import App from './App' ;
import './static/style/reset.css' ;
import './static/style/common.css' ;
import './static/style/fonts/style.css' ;
import 'highlight.js/styles/zenburn.css' ;
import hljs from 'highlight.js'


//重新触发全局的高亮显示方法
Vue.directive('hljs', el => {
    let blocks = el.querySelectorAll('pre code') ;
    Array.prototype.forEach.call(blocks, hljs.highlightBlock) ;
});


hljs.initHighlightingOnLoad() ;
import { Carousel, CarouselItem, Row, Col, Card, Tag, Breadcrumb, BreadcrumbItem,
    Menu, Submenu, MenuItem, MenuItemGroup, Tooltip,  Form, FormItem,
    Input, Button, Progress, Tabs, TabPane, Dialog, Upload, Message,
    Select, Option } from 'element-ui' ;

Vue.config.productionTip = false ;

// Vue.use( Message ) ;
Vue.prototype.$message = Message ;

Vue.use( Carousel ) ;
Vue.use( Select ) ;
Vue.use( Option ) ;
Vue.use( Upload ) ;
Vue.use( Dialog ) ;
Vue.use( Tabs ) ;
Vue.use( TabPane ) ;
Vue.use( CarouselItem ) ;
Vue.use( Menu ) ;
Vue.use( Submenu ) ;
Vue.use( MenuItem ) ;
Vue.use( MenuItemGroup ) ;
Vue.use( Row ) ;
Vue.use( Col ) ;
Vue.use( Card ) ;
Vue.use( Tag ) ;
Vue.use( Breadcrumb ) ;
Vue.use( BreadcrumbItem ) ;
Vue.use( Tooltip ) ;
Vue.use( Form ) ;
Vue.use( FormItem ) ;
Vue.use( Input ) ;
Vue.use( Button ) ;
Vue.use( Progress ) ;


new Vue( {
  components : { App },
  template: '<App />',
  router
} ).$mount( '#app' ) ;
