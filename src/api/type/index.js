import request from '@/util/request' ;
import proxy from '../proxy' ;

/**
 *  新增类别接口
 * @param data
 */
export function addTypes(data) {
    return request( {
        url: proxy + '/types/addTypes',
        method: 'POST',
        data
    } )
}

/**
 *  获取分页类别接口
 * @param data
 */
export function getTypeListPage(data) {
    return request( {
        url: proxy + '/types/getTypeListPage',
        method: 'POST',
        data
    } )
}
/**
 *  新获取所有的一级类别列表
 * @param data
 */
export function getFirstTypeList(data) {
    return request( {
        url: proxy + '/types/getFirstTypeList',
        method: 'POST',
        data
    } )
}
/**
 *  删除某个类别
 * @param data
 */
export function delType(data) {
    return request( {
        url: proxy + '/types/delType',
        method: 'POST',
        data
    } )
}
/**
 *  获取所有类别接口
 * @param data
 */
export function getAllTypeList(data) {
    return request( {
        url: proxy + '/types/getAllTypeList',
        method: 'POST',
        data
    } )
}
/**
 *  更新类别信息
 * @param data
 */
export function updateType(data) {
    return request( {
        url: proxy + '/types/updateType',
        method: 'POST',
        data
    } )
}
