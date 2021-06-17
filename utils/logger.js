
const chalk = require('chalk');
const fs = require('fs');

// 成功提示
function successLog(...tips) {
  console.log(chalk.green(...tips));
}

// 错误提示
function errorLog(...tips) {
  console.log(chalk.red(...tips));
}

// 下划线重点突出
function underlineLog(tips) {
  return chalk.blue.underline.bold(`${tips}`);
}
// 开始部署日志
function startLog(...content) {
  console.log(chalk.magenta(...content));
}

// 信息日志
function infoLog(...content) {
  console.log(chalk.blue(...content));
}
function checkConfigSchema(key, configObj) {
  let flag = true;
  for (const item in configObj) {
    if (!configObj[item]) {
      errorLog(`${key}环境下${item}不能为空, 请重新检查配置`);
      flag = false;
      break;
    }
  }
  return flag;
}
// 检查deploy配置是否合理
function checkDeployConfig(deployConfigPath, firstArg) {
  // 如果有这个路径的话
  if (fs.existsSync(deployConfigPath)) {
    const config = require(deployConfigPath);
    const { privateKey, passphrase, projectName} = config;
    const keys = Object.keys(config);
    const configs = [];
    for (let key of keys) {
      if (config[key] instanceof Object) {
        if (key === firstArg) {
          if (!checkConfigSchema(key, config[key])) {
            return false;
          }
        }
        config[key].command = key;
        config[key].privateKey = privateKey;
        config[key].passphrase = passphrase;
        config[key].projectName = projectName;
        configs.push(config[key]);
      }
    }
    /* configs 会返回如下数据
     [ 
      { 
        name: '测试环境',
        host: '39.97.218.178',
        post: 22,
        username: 'root',
        password: '',
        targetDir: './dist',
        targetFile: 'dist.zip',
        openBackUp: true,
        deployDir: '/usr/local/nginx/html/',
        releaseDir: 'web',
        command: 'dev',
        privateKey: '',
        passphrase: '',
        projectName: 'kongzhi-xx' 
      },
      { 
        name: '线上环境',
        host: '39.97.218.178',
        post: 22,
        username: 'root',
        password: '',
        targetDir: './dist',
        targetFile: 'dist.zip',
        openBackUp: true,
        deployDir: '/usr/local/nginx/html/',
        releaseDir: 'web',
        command: 'prod',
        privateKey: '',
        passphrase: '',
        projectName: 'kongzhi-xx' 
      } 
    ]
    */
    return configs;
  }
  infoLog(`缺少部署相关的配置，请运行${underlineLog('deploy init')}下载部署配置`);
  return false;
}
module.exports = {
  startLog,
  infoLog,
  successLog,
  errorLog,
  underlineLog,
  checkDeployConfig
};