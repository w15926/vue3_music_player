/* 
  @Description: 发现音乐相关接口
  @Author: 王乐翔
  @Date: 2021-06-11 xx:xx:xx
  @LastEditTime: 2021-06-11 xx:xx:xx
  @LastEditors: 王乐翔
 */

import request from '@/utils/request'

// 获取轮播图
export function getBannerData() {
  return request({
    url: '/banner'
  })
}

// 获取推荐歌单
export function getRecommendMusic(data) {
  return request({
    url: '/personalized',
    method: 'get',
    params: data
  })
}