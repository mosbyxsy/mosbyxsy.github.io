# live2d网页插入动画

*创建于：2018-08-17；更新于：2018-08-17*

作为一个搬砖者，浏览到炫酷的网页，就会不自觉的审查元素，实现同样炫酷的效果(好吧，中毒已经很深，效果在本文**效果与代码**部分)；

## live2d介绍

[Live2D](http://www.live2d.com/en/)(官网是日语与英语) 并不是一种先进的技术，它产生的效果，都是用基本的平移、旋转、透明、曲面变形等操作实现的。
最终的效果与贴图关系很大，而每一个动作，都需要制作师的精细调整。
这是一个需要消耗大量时间精力的过程，因此质量好的模型并不多，质量好的也一般是在游戏中，版权受到保护，不能随意使用。

## 基础

实现炫酷的动画，首先需要准备一份[模型](https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-01)，包含模型文件(.moc)、动作数据(.mtn)、贴图文件(.png)、一个json文件(model.json,里面包含模型文件[model]，动作数据[motions]，贴图文件[textures]，layout[偏移显示模型]，hit_areas_custom[坐标]等配置)；

## 实现

在需要插入的页面中插入容器(canvas),引入live2d.js文件，之后执行:

`loadlive2d("容器id", "model.json文件路径");`//渲染

## 个性化定制

可以根据需要插入提示等功能，这部分需要自己编写js和css；

## 效果与代码

具体效果与代码可以参考：
- [haremu.com](https://haremu.com/p/205)
- [猫与向日葵](https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02)
- [FGHRSH](https://www.fghrsh.net/post/123.html)
- [www.miaomiaomiao.org](https://www.miaomiaomiao.org/713.html)
