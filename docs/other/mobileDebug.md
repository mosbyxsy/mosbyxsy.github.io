# 移动端调试

*创建于：2018-11-06；更新于：2018-11-06*

移动端不同于在PC端上，无法使用开发者工具进行代码调试，本文介绍几种调试方式

## vConsole

[vConsole](https://github.com/Tencent/vConsole)是腾讯出品的 Web调试面板(微信公众平台开发团队研发),主要有Console,Network,Element,Storage的部分功能，但是不能进行样式调整；

使用方法：

npm安装
`npm install vconsole`

或者下载js直接引用
```html
<script src="path/to/vconsole.min.js"></script>
<script>var vConsole = new VConsole();</script>
```

## eruda

[eruda](https://github.com/liriliri/eruda)是一个专为手机网页前端设计的调试面板，类似 DevTools 的迷你版，其主要功能包括：捕获 console日志、检查元素状态、捕获XHR请求、显示本地存储和 Cookie信息等。

使用方法：

npm安装
`npm install eruda`

或者通过CDN使用：
```html
<script src="//cdn.bootcss.com/eruda/1.5.2/eruda.min.js"></script>
<!--<script src="node_modules/eruda/eruda.min.js"></script>-->
<script>eruda.init();</script>
```

在现有页面使用,在地址栏输入以下代码
```javascript
javascript:(function () { var script = document.createElement('script'); script.src="//cdn.jsdelivr.net/npm/eruda"; document.body.appendChild(script); script.onload = function () { eruda.init() } })();
```

## weinre

[weinre](https://people.apache.org/~pmuellr/weinre/docs/latest/Home.html)通过在PC上启动一个服务，可以通过PC端上的浏览器调试手机端的页面，可以修改css样式；

使用方法：

- 安装：`npm -g install weinre`
- 启动：`weinre --httpPort 8081 --boundHost -all-`
- 调试页面增加代码： 
```html
<script src="http://PCIP:8081/target/target-script-min.js#anonymous"></script>
```
- 手机访问页面：http://PCIP:8081/page.html(如果本地没有起服务，页面需要放在node_modules/weinre/web中)
- PC浏览器访问： http://localhost:8081/client/#anonymous

## Mac+IOS

需要通过数据线将苹果手机连接到苹果电脑，通过Safari浏览器进行调试；

## Chrome浏览器+Android

将电脑与手机连接，通过PC端与Android上的Chrome浏览器进行调试；

## 参考文章

- [移动端调试痛点](https://juejin.im/post/5b72e1f66fb9a009d018fb94)
- [weinre的使用](https://www.cnblogs.com/diva/p/3995674.html)