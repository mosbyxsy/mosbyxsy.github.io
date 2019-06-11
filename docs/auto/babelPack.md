# babel转换最新语法

*创建于：2019-06-11；更新于：2018-06-11*

最新ES2015+的语法特性无法在所有浏览中得到统一的实现和兼容，往往需要转译成ES5语法；

## @babel/preset-env

@babel/preset-env(开发依赖)是一个新语法的plugin集合，几乎可以编译所有新的 JavaScript语法，但并不会转化BOM里面不兼容的API
比如 Promise,Set,Symbol,Array.from,async等;

```javascript
module.exports = { 
    presets： [
        [
            "@babel/env",
            {
                targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1"
                    },
                useBuiltIns: "usage" // 这个很重要
            }
        ]
    ]
};
```

## @babel/polyfill

在低版本babel(<7.x)中， 是为了模拟一个完整的ES2015+环境(实现Promise，Map等新API，静态方法，实例方法)，需要在应用程序中提前引入，并且同项目代码一起编译到生产环境(生产依赖)。

问题：
- 会污染全局变量。像Map，Array.prototype.find这些就存在于全局空间中。不利用作为类库提供给第三方使用；
- 全量加载，导致体积过大(可以通过配置@babel/preset-env中的useBuiltIns实现按需加载，减小打包体积)

babel7 中 @babel/polyfill  是 @babel/runtime-corejs2的别名

## @babel/plugin-transform-runtime

## 参考

- [babel7中 corejs和 corejs2的区别](https://www.cnblogs.com/htoooth/p/9724609.html)
- [useBuiltInsor 和 transform-runtime不能同时使用](https://segmentfault.com/q/1010000018937075/)
- [Babel插件：@babel/plugin-transform-runtime](https://www.cnblogs.com/sea-breeze/p/10490672.html)
- [关于babel 的一些包理解7.X版本](https://blog.csdn.net/weixiaoderensheng/article/details/82993332)
- [Upgrade to Babel 7](https://babeljs.io/docs/en/v7-migration)
- [Babel 7.1介绍 transform-runtime polyfill env](https://www.jianshu.com/p/d078b5f3036a)
