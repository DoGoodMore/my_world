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
    Menu, Submenu, MenuItem, MenuItemGroup,} from 'element-ui' ;

Vue.config.productionTip = false ;


Vue.use( Carousel ) ;
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


new Vue( {
  components : { App },
  template: '<App />',
  router
} ).$mount( '#app' ) ;
