# dva与umi理解

*创建于：2019-05-14；更新于：2019-05-14*

## antd

[antd](https://ant.design/docs/react/introduce-cn)：基于react，开箱即用的UI库;

## dva

[dva](https://dvajs.com/guide/)：基于[redux](https://redux.js.org/)和[redux-saga](https://redux-saga-in-chinese.js.org/)的数据流方案，为了简化开发体验，dva还额外内置了react-router、fetch，是一个轻量级的应用框架。

## dva-cli

[dva-cli](https://github.com/dvajs/dva-cli)：是基于roadhog构建dva项目的脚手架。已经建议使用[create-umi](https://github.com/umijs/create-umi);

## roadhog

[roadhog](https://github.com/sorrycc/roadhog)：是一个包含 dev、build 和 test 的命令行工具，他基于[react-dev-utils](https://github.com/facebook/create-react-app/tree/master/packages/react-dev-utils)，和 [create-react-app](https://github.com/facebook/create-react-app)的体验保持一致，但roadhog可以进行json格式的配置 ，而且默认开启了css-modules的功能。是一个单纯的webpack的封装工具，作用在于简化webpack的配置。


## umi

[umi](https://umijs.org/zh/guide/)：集合了roadhog+路由+html生成+完善的插件机制，是一个可插拔的企业级react应用框架，umi上自带了roadhog的配置和命令，主要功能就在于约定式的路由和html生成。通过命令可以直接生成模块文件，功能文件，然后直接通过文件的层级关系生成约定式的路由。

## create-umi

[create-umi](https://github.com/umijs/create-umi)：创建umi项目的脚手架，包含antd、dva、code splitting等可选项；

## 参考

- [dva umi roadhog区别和个人理解](https://blog.csdn.net/deng1456694385/article/details/84796696)
