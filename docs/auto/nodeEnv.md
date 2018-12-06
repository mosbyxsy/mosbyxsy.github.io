# 开发环境配置

*创建于：2018-12-06；更新于：2018-12-06*

本文以webpack@3.x为例，相对于webpack@4.x存在差异

## 配置node环境

process对象是 Node的一个全局对象，提供当前 Node进程的信息。process.env包含着关于系统环境的信息。但是process.env中并不存在NODE_ENV这个变量。NODE_ENV是用户一个自定义的变量(约定俗成)，可用于区分生产环境或开发环境。

在win上设置方法为

```javascript
"dev": "set NODE_ENV=development&& webpack-dev-server"
"build": "SET NODE_ENV=production&& webpack"
```

注意：
- set可以不区分大小写
- `=`,`development`,`production`两边不要有空格
- 最好使用`&&`和其他命令分隔