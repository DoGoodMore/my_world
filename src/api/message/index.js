import request from '@/util/request' ;
import proxy from '../proxy' ;

/**
 *
 * @param data
 *  发送新的消息
 */
export function sendMessage(data) {
    return request( {
        url: proxy + '/message/sendMessage',
        method: 'POST',
        data
    } )
}
/**
 *
 * @param data
 *  发获取消息列表的分页数据
 */
export function getMessagePage(data) {
    return request( {
        url: proxy + '/message/getMessagePage',
        method: 'POST',
        data
    } )
}
/**
 *
 * @param data
 *  删除对应的消息
 */
export function deleteMessage(data) {
    return request( {
        url: proxy + '/message/deleteMessage',
        method: 'POST',
        data
    } )
}
/**
 *
 * @param data
 *  查看对应的消息
 */
export function lookMessage(data) {
    return request( {
        url: proxy + '/message/lookMessage',
        method: 'POST',
        data
    } )
}
