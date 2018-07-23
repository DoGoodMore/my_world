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
 *  更新文章内容
 * @param data
 */
export function update(data) {
    return request( {
        url: proxy + '/article/update',
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
/**
 *  删除对应文章接口
 * @param data
 */
export function delArticle(data) {
    return request( {
        url: proxy + '/article/delArticle',
        method: 'POST',
        data
    } )
}
/**
 *  更新文章是否为热门
 * @param data
 */
export function updateArticleHot(data) {
    return request( {
        url: proxy + '/article/updateArticleHot',
        method: 'POST',
        data
    } )
}
/**
 *  获取所有热门文章
 * @param data
 */
export function getHotArticles(data) {
    return request( {
        url: proxy + '/article/getHotArticles',
        method: 'POST',
        data
    } )
}
/**
 *  获取文章详情
 * @param data
 */
export function getArticleDetail(data) {
    return request( {
        url: proxy + '/article/getArticleDetail',
        method: 'POST',
        data
    } )
}
/**
 *  获取相似文章列表
 * @param data
 */
export function getLikeArticles(data) {
    return request( {
        url: proxy + '/article/getLikeArticles',
        method: 'POST',
        data
    } )
}
/**
 *  根据ID获取某个文章
 * @param data
 */
export function getArticleById(data) {
    return request( {
        url: proxy + '/article/getArticleById',
        method: 'POST',
        data
    } )
}
/**
 *  根据类型获取文章列表
 * @param data
 */
export function getArticleListByType(data) {
    return request( {
        url: proxy + '/article/getArticleListByType',
        method: 'POST',
        data
    } )
}
/**
 *  为谋篇文章点赞
 * @param data
 */
export function likeArticle(data) {
    return request( {
        url: proxy + '/article/likeArticle',
        method: 'POST',
        data
    } )
}
/**
 *  为某篇文章点踩
 * @param data
 */
export function notLikeArticle(data) {
    return request( {
        url: proxy + '/article/notLikeArticle',
        method: 'POST',
        data
    } )
}
