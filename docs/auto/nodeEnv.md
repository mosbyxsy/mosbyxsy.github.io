# 开发环境配置

*创建于：2018-12-06；更新于：2018-12-07*

本文以webpack@3.x为例，相对于webpack@4.x存在差异

## 配置node环境

process对象是 Node的一个全局对象，提供当前 Node进程的信息。process.env包含着关于系统环境的信息。但是process.env中并不存在NODE_ENV这个变量。NODE_ENV是用户一个自定义的变量(约定俗成)，可用于区分生产环境或开发环境(Node环境)。

### 在win上设置

```javascript
//package.json中scripts配置
"dev": "set NODE_ENV=development&& webpack-dev-server"
"build": "SET NODE_ENV=production&& webpack"
```

注意：
- set可以不区分大小写
- `=`,`development`,`production`两边不要有空格
- 最好使用`&&`和其他命令分隔

### 在mac上设置

```javascript
//package.json中scripts配置
"dev": "export NODE_ENV=development&& webpack-dev-server"
"build": "export NODE_ENV=production&& webpack"
```

### 其他

很多开发这会在配置文件中设置环境默认值，比如

```javascript
var NODE_ENV = process.env.NODE_ENV || "production";
```

### 使用cross-env设置

需要先本地安装cross-env包`npm i cross-env -D`

```javascript
"dev": "cross-env NODE_ENV=development webpack-dev-server"
"build": "cross-env NODE_ENV=production webpack"
```

注意：
- 不能添加`&&`分隔命令，cross-env会根据`&&`划分出几个环境区域，其他区域值为undefined

## 代码环境设置

上面配置仅在node执行环境生效，代码中任然无法获得process.env.NODE_ENV(很多库以此来区分开发和生产环境)，还需要以下配置

```javascript
//在webpack的plugins中设置
new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }
})
//或者
new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})
```

注意：
- 需要使用JSON.stringify对环境值进行包裹，或者使用`'"production"'`的形式
- 一般组件库设置为`production`可以去除开发提示，减小代码体积


```javascript
//假设有如下代码
if (process.env.NODE_ENV === 'production') {
    console.log('production');
}
//设置为
new webpack.DefinePlugin({
    'process.env.NODE_ENV': 'production',
})
//会编译成
if (production === 'production') {// production是一个变量，并不是我们想象中的字符串
    console.log('production');
}
//所以，需要配置为
new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
})
//或者
new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
})
```

也有人做如下配置

```javascript
new webpack.DefinePlugin({
    "__DEV__": JSON.stringify(procss.env.NODE_ENV === "development" || true) 
})
//代码中
if (__DEV__) {
    console.log("development");
}
```