# 继承与原型

*创建于：2018-09-29；更新于：2018-09-29*

## prototype与`__pro__`

```javascript
// 构造函数
function Animal () {}
// 实例对象
var animal = new Animail() 
```
其中`Animal`是一个构造函数(同时也是一个对象)，具有prototype属性（原型），访问原型对象；`animal`是构造函数`Animal`的实例对象，具有__proto__属性，也是原型对象的指针；则`animal.___proto__ = Animal.prototype`,即：
- `prototype`是构造函数访问原型对象的属性
- `__proto__`是实例对象访问原型对象的属性（不可枚举）

## 原型链

每个对象都有自己的原型对象，原型对象本身也是对象，原型对象也有自己的原型对象，这样就形成了一个链式结构，叫做原型链

原型链最高指向Object.prototype并最终指向null

原型图：
![原型图](./img/extends.jpg)

举例说明1：
```javascript
function Person () {}

Object instanceof Object //true
//原型链：Object-Function.prototype-Object.prototype-null

Function instanceof Function //true
//原型链：Function-Function.prototype-Object.prototype-null

Function instanceof Object //true
//原型链：Function-Function.prototype-Object.prototype-null

Person instanceof Function //true
//原型链：Person-Function.prototype-Object.prototype-null

String instanceof String //false
//原型链：String-Function.prototype-Object.prototype-null

Boolean instanceof Boolean //false
//原型链：Boolean-Function.prototype-Object.prototype-null

Person instanceof Person //false
//原型链：Person-Function.prototype-Object.prototype-null
```

举例说明2：
```javascript
function Fun () {}
var fn = new Fun();
var obj = {}；

fn.__proto__ === Fun.prototype
Fun.__proto__ === Function.prototype
Function.__proto__ === Function.prototype //构造函数自身是一个函数，被Function构造
Function.prototype.__proto__ === Object.prototype //Function.prototype是一个对象
Fun.prototype.__proto__ === Object.prototype //所有构造函数的的prototype.__proto__ === Object.prototype(Object.prototype除外为null)
Object.__proto__ === Function.prototype //Object是一个构造函数
Object.prototype.__proto__ === null //注意 

obj.__proto__ === Object.prototype 
obj.__proto__.__proto__ === null
obj.__proto__.constructor === Object
obj.__proto__.constructor.__proto__ === Function.prototype
obj.__proto__.constructor.__proto__.__proto__ === Object.prototype
obj.__proto__.constructor.__proto__.__proto__.__proto__ === null
obj.__proto__.constructor.__proto__.__proto__.constructor === Object
obj.__proto__.constructor.__proto__.__proto__.constructor.__proto__ === Function.prototype
```

## instanceof与isPrototypeOf

instanceof运算符用来判断一个构造函数的prototype属性所指向的原型对象是否存在另外一个要检测对象的原型链上
格式：object instanceof constructor

模拟：
```javascript
function _instanceof(A, B) {
    var O = B.prototype;// 取B的显示原型
    A = A.__proto__;// 取A的隐式原型
    while (true) {
        //Object.prototype.__proto__ === null
        if (A === null)
            return false;
        if (O === A)// 这里重点：当 O 严格等于 A 时，返回 true
            return true;
        A = A.__proto__;
    }
}
```

isPrototypeOf方法用于测试一个对象是否存在于另一个对象的原型链上
格式：prototypeObj.isPrototypeOf(object)

## 继承方式

### 1.原型链继承

核心：利用原型链（将父类的实例作为子类的原型）实现一个引用类型继承另一个引用类型的属性和方法；

```javascript
function Animal (name) {
    this.name = name || "Animal";
    this.data = [];
}
Animal.prototype.myName = function () {
    console.log("name " + this.name);
}
function Dog (color) {
    this.color = color || "Color"
}
Dog.prototype = new Animal();
var dog1 = new Dog("yellow");
var dog2 = new Dog("gray");
dog1.data.push("dog1");

dog1.data //["dog1"]
dog2.data //["dog1"]
dog1.color // "yellow"
dog2.color // "gray"
dog1.myName() //underfined
dog2.myName() //underfined
dog1 instanceof Dog //true
dog1 instanceof Animal //true
```

优点：
1. 可以访问父类（包括父类的原型）的属性和方法
2. 简单易于实现

缺点：
1. 无法实现多继承
2. 包含引用类型值的原型属性(例子中data)会被所有实例共享，这会导致对一个实例的修改会影响另一个实例。
3. 在创建子类型的实例时，不能向父类型的构造函数中传递参数 

### 2.构造函数继承

核心：使用父类的构造函数来增强子类实例（在子类构造函数中调用父类构造函数，使用apply或者call），等于是复制父类的实例属性给子类（子类不会继承父类原型的属性和方法）

```javascript
function Animal (name) {
    this.name = name || "Animal";
    this.data = [];
}
Animal.prototype.myName = function () {
    console.log("name " + this.name);
}
function Dog (color, name) {
    Animal.call(this, name)；
    //this.Animal = Animal; //对象冒充方式
    //this.Animal(name);
    //delete this.Animal;
    this.color = color || "Color"
}
var dog1 = new Dog("yellow", "dog1");
var dog2 = new Dog("gray", "dog2");
dog1.data.push("dog1");
dog1.data //["dog1"]
dog2.data //[]
dog1.myName //underfined
dog2.name //"dog2"
dog1.color // "yellow"
dog2.color // "gray"
dog1 instanceof Dog //true
dog1 instanceof Animal //false
```

优点：
1. 可以实现多继承
2. 创建子类实例可以向父类传参
3. 多个实例不会共享父类引用属性

缺点：
1. 实例不是父类的实例，只是子类的实例
2. 只能继承父类的实例的属性和方法, 无法继承父类的原型的属性和方法
3. 无法实现函数复用, 每个子类都有父类构造函数的副本, 影响性能

### 3.实例继承

核心：为父类实例添加新特性（实例化的其实是父类），作为子类实例返回

```javascript
function Animal (name) {
    this.name = name || "Animal";
    this.data = [];
}
Animal.prototype.myName = function () {
    console.log("name " + this.name);
}
Animal.prototype.list = [];
function Dog (color, name) {
    var instance = new Animal(name);
    instance.color = color || "Color";
    return instance;
}
var dog1 = new Dog("yellow", "dog1"); //或者var dog1 = Dog("yellow", "dog1");
var dog2 = new Dog("gray", "dog2"); //或者var dog2 = Dog("yellow", "dog1");
dog1.data.push("dog1");
dog1.list.push("animal");
dog1.data //["dog1"]
dog2.data //[]
dog1.list //["animal"]
dog2.list //["animal"]
dog1.myName //myName
dog2.name //"dog2"
dog1.color // "yellow"
dog2.color // "gray"
dog1 instanceof Dog //false
dog1 instanceof Animal //true
```

优点：
1. 不限制调用方式（可以不使用关键字new实例化）
2. 多个实例不会共享父类引用属性（但是父类原型上的引用属性会被共享）

缺点：
1. 实例是父类的实例，不是子类的实例
2. 不支持多继承

### 4.拷贝继承

核心：把父类的所有属性和方法拷贝到子类的原型上

```javascript
function Animal (name) {
    this.name = name || "Animal";
    this.data = [];
}
Animal.prototype.myName = function () {
    console.log("name " + this.name);
}
function Dog (color, name) {
    var instance = new Animal(name);
    for (var p in instance) {
        Dog.prototype[p] = instance[p];
    }
    Dog.prototype.color = color || "Color";
}
var dog1 = new Dog("yellow", "dog1");
dog1.data.push("dog1");
dog1.data //["dog1"]
var dog2 = new Dog("gray", "dog2");
dog1.data //[]
dog2.data.push("dog2");
dog1.data //["dog2"]
dog2.data //["dog2"]
dog1.myName() //name dog2
dog1.name //"dog2"
dog1.color // "gray"
dog2.color // "gray"
dog1 instanceof Dog //false
dog1 instanceof Animal //true
```

优点：
1. 支持多继承
2. 支持向父类传参

缺点：
1. 多个实例会共享父类引用属性
2. 每次实例化子类时就会覆盖子类原型（prototype）中的属性和方法（原有的赋值会被覆盖）
3. 效率较低，内存占用较高（每次都要拷贝父类的属性）
4. 无法获取父类不可枚举的属性或方法（for in不能访问到）
5. 实例是子类的实例，不是父类的实例

### 5.组合继承

核心：调用父类的构造方法（获得父类的属性和方法），并将父类实例作为子类的原型（获得父类原型上的属性和方法）

```javascript
function Animal (name) {
    this.name = name || "Animal";
    this.data = [];
}
Animal.prototype.myName = function () {
    console.log("name " + this.name);
}
function Dog (color, name) {
    Animal.call(this, name);
    this.color = color || "Color";
}
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;
var dog1 = new Dog("yellow", "dog1");
var dog2 = new Dog("gray", "dog2");
dog1.data.push("dog1");
dog1.data //["dog1"]
dog2.data //[]
dog1.myName() //name dog1
dog1 instanceof Dog //true
dog1 instanceof Animal //true
```

优点：
1. 可以继承子类的属性和方法，也可以继承父类的属性和方法（包括原型里面的属性和方法）
2. 既是子类的实例，也是父类的实例
3. 不存在父类引用属性（不包括父类原型中的引用属性）共享的问题（主要是因为父类的属性被子类屏蔽了）
4. 可以向父类传递参数

缺点：
1. 调用了两次父类构造函数，生成两份父类中定义的属性和方法（其中子类中【从父类中调用构造函数得到的】屏蔽了父类中的那份）；

### 6.寄生组合继承

核心：通过寄生方式，去除父类中的属性及方法（避免组合继承生成两份属性和方法的缺点）

```javascript
function Animal (name) {
    this.name = name || "Animal";
    this.data = [];
}
Animal.prototype.myName = function () {
    console.log("name " + this.name);
}
function Dog (color, name) {
    Animal.call(this, name);
    this.color = color || "Color";
}
(function () {
    function Super () {};
    Super.prototype = Animal.prototype;
    Dog.prototype = new Super();
    Super.prototype.constructor = Dog;
})();
var dog1 = new Dog("yellow", "dog1");
var dog2 = new Dog("gray", "dog2");
dog1.data.push("dog1");
dog1.data //["dog1"]
dog2.data //[]
dog1.myName() //name dog1
dog1 instanceof Dog //true
dog1 instanceof Animal //true
```

优点：
1. 具有组合继承的所有优点；
2. 只生成一份父类中定义的属性和方法

缺点：
1. 实现较为复杂；
2. 本质上仍然调用了两次父类（一次是Animal，一次是Super）

## 实现继承的方法

### Object.creact()

Object.creact(prototypeObj, descriptorObj);
prototypeObj是创建对象想要继承的原型对象
descriptorObj属性描述对象
返回值：包含描述对象（descriptorObj）里的属性及原型为原型对象（prototypeObj）的对象

```javaacript
var prototypeObj = {
    name: 'Prent',
    sayName: function () {
        console.log(this.name);
    }
}
var y = Object.create(prototypeObj, {
    name: {
        configurable: true,
        enumerable: true,
        value: 'Child',
        writable: true,
    }
})
y.sayName() //"Child"
```

### call(),apply()

call：需要在参数中列出所有参数（在第一个this参数之后）
apply：需要把所有参数组成数组当做第二个参数传递

具体例子见构造函数继承中call的使用

### ES6中class

在ES6中增加class的语法，使用extend继承

```javascript
class Animal {
    constructor (name = 'Animal', species = '物种') {
        this.name = name;
        this.species = species;
    }
    
    sayHello () {
        console.log(this.name, this.species)
    }
}

class Dog extends Animal {
    constructor (name = "Dog", species = "狗") {
        super(name, species);
    }
    sayHello () { //不写直接访问父类的方法
        super.sayHello();
    }
}
let dog = new Dog("dog");
dog.sayHello(); //"dog", "狗"
```

## 参考文章

1. [JS实现继承的几种方式](https://www.cnblogs.com/humin/p/4556820.html)
2. [JS中原型链中的prototype与_proto_的个人理解与详细总结](https://www.cnblogs.com/libin-1/p/6014925.html)
3. [js中的instanceof运算符](https://www.cnblogs.com/SourceKing/p/5766210.html)