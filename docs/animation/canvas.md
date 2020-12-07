# canvas

*创建于：2020-12-07；更新于：2020-12-07*

## HTMLCanvasElement

属性
- height 画布高度
- width 画布宽带

方法
- getContext() 返回canvas绘制上下文
- toBlob() 将canvas转化成Blob对象
- toDataURL() 将canvas转化成Base64 url

## CanvasRenderingContext2D

属性
- canvas 放回对应的canvas
- fillStyle 填充样式
- font 字体设置
- globalAlpha 全局透明度设置
- globalCompositeOperation 设置图形的混合模式
- lineCap 线端终点的样式
- lineDashOffset 虚线便宜距离
- lineJoin 线条转角样式
- lineWidth 线条宽度
- miterLimit 当转角是miter是长度限制
- shadowBlur 阴影模糊大小
- shadowColor 阴影颜色
- shadowOffsetX 阴影水平偏移
- shadowOffsetY 阴影垂直便宜
- strokeStyle 描边样式
- textAlign 文本水平对齐方式
- textBaseline 文本对齐基线

方法：
- arc() 绘制圆弧
- arcTo() 绘制圆弧
- beginPath() 开始新的路径
- bezierCurveTo() 绘制贝塞尔曲线
- clearRect() 将画布矩形区域变成透明
- clip() 路劲裁剪
- closePath() 闭合路径
- createImageData() 创建空的ImageData对象
- createLinearGradient() 创建线性渐变对象
- createPattern() 创建图案对象
- createRadialGradient() 创建径向渐变
- drawFocusIfNeeded() 高亮路径
- drawImage() 在画布中绘制图片
- ellipse() 绘制椭圆
- fill() 填充路径
- fillRect() 绘制矩形并填充
- fillText() 填充文字
- getImageData() 获取画布像素点信息(注意跨域问题)
- getLineDash() 获取虚线样式
- isPointInPath() 判断某个点是否在路径中
- isPointInStroke() 判断某个点是否在路径上
- lineTo() 绘制直线
- measureText() 测量文字信息
- moveTo() 路径起始或移动
- putImageData() 将ImageData绘制在画布上
- quadraticCurveTo() 绘制贝塞尔曲线
- rect() 绘制矩形
- restore() 从堆栈中恢复canvas状态
- rotate() 旋转
- save() 保存canvas状态
- scale() 缩放
- setLineDash() 设置虚线样式
- setTransform() 通过矩阵变换重置当前的坐标系
- stroke() 对路劲描边
- strokeRect() 绘制矩形并描边
- strokeText() 填充文字并描边
- transform() 通过矩阵变换当前的坐标系，叠加的变化
- translate() 将坐标移动

## 参考

- [MDN canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
- [canvas Api中文网](https://www.canvasapi.cn/)
- [canvas基础教程](https://www.twle.cn/l/yufei/canvas/canvas-basic-index.html)