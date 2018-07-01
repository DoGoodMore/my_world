import Router from 'vue-router' ;
import Vue from 'vue' ;

Vue.use( Router ) ;

export const _import = require( './_import.' + process.env.NODE_ENV ) ;

const routes = [
  {
    path : '/',
    redirect: '/home/index'
  },
  {
    path: '/home',
    redirect: '/home/index',
    children: [
      {
        path: '/home/index',
        component: _import( 'home/components/index' )
      },
      {
        path: '/home/demo',
        component: _import( 'demo/demo' )
      },
      {
        path: '/home/article',
        component: _import( 'article/article' )
      },
      {
        path: '/home/about',
        component: _import( 'about/about' )
      },
      {
        path: '/home/contact',
        component: _import( 'contact/contact' )
      },
      {
        path: '/home/article-detail',
        component: _import( 'article/article-detail' )
      },
      {
        path: '/home/add-article',
        component: _import( 'article/add-article' )
      },
      {
        path: '/home/article-list',
        component: _import( 'article/article-list' )
      },
      {
        path: '/home/settings',
        component: _import( 'setting/settings' )
      }
    ],
    component: _import( 'home/home' )
  }
] ;

export default new Router( {
  routes
} )
