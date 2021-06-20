// 分秒
export function timeFormat(val) {
  const dt = new Date(val)
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${mm} : ${ss}`
}