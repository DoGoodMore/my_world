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

/**
 *  添加新的文章
 * @param data
 */
export function add(data) {
    return request( {
        url: proxy + '/article/add',
        method: 'POST',
        data
    } )
}
/**
 *  获取最近的文章列表
 * @param data
 */
export function getArticleListPage(data) {
    return request( {
        url: proxy + '/article/getArticleListPage',
        method: 'POST',
        data
    } )
}
