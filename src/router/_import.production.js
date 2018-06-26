/*module.exports = file => {
  try {
    return import( '@/components/' + file + '.vue' ) ;
  } catch (e) {
    console.log( e ) ;
    return import( '@/components/errorPage/404.vue' ) ;
  }
}*/

/*module.exports = file => () => {
    try {
        return import( '@/components/' + file + '.vue' ) ;
    } catch (e) {
        console.log( e ) ;
        return import( '@/components/errorPage/404.vue' ) ;
    }
}*/
module.exports = file => () => import('@/components/' + file + '.vue')
