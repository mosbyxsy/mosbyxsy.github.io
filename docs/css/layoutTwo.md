# 左右两栏布局

*创建于：2018-08-17；更新于：2018-08-17*

两栏布局，左侧固定宽度，右侧自适应大小；

## 基础代码

html代码如下（部分）：
```html
<body>
    <div id="left"></div>
    <div id="right"></div>
</body>
```

## margin方式

css代码（部分）：
```css
.left{
	float: left;
	width: 200px;
}
.right{
	margin-left: 200px;
}
```
[查看页面效果](./demo/layoutTwoMargin.html)

## BFC方式

css代码（部分）：
```css
.left{
	float: left;
	width: 200px;
}
.right{
	overflow: hidden;
}
```
[查看页面效果](./demo/layoutTwoBfc.html)

这种方法采用了BFC(块级格式化上下文，它决定了块级元素如何对它的内容进行布局，以及与其他元素的关系和相互关系[BFC里的元素与外面的元素不会发生影响])，形成了一个内部内容不受影响的作用域，能够触发BFC的属性有：
- float的值不为none
- overflow的值不为visible
- display的值为table-cell、tabble-caption和inline-block之一
- position的值不为static或则releative中的任何一个

普通文档流布局规则:
- 浮动的元素是不会被父级计算高度
- 非浮动元素会覆盖浮动元素的位置
- margin会传递给父级
- 两个相邻元素上下margin会重叠

BFC布局规则
- 浮动的元素会被父级计算高度（父级触发了BFC）
- 非浮动元素不会覆盖浮动元素位置（非浮动元素触发了BFC）
- margin不会传递给父级（父级触发了BFC）
- 两个相邻元素上下margin会重叠（给其中一个元素增加一个父级，然后让他的父级触发BFC）

## 定位方式

```css
.left{
	position: absolute;
	left: 0;
	width: 200px;
}
.right{
	position: absolute;
	left: 0;
	right: 0;
}
```
[查看页面效果](./demo/layoutTwoPosition.html)

有时候希望左右两边高度100%，并且在内容超出高度后可以自由滚动（不影响另一个元素）。这时可以风别加上`top: 0; bottom: 0; overflow: auto;`。

[查看页面效果(如果不出滚动条，请缩小浏览器窗口)](./demo/layoutTwoSroll.html)
