# 模板插入JS

*创建于：2018-08-17；更新于：2018-11-17*

## 说明

在一些使用模板的项目中，直接在模板中引入外部JS，浏览器会发出警告。

例如：
```html
<script src="./js/copy.js" type="text/javascript" charset="utf-8"></script>
```

## 解决方案

### 提前引入

在使用模板的html页面里，提前把js引入；

### 直接内嵌JS脚本

在模板里使用script标签内嵌

```html
<script type="text/javascript">
    //js代码
</script>
```

### 动态创建标签加载

通过动态创建标签引入js

```javascript
var jsDom = document.createElement("script");
jsDom.src = "http://libs.baidu.com/jquery/2.0.0/jquery.min.js";
document.body.appendChild(jsDom);
```

### 通过JQ引入JS

```javascript
$.getScript('jsUrl', function() {
    //加载完毕
});
```