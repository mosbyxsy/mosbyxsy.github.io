# Grid布局

*创建于：2020-08-13；更新于：2019-08-13*

Grid布局是CSS中最强大的布局系统。与flex的一维布局系统不同，Grid布局是一个二维布局系统。

## 基础概念

- Grid Container：网格容器，所有网格项的直接父级元素
- Grid Item: 网格项，网格容器的子元素
- Grid line：网格线，构成网格结构的分界线
- Grid track：网格轨道，两条相邻网格线之间的空间(行/列)
- Grid cell：网格单元格，两个相邻的行和两个相邻的列网格线之间的空间
- Grid area：网格区域，4条网格线包围的总空间

## 关键字/函数/单位

- repeat()函数，可以简化重复的值
- minmax()函数，定义一个长度的范围
- auto-fill关键字，表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格，当使用fr时平分轨道外剩余的空间
- auto-fit关键字，表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格，当使用fr时平分所有剩余的空间(空白轨道会折叠)
- auto关键字，自适应大小
- span关键字，表示跨度
- dense关键字，表示紧凑布局

## 容器属性

容器属性共有18个，其中包含5个简写

- display: grid|inline-grid 创建网格容器
- grid-template-columns: 长度值|百分比|fr|repeat 定义网格列
- grid-template-rows: 长度值|百分比|fr|repeat 定义网格行
- grid-template-areas: 网格项的grid-area指定的网格区域名称|.|none 定义网格模板
- grid-template：grid-template-rows|grid-template-columns|grid-template-areas简写属性
- [grid-]column-gap: 长度值 列间距宽度
- [grid-]row-gap: 长度值 行间距宽度
- [grid-]gap: grid-row-gap与grid-column-gap简写
- justify-items: start|end|center|stretch(拉伸) 设置单元格内容的水平位置(行)
- align-items: start|end|center|stretch(拉伸) 设置单元格的垂直位置(列)
- place-items: align-items和justify-items简写
- justify-content: start|end|center|stretch|space-around(左右两端各有一半空间)|space-between(左右两端没有空间)|space-evenly(左右各一个均匀的空间) 网格水平对齐方式(行)
- align-content: start|end|center|stretch|space-around(上下两端各有一半空间)|space-between(上下两端没有空间)|space-evenly(上下各一个均匀的空间) 网格垂直对齐方式(列)
- place-content: align-content和justify-content简写
- grid-auto-columns: 长度值|百分比|fr 指定任何自动生成的网格轨道(又名隐式网格轨道)列的大小
- grid-auto-rows: 长度值|百分比|fr 指定任何自动生成的网格轨道(又名隐式网格轨道)行的大小
- grid-auto-flow: row(默认)|column|dense(紧密布局) 指定在网格中被自动布局的元素怎样排列
- grid: grid-template-rows,grid-template-columns,grid-template-areas,grid-auto-rows,grid-auto-columns和grid-auto-flow简写

## 网格项属性

网格项属性共有10个，其中包含3个简写

- grid-column-start: 网格项左边框所在的垂直网格线
- grid-column-end: 网格项右边框所在的垂直网格线
- grid-row-start: 网格项上边框所在的水平网格线
- grid-row-end: 网格项下边框所在的水平网格线
- grid-column: grid-column-start和grid-column-end简写
- grid-row: grid-row-start和grid-row-end简写
- grid-area: 区域名称(被grid-template-areas引用)|`<row-start>/<column-start>/<row-end>/<column-end>`网格区域
- justify-self: start|end|center|stretch 设置单元格内容的水平位置
- align-self: start|end|center|stretch 设置单元格内容的垂直位置
- place-self: align-self和justify-self简写

## 参考

- [CSS Grid 布局完全指南(图解 Grid 详细教程)](https://www.html.cn/archives/8510)
- [Grid 布局总结](https://juejin.im/post/6844903777888108557)
- [最强大的 CSS 布局 —— Grid 布局](https://juejin.im/post/6854573220306255880)
- [GRID GARDEN-Grid学习游戏](https://cssgridgarden.com/#zh-cn)