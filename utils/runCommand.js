
const { successLog, errorLog } = require('./logger');
// 执行linux命令
function runCommand(ssh, command, path) {
  return new Promise((resolve, reject) => {
    ssh.execCommand(command, { cwd: path }).then(result => {
      if (result.stderr) {
        errorLog('命令执行发生错误:' + result.stderr);
        reject();
        process.exit(1);
      } else {
        successLog(command + ' 执行完成');
        resolve();
      }
    })
  })
}

module.exports = runCommand;