# class说明

*创建于：2020-05-11；更新于：2020-05-11*

## 类继承说明

- 在继承中是父类实例化this并返回给子类，子类再修饰这个this；

## 方法说明

```javascript
class Tree {
    say () { //最终在原型中
        console.log("Tree")
    }
    age = () => { //最终在实例中
        console.log("100");
    }
}
console.log(new Tree())
/*
{
    age: () => { console.log("100"); }
    __proto__: {
        constructor: class Tree
        say: ƒ say()
        __proto__: Object
    }
*/
```

通过等号赋值声明的字段会在实例属性中，而通过类方法定义的方法会在原型中