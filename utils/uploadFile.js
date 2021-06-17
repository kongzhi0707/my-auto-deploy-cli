
const runCommand = require('./runCommand');
const getCurrentTime = require('./handleTime');
const { startLog, successLog, errorLog } = require('./logger');

// 上传文件
async function uploadFile(ssh, config, localFile) {
  return new Promise((resolve, reject) => {
    startLog('zip包文件开始上传..., 请稍等...');
    // 是否在服务器下备份文件
    if (config.openBackUp) {
      handleSourceFile(ssh, config);
    }
    console.log('----', localFile);
    console.log(config.deployDir + config.targetFile);
    
    ssh.putFile(localFile, config.deployDir + config.targetFile).then(async () => {
      successLog(' zip包上传成功');
      startLog(' (5) 解压zip包');
      resolve();
    }).catch(err => {
      errorLog(' 文件传输异常', err);
      reject();
      process.exit(0);
    })
  });
}

// 处理源文件(ssh对象, 配置信息)
async function handleSourceFile(ssh, config) {
  startLog('已开启远端备份!');
  await runCommand(
    ssh,
    `
    if [ -d ${config.releaseDir} ];
    then mv ${config.releaseDir} ${config.releaseDir}_${getCurrentTime()}
    fi
    `,
    config.deployDir
  )
}
module.exports = uploadFile;