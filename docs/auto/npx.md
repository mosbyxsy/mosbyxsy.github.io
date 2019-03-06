# npx

npm从v5.2.0开始，增加npx命令，用于执行依赖包里的命令；

## 调用本地安装的命令

之前调用本地安装的命令方法：

- 设置`package.json`里的script字段，并运行
    ```javascript
    "script": {
        "webpack": "webpack -v"
    }
    // 命令行执行 npm run webpack
    ```
- 写出命令的完整路径
    ```javascript
    ./node_modules/.bin/webpack -v //或者 `npm bin`/webpack -v
    ```
    
现在调用本地安装的命令：

```javascript
npx webpack -v
```

运行的时候，会到node_modules/.bin路径找，如果如果找不到，就去环境变量$PATH(全局安装)里面找(甚至可以执行系统命令，如：npm ls)，如果还是没有会自动安装；

## 避免全局安装

使用npx可以避免全局安装，用于区分不同的项目；

```javascript
npx create-react-app <name>
```

npx将create-react-app下载到一个临时目录并立即执行，使用以后再删除(以后再次执行上面的命令，会重新下载create-react-app),也可以指定包的版本，例如：

```javascript
npx create-react-app@2.1.5 <name>
```

npx还可以配合参数使用：

```javascript
npx --no-install http-server //强制使用本地模块，不下载远程模块(如果本地不存在该模块，就会报错)
npx --ignore-existing http-server //忽略本地的同名模块，强制安装使用远程模块
```

## 指定node版本

利用 npx可以下载模块这个特点，可以指定某个版本的 Node运行脚本

```javascript
npx node@6 -v // 如果报错(Path must be a string. Received undefined)请升级npx
```

会先下载node@6版本(效果与使用nvm切换node版本一致)，使用后删除

参数：

```javascript
npx -p node@6 node -v //-p用于指定要安装的模块 npx -p <modules1> -p <modules2> [command]
```

## 执行远程仓库的可执行文件

npx可用于执行远程仓库的可执行文件;

```javascript
npx github:<account>/<rep> [other]
```

## 参考

- [非常好用的 npx](https://blog.csdn.net/csdn_yudong/article/details/81670477)
- [npx 使用教程](http://www.ruanyifeng.com/blog/2019/02/npx.html)
- [npx 是什么？](https://www.jianshu.com/p/cee806439865)

