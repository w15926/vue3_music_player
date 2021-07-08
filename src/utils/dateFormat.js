// 分秒
export function timeFormat(val) {
  const dt = new Date(val)
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${mm} : ${ss}`
}

// 年月日
export function timeFormatYMD(val) {
  const dt = new Date(val)
  const y = dt.getFullYear()
  const m = dt.getMonth() + 1
  const d = dt.getDate()
  return `${y}-${m}-${d}`
}