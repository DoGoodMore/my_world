import request from '@/util/request' ;
import proxy from '../proxy' ;

/**
 *  新增标签列表接口
 * @param data
 */
export function addNewTag(data) {
    return request( {
        url: proxy + '/tags/addNewTag',
        method: 'POST',
        data
    } )
}
/**
 *  获取对应标签列表
 * @param data
 */
export function getList(data) {
    return request( {
        url: proxy + '/tags/getTagList',
        method: 'POST',
        data
    } )
}
/**
 *  更新标签信息
 * @param data
 */
export function updateTag(data) {
    return request( {
        url: proxy + '/tags/updateTag',
        method: 'POST',
        data
    } )
}
/**
 *  删除标签
 * @param data
 */
export function delTag(data) {
    return request( {
        url: proxy + '/tags/delTag',
        method: 'POST',
        data
    } )
}
/**
 *  获取所有的标签列表
 * @param data
 */
export function getAllTags(data) {
    return request( {
        url: proxy + '/tags/getAllTags',
        method: 'POST',
        data
    } )
}

/**
 *  获取热门标签列表
 * @param data
 */
export function getHotTags(data) {
    return request( {
        url: proxy + '/tags/getHotTags',
        method: 'POST',
        data
    } )
}

/**
 *  更新热门标签
 * @param data
 */
export function updateHotTags(data) {
    return request( {
        url: proxy + '/tags/updateHotTags',
        method: 'POST',
        data
    } )
}
