import request from '@/util/request' ;
import proxy from '../proxy' ;

/**
 *
 * @param data
 */
export function addImg(data) {
    return request( {
        url: proxy + '/article/posts',
        method: 'POST',
        data
    } )
}
