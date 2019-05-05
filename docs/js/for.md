# for in和for of区别

`for in`和`for of`都是用于遍历数据，ES5具有遍历数组功能的还有map、forEach、filter、some、every、reduce、reduceRight等；

其中使用forEach遍历数组，使用`break`不能中断循环，使用`return`也不能返回到外层函数。

## for in

- ES5语法；
- 一般用于遍历对象的可枚举属性。以及对象从构造函数原型中继承的属性(所以比较消耗性能)。对于每个不同的属性，语句都会被执行；
- `for in`循环出的是key，不建议使用for in遍历数组，因为输出的顺序是不固定的；
- 如果迭代的对象的变量值是null或者undefined, for in不执行循环体；
- 作用于数组的`for in`循环除了遍历数组元素以外,还会遍历自定义属性；

## for of 

`for of`语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments对象等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句;

- ES6语法；
- `for of`循环出的是value;
- 不能循环普通的对象，需要通过和`Object.keys()`搭配使用;
- 只要具有 iterator接口的数据都可以遍历；
- 不同于forEach方法，它可以与break、continue和return配合使用;
