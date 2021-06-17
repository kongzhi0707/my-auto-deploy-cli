const { startLog, successLog, errorLog } = require('./logger');
const ora = require('ora');
const childProcess = require('child_process');
// 执行打包脚本
function execBuild(script) {
  try {
    startLog(`\n, ${script}`);
    const spinner = ora('正在打包中');
    spinner.start();
    childProcess.execSync(script, {cwd: process.cwd()});
    spinner.stop();
    successLog('打包完成了...');
  } catch(err) {
    errorLog(err);
    process.exit(1);
  }
}

module.exports = execBuild;