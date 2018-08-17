# 数组去重

*创建于：2018-08-17；更新于：2018-08-17*

总结几种常用的数组去重方法

## 使用Set语法

```javascript
function unique(arr) {
	return [...new Set(arr)];
}
```

## 使用indexOf方法

```javascript
function unique(arr){
	var newArr = [];
	for(var i=0; i<arr.length; i++){
		if(newArr.indexOf(arr[i]) == -1){
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
```

## 使用includes方法

```javascript
function unique(arr) {
	var newArr = [];		
	for(var i = 0; i < arr.length; i++) {
		if(!newArr.includes(arr[i])) {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
```

## 使用对象属性的方法

```javaScript
function unique(arr){
	var newArr = [];
	var obj = {};
	var key;
	for(var i=0; i<arr.length; i++){
		key = obj[arr[i] + typeof(arr[i])]; 
		if(!key){
			obj[key] = 1;
			newArr.push(arr[i]);
		}
	} 
	return newArr;
}
```

## 排序后去重

```javascript
function unique(arr){
	var arr2 = arr.sort();
	var newArr = [arr2[0]];
	for(var i=1; i<arr2.length; i++){
		if(arr2[i] !== newArr[newArr.length-1]){
			newArr.push(arr2[i]);
		}
	} 
	return newArr;
}
```