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

// 获取歌单详情
export function musicDetail(data) {
  return request({
    url: 'playlist/detail',
    method: 'get',
    params: {
      id: data
    }
  })
}

// 获取歌曲详情
export function songDetail(data) {
  return request({
    url: '/song/detail',
    method: 'get',
    params: {
      ids: data
    }
  })
}

// 所有评论 type: 0歌曲 1MV 2歌单 3专辑 4电台 5视频 /comment/hot?id=186016&type=0
export function commentPlaylist(data) {
  return request({
    url: '/comment/playlist',
    method: 'get',
    params: data
  })
}