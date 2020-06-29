# 评论系统

*创建于：2020-06-29；更新于：2020-06-29*

## gitTalk

[gitTalk](https://gitalk.github.io/)一个基于 Github Issue 和 Preact 开发的评论插件，支持MarkDown语法，但是有时加载很慢；配置可以参考[说明](https://github.com/gitalk/gitalk/blob/master/readme-cn.md)

1. 首先需要到GitHub上去新建一个仓库用于存放评论的内容
1. 在仓库设置中打开issue功能(默认是打开的)
1. 创建[Github Application](https://github.com/settings/applications/new)，Authorization callback URL 填写当前使用插件页面的域名。
1. 配置gitTalk

## valine

[valine](https://valine.js.org/)是一款基于LeanCloud的快速、简洁且高效的无后端评论系统。支持MarkDown语法，还有文章阅读量统计；使用[教程](https://valine.js.org/quickstart.html)