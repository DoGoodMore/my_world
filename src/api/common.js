import request from '@/util/request' ;
import proxy from './proxy' ;

/**
 *
 * @param data
 */
export function testRequest(data) {
    return request( {
        url: proxy + '/test',
        method: 'POST',
        data
    } )
}
