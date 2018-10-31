# 移动端高清布局

*创建于：2018-10-31；更新于：2018-10-31*

移动端设备多样，屏幕大小不同，设备像素比不同(DPR),因此移动端存在适配的问题

## 源码及分析

以下代码来自参考文章
```javascript
/**
 * @param {Boolean} [normal = false] - 默认开启页面压缩以使页面高清;  
 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px(2倍图);
 * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
 */
const win = window;
export default win.flex = (normal, baseFontSize, fontscale) => {
	const _baseFontSize = baseFontSize || 100;
	const _fontscale = fontscale || 1;

	const doc = win.document;
	const ua = navigator.userAgent;
	const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
	const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
	const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
	const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
	let dpr = win.devicePixelRatio || 1;
	if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    	// 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    	dpr = 1;
	}
	const scale = normal ? 1 : 1 / dpr;

	let metaEl = doc.querySelector('meta[name="viewport"]');
	f (!metaEl) {
		metaEl = doc.createElement('meta');
		metaEl.setAttribute('name', 'viewport');
		doc.head.appendChild(metaEl);
	}
	metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
	doc.documentElement.style.fontSize = normal ? '50px' : `${_baseFontSize / 2 * dpr * _fontscale}px`;
};
```

## 原理与个人理解

### 基础

使用这个高清方案布局，则页面必须使用rem开发进行适配

### 原理

根据设备DPR动态设置 `html`的`font-size`为（`50 * dpr`)，同时调整页面的压缩比率（即：`1/dpr`），进而达到高清效果;

### 个人理解

根据设备的DPR缩小页面(缩小DPR倍)，同时增大(基数为50px，增大DPR倍)根节点的字体大小,增大rem所对应的实际像素，则页面元素相应扩大；

不考虑页面清晰:缩小与增大倍数相同，视觉上看到的页面大小不会发生变化，因此这段代码完全可以忽略；

考虑页面清晰:由于缩放，可以显示出1px(物理像素)，则页面更为清晰(一般情况下，在Android浏览器中会把`border : 0.5px`识别为`border : 0`)；

## 优势

- 根据设备的DPR，自动设置最合适的高清缩放
- 保证了不同设备下视觉体验的一致性(只要设备的有效像素[css像素]一致，则显示的内容一致，区别在清晰度)
- 有效解决移动端真实1px问题（这里的1px 是设备屏幕上的物理像素）

## 注意点

- rem只适用于固定大小的元素，必须结合百分比和flex布局
- 横向设置的宽度不得超过需要兼容机型的最小宽度(比如苹果5s，DPR为2，水平最大为6.4rem，当设置超过6.4rem就会产生滚动条，建议超过一半使用百分比)
- rem默认值为50px，根据DPR设置为（`DPR * 50px`）
- window.flex(true)不使用高清方案
- 结合pxtorem插件使用更为方便

## 不同效果图对应参数设置

为方便rem计算，使用n/100，则：
- 图：320px 倍数：1 参数：200
- 图：640px 倍数：2 参数：100
- 图：750px 倍数：2 参数：100
- 图：1242px 倍数：3 参数：66.66667

公式：`实际根(参数 / 2) * 倍数 = 扩大后的根(期待是100)`

即：`参数 = 扩大后的根(期待是100) / 倍数 * 2`

## 参考文章

[手机端页面自适应解决方案—rem布局进阶版（附源码示例）](https://www.jianshu.com/p/985d26b40199)
