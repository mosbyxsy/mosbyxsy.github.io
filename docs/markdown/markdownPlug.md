# markDown解析及高亮

*创建于：2018-08-17；更新于：2018-08-17*

## 解析

### marked

```
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
var html = marked(markdownText)
```
[github地址](https://github.com/markedjs/marked)

### Mdjs

```
//方法一
var Mdjs = require('md-js');
var html = Mdjs.md2html(markdownText);
//方法二
var Mdjs = require('md-js').Mdjs;
var mdjs = new Mdjs();
var html = mdjs.md2html(markdownText);
```
[github地址](https://github.com/hangxingliu/mdjs)

### Parser

```
var parser = new HyperDown;
var html = parser.makeHtml(markdownText);
```
[github地址](https://github.com/SegmentFault/HyperDown.js)

## 高亮

### highlight

```
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css">
<script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
hljs.initHighlightingOnLoad();
```
[官网](https://highlightjs.org/)

### prismjs

```
$('#content code').map(function() {
	 Prism.highlightElement(this);
});
```
[管网](http://prismjs.com/)

