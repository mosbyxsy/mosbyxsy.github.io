# Charls和Fiddler

*创建于：2019-08-07；更新于：2020-04-15*

[Charls](https://www.charlesproxy.com/)和[iddler](https://www.telerik.com/fiddler)是目前前端开发中使用最多的代理软件，除了能够代理pc端请求，还能代理手机的请求；

## 概括

- Fiddler除了常规的替换http请求、模拟慢网速外，还有一些日常开发里能用到的特殊功能。数据比较详细；
- Charles是收费软件，功能与Fiddler类似，可以自定义上下行网速、反向代理、配置简单等；

## 使用方法

具体使用方法参考以下博客

- [Fiddler配置及使用教程](https://www.cnblogs.com/woaixuexi9999/p/9247705.html)
- [Charles的安装及使用过程](https://www.cnblogs.com/liFttlek1d/p/9351705.html)

## 注意事项

- Charles无法代理127.0.0.1的资源，而Fiddler可以实现代理；
- Charles手机安装证书：先配置配置号手机代理，之后用浏览器打开`chls.pro/ssl`;
- 当局域网内访问装有Fiddler的服务资源时，默认情况下Fiddler不会做资源的替换(比如项目服务8080，前端资源服务8999，那么局域网内通过ip:8080访问的资源将不能被Fiddler替换成8999的资源)解决方法如下：


1. 通过菜单Rules > Customize Rules打开自定义脚本，在其中找到OnBeforeRequest方法，在里面添加如下逻辑：
```
if (oSession.port == 8888) {
    oSession.port = 8080;
}
```
1. 打开Fiddler，菜单Tool > Options，Connections页，确保Allow remote computers to connect选项勾选(对外开放端口，让其他电脑或者手机能够访问，默认端口是8888)。
1. 配置Fiddler对前端资源配置8888到8889的代理替换；

*此时再通过IP：8888访问，就能访问8080的服务，同时使用Fiddler将前端资源替换成8999的资源，参考[《让Fiddler抓取入站请求，或者叫用Fiddler做反向代理》](https://www.cnblogs.com/ahdung/p/7885921.html)*

