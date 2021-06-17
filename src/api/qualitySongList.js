/* 
  @Description: 精品歌单相关接口
  @Author: 王乐翔
  @Date: 2021-06-xx xx:xx:xx
  @LastEditTime: 2021-06-xx xx:xx:xx
  @LastEditors: 王乐翔
 */

import request from '@/utils/request'

// 获取精品歌单
export function getQSList(data) {
  return request({
    url: '/top/playlist',
    method: 'get',
    params: data
  })
}

export function getBanner(data) {
  return request({
    url: '/top/playlist/highquality',
    method: 'get',
    params: data
  })
}