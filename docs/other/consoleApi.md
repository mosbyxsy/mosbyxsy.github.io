# console自带API

*创建于：2018-11-22；更新于：2018-11-22*

## $_

返回上一个表达式的值;

## $数字

代表控制台最近选中的第几个Dom对象；

## $(select)

返回一个数组，相当于使用JQ中的$(select)，可以通过`$(select)[0]/$(select).get(0)`取出Dom对象；

## $$(select)

返回一个数组，相当于document.querySelectorAll的放回值；

## $x(path)

返回一个数组，包含匹配特定Path表达式的所有DOM元素，例如`$x("//p[a]")返回所有包含a元素的p元素。

## copy(some)

将内容(some)复制到系统的剪贴板；

## keys和values

前者返回参数对象所有属性名组成的数组，后者返回参数对象所有属性值组成的数组

## inspect(object)

inspect(object)方法打开相关面板，并选中相应的元素：DOM元素在Elements面板中显示，JavaScript对象在Profiles中显示。

## getEventListeners(Dom对象)

getEventListeners(Dom对象)方法返回一个对象，该对象的成员为登记了回调函数的各种事件（比如click或keydown）。

## monitor和unmonitor

monitor(function)，它接收一个函数名作为参数，比如function fun,每次fun被执行了，都会在控制台输出一条信息，里面包含了函数的名称fun及执行时所传入的参数。而unmonitor(fun)便是用来停止这一监听。

## monitorEvents(object[, events]) ，unmonitorEvents(object[, events])

monitorEvents(object[, events])方法监听特定对象上发生的特定事件。当这种情况发生时，会返回一个Event对象，包含该事件的相关信息。unmonitorEvents方法用于停止监听

```javascript
monitorEvents(window, "resize");
monitorEvents(window, ["resize", "scroll"])
monitorEvents(window, "mouse");
unmonitorEvents(window, "mousemove");
```