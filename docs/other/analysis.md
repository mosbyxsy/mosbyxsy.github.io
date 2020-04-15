# 域名解析冲突

*创建于：2020-04-15；更新于：2020-04-15*

## 需求

有时候存在需求：

    - www.domain.com与domain同时指向同一个网站
    - 使用domain.com同时开通邮箱服务
    
如果同时配置主机记录@的MX解析和CNAME解析，则会出现解析冲突不允许保存；

## 解决方式

具体思路为使用URL转发代替CNAME，示例如下

- CNAME-www-name.github.io
- 显性URL转发-301-@-www.domain.com
- MX-@-5-mxn.mxhichina.com
- MX-@-10-mxw.mxhichina.com

*其中URL转发可以使用显性URL转发，也可以使用隐性URL转发；301为永久重定向，302为临时重定向；
阿里云中一个域名只允许配置两个URL转发；*