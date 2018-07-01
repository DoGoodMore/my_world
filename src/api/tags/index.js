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
