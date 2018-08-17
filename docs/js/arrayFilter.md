# 数组过滤

*创建于：2018-08-17；更新于：2018-08-17*

一个数组过滤另外一个数组的所有元素，返回过滤结果；
```javascript

// arr1 : 被过滤数组
// arr2 : 过滤元素组成的数组
// return : 过滤后的数组
function arrayFilter(arr1, arr2) {
	let copyArr1 = [...arr1], copyArr2 = [...arr2];
	for (let i = 0, len = copyArr2.length; i < len; i++) {
		let index = copyArr1.indexOf(copyArr2[i]);
		if (index !== -1) {
			copyArr1.splice(index, 1); //splice方法会影响原有数组
		}
	}
	return copyArr1;
}
```