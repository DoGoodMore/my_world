export const TokenKey = '__token__' ;

export function getToken() {
    return window.localStorage.getItem( TokenKey ) ;
}

export function saveToken(token) {
    return window.localStorage.setItem( TokenKey, token ) ;
}

export function login() {
    return window.localStorage.setItem( 'isLogin', true ) ;
}

export function loginOut() {
    return window.localStorage.clear() ;
}

export function getLoginStatus() {
    return !!window.localStorage.getItem( 'isLogin' ) ;
}

export function paramsMethod( url, data ) {
    return JSON.stringify( {
        url,
        token: getToken() || '',
        data
    } )
}
