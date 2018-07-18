import request from '@/util/request' ;
import proxy from '../proxy' ;

/**
 *
 *  登录接口
 * @param data
 */
export function loginByUsername(data) {
    return request( {
        url: proxy + '/users/loginByUsername',
        method: 'POST',
        data
    } )
}
