
const { successLog, underlineLog, errorLog } = require('./logger');
const runCommand = require('./runCommand');

// 开始执行远程命令，解压zip包
async function unzipFile(ssh, deployDir) {
  return new Promise((resolve, reject) => {
    console.log(deployDir);
    const commands = [`cd ${deployDir}`, 'pwd', 'unzip -o dist.zip && rm -rf dist.zip'];
    const promises = [];
    for (let i = 0; i < commands.length; i+=1) {
      promises.push(runCommand(ssh, commands[i], deployDir));
    }
    Promise.all(promises).then(() => {
      successLog(' 解压成功');
      underlineLog(' (6) 开始删除本地dist.zip')
      resolve();
    }).catch(err => {
      errorLog(' 文件解压失败', err);
      reject();
      process.exit(0);
    });
  });
}

module.exports = unzipFile;