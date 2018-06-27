export const TokenKey = '__token__' ;

export function getToken() {
    return window.sessionStorage.getItem( TokenKey ) ;
}

export function paramsMethod( url, data ) {
    return JSON.stringify( {
        url,
        token: getToken() || '',
        data
    } )
}
