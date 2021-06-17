
const fs = require('fs');
const path = require('path');
const download = require('download-git-repo');
const ora = require('ora');

const { successLog, errorLog, infoLog } = require('../utils/logger');
const deployPath = path.join(process.cwd(), './deploy');
const deployConfigPath = `${deployPath}/deploy.config.js`;

// 检查配置文件是否已经生成了
const checkDeployExits = () => {
  if (fs.existsSync(deployPath) && fs.existsSync(deployConfigPath)) {
    infoLog('deploy.config.js配置文件已经存在, 请勿重新下载');
    process.exit(1);
    return;
  }
  downloadAndGenerate();
};

// 下载git模版
const downloadAndGenerate = () => {
  let url = 'github.com:tugenhua0707/store-base-template#deployConfig';
  const spinner = ora(`正在下载项目模版，源地址：${url}`);
  spinner.start();
  download(url, 'deploy', { clone: false }, err => {
    if (err) {
      spinner.fail();
      errorLog('下载失败', err);
    } else {
      // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
      spinner.succeed();
      successLog('模板下载成功，模板位置：deploy/deploy.config.js');
      infoLog('请配置deploy目录下的deploy.config.js配置文件');
      process.exit(0);
    }
  });
};

module.exports = () => {
  checkDeployExits();
};
