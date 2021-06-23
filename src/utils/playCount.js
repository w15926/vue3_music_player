// 过滤播放次数  260000 -->  26万
export function playCount(val) {
  val.forEach((item) => {
    if (item.playCount > 10000) {
      item.playCount = parseInt(item.playCount / 10000) + '万'
    }
  })
}