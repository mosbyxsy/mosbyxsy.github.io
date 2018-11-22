# consoleFun方法

*创建于：2018-11-22；更新于：2018-11-22*

console下包含各种有用的方法，灵活使用可以给页面开发带来便利

## console.log

console.log和consoel.info类似，对应的浏览器过滤条件是info,用法举例：

```javascript
console.log(123, '123'); //直接输出变量
console.log('hello %s %d %o', 'world', 100, {a : 1}); //设定格式输出
console.log('this is %cbutton', 'color: #fff; padding : 2px 4px; background: yellow;'); //设定样式输出
```

其中占位符为下：
- `%s` 字符串
- `%d` 数字
- `%o` 对象
- `%i` 整数
- `%f` 浮点数
- `%c` css格式字符串

## console.warn

consoel.warn对应的浏览器过滤条件是warnings，打印警告信息

## console.error

console.error对应的浏览器过滤条件是Errors，打印错误信息，同时会显示错误的堆栈

## consoel.dir

console.dir以对象格式输出对象，尤其是对输出DOM对象非常有用，`console.dir(document.body)`

## console.table

console.table用于将特定数组或者对象以表格的形式展示，例如：

```javascript
var languages1 = [
    { name: "JavaScript", fileExtension: ".js" },
    { name: "TypeScript", fileExtension: ".ts" },
];
var languages2 = {
  en: { name: "英语"},
  zn: { name: "中文"}
};
console.table(languages1);
console.table(languages2);
```

## console.assert

console.assert接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果。例如`console.assert(false, 'false会显示红色信息')`

## console.count和console.countReset

console.count可以作为计数器，输出同样参数出现的次数，也可以不带参数，使用console.countReset重置计数器

## console.trace

console.trace方法显示当前执行的代码在堆栈中的调用路径。

## console.clear

consoel.clear清楚控制台信息，光标回到第一行。

## console.time和console.timeEnd

多用于计算某一操作所花费的时间，time方法表示计时开始，timeEnd方法表示计时结束。它们的参数是计时器的名称。调用timeEnd方法之后，console窗口会显示“计时器名称: 所耗费的时间”。

## console.profile和console.profileEnd

console.profile方法用来新建一个性能测试器，console.profileEnd方法用来结束正在运行的性能测试器(只有部分浏览器支持)。

打开浏览器的开发者工具，在Memory ->profile面板中，可以看到这个性能调试器的运行结果。

## console.group/console.groupEnd和console.groupCollapsed

分组输出信息，支持嵌套，console.group默认展开分组，console.groupCollapsed默认折叠分组(支持较差),都是用console.groupEnd结束分组；
