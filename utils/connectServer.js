
// 链接远端ssh服务器

const node_ssh = require('node-ssh');
const ssh = new node_ssh();
const { successLog, errorLog } = require('./logger');

function connectServer(config) {
  return new Promise((resolve, reject) => {
    const { host, port, username, password } = config;
    const obj = {
      host, 
      port, 
      username, 
      password
    };
    ssh.connect(obj).then(() => {
      successLog('3-' + host + ' 服务器连接成功')
      resolve();
    }).catch(err => {
      errorLog('3-'+host + ' 服务器连接失败', err)
      reject();
      process.exit(0);
    });
  });
}

module.exports = {
  ssh,
  connectServer
};