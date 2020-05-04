# React Hook

*创建于：2020-05-04；更新于：2020-05-04*

React在16.8中增加了[Hook](https://zh-hans.reactjs.org/docs/hooks-intro.html)，但是官方将继续对class组件进行支持；具体查看官网[Hook索引](https://zh-hans.reactjs.org/docs/hooks-reference.html)

基础Hook有如下

## useState

`const [state, setState] = useState(initialState);`,相当于class组件中的state;让函数组件也能够使用状态；

## useEffect

```javascript
useEffect(
  () => { //执行副作用
    const subscription = props.source.subscribe(); 
    return () => { //清除副作用
      subscription.unsubscribe();
    };
  },
  [props.source], //依赖
);
```

用于包裹和执行副作用，在`componentDidMount`(其实浏览器中并还没有渲染出来，只是已经挂载到DOM)、`componentDidUpdate`之后延迟执行，不会阻塞浏览器(视觉)更新；

## useContext

`useContext(MyContext)`用于读取context的值以及订阅context的变化。

高级Hook有如下

## useReducer

`const [state, dispatch] = useReducer(reducer, initialArg, init);`;`useState`的替代方案,适用于state逻辑较复杂且包含多个子值，或者下一个state依赖于之前的state等；

## useCallback

```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
把内联回调函数及依赖项数组作为参数传入useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新;

## useMemo

`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。传入 useMemo 的函数会在渲染期间执行。

## useRef

`const refContainer = useRef(initialValue);`;用于访问DOM节点或者保存可变值(类似于类的字段)

## useImperativeHandle

`useImperativeHandle(ref, createHandle, [deps])`；可以让你在使用 ref 时自定义暴露给父组件的实例值；useImperativeHandle应当与[forwardRef](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref)一起使用

## useLayoutEffect

会在所有的DOM变更之后同步调用effect,会避免阻塞视觉更新；

## useDebugValue

useDebugValue可用于在React开发者工具中显示自定义hook的标签；

## 注意点

1. 只在最顶层使用Hook,不要在循环，条件或嵌套函数中调用Hook;
1. 只在React函数组件中调用Hook，包含自定义Hook；

## 作用

1. 复用状态逻辑
1. 更好的组织各个生命周期内的逻辑
1. 不用使用class
