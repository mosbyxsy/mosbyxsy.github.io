# Typescript

*创建于：2019-06-09；更新于：2018-06-10*

[TypeScript](http://www.typescriptlang.org/)是JavaScript的一个超集，它由 Microsoft开发，代码开源于 [GitHub](https://github.com/Microsoft/TypeScript)上。被谷歌应用到[Angular2+](https://angular.io/)中。

本文是对[typescript入门教程](https://github.com/xcatliu/typescript-tutorial/blob/master/README.md)的一个概括，方便快速[学习和查找](https://ts.xcatliu.com/)；

## 环境安装

`npm install -g typescript`

## 基本数据类型

布尔(boolean),数字(number),字符串(string),null,undefined,空值(void),任意值(any),联合类型(例如let a: string | number;);

1. 其中boolean类型(Boolean(1))不等于Boolean类型(new Boolean(1)),其他类似；
1. void只能赋值undefined和null，常用于声明函数无返回值；
1. undefined和null是所有类型的子类型，可以赋值给其它类型的变量；
1. 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型，并且任意值可以访问属性和方法
1. TypeScript会在没有明确的指定类型(定义变量并且赋值)的时候推测出一个类型，这就是类型推论。
1. 当 TypeScript不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法;联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型(可以访问这个类型特有的属性和方法)

## 数组与元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

在 TypeScript 中，数组类型有多种定义方式，类数组不是数组，但是有对应的类型如(IArguments, NodeList, HTMLCollection等)；

```javascript
// 类型+方括号
let arr1: number[] = [1, 2];

// 使用数组泛型
let arr2: Array<string> = ['a', 'b'];

// 使用接口
interface NumberArray {
    [index: number]: number;
}
let arr3: NumberArray = [1, 1];
```

直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。但是通过索引赋值的时候可以只赋值某些项；当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型

```javascript
let name: [string, number];
name = ['one', 1];
name[1] = 0;
```

## 函数

在JavaScript中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）,Typescript中还可以通过接口定义；

```javascript
// 函数声明,输入多余的（或者少于要求的）参数，是不被允许的：
function sum(x: number, y: number): number {
    return x + y;
}
// 函数表达式
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
// 接口
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

- 可选参数：可以在参数后加上`?`表示可选参数，可选参数必须在必需参数后面；
- 参数默认值,剩余参数(跟ES6一致)；
- 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

```javascript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

## 接口(Interfaces)

TypeScript中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

### 定义对象的形状

- 定义对象形状赋值的时候，变量的形状必须和接口的形状保持一致；
- 可选属性(在属性后面加上`?`);
- 任意属性(如：`[propName: string]: any;`),一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集;
- 只读属性(如：`readonly id: number;`)

## 断言

可以使用`<类型>变量`或者`变量 as 类型`(react只能使用这种语法)，进行类型断言，类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的；

## 类型别名和字符串字面类型

类型别名用来给一个类型起个新名字,常用于联合类型。字符串字面量类型用来约束取值只能是某几个字符串中的一个；

```javascript
// 类型别名与字符串字面量类型都是使用 type进行定义
// 类型别名
type Name = string;
let myName: Name = 'mosby';
// 字符串字面类型
type Num = 'one' | 'two' | 'three';
let nums: Num = 'one';
```

## 枚举

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。[详情](https://github.com/xcatliu/typescript-tutorial/blob/master/advanced/enum.md)

```typescript
// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true

// const enum定义常数枚举
// declare enum定义外部枚举
```

## 类与接口

ES6中增加class，其中的一些概念可以查看[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/class)及[类的概念](https://github.com/xcatliu/typescript-tutorial/blob/master/advanced/class.md);

TypeScript可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected:

- public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
- private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

抽象类是不允许被实例化的,抽象类中的抽象方法必须被子类实现;

```typescript
abstract class Animal {
    public name: string;
    public constructor(name) {
        this.name = name;
    }
    public abstract say();
}

class Cat extends Animal {
    public say() {
        console.log(`My name: ${this.name}`);
    }
}

let cat = new Cat('Tom');
```

实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。

#### 一个类可以继承另一个类并且实现接口(可以有多个，逗号隔开)

```typescript
class Child extends Parent implements Implements1, Implements2 {
    // ...
}
```

#### 接口可以继承另一个接口

```typescript
interface Implements1 {
    // something
}

interface Implements2 extends Implements1 {
    // other
}
```

#### 接口继承类

```typescript
class Point {
    x: number;
    y: number;
}
interface Point3d extends Point {
    z: number;
}
let point3d: Point3d = {x: 1, y: 2, z: 3};
```

## 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

- 泛型的类型不是一定要传，可以通过参数推论出来
- 通过extends可以进行泛型约束
- 泛型接口(可以定义在接口上，也可以定义在形状上)
- 泛型类(定义在类名后)
- 泛型可以指定默认类型

## 声明合并

- 方法重载
- 接口合并(合并其中的属性和方法，但是同一属性的类型必须唯一)
- 类合并

## 注意

- TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。
- TypeScript 编译的时候即使报错了，还是会生成编译结果(可以配置中断编译)。

## class和interface对比

- Interface除了可以定义对象的形状，也可以定义函数，数组等的形状，而Class只能定义对象的形状；
- Interface在打包后会被移除，但是Class会被转化成function保留；
- Interface定义对象的属性和方法类型，Class可以实现对象的属性和方法；

## interface和type对比

interface和type既有相同点，又存在差异，优先选择interface实现；
相同点：
1. 都可以描述一个对象或者函数
1. 都允许扩展(但是语法不同)
    ```typescript
    // interface extends interface
        interface Name { 
          name: string; 
        }
        interface User extends Name { 
          age: number; 
        }
        
    // type extends type
        type Name = { 
          name: string; 
        }
        type User = Name & { age: number  };
    
    // interface extends type
        type Name = { 
          name: string; 
        }
        interface User extends Name { 
          age: number; 
        }
    
    // type extends interface
        interface Name { 
          name: string; 
        }
        type User = Name & { 
          age: number; 
        }
    ```

不同点：
1. type可以而 interface不行
    - type 可以声明基本类型别名，联合类型，元组等类型
    - type 语句中还可以使用 typeof 获取实例的 类型进行赋值
1. interface可以而 type不行
    - interface能够声明合并
    
## 参考

- [typescript官网](http://www.typescriptlang.org/)
- [typescript中文文档](https://www.tslang.cn/index.html)
- [typescript中文](https://zhongsp.gitbooks.io/typescript-handbook/content/)
- [typescript入门教程](https://github.com/xcatliu/typescript-tutorial/blob/master/README.md)
- [Typescript中的 interface和 type到底有什么区别](https://blog.csdn.net/weixin_33724659/article/details/88040828)
