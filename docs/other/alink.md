# 页面跳转的思考

常常使用a标签和window.open进行页面跳转或者打开新页面，但是有些特点值得注意；

## 特点说明

当一个外部链接使用了`target=_blank`的方式或者使用`window.open方法`进行跳转，会打开新的浏览器tab。
- 新页面和原始页面占用同一个进程。新页面的内容可能会影响到原始页面的表现。
- 如果是同域的页面，那么可以在新页面访问到原始页面的所有内容，包括document对象(window.opener.document)。
- 如果是跨域的页面，无法访问到document，但是依然可以访问到location对象(window.opener.location)。

[演示](https://mosby.gitee.io/opener/a.html)(有可能因为浏览器策略不同，表现不同)

## 阻止方法

a:在所有使用`target=_blank`打开新页面的链接上，加上`rel="noopener"`，老浏览器使用`rel=noreferrer`;
open:执行`window.open(url).opener = null`;

副作用：在低版本浏览器中新页面无法获取`Referer header`(可以用于判断页面来源)。

## 参考

[使用a标签时，你可能会忽略的一个安全问题](https://juejin.im/post/5c36d52651882525e90dc800)
