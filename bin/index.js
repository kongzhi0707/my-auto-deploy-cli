#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const packageJSON = require('../package.json');
const deployPath = path.join(process.cwd(), './deploy');
const deployConfigPath = `${deployPath}/deploy.config.js`;
const version = packageJSON.version;
const { errorLog, underlineLog, checkDeployConfig, infoLog } = require('../utils/logger');

const program = require('commander');

program
  .version(version)
  .command('init')
  .description('初始化部署相关配置')
  .action(() => {
    require('../lib/init')();
  });

const agrs = process.argv.slice(2);
const firstArg = agrs[0];

if (!firstArg) { 
  // 如果没有，相当于执行命令的 --help选项。显示help信息
  program.help();
  return;
}

// 如果有配置文件的话，就部署
if (fs.existsSync(deployConfigPath)) {
  // 如果执行 deploy dev  或 执行 deploy prod 时
  if (firstArg === 'dev' || firstArg === 'prod') {
    deployFunc();
  }
}
async function deployFunc () {
  try {
    const deployConfigs = checkDeployConfig(deployConfigPath, firstArg);
    if (!deployConfigs) {
      process.exit(1);
    }
    deployConfigs.forEach(config => {
      const { command, projectName, name } = config;
      program
        .command(`${command}`)
        .description(`${underlineLog(projectName)}项目被部署`)
        .action(() => {
          inquirer.prompt([
            {
              type: 'confirm',
              message: `${underlineLog(projectName)}项目是否部署到${underlineLog(name)}？`,
              name: 'sure'
            }
          ]).then(answer => {
            const { sure } = answer;
            if (!sure) {
              infoLog('项目部署已退出...');
              process.exit(1);
            } else {
              const deploy = require('../lib/deploy');
              deploy(config);
            }
          })
      });
    });
  } catch(err) {
    errorLog('部署过程出现错误！', err); 
  }
}
// 解析参数
program.parse(process.argv);