# redux

*创建于：2019-02-26；更新于：2019-05-10*

Redux是JavaScript状态管理库， 提供可预测化的状态管理[demo](https://github.com/mosbyxsy/redux-base)，能够与react结合高效的进行项目开发，也可以用于支持其他UI库；提供强大的可用于扩展的中间件机制；

## redux三大原则

- 单一数据源
- state是只读的，能改变state的唯一方式是通过触发action来修改
- 使用纯函数更新state

## store

是一个项目的全局状态管理仓库，用于维持应用的全局状态。包含：
- dispatch：触发action去执行reducer，更新state
- subscribe：订阅state改变，state改变时会执行subscribe的参数（自己定义的一个函数）,它的返回值用于取消订阅
- getState：获取state树
- replaceReducer： 替换reducer

```javascript
const store = createStore(rootReducers，initstate, applyMiddleware(logger)) // 创建一个state
```

一个项目只应该有一个state，但是可以有多个Reducer(使用combineReducers组合)，只允许使用dispatch-action-Reducer进行状态更新；

## action

action(一个普通的对象)是把改变反应到store的有效载体，通过action，Reducer可以清楚的知道如果更新store；

action的标准格式如下：

```javascript
{
    type: "ADD_ITEM", //必须有，据有唯一性，用来标识action
    payload: data, //可选(可以是任何类型的数据)，表示action携带的内容，如果error为true，那么payload应该为错误对象
    error： true, //如果为true，则该action则表示报错
    meta: other //保存一切不属于payload的额外信息(任何类型的数据)
}
```
一般会创建actionCreator或者使用react-actions生成action；

## reducer

一个函数的返回结果只依赖于它的参数，并且在执行过程里面没有副作用，我们就把这个函数叫做纯函数(没有特殊情况、没有副作用，没有 API请求、没有变量修改，单纯执行计算)。reducer需要是一个纯函数，对传入的action进行判断，然后返回一个通过判断后的state。可以使用combineReducers对多个reducer进行合并；

```javascript
// 创建reducer
function testReducer (state = {}, action) {
    switch (action.type) {
        case todoListConst.ADD_ITEM: return {
            ...state,
            todoList: [...state.todoList, action.payload.todoList]
        }
        default: return state;
    }
}
// 合并reducer
const rootReducer = combineReducers({
    todoListReducers
});
```
combineReducers()所做的只是生成一个函数，这个函数来调用你的一系列reducer，每个reducer根据它们的key来筛选出state中的一部分数据并处理， 然后这个生成的函数再将所有reducer的结果合并成一个大的对象

## react-redux

redux和react结合使用(需要使用react-redux[demo](https://github.com/mosbyxsy/redux-base))，redux负责全局数据的管理，react负责局部状态的管理和UI的渲染；

其中需要在根组件中传入store

```javascript
import {Provider} from 'react-redux';

ReactDom.render(<Provider store={store}><App/></Provider>, root);
```

然后使用connect封装子组件

```javascript
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

export default connect(mapStateToProps, mapDispatchToProps)(Child)
// mapStateToProps返回props和state的对应关系(一个对象)
const mapStateToProps = function(state) {
    return {
        todoList: state.todoListReducers.todoList
    };
};
// mapDispatchToProps返回props与触发state更新的方法对应关系，支持以下几种写法：
// 写法一
const mapDispatchToProps = function (dispatch) {
    return {
        addItem: (...args) => dispatch(todoListAction.addItem(...args)),
        delItem: (...args) => dispatch(todoListAction.delItem(...args)),
    }
};
// 写法二
const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        addItem: todoListAction.addItem,
        delItem: todoListAction.delItem
    }, dispatch);
};
// 写法三
const mapDispatchToProps = {
    addItem: todoListAction.addItem,
    delItem: todoListAction.delItem,
};
```

connect是subscribe的实现，接收到mapStateToProps，会在内部subscribe全局state的改变，来判断props是否更改，如果需要更新，才触发更新。

## react-actions

redux-actions包可以帮助我们构建actionCreator，reducer等
- createAction：创建单个actionCreator
- createActions：创建actionCreator集合
- combineActions：合并多个action
- handleAction：创建多个action的reducer
- handleActions：创建单个action的reducer

更多示例及使用方法见[demo](https://github.com/mosbyxsy/redux-base/tree/redux-actions)

## 中间件

redux提供了强大扩展中间件(加工dispatch)的能力，利用中间件[demo](https://github.com/mosbyxsy/redux-base/tree/middleware)可以实现很多功能，例如打印日志等；

中间件需要满足以下格式：

```javascript
// const doNothingMidddleware = ({dispatch, getState}) => next => action => next(action)
// const doNothingMidddleware = ({dispatch, getState}) => next => f(修改后的dispatch)
// 中间件其实就是修改dispatch
export default ({dispatch, getState}) => next => action => {
    console.log(getState(), action);
    return next(action);
}
```

中间件使用方法：

```javascript
// 方法一
export default createStore(rootReducers, applyMiddleware(logger));
// 方法二
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
export default createStoreWithMiddleware(rootReducers);
```

### redux-thunk

redux-thunk是redux作者给出的中间件，实现极为简单;

```javascript
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

当action为函数的时候，就调用这个函数，并传入dispatch, getState；react-thunk比较适合于简单的API请求的场景

### redux-promise

```javascript
import { isFSA } from 'flux-standard-action';

function isPromise(val) {
  return val && typeof val.then === 'function';
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}
```

### redux-saga

redux-saga是一个管理redux应用异步操作的中间件，用于代替 redux-thunk的。它通过创建 Sagas 将所有异步操作逻辑存放在一个地方进行集中处理，以此将react中的同步操作与异步操作区分开来，以便于后期的管理与维护。redux-saga中使用声明式的Effect以及提供了更加细腻的控制流，声明式的Effect使得redux-saga监听原始js对象形式的action，并且可以方便单元测试。

[相关使用说明及api见redux-saga中文文档](https://redux-saga-in-chinese.js.org/docs/api/index.html)

redux-saga优点：

- 统一action的形式，在redux-saga中，从UI中dispatch的action为原始对象
- 集中处理异步等存在副作用的逻辑
- 通过转化effects函数，可以方便进行单元测试
- 完善和严谨的流程控制，可以较为清晰的控制复杂的逻辑。

## Redux DevTools(开发工具)

可以安装浏览器插件`Redux DevTools`,在控制台进行redux调试([redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)可选)；

具体使用[demo](https://github.com/mosbyxsy/redux-base/blob/middleware/src/store.js)

## 参考

- [redux下action的命名规范](https://segmentfault.com/a/1190000011511549#articleHeader10)
- [redux-actions学习笔记](https://www.jianshu.com/p/d2615a7d725e)
- [深入理解 Redux 中间件](https://www.jianshu.com/p/ae7b5a2f78ae)
- [redux中间件的原理](https://www.cnblogs.com/wshiqtb/p/7909770.html)
- [彻彻底底教会你使用Redux-saga](https://github.com/forthealllight/blog/issues/14)
