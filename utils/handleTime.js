
// 获取当前时间

function getCurrentTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = coverEachUnit(date.getMonth() + 1);
  const day = coverEachUnit(date.getDate());
  const hour = coverEachUnit(date.getHours());
  const minute = coverEachUnit(date.getMinutes());
  const seconds = coverEachUnit(date.getSeconds());
  return `${year}-${month}-${day}_${hour}:${minute}:${seconds}`;
}

// 转换时间 一位至二位
function coverEachUnit(val) {
  return val < 10 ? '0' + val : val;
}

module.exports = getCurrentTime;