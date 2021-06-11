/* 
  @Description: 发现音乐相关接口
  @Author: 王乐翔
  @Date: 2021-06-11 xx:xx:xx
  @LastEditTime: 2021-06-11 xx:xx:xx
  @LastEditors: 王乐翔
 */

import request from '@/utils/request'

export function getBannerData() {
  return request({
    url: '/banner'
  })
}