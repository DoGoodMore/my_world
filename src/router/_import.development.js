module.exports = file => {
  try {
    return require( '@/components/' + file + '.vue' ).default ;
  } catch (e) {
    console.log( e ) ;
    return require( '@/components/errorPage/404.vue' ).default ;
  }
}
