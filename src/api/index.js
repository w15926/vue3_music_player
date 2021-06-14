/* 
  @Description: 首页相关接口
  @Author: 王乐翔
  @Date: 2021-06-xx xx:xx:xx
  @LastEditTime: 2021-06-xx xx:xx:xx
  @LastEditors: 王乐翔
 */

import request from '@/utils/request'

// 获取音乐url
export function getSongUrl(data) {
  return request({
    url: '/song/url',
    method: 'get',
    params: {
      id: data
    }
  })
}