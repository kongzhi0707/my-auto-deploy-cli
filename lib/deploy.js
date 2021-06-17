
const compressFileZip = require('../utils/compressFileZip');
const sshServer = require('../utils/connectServer');
const uploadFile = require('../utils/uploadFile');
const unzipFile = require('../utils/unzipFile');
const deleteLocalZip = require('../utils/deleteLocalZip');
const runCommand = require ('../utils/runCommand');
const execBuild = require('../utils/execBuild');

async function deploy(config) {
  try {
    const localFile = process.cwd() + '/deploy/' + config.targetFile; // 待上传的本地文件
    // 执行打包脚本
    execBuild(config.script);  
    // 本地文件压缩
    await compressFileZip(config.targetDir, localFile);
    // 服务器连接
    await sshServer.connectServer(config);
    // 服务器上传文件
    await uploadFile(sshServer.ssh, config, localFile);
    // 解压文件
    await unzipFile(sshServer.ssh, config.deployDir);
    // 修改文件名称
    await runCommand(sshServer.ssh, 'mv dist ' + config.releaseDir, config.deployDir);
    // 删除本地文件
    await deleteLocalZip(localFile, config);
  } catch(err) {
    console.log('部署过程出现错误！', err);
  }
}
module.exports = deploy;
