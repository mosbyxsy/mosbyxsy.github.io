# react缓存route

*创建于：2019-05-08；更新于：2019-05-08*

react-router并没有提供类似vue中keep-alive的功能，但是在有些场景下，比如商品列表页，跳转到商品详情页后返回，失去了原本商品列表页的状态（滚动，已加载数据），因此，网上出现了各种解决方案。

## 通过样式来控制组件的显示

通过样式来控制组件的显示（display：none | block;），来实现页面的缓存。
- [react-router-cache-route](https://github.com/CJY0208/react-router-cache-route)
- [react-live-route](https://github.com/fi3ework/react-live-route),据文档介绍对原有的代码入侵比较小

这种方式可能会导致问题，例如切换组件时，无法使用动画；

## 缓存数据

使用像 Mobx 和 Redux 这样的数据流管理工具缓存页面数据和状态，在页面切换回来时恢复数据和状态，但是这种方法比较繁琐，而且需要根据具体页面实现对不同的数据缓存；

## 通过React.createPortal API 

[react-keep-alive](https://github.com/StructureBuilder/react-keep-alive)通过 React.createPortal API 将缓存的组件渲染在应用程序的外面，实现页面缓存；

- 不基于 React Router，因此可以在任何需要缓存的地方使用它。
- 因为并不是使用 display: none | block 来控制的，所以可以使用动画

## 其他

[React-Keeper](https://github.com/vifird/react-keeper)是React生态里一款较新的开源路由库，由国内团队开发，借鉴了React-Router 4很多特点，据说灵活性、实用性都强于React-Router很多，而且兼容React-Router常用用法，其文档和代码可以参见[React-Keeper GitHub](https://github.com/vifird/react-keeper)官网。

## 参考

- [React如何优雅地写单页面应用？](https://github.com/vifird/react-keeper)
