
const archiver = require('archiver');
const fs = require('fs');
const { startLog, successLog, errorLog } = require('./logger');

// 开始压缩
function compressFileZip(targetDir, localFile) {
  return new Promise((resolve, reject) => {
    startLog('1-正在压缩文件...');
    const output = fs.createWriteStream(localFile);
    const arch = archiver('zip', {
      zlib: { level: 9 },
    });
    output.on('close', () => {
      successLog(`2-压缩完成！共计 ${arch.pointer()} 字节`);
      resolve();
    }).on('error', (err) => {
      errorLog(console.error('压缩失败', err));
      reject();
    })
    arch.pipe(output); // 管道存档数据到文件
    arch.directory(targetDir, 'dist'); // 存储目标文件并重命名
    arch.finalize(); // 完成文件归档
  });
}
module.exports = compressFileZip;