/* 
  @Description: 最新音乐相关接口
  @Author: 王乐翔
  @Date: 2021-06-xx xx:xx:xx
  @LastEditTime: 2021-06-xx xx:xx:xx
  @LastEditors: 王乐翔
 */

import request from '@/utils/request'

// 获取最新音乐（新歌速递） 
// /top/song?type=96  全部:0  华语:7  欧美:96  日本:8  韩国:16
export function geNewMusic(data) {
  return request({
    url: '/top/song',
    method: 'get',
    params: data
  })
}
