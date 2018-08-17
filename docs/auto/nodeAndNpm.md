# node与npm

*创建于：2018-08-17；更新于：2018-08-17*

## node介绍及安装

Node.js是一个服务器端的、非阻断式I/O的、事件驱动的JavaScript运行环境，能够使得javascript脱离浏览器运行。

特点：
- Node.js中的JavaScript没有BOM、DOM，只有EcmaScript（基本语法），因为服务端不操作页面
- Node.js中为JavaScript提供了一些服务器级别的操作API（文件读写、构建网络服务、网络通信、http服务器等）
- 使用事件驱动、非阻塞IO模型（简单理解为异步）、轻量高效
- 大多数与JS相关的包都放在npm上

可以通过[Node.js](https://nodejs.org/)官网下载安装Node环境，其中自带npm(包管理工具);

使用：
- `node -v` 查看node版本(设置了指向的系统环境变量)
- `npm -v` 查看npm版本 (设置了指向的用户环境系统变量)

## node版本管理

### GNVM

[GNVM](https://github.com/Kenshin/gnvm)是一个简单的 Windows下 Node.js多版本管理器，但已经有两年没有更新了；

部分命令：
- `gnvm version` 查看gvnm版本
- `gnvm install latest` 安装最新版本（不会自动切换版本）
- `gnvm ls` 查看已经安装版本
- `gnvm use 版本号` 使用指定node版本
- `gnvm uninstall 版本号` 卸载指定版本

### NVM

NVM是一个可以让你在同一台机器上安装和切换不同版本node的工具,支持linux和window系统(推荐使用);

- linux系统[github地址](https://github.com/creationix/nvm)
- window系统[github地址](https://github.com/coreybutler/nvm-windows)
- window系统[下载地址](https://github.com/coreybutler/nvm-windows/releases),[安装教程](https://www.cnblogs.com/weiqinl/p/7503123.html)

部分命令：
- `nvm version` 查看nvm版本
- `nvm root [root]` 设置nvm存储不同node版本路径
- `nvm on` 启用node版本管理
- `nvm off` 禁用node版本管理(不卸载)
- `nvm list/ls` 列出已经安装的node版本
- `nvm install <version>` 安装指定node版本，安装最新版可以使用latest
- `nvm use <version>` 使用指定node版本
- `nvm uninstall <version>` 卸载指定node版本

## npm命令

以下是一些常用的npm命令，具体可以查看[官网说明](https://docs.npmjs.com/)
- `npm help cmd` 查看命令说明及使用方法
- `npm init` 初始化一个package.json文件
- `npm install/i [pkg] [-g]` 安装
- `npm install pkg@latest/<version>` 安装最新 /指定版本
- `npm uninstall/remove pkg` 卸载指定node包
- `npm list/ls/la/ll [-g] [pkg]` 查看已安装node包(或者某个)版本信息(最好加上`--depth=0`参数)
- `npm list | grep pkg` 只查看pkg包
- `npm info pkg` 查看某个node包的详细信息 
- `npm outdated [pkg]` 查看node包版本信息(当前版本，最新版本，想要安装版本)
- `npm updata [pkg]` 升级node包
- `npm search key` 查找相关node包
- `npm root -g` 查看全局安装路径 
- `npm view/v/info/show pkg version` 查看最新版本
- `npm view/v/info/show pkg versions` 查看所有版本
- `npm config get prefix` 查看全局包的路径
- `npm config get cache` 查看全局缓存的位置
- `npm config set prefix url` 设置全局包位置
- `npm config set cache url` 设置全局缓存位置
- `npm config get registry` 查看仓库地址
- `--save` / `-S` 保存在项目依赖
- `--save-dev` / `-D` 保存在开发依赖

关于包的命名规则等可以查看这篇[说明](https://zcfy.cc/article/the-npm-blog-new-package-moniker-rules),或者[npm-scope](https://www.npmjs.com.cn/misc/scope/)

## cnpm

[cnpm](http://npm.taobao.org/)(淘宝npm镜像)，是一个完整npmjs.org镜像，可以用此代替官方版本(只读)，同步频率目前为 10分钟 ；

安装命令：
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
但为了保持npm与cnpm版本同步，建议使用alias方式，具体设置方法，查看[官网](http://npm.taobao.org/);

## nrm(源管理)

[nrm](https://github.com/Pana/nrm)是一个 npm 源管理器，允许你快速地在 npm 源间切换。

安装nrm:
```
npm install -g nrm //全局安装
```

常用命令：
- `nrm -v/--version` 查看nrm版本
- `nrm ls` 查看所有源，当前源用`*`标注
- `nrm add <registry> <url>` 增加源
- `nrm del <registry>` 删除源
- `nrm test [registry]` 测试源速度
- `nrm use <registry>` 切换源

## package.json

### 版本号

使用NPM下载和发布代码时都会接触到版本号。NPM使用语义版本号来管理代码。
语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。
- 如果只是修复bug，需要更新Z位。
- 如果是新增了功能，但是向下兼容，需要更新Y位。
- 如果有大变动，向下不兼容，需要更新X位。

### 安装版本

- `*` 安装最新版本
- `^` 保持主版本号不变，安装最新版本(仅Y,Z位最新)
- `~` 保持主版本号、次版本号，安装最新版本(仅Z位最新)
- 不含有任何符号(例如：1.2.3)，安装指定版本

### 配置项说明

package.json中配置可以直接修改，也可以通过命令修改；

- `name` 包名/项目名
- `version` 版本号
- `description` 项目描述
- `scripts` 指定命令
- `homepage` 官网url
- `license` 许可证
- `author` 作者(它的值是你在https://npmjs.org网站的有效账户名，遵循“账户名<邮箱>”的规则)
- `contributors` 其它贡献者
- `dependencies` 生产依赖(--save/-S)
- `devDependencies` 开发依赖(--save-dev/-D)
- `repository` 仓库地址(type,url)
- `main` 程序的主入口(指定包被引用的文件)
- `keywords ` 关键字
- `config` 用于向环境变量输出值
- `engines` 指定项目所需要的node，npm版本
- `bin` 命令名和本地文件名的映射

更多配置信心，可以查看这篇中文[说明](http://www.mujiang.info/translation/npmjs/files/package.json.html)
