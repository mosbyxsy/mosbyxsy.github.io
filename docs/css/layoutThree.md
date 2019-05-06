# 圣杯与双飞翼布局

*创建于：2019-05-06；更新于：2019-05-06*

## 前言

圣杯布局来源于文章[In Search of the Holy Grail](https://alistapart.com/article/holygrail)，而双飞翼布局来源于淘宝UED。

圣杯布局和双飞翼布局基本上是一致的，都是两边固定宽度，中间自适应的三栏布局，其中，中间栏放到文档流前面，保证先行渲染。

解决方案大体相同，都是三栏全部float:left浮动，区别在于解决中间栏div的内容不被遮挡上，圣杯布局是中间栏在添加相对定位，并配合left和right属性，效果上表现为三栏是单独分开的，而双飞翼布局是在中间栏的div中嵌套一个div，内容写在嵌套的div里，然后对嵌套的div设置margin-left和margin-right，效果上表现为左右两栏在中间栏的上面，中间栏还是100%宽度，只不过中间栏的内容通过margin的值显示在中间。

## 圣杯布局

[demo](https://mosby.gitee.io/css-layout-three/)

圣杯布局需要保证中间部分大于左边的部分，否则布局回发生错乱；

## 双飞翼布局

[demo](https://mosby.gitee.io/css-layout-three/)

双飞翼布局相对于需要圣杯布局中间部分需要多添加一层dom结构；

## 参考

- [圣杯布局和双飞翼布局的理解和区别](https://www.cnblogs.com/lovemomo/p/4885866.html)

