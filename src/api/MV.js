/* 
  @Description: MV相关接口
  @Author: 王乐翔
  @Date: 2021-06-xx xx:xx:xx
  @LastEditTime: 2021-06-xx xx:xx:xx
  @LastEditors: 王乐翔
 */

import request from '@/utils/request'

// 获取推荐MV
export function recommendMV(){
  return request({
    url:'/personalized/mv'
  })
}