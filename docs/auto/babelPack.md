# babel转换最新语法

*创建于：2019-06-11；更新于：2018-06-19*

最新ES2015+的语法特性无法在所有浏览中得到统一的实现和兼容，往往需要转译成ES5语法；

## @babel/cli

@babel/cli是babel的命令行工具，当使用babel的时候还需要安装babel的核心库；

```
npm i @babel/cli @babel/core -D
npm i babel-loader -D // 如果使用webpack需要安装
```

如果仅仅使用@babel/cli和@babel/core，而不实用任何预设（插件的集合）和插件，代码不会被转化，只是会优化代码（比如添加标点符号，调整代码的格式）；

## @babel/preset-env

@babel/preset-env(开发依赖)是一个新语法的plugin集合，几乎可以编译所有新的 JavaScript语法（也会生成帮助函数），但并不会转化BOM里面不兼容的API
比如 Promise,Set,Symbol,Array.from,async等;

```javascript
module.exports = { 
    presets: [
        [
            "@babel/env",
            {
                targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1"
                },
                useBuiltIns: "usage" // false，entry，usage
            }
        ]
    ]
};
```

## @babel/polyfill

#### 在低版本(babel<7.4.0)中:

@babel/polyfill是为了模拟一个完整的ES2015+环境(实现Promise，Map等新API，静态方法，实例方法)，需要在应用程序中提前引入，并且同项目代码一起编译到生产环境(生产依赖)。

- 全量加载
    ```
    // 入口文件中引入
    import "@babel/polyfill"; // ES6模块加载
    require("@babel/polyfill"); // commonjs模块加载
    // 在webpack入口中添加
    module.exports = {
        entry: ["@babel/polyfill", "./app/js"],
    };
    ```
- 按需加载
    ```
    // 在插件@babel/polyfill中设置useBuiltIns为usage
    [
        [
            "@babel/env",
            {
                targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1"
                },
                useBuiltIns: "usage"
            }
        ]
    ]
    ```


#### 最新版本(babel>=7.4.0)中:

@babel/polyfill是@babel/runtime-corejs2的[别名](https://babeljs.io/docs/en/v7-migration);

可以使用以下方法实现[@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill)原来的功能;

- 全量引入
    ```
    // 在入口文件中
    import "core-js/stable";
    import "regenerator-runtime/runtime";
    // 如果在@babel/preset-env中配置useBuiltIns为entry，则会根据配置的浏览器兼容，加载不兼容的所有API
    // 需要在入口文件中包含上面的引用
    [
        "@babel/env",
        {
            corejs: 3, //2或者3
            useBuiltIns: "entry"
        }
    ]
    ```
- 按需加载
    ```
    // 配置@babel/preset-env中配置useBuiltIns为usage
    // 不需要在入口文件引入core-js/stable等
    [
        "@babel/env",
        {
            corejs: 3, //2或者3
            useBuiltIns: "usage"
        }
    ]
    ```

#### 问题：

- 会污染全局变量。像Map，Array.prototype.find这些就存在于全局空间中。不利用作为类库提供给第三方使用；
- 全量加载，导致体积过大(可以通过配置@babel/preset-env中的useBuiltIns实现按需加载，减小打包体积)

## @babel/plugin-transform-runtime

#### 安装：

```
npm i @babel/plugin-transform-runtime -D
npm i @babel/runtime -S // 注意这是生产依赖
```

#### 配置：

```
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

#### 作用：

- 能够去除打包中重复引用的帮助函数，使用@babel/runtime中的helpers；
- @babel/plugin-transform-runtime会为代码创建一个沙盒环境，不会污染全局变量；

#### 问题：

无法使用浏览器不兼容的实例api,比如`"foobar".includes("foo")`;

#### 解决：使用@babel/runtime-corejs2代替@babel/runtime；

```
// 安装
npm i @babel/runtime-corejs2 -S
// 插件配置
{
  "plugins": [["@babel/plugin-transform-runtime", {corejs: 2}]]
}
```

@babel/runtime-corejs2 ≈ @babel/runtime + @babel/polyfill

## 参考

- [babel7升级实践](https://blog.hhking.cn/2019/04/02/babel-v7-update/)
- [babel7中 corejs和 corejs2的区别](https://www.cnblogs.com/htoooth/p/9724609.html)
- [useBuiltInsor 和 transform-runtime不能同时使用](https://segmentfault.com/q/1010000018937075/)
- [Babel插件：@babel/plugin-transform-runtime](https://www.cnblogs.com/sea-breeze/p/10490672.html)
- [关于babel 的一些包理解7.X版本](https://blog.csdn.net/weixiaoderensheng/article/details/82993332)
- [Upgrade to Babel 7](https://babeljs.io/docs/en/v7-migration)
- [Babel 7.1介绍 transform-runtime polyfill env](https://www.jianshu.com/p/d078b5f3036a)
- [corejs与env、runtime的不解之缘](https://zhuanlan.zhihu.com/p/66790750)
- [Babel 社区概览](https://juejin.im/post/5cb9833b6fb9a068a84fe4d0)
