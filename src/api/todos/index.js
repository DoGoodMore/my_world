import request from '@/util/request' ;
import proxy from '../proxy' ;

/**
 *
 * 添加新的待办事项
 * @param data
 */
export function addTodo(data) {
    return request( {
        url: proxy + '/todos/addTodo',
        method: 'POST',
        data
    } )
}
/**
 *
 * 获取到当前所有的todo信息的分页数据
 * @param data
 */
export function getTodosPage(data) {
    return request( {
        url: proxy + '/todos/getTodosPage',
        method: 'POST',
        data
    } )
}
/**
 *
 * 完成当前待办事项
 * @param data
 */
export function finishTodo(data) {
    return request( {
        url: proxy + '/todos/finishTodo',
        method: 'POST',
        data
    } )
}
/**
 *
 * 删除指定待办事项
 * @param data
 */
export function deleteTodo(data) {
    return request( {
        url: proxy + '/todos/deleteTodo',
        method: 'POST',
        data
    } )
}
/**
 *
 * 更新某个待办事项
 * @param data
 */
export function updateTodo(data) {
    return request( {
        url: proxy + '/todos/updateTodo',
        method: 'POST',
        data
    } )
}
