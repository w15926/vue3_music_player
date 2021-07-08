/* 
  @Description: 发现音乐相关接口
  @Author: 王乐翔
  @Date: 2021-06-xx xx:xx:xx
  @LastEditTime: 2021-06-xx xx:xx:xx
  @LastEditors: 王乐翔
 */

import request from '@/utils/request'

// 获取轮播图
export function bannerData() {
  return request({
    url: '/banner'
  })
}

// 获取推荐歌单
export function songSheet(data) {
  return request({
    url: '/personalized',
    method: 'get',
    params: data
  })
}

// 获取最新音乐（推荐排行）
export function newMusic(data) {
  return request({
    url: '/personalized/newsong',
    method: 'get',
    params: data
  })
}

// 获取推荐mv
export function recommendMV(data) {
  return request({
    url: 'personalized/mv'
  })
}