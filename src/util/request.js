import axios from 'axios' ;
import { paramsMethod, saveToken } from "./util" ;
import { Message } from 'element-ui' ;

const request = axios.create( {
    // baseURL: process.env.BASE_API,
    baseURL: '',
    timeout: 4000,
    withCredentials: true,
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
} ) ;

request.interceptors.request.use( config => {
    return Object.assign( config, { data: paramsMethod( config.url.replace( config.baseURL, '' ), config.data ) } )
}, err => console.log( err ) ) ;

request.interceptors.response.use( response => {
    //在此处对返回的请求统一处理
    const { token, status, message } = response.data ;
    if ( status !== 0 ) {
        Message( {
            message: message,
            type: 'error'
        } )
    }
    if ( token ) saveToken( token ) ;
    return response.data
}, err => console.log( err, "request.js" ) ) ;

export default request ;
