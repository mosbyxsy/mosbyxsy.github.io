# 元素居中

*创建于：2018-08-17；更新于：2018-08-17*

对于布局，往往有水平，垂直居中的需求，以下做一个归纳；

## 基础代码

文本所有示例以下面代码为基础，通过增加class设定样式来实现不同的效果；
```css
.layout{ width: 200px; height: 200px; display: inline-block; margin: 20px; overflow: hidden; }
.wrap{ background-color: deepskyblue; height: 200px; width: 200px; }
.content{ background-color: deeppink; height: 100px; width: 100px; }
```			

```html
<div class="wrap wrapN">
	<div class="content contentN">基础代码</div>
</div>
```

## 水平居中

```css
/*水平居中(margin: 0 auto;)*/
.content1{ margin: 0 auto; }

/*水平居中(text-align: center;)*/
.wrap2{ text-align: center; }
.content2{ display: inline-block; }

/*水平居中(弹性盒子)*/
.wrap3{ display: flex; justify-content: center; }
```
更多方法在下面（水平垂直居中介绍）

## 垂直居中

以下介绍的并非是文本垂直居中，对于文本多数情况下是设置line-height等于height来实现；
```css
/*垂直居中(弹性盒子)*/
.wrap4{ display: flex; align-items: center; }
			
/*垂直居中(弹性盒子改变主轴方向)*/
.wrap5{ 
	display: flex; 
	flex-direction: column;/*主轴方向设为垂直方向*/ 
	justify-content: center;/*主轴方向上的元素的对齐方式*/ 
}
```
更多方法在下面（水平垂直居中介绍）

## 水平垂直居中

水平垂直居中的样式多数情况下可以通过修改个别属性，实现单水平居中，或者单垂直居中；
```css
/*水平垂直居中(定位+{margin: auto})*/
.wrap6{ position: relative; }
.content6{ position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; }

/*水平垂直居中(定位+负margin)*/
.wrap7{ position: relative; }
.content7{ position: absolute; left: 50%; top: 50%; margin-left: -50px; margin-top: -50px; }

/*水平垂直居中(弹性盒子)*/
.wrap8{ display: flex; justify-content: center; align-items: center; }

/*水平垂直居中(弹性盒子+margin)*/
.wrap9{ display: flex; }
.content9{ margin: auto;}

/*水平垂直居中(定位+transform)*/
.wrap10{ position: relative; }
.content10{ position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }

/*水平垂直居中(表格样式)*/
.wrap11{ display: table-cell; vertical-align: middle; text-align: center;}
.content11{display: inline-block; }
```

[点击查看效果及完整代码(其中部分方法存在兼容性问题，请使用最新版浏览器查看)](./demo/alignCenter.html)
