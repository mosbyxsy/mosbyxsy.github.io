# mobx

*创建于：2019-01-17；更新于：2019-02-26*

mobx是一个简单，可扩展的状态管理库，通常用于结合react一起使用,[【demo】](https://github.com/mosbyxsy/mobx-react-base/)

## 说明

- mobx的核心思想是，状态变化引起的副作用应该被自动触发
- 对比redux，mobx学习成本更低，对性能优化更友好
- mobx与react结合使用，需要引入mobx-react库
- mobx5.x与4.x版本api基本一致，5.x版本运行在任何支持 ES6 proxy 的浏览器，而4.x可以运行在任何支持 ES5的浏览器
```javascript
// 如果使用webpack进行打包，可以直接引用es6包(MobX 5包的主入口点附带 ES5代码，以便向后兼容所有构建工具)
resolve: { alias: { mobx: __dirname + "/node_modules/mobx/lib/mobx.es6.js" }}
```

## 环境配置

mobx推荐使用修饰器语法，当然这不是必须的[demo](https://github.com/mosbyxsy/mobx-react-base/tree/none-use-decorators)，Decorator是在 声明阶段 实现类与类成员注解的一种语法。

安装：
```javascript 
npm i @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators -D
```

- @babel/plugin-proposal-class-properties：支持在类中直接定义属性
- @babel/plugin-proposal-decorators：支持ES7的decorator

bebal配置：
```javascript
plugins: [
    [   
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
    ],
    [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
    ]
]
```

### 使用和不使用修饰器的对比

state：
```
// 使用
import {observable } from "mobx";

class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}
// 不使用
import { decorate, observable } from "mobx";

class Todo {
    id = Math.random();
    title = "";
    finished = false;
}
decorate(Todo, {
    title: observable,
    finished: observable
})
```

component:
```javascript
// 使用修饰器
import React, {Componnet} from 'react';
import {observe} from 'mobx-react';
@observe class Test extends Componnet{
    // ...
}
export default Test;
// 不使用修饰器
import React, {Componnet} from 'react';
import {observe} from 'mobx-react';
class Test extends Componnet {
    ...
}
export default observe(Test);
```

多个修饰器:
```javascript
// 使用修饰器
import React, {Componnet} from 'react';
import {observe, inject} from 'mobx-react';

@inject('foo') @observe
class Test extends Componnet {
  render() {
    const {foo} = this.props;
  }
}
export default Test;
// 不使用修饰器
import React, {Componnet} from 'react';
import {observe, inject} from 'mobx-react';
import {compose} from 'recompose';
class Test extends Componnet {
  render() {
    const {foo} = this.props;
  }
}
// 注意顺序
export default compose(
  inject('foo'),
  observe
)(Test)
```

总之使用修饰器，可以减少代码量，并且易于使用和理解，但需要相应的配置和编译;

## API介绍

主要围绕着可观察的数据(observable/extendObservable),可观察的数据引起的副作用(computed/autorun/when/reation),修改可观察数据(action/runInAction),工具方法(observe/toJS/spy/trace)展开说明

### observable/extendObservable

可以用来观测一个数据，这个数据可以数字、字符串、数组、对象、布尔、map等类型；
```javascript
// 数组，普通对象，map
var arr = observable([1, "a"]);//具有数组的方法
observable({a: 1}}); // 具备对象的方法，可以使用extendObservable方法扩展，否则新添加的属性不会被监控
observable(new Map()); // 具备map的方法
isArrayLike(arr); // true

// 数字，布尔，字符串需要使用observable.box,使用set修改值，使用get获得原始值
observable.box(1);
observable.box("str");
observable.box(true);

//使用修饰器,observable自动识别数据类型
class Store {
    @observable array = [];
    @observable obj = {};
    @observable map = new Map();
    @observable string = "hrllo";
    @observable number = 10;
    @observable bool = true;
}
```

只有对象中已经存在的对象才能够被观察，如果需要添加则：
```javascript
let observableObject = observable({value: 3222});

extendObservable(observableObject, {
  newValue: 2333
});
```

## computed

计算属性，将其他可观察数据组成一个新的可观察数据

```javascript
var plus = computed(() => number.get() > 0);
plus.abserve((change) => {console.log(change)});//监控计算属性变化
// 使用修饰器
class Store {
    @observable string = "hello";
    @observable number = 10;
    @computed get plus() {
        return this.string + this.number;
    }
}
```

## autorun

当函数中依赖的数据状态发生改变时自动运行autorun参数中的匿名函数(定义时会先执行一次)

```javascript
autorun(() => {console.log(store.string + store.number;)})
```

## when

autorun的变种，依赖第一个参数函数(根据可观察数据)返回的布尔值，确定第二个参数函数的执行，并且只会执行一次，如果第一个函数一开始就返回true，那么when可以看作是同步执行；

```javascript
when(() => store.bool, () => {consoel.log("副作用执行了")})
```

## reaction

autorun的改进变种，第二个参数函数所依赖的可观察数据由第一个参数函数返回(是一个数组)，定义时不会先执行一次；

```javascript
reaction(() => [store.string, store.number], (arr) => {console.log(arr.join("-"))})
```

## action/runInAction

修改可观察数据的状态，将多次状态的修改合并成一次，减少副作用运行的次数(比如UI的渲染)，同时有利于保证全局数据状态的稳定

```javascrip
class Store {
    @observable string = "hello";
    @observable number = 10;
    @action bar {
        this.string = "world";
        this.number = 20;
    }
}
// action只能影响正在运行的函数，而无法影响当前函数调用的异步操作
// @action.bound 能够自动绑定上下文this
runInAction("说明，可以省略", () => {
    store.string = "world";
    store.number = 20;
})
// runInAction多用于异步的回调，相当于定义action并立即执行
```

## observe/toJS/spy/trace

### observe

用于监听数据状态的改变(只能监视本身的变化，下一级不能监控)；

```javascript
var desposer = abserve(this.todos, function(change) {console.log(change)}) //监控this.todos的变化
desposer(); // 取消监控
```

### spy

用于监控所有的事件，比如action，autorun等；

```javascript
spy(event => {consoel.log(event)})
```

### toJS

将观察对象转化为js主数据类型

`toJS(this.todos)`

### trace

在副作用中被调用，可以监听副作用的发生，trace(true)可以自动在副作用中增加debugger，提示本次副作用发生的原因及所有可能触发副作用的动作，一般用于render函数中;

```javascript
class Test extend Component {
    render () {
        trace()//trace(true)
        return ...
    }
}
```

## mobx-react

使mobx与react结合使用的工具库;

### 示例代码

以下是一段示例代码，主要展示mobx怎么结合react使用：
```javascript
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Provider, inject, observer, PropTypes as ObservablePropTypes} from 'mobx-react';
@inject("store")
@observer
class Child extend Component {
    static propTypes = {
        store: PropTypes.shape({
            todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
        }).isRequired
    }
    render () {
        const store = this.props.store;
        return ...
    }
}

@inject("store")
@observer
class Father extend Component {
    static propTypes = {
        store: PropTypes.shape({
            todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
        }).isRequired
    }
    render () {
        return <Child/>
    }
}
React.render(<Provider store={store}><Father/></Provider>)
```

### @observer说明

在和Mobx数据有关联的时候，需要给React组件加上@observer，但不必太担心性能上的问题，加上这个@observer不会对性能产生太大的影响，而且@observer还有一个类似于pure render的功能，甚至能起到性能上的一些优化。

- @observer会帮用户实现shouldcomponentUpdata这个生命周期，减少不必要的代码渲染
- @observer相当于用autoRun封装了render渲染函数

### 三大优化法则

- 细粒度拆分视图组件
- 使用专用组件处理列表
- 尽可能晚地解构可观察数据

## 参考

- [mobx中文文档](https://cn.mobx.js.org/)
- [mobx入门](https://www.imooc.com/video/17460)
- [create-react-app+mobx入门初体验](https://juejin.im/post/5be5aa9451882516f2093683)
- [Mobx使用详解](https://www.jianshu.com/p/505d9d9fe36a)
