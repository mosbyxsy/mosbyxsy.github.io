# 图床

*创建于：2020-06-17；更新于：2020-06-17*

本文主要用于记录图床的搭建
- PicGo+GitHub+Jsdelivr
- PicGO+Gitee

图床客户端[PicGo](https://github.com/Molunerfinn/PicGo/releases)下载；

## PicGo+GitHub+Jsdelivr

- 在[Github](https://github.com)创建一个公开的仓库；
- 创建token(【Settings】-【Developer settings】-【Personal access tokens】-【Generate new token】，填写好描述，勾选【repo】，然后点击【Generate token】生成一个Token，注意这个Token只会显示一次)
- 安装PicGO软件，安装后在PicGo设置中勾选GitHub图床，之后配置Github的相关设置(注意设定自定义域名为`https://cdn.jsdelivr.net/gh/<GithubName>/<RepoName>`,使用CDN加速访问)

GitHub还可以使用GitHub Page，但是国内范文速度慢，不建议使用；

## PicGO+Gitee

- 在[码云](https://gitee.com/)创建一个公开的仓库；
- 创建私人令牌(【头像】-【设置】-【私人令牌】(勾选projects权限)-【验证密码】(令牌只能查看一次，妥善保管))
- 安装PicGO软件，安装后在插件设置里安装gitee-uploader插件，在PicGo设置中勾选Gitee图床，配Gitee的相关设置

这种方式，经过测试发现浏览器会有跨域的提示，但不影响使用；还可以使用Gitee Page，但是每次上传图片后都要重新更新部署，使用起来不够方便；

## 参考

- [Github+jsDelivr+PicGo 打造稳定快速、高效免费图床](https://blog.csdn.net/qq_36759224/article/details/98058240)
- [使用gitee(码云)作为博客图床](https://www.cnblogs.com/zenglintao/p/12876346.html)

