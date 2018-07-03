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
/**
 *  获取网站的公告和置顶内容
 * @param data
 */
export function getFileInfo(data) {
    return request( {
        url: proxy + '/common/getFileInfo',
        method: 'POST',
        data
    } )
}
/**
 *  修改网站的公告内容
 * @param data
 */
export function changePostFile(data) {
    return request( {
        url: proxy + '/common/changePostFile',
        method: 'POST',
        data
    } )
}
/**
 *  修改网站的置顶内容
 * @param data
 */
export function changeToppingFile(data) {
    return request( {
        url: proxy + '/common/changeToppingFile',
        method: 'POST',
        data
    } )
}
