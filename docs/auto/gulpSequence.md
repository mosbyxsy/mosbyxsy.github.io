# gulp执行顺序

*创建于：2018-12-26；更新于：2018-12-26*

gulp是前端开发中自动化构建工具，类似java中的maven；gulp默认采用异步执行任务，提高构建效率，但是有时候我们需要同步执行一些任务，比如先执行删除原先文件，再执行打包任务；

## gulp任务依赖

```javascript
//简单无依赖的任务
gulp.task("clean", function() {});

//有依赖的任务
gulp.task("build", ["clean"], function() {});

//默认任务
gulp.task("default", function() {});
```

如果我们希望执行"build"在"clean"之后，但是仅仅写上任务依赖并不行；

## gulp实现同步执行

### 使用回调callback

在任务定义的function中传入callback变量，当callback()执行时，任务结束。

```javascript
gulp.task("clean", function(cb) {
    //某些操作
    cb();
})
```
不建议使用，callback需要等到所有任务执行完后调用。

### 返回一个数据流

在任务定义的function中返回一个数据流，当该数据流的end事件触发时，任务结束。

```javascript
gulp.task("clear", function() {
    return gulp.src()//其他操作
})
```

### 返回promise对象

在任务定义的function中返回一个promise对象，当该promise对象resolve时，任务结束(未实践)。

### 使用run-sequence

安装run-sequence插件实现任务的同步，异步执行。

```javascript
//安装run-sequence
npm i run-sequence -D

//引用
var runSequence = require("run-sequence");

//执行任务
gulp.task("default", function(cb) {
    runSequence("clean", ["js", "css"], cb);
});
```

建议使用run-sequence实现gulp任务的同步，异步控制；
