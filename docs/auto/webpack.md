# webpack

*创建于：2020-11-04；更新于：2020-11-04*

- [webpack官网](https://webpack.js.org/)
- [webpack官网中文](https://webpack.docschina.org/)
- [webpack中文网](https://www.webpackjs.com/)

## loader

loader默认导出一个函数，接受匹配到的文件资源字符串和SourceMap

```javascript
// 不要使用箭头函数，有可能需要使用this
module.exports = function(source, map){
    /*
    const callback = this.async(); //异步操作调用callback,或者使用async/await
    callback({
        //当无法转换原内容时，给 Webpack 返回一个 Error
        error: Error | Null,
        //转换后的内容
        content: String | Buffer,
        //转换后的内容得出原内容的Source Map（可选）
        sourceMap?: SourceMap,
        //原内容生成 AST语法树（可选）
        abstractSyntaxTree?: AST 
    })
    */
    return source;
}
```

参数获取：[loader-utils](https://github.com/webpack/loader-utils)

参数校验：[schema-utils](https://github.com/webpack/schema-utils)

## plugin

插件应该导出一个函数，并且函数的原型中定义apply方法，或者是一个带有apply 方法的类

```javascript
// 1.通过函数实现
function MyPlugin (arg) {
    // 对参数进行处理
}

MyPlugin.propotype.apply = function (compiler) {
    compiler.hooks.done.tap("MyPlugin", (compilation) => {
       console.log("compilation done");
    });
}
// 2.通过类实现
class MyPlugin {
  constructor(arg) {
    // 此处可以对参数进行处理
  }
  apply (compiler) {
    compiler.hooks.done.tap("MyPlugin", (compilation) => {
       console.log("compilation done");
    });
  }
}
module.exports = MyPlugin;
```

工作流程：

1. webpack启动，执行new myPlugin(options)，初始化插件并获取实
2. 初始化complier对象，调用myPlugin.apply(complier)给插件传入complier对象
3. 插件实例获取complier，通过complier监听webpack广播的事件，通过complier对象操作webpack

## 参考资料

- [webpack中文文档](http://webpack.html.cn/)
- [深入浅出 Webpack](http://webpack.wuhaolin.cn/)
- [Webpack手写loader和plugin](https://juejin.im/post/6888936770692448270)