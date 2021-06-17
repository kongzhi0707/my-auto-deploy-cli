
// 删除本地dist.zip包
const { successLog, errorLog, underlineLog } = require('./logger');
const fs = require('fs');

async function deleteLocalZip(localFile, config) {
  const { name } = config;
  return new Promise((resolve, reject) => {
    fs.unlink(localFile, err => {
      if (err) {
        errorLog(' 本地dist.zip删除失败', err);
        reject();
      }
      successLog(' 本地dist.zip删除成功\n');
      successLog(`\n 恭喜您，${underlineLog(name)}项目部署成功了^_^\n`);
      process.exit(0);
    })
  });
}

module.exports = deleteLocalZip;