# css预处理器

*创建于：2019-08-07；更新于：2019-08-07*

CSS预处理器技术已经非常的成熟了，对前端开发提供了极大的便利，特别是主题配置。本文主要对比和说明sass，scss，less，stylus预处理器的区别和各自的基本语法(内容来自网上，部分见参考);

## 背景

CSS 预处理器是一种语言用来为 CSS 增加一些编程的的特性，无需考虑浏览器的兼容性问题，例如你可以在 CSS 中使用变量、简单的程序逻辑、函数等等在编程语言中的一些基本技巧，可以让CSS 更见简洁，适应性更强，代码更直观等诸多好处。

### sass(2007)

[sass](http://sass-lang.com)诞生于2007年，最早也是最成熟的一款CSS预处理器语言，它可以使用变量、常量、嵌套、混入、函数等功能，可以更有效有弹性的写出CSS。但不能直接被浏览器识别，需要编译出合法的css让浏览器使用；现在的Sass已经有了两套语法规则：一个依旧是用缩进作为分隔符来区分代码块的；另一套规则和CSS一样采用了大括号`｛｝`作为分隔符。后一种语法规则又名SCSS，在Sass3之后的版本都支持这种语法规则。
```sass
/* style.scss or style.scss */
h1 {
  color: #0982C1;
}
/* 或者style.sass */
h1
  color: #0982c1
```

### less(2009)

[less](http://lesscss.org)是2009年开源的一个项目，受Sass的影响较大，但又使用CSS的语法，让大部分开发者和设计师更容易上手；也是唯一能够在页面中直接引用的预处理器；

```html
<link rel="stylesheet/less" type="text/css" href="styles.less" />
<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js" ></script>
```
```less
/* style.less */
h1 {
  color: #0982C1;
}
```
需要注意的是：在引入“.less”文件标签link中的“rel”属性要设置为“stylesheet/less”。还有更重要的一点需要注意的是：less源文件一定要在“less.js”引入之前引入，这样才能保证less源文件正确编译解析。

### stylus(2010)

[stylus](http://stylus-lang.com/)是2010年产生，来自于Node.js社区。Stylus被称为是一种革命性的新语言，提供一个高效、动态、和使用表达方式来生成CSS，以供浏览器使用。Stylus同时支持缩进和CSS常规样式书写规则(允许混合书写)。
```stylus
/*style.styl 支持混写*/
/*类似于CSS标准语法*/
h1 {
  color: #963;
  background-color:#333;
}
/*省略大括号（｛｝）*/
h1 
  color: #963;
  background-color: #333;
/*省略大括号（｛｝）和分号（;）*/
h1
  color:#963
  background-color:#333
```

## 特性

### 变量

1. sass变量必须是以`$`开头的，然后变量和值之间使用冒号`:`隔开，和css属性是一样的;

    ```sass
    $color : #cccccc;
    $width : 100px;
    $border : solid;
    body {
      $color : #eeeeee;
      color: $color;
      border: 1px $border color;
      max-width: $width;
    }
    h1 {
      color: $color; // color: #eeeeee;
    }
    ```

1. less样式中声明变量和调用变量和sass一样，唯一的区别就是变量名前面使用的是`@`字符;

    ```less
    @scolor : #cccccc;
    @swidth : 100px;
    @sborder : solid;
    body {
      @color : #eeeeee;
      color: @scolor;
      border: 1px @border color;
      max-width: @swidth;
    }
    h1 {
      color: $color; // scolor : #cccccc;
    }
    ```

1. stylus对变量是没有任何设定的，可以是以`$`开头，或者任何的字符，而且与变量之间可以用冒号，空格隔开，但是在stylus中不要用`@`开头。

    ```stylus
    color = #092873
    width = 1024px
    border = dotted
    body 
      color color
      border 1px border color
      max-width width
      /* 甚至还可以这样书写*/
    #logo                              
      position  absolute               
      top  50%                       
      left  50%                        
      width  w = 150px               
      height  h = 80px                
      margin-left  -(w / 2)       
      margin-top  -(h / 2) 
    // 作用域与less一致
    ```

### 混合(Mixins)

#### sass
```sass
/*声明一个Mixin叫作“error” 其中“($borderWidth:2px)”不是必须的*/
@mixin error($borderWidth:2px) {
  border: $borderWidth solid #f00;
  color: #f00;
}
/*调用error Mixins*/
.generic-error {
  @include error();/*直接调用error mixins*/
}
.login-error {
  @include error(5px);/*调用error mixins，并将参数$borderWidth的值重定义为5px*/
}
```
#### less
```less
/*声明一个Mixin叫作“error”*/
.error(@borderWidth:2px){
  border: @borderWidth solid #f00;
  color: #f00;
}
/*调用error Mixins*/
.generic-error {
  .error();/*直接调用error mixins*/
}
.login-error {
  .error(5px);/*调用error mixins，并将参数@borderWidth的值重定义为5px*/
}	
```
#### stylus
```stylus
/*声明一个Mixin叫作“error”*/
error(borderWidth=2px){
  border: borderWidth solid #f00;
  color: #f00;
}
/*调用error Mixins*/
.generic-error {
  error();/*直接调用error mixins*/
}
.login-error {
  error(5px);/*调用error mixins，并将参数$borderWidth的值重定义为5px*/
}
```

### 嵌套

sass、less和stylus这三款css预处理器具有类似的语法：
```
section {
  margin: 10px;
  nav {
    height: 25px;
    a {
      color: #0982c1;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
```

### 继承

#### sass和stylus
```
.block {
  margin: 10px 5px;
  padding: 2px;
}
p {
  @extend .block;/*继承.block选择器下所有样式*/
  border: 1px solid #eee;
}
ul,ol {
  @extend .block; /*继承.block选择器下所有样式*/
  color: #333;
  text-transform: uppercase;
}
// 编译出
.block,p,ul,ol {
  margin: 10px 5px;
  padding:2px;
}
p {
  border: 1px solid #eee
}
ul,ol {
  color:#333;
  text-transform:uppercase;
}
```
#### less
```
.block {
  margin: 10px 5px;
  padding: 2px;
}
p {
  .block;/*继承.block选择器下所有样式*/
  border: 1px solid #eee;
}
ul,ol {
  .block; /*继承.block选择器下所有样式*/
  color: #333;
  text-transform: uppercase;
}
// 编译出 重复了
.block {
  margin: 10px 5px;
  padding:2px;
}
p {
  margin: 10px 5px;
  padding:2px;
  border: 1px solid #eee
}
ul,ol {
  margin: 10px 5px;
  padding:2px;
  color:#333;
  text-transform:uppercase;
}
```

## 其他特性或高级语法

1. 颜色函数
1. 注释
1. 条件语句
1. 循环语句
1. 导入

## 参考

- [详说css与预处理器（以及less、sass、stylus的区别）](https://blog.csdn.net/ly2983068126/article/details/77737292)
- [less sass stylus区别](https://www.jianshu.com/p/3cb16e477202)