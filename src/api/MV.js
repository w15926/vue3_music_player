/* 
  @Description: MV相关接口
  @Author: 王乐翔
  @Date: 2021-06-xx xx:xx:xx
  @LastEditTime: 2021-06-xx xx:xx:xx
  @LastEditors: 王乐翔
 */

import request from '@/utils/request'

// 推荐MV
export function recommendMV() {
  return request({
    url: '/personalized/mv'
  })
}

// 最新MV
export function newMv(data) {
  return request({
    url: '/mv/first',
    method: 'get',
    params: data
  })
}

// 网易出品
export function wangYiRelease(data) {
  return request({
    url: '/mv/exclusive/rcmd',
    method: 'get',
    params: data
  })
}

// MV url
export function mvUrl(id) {
  return request({
    url: '/mv/url',
    method: 'get',
    params: { id }
  })
}

// 相关mv
export function simiMv(mvid) {
  return request({
    url: '/simi/mv',
    methodL: 'get',
    params: { mvid }
  })
}

// mv详情
export function mvDetail(mvid) {
  return request({
    url: '/mv/detail',
    method: 'get',
    params: { mvid }
  })
}