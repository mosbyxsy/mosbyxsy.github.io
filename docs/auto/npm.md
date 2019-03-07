# npm命令

*创建于：2018-12-10；更新于：2019-03-08*

npm常用命令(使用`npm -l`查看)及说明：
- npm install/i npm@latest -g //升级全局npm
- npm install $modules -f //强制重新安装
- npm install $modules@">=0.1.0 <0.2.0" //指定安装区间版本
- npm install $modules --save/-S //保存到生产依赖
- npm install $modules --save-dev/-D //保存到开发依赖
- npm install $modules ---D --save-exact //保存确切版本
- npm install --production //只安装dependencies字段的模块
- npm remove/uninstall $modules //删除模块
- npm config list -l //查看npm配置
- npm init -y/-f //直接生成一个package.json -f:force
- npm set init-author-name 'Your name' //设置默认name，保存在~/.npmrc
- npm set init-author-email 'Your email' //设置默认email
- npm set init-author-url 'url' //设置默认url
- npm set init-license 'MIT' //设置默认协议
- npm set save-exact true //package.json将记录模块的确切版本，而不是一个可选的版本范围
- npm config set prefix $dir //设置全局安装位置
- npm config set cache $dir //设置全局缓存位置
- npm config set save-prefix ~ //package.json中具体版本好使用~，补丁包
- npm config set init.author.name $name //设置package.json中的默认name值
- npm config set init.author.email $email //设置package.json中的默认email值
- npm info $modules //查看模块的详细信息
- npm info $modules $key //查看模块的某个字段信息
- npm view $modules version //查看模块的最新版本
- npm view $modules versions //查看模块的所有版本
- npm search $modules //搜索包
- npm list --depth=0 //列出已经安装的
- npm updata $modules //升级指定包
- npm run/run-script $cmd //运行package.json中script命令  &&：同步执行 &：并行 |：前面的输出为后面的输入
- npm run //列出所有可执行命令，在script中可以通过$npm_package_version获得package.json的字段
- npm-run-all $cmd $cmd //同步执行
- npm-run-all --parallel //并行执行
    ``` 
    prepublish：发布一个模块前执行
    postpublish：发布一个模块后执行
    preinstall：用户执行npm install命令时，先执行该脚本
    postinstall：用户执行npm install命令时，安装结束后执行该脚
    preuninstall：卸载一个模块前执行
    postuninstall：卸载一个模块后执行
    preversion：更改模块版本前执行
    postversion：更改模块版本后执行
    pretest：运行npm test命令前执行
    posttest：运行npm test命令后执行
    prestop：运行npm stop命令前执行
    poststop：运行npm stop命令后执行
    prestart：运行npm start命令前执行
    poststart：运行npm start命令后执行
    prerestart：运行npm restart命令前执行
    postrestart：运行npm restart命令后执行
    ```
- npm link //生成全局符号链接
- npm adduser //在npmjs.com注册一个用户
- npm login //登录
- npm publish //发布
- npm home $modules //打开一个模块首页，不一定要安装
- npm repo $modules //打开一个模块的代码仓库，不一定要安装
- npm prune //显示没有在package.json中记录的已安装模块 
- npm shrinkwrap //锁定当前项目的依赖模块的版本,生成npm-shrinkwrap.json
- npm home $modules //打开模块首页
- npm repo $modules //打开仓库地址

