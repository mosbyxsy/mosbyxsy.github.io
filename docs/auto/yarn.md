# yarn

yarn是一个与npm类似的包管理工具，它的诞生主要是为了解决npm的不足(现在也优化了)；

## yarn特点

- yarn使用并行下载，加快下载速度
- yarn支持离线缓存，无需重复下载
- 由yarn.lock(会自动更新)文件来实现依赖包的版本精准控制
- 优化下载命令行提示

yarn这些特点，在最新版本的npm上也得到了优化，并且yarn使用的是npm，bower的源；

## yarn与npm命令行对比

- `npm init` / `yarn init` 初始化项目
- `npm install` / `yarn [add]` 初始化安装
- `npm install [package] [-g] -S` / `yarn [global] add [package]` 安装到项目依赖
- `npm install [package] [-g] -D` / `yarn [global] add [package] --dev` 安装到开发依赖
- `npm outdated [package]` / `yarn outdated [package]` 查询过期版本
- `npm update [package] [-S/-D]` / `yarn upgrade [package]` 更新依赖包
- `npm -rf node_modules && npm install` / `yarn upgrade` 重新安装所有依赖包
- `npm run [script]` / `yarn run [script]` 运行脚本
- `npm cache clean` / `yarn cache clean` 清除缓存
- `npm uninstall <package> [–S/–D]` / `yarn remove <package>` 卸载

