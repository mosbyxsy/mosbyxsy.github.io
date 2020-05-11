# react-router

*创建于：2018-08-17；更新于：2020-05-11*

## 使用

[react-router](https://reacttraining.com/react-router/)是配合react应用使用的路由库(不是由facebook维护)

### react-router 3.x

js跳转方法：
- this.props.router.push;
- 使用contextTypes,this.context.router.push;
- import {hashHistory} from 'react-router';hashHistory.push；

### react-router 4.x

js跳转方法：
- this.props.history.push；(component方式或者withRouter)
- 使用contextTypes,this.context.router.history.push

### react-router 5.x

js跳转方法
- history = useHistory();history.push

## 3.x与4.x区别与注意点

- 引用方式，和API不同
- layout component


## 懒加载

在开发大型应用时经常需要用到懒加载，缩短首屏时间，提高用户体验；

本文主要介绍以下几种：
- 自定义高阶组件进行按需加载
- 使用react-loadable小工具库
- 使用[loadable-components](https://github.com/gregberge/loadable-components)
- 使用[React.lazy](https://zh-hans.reactjs.org/docs/code-splitting.html)
- 使用getComponent(仅限于3.x,[demo](https://github.com/mosbyxsy/react-lazy-loading-getcomponent))


具体实现参考[demo](https://github.com/mosbyxsy/react-lazy-loading)

## 参考

- [React router动态加载组件-适配器模式的应用](https://juejin.im/post/5b9850cae51d450e74288576)
- [react-router 4.X最新版本的使用 和答疑](https://www.jianshu.com/p/bc3a8a63c072)
- [你不知道的 React Router 4](https://zhuanlan.zhihu.com/p/28585911)
- [关于 React Router4，你所需要知道的一切](https://www.jianshu.com/p/a118a55edcbf)
