/* 
  @Description: 搜索相关接口
  @Author: 王乐翔
  @Date: 2021-06-xx xx:xx:xx
  @LastEditTime: 2021-06-xx xx:xx:xx
  @LastEditors: 王乐翔
 */

import request from '@/utils/request'

// 搜索
export function search(data) {
  return request({
    url: '/cloudsearch',
    method: 'get',
    params: data
  })
}