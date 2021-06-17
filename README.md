
### 使用方式

  1. npm i my-auto-deploy-cli -g 把包下载下来。如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/images/44.jpg" /> <br />

  2. 进入自己的项目的根目录，然后运行 deploy init 命令下载配置文件，如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/images/45.jpg" /> <br />

  3. 在我们的项目的根目录下会生成 deploy/deploy.config.js 文件，如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/images/46.jpg" /> <br />

  deploy/deploy.config.js 配置文件内容如下：
```
const config = {
  privateKey: '', // 本地私钥地址，比如 xxx/.ssh/id_rsa  非必填，有私钥 就配置
  passphrase: '', // 本地私钥密码, 非必填，有私钥 就配置
  projectName: 'kongzhi自动化',
  dev: {
    name: '测试环境',
    script: 'npm run build', // 打包
    host: '', // 测试服务器地址
    post: 22, // ssh port 一般默认22
    username: 'root', // 登录服务器用户名
    password: '', // 登录服务器密码
    targetDir: '../dist',  // 目标压缩目录（可使用相对地址）
    targetFile: 'dist.zip', // 目标文件
    openBackUp: true, // 是否开启远端备份
    deployDir: '/usr/local/nginx/html' + '/', // 远端目录
    releaseDir: 'web' // 发布目录
  },
  prod: {
    name: '线上环境',
    script: 'npm run build', // 打包
    host: '', // 服务器地址
    post: 22, // ssh port 一般默认22
    username: 'root', // 登录服务器用户名
    password: '', // 登录服务器密码
    targetDir: '../dist',  // 目标压缩目录（可使用相对地址）
    targetFile: 'dist.zip', // 目标文件
    openBackUp: true, // 是否开启远端备份
    deployDir: '/usr/local/nginx/html' + '/', // 远端目录
    releaseDir: 'web' // 发布目录
  }
};
module.exports = config;
```
  4. 配置下我们的配置文件，这里提供了2种环境，一个是开发环境 dev，另一个是prod环境指的是打包到线上。我们把 host， username， password等等配置填写成自己的。配置完成后，比如我们打包代码到开发环境请，我们只需要运行 deploy dev 命令即可：如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/images/47.jpg" /> <br />

  如上的 npm run build 打包命令对应的是我们项目中的 package.json 中的script中的build，比如我本地项目的script是如下：
```
"scripts": {
  "dev": "cross-env NODE_ENV=development webpack-dev-server --progress --colors --devtool cheap-module-eval-source-map --hot --inline",
  "build": "cross-env NODE_ENV=production webpack --progress --colors --devtool cheap-module-source-map",
},
```
  最后会把dist.zip 文件打包到我们的 deploy目录下面当作临时存储下。之后打包完成后，我们会进行本地删除掉的。

  5. 当出现如下信息提示的时候，说明打包及上传代码已经成功了，如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/images/48.jpg" /> <br />

  6. 我们可以看下我们的服务器上确实有我们刚刚上传的资源文件，如下所示：

<img src="https://raw.githubusercontent.com/kongzhi0707/front-end-learn/master/images/49.jpg" /> <br />

  如果想学习更多可以看源码.

### 注意：如果github图片显示不出来的话，hosts记得本地如下ip地址即可：
```
# GitHub Start 
192.30.253.112    github.com 
192.30.253.119    gist.github.com
151.101.184.133    assets-cdn.github.com
151.101.184.133    raw.githubusercontent.com
151.101.184.133    gist.githubusercontent.com
151.101.184.133    cloud.githubusercontent.com
151.101.184.133    camo.githubusercontent.com
151.101.184.133    avatars0.githubusercontent.com
151.101.184.133    avatars1.githubusercontent.com
151.101.184.133    avatars2.githubusercontent.com
151.101.184.133    avatars3.githubusercontent.com
151.101.184.133    avatars4.githubusercontent.com
151.101.184.133    avatars5.githubusercontent.com
151.101.184.133    avatars6.githubusercontent.com
151.101.184.133    avatars7.githubusercontent.com
151.101.184.133    avatars8.githubusercontent.com
```









