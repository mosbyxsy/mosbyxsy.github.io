# react

*创建于：2018-08-17；更新于：2018-11-15*

React由Facebook在2013年5月开源，是用于构建用户界面的javaScript库。

- [React官网](https://reactjs.org/)
- [React中文官网](https://zh-hans.reactjs.org/)
- [React中文文档](https://react.docschina.org/)
- [React入门](https://segmentfault.com/a/1190000012921279)

## react中核心概念

- 虚拟DOM（Virtual DOM）
- Diff算法（虚拟DOM加速器，提升React性能）

### 虚拟DOM

React将DOM抽象为虚拟DOM，虚拟DOM其实就是用一个对象来描述DOM，通过对比前后两个对象的差异，最终只把变化的部分重新渲染，提高渲染的效率（原生dom具有大量可遍历的属性，且大部分与渲染无关）

具体处理方式：

1. 用JavaScript对象结构表示DOM树的结构，然后用这个树构建一个真正的DOM树，插到文档当中
2. 当状态变更的时候，重新构造一颗新的对象树，然后用新的树和旧的树进行比较，记录两棵树的差异
3. 把记录的差异重新应用到DOM树中，更新视图

### Diff算法

将一棵DOM树转换为另一棵DOM树，实现UI界面跟新的算法；

传统的一些解决将一棵树转换为另一棵树的最小操作数算法的通用方案。树中元素个数为n，最先进的算法的时间复杂度为O(n3) ，即在React中展示1000个元素则需要进行10亿次的比较；

React基于两点假设，实现了一个O(n)算法：
- 不同类型的两个元素将会产生不同的树
- 开发者可以通过key属性指定不同树中没有发生改变的子元素

#### Diff算法说明

1. 如果两棵树的根元素类型不同，React会销毁旧树，创建新树；
2. 对于类型相同的React DOM元素，React会对比两者的属性是否相同，只更新不同的属性。当处理完这个DOM节点，React就会递归处理子节点。
3. React提供了一个key属性。当子节点带有key属性，React会通过key来匹配原始树和后来的树。
    - key属性在React内部使用，但不会传递给子组件，如果需要key值，可以通过其它属性传递；
    - 在遍历数据时，推荐在组件中使用key属性；
    - key只需要保持与他的兄弟节点唯一即可，不需要全局唯一；
    - 尽可能的减少数组index作为key，数组中插入元素的等操作时，会使得效率低下；

## React资源包

使用React需要引入两个文件：
- react： react的核心代码（jsx语法会被编译成React.createElement，所以即使没有显性使用到，也需要引入React库）
- react-dom: 提供了针对DOM的方法

## React基本方法

### React.createElement

作用：创建React元素（虚拟DOM）

使用方法：React.createElement(element, [props], [...children]);
- 参数1： 元素名称(包括原生Dom元素名称和自定义React元素名称[需要在之前就定义])
- 参数2： 属性对象(null表示没有)
- 参数3： 当前元素的子元素string||createElement()的返回值

### ReactDOM.render

作用：挂载（渲染）虚拟DOM到页面（需要引入react-dom）

使用方法：ReactDOM.render(element, document.getElementById('app'), callback);
- 参数1：虚拟DOM（React元素）
- 参数2：Dom(挂载点，表示渲染到哪里)
- 参数3：回调函数

### ReactDOM.unmountComponentAtNode

作用：从DOM节点卸载React组件

使用方法：ReactDOM.unmountComponentAtNode(document.getElementById('app'));
- 参数： 组件卸载的DOM节点

### forceUpdate

作用：强制重新触发渲染(更新)

使用方法：this.forceUpdate(callback);

调用forceUpdate()将会导致组件的render()方法被调用，并忽略shouldComponentUpdate()。这将会触发每一个子组件的生命周期方法，涵盖每个子组件的shouldComponentUpdate()方法

### React.cloneElement

作用：克隆React元素，类似createElement

使用方法：React.cloneElement(element,[props],[...children]);

以element作为起点，克隆并返回一个新的React元素

说明：
- 生成的元素将会拥有原始元素props与新props的浅合并
- 新的子级会替换现有的子级
- 来自原始元素的key和ref将会保留

### React.isValidElement

作用：验证对象是否是一个React元素。返回true或false

使用方法：React.isValidElement(object);

### React.Children

React.Children提供了处理this.props.children这个不透明数据结构的工具；

- React.Children.map
- React.Children.forEach
- React.Children.count
- React.Children.only
- React.Children.toArray

## jsx语法

jsx实际上是一种语法糖，最终会被编译成createElement(需要引入react)，方便组件化开发；

### npm + webpack

安装:

npm i babel-core babel-loader babel-preset-env babel-preset-react -D

配置：

```javascript
module: [
    rules: [
        {
            test: /\.jsx$/,
            use: "babel-loader",
            query: {
                presets: ['es2015', 'react']
            },
            exclude: /node_modules/
        }
    ]
]
// 或者配置.babelrc替换query
{
    "presets" : ["env", "react"]
}
```

注意点：
1. 在jsx中className代替class，htmlFor代替for，tabIndex代替tabindex属性
2. jsx中可以直接使用js代码，直接在jsx中通过{}中间写JS代码即可
3. 在jsx中只能使用表达式（如果使用&&，必须保证左边为布尔值），不能使用语句
4. 在jsx中0可以被显示(arr.length即使为0，也会被显示)
5. 在jsx中添加注释为：`{/*注释内容*/}`

## React组件

React组件可以让你把UI分割为独立、可复用的片段，并将每一片段视为相互独立的部分。

### React创建组件方式

#### 通过js函数创建(无状态组件)

1. 适用于仅做数据展示，不处理业务逻辑，无实例（this）
2. 函数名称首字母必须大写，React通过这个特点来判断是不是一个组件
3. 函数必须有返回值，返回值可以是：jsx对象或null
4. 返回的jsx必须有一个根元素
5. 组件的返回值使用()包裹，避免换行问题
6. 没有生命周期

#### 通过class创建(有状态组件)

1. 适用于有业务逻辑，需要操作数据，会创建实例（this）,且可以有内部状态state
2. class创建的组件继承自React.Component
3. 组件内的构造方法（constructor）必须调用super(props)
4. class创建的组件必须有rander方法，且显示return一个React对象、数组或者null
5. 组件内部方法不会自动绑定this实例，如果不绑定则为undefined

#### *通过createClass创建(有状态组件)

1. 用于创建有状态组件，已经被废弃
2. 需要引入require('create-react-class')，适用于es5编程
3. 组件使用getDefaultProps()和getInitialState()方法初始化Props和State()
4. 组件内部定义方法自动绑定this实例

#### class与createClass创建对比

1. class中可以把自定义属性对象写到类的defaultProps属性中，createReactClass中getDefaultProps中返回自定义属性对象
2. class通过在constructor中给this.state赋值的方式来定义组件的初始状态，createReactClass在getInitialState返回定义的初始状态
3. class组件中的方法不会自动绑定this，createReactClass会自动绑定this
4. class不支持Mixin(混入，可以使用高阶组件)，createReactClass支持Mixin(混入)（不同组件有相似的功能的提取，不同的混入如果有相同生命周期，则在组件方法执行按照定义顺序执行）

### props

1. 用于父子组件传递数据,prop可以是字符串，对象，函数，React元素（组件）等
1. 其中key属性不会传递给子组件,如果需要key值，可以通过其它属性传递
1. props是只读的，无法给props添加或修改属性
1. 如果没有给属性值传值，默认(匹配html的行为)为true（不建议这么使用，与es6对象简洁表示法混淆）
1. 可以使用扩展属性(...)传递整个对象
1. children属性是标签之间(子元素或者任何类型数据)的内容
    - 当为字符串常量时，jsx会移除空行和开始与结尾处的空格
    - 标签邻近的新行也会被移除，字符串常量内部的换行会被压缩成一个空格
    - false、null、undefined 和 true 都是有效的子代，但它们不会直接被渲染

### state

1. 用来给组件提供组件内部使用的数据
1. 只有通过class创建的组件才具有状态(createClass创建的也有)
1. 状态是私有的，完全由组件来控制
1. 不要在state中添加render()方法中不需要的数据，会影响渲染性能，可以直接挂载到this实例，或者通过常量定义；
1. 不要在render()方法中调用setState()方法来修改state的值（setState会触发重新渲染，render()会再次执行）
1. 使用setState方法(会触发重新渲染)修改state，不建议对state直接赋值(不会触发重新渲染)，React可以将多个setState() 调用合并成一个调用来提高性能；
1. 因为this.props和this.state可能是异步更新的，不应该依靠它们的值来计算下一个状态。应该使用接受函数（可以使用es6）的方法

```javascript
this.setState({}, [callBack]);
// 或者
this.setState((prevState, props) => ({}), [callback]);
```

### 组件间数据传递

#### 父组件向子组件传递

- 通过只读属性props向子组件传递数据
- 无状态组件通过参数props拿到数据，有状态组件通过this.props(构造方法需要调用super(props))拿到属性对象

#### 子组件向父组件传递

- 在父组内部定义方法(callBack)，通过prop传递给子组件
- 子组件通过props调用父组件方法，并通过参数的形式向父组件传递数据

#### 兄弟组件传递

- 因为React是单向数据流，因此需要借助父组件(状态提升)进行传递，通过父组件回调函数改变兄弟组件的props

#### 其他方式

- redux
- mobx

在一些简单的应用里，使用mobx会更方便；

### style样式

- 在jsx中组件的style必须是一个对象
- 可以直接行内定义（需要两层{}，其中第一层代表js代码，第二层代码是一个对象）
- 可以是一个已经创建好的对象
- 样式的键值采用驼峰式命名

### 受控组件

在React中，可变的状态通常保存在组件的状态属性中，并且只能用setState()方法进行更新。React根据初始状态渲染表单组件，接受用户后续输入，改变表单组件内部的状态。将那些值由React控制的表单元素称为：受控组件(例如`<input>`,`<textarea>`, 和 `<select>`)

- 状态的改变需要有一个与之相关的处理函数
- 适用于对用户的输入进行转换和进行验证
- `<textarea>`元素通过子节点来定义它的文本内容，但是在React中会用value属性来替代
- `<select>`元素通过selected默认选中，但是在React中通过state初始值设置默认选中
- `<input type="file" />`中的value属性是只读的，所以是React中的一个非受控组件
- 当你有处理多个受控的input元素时，可以通过给每个元素添加一个name属性，来让处理函数根据event.target.name的值选择操作

### 非受控组件

- 使用ref从DOM获取表单值
- 默认值使用defaultValue(`<select>`,`<textarea>`，`<input type="text">`)，defaultChecked(`<input type="checkbox">`,`<input type="radio">`)属性而不是value，check
- 在React中`<input type="file" />`始终是一个不受控制的组件，因为它的值只能由用户设置，而不是以编程方式设置,使用File Api进行处理

## 生命周期(钩子)

一个组件从开始到最后消亡所经历的各种阶段，就是一个组件的生命周期

[react生命周期](https://www.jianshu.com/p/b634018d118e)

组件的生命周期包含三个阶段： 创建阶段（Mounting）、运行和交互阶段（Updating）、卸载阶段（Unmounting）

#### componentDidCatch(error, info) 错误边界

参数说明：
- error是被抛出的错误
- info是一个含有componentStack属性的对象。这一属性包含了错误期间关于组件的堆栈信息

注意：
- 如果定义了这一生命周期方法，一个类组件将成为一个错误边界
- 错误边界仅可以捕获其子组件(树)的错误
- 错误边界会捕捉渲染期间、在生命周期方法中和在它们之下整棵树的构造函数中的错误，就像使用了try catch，不会将错误直接抛出了，保证应用的可用性
- 自React 16开始，任何未被错误边界捕获的错误将会卸载整个React组件树。

错误边界无法捕获如下错误:
- 事件处理
- 异步代码（例如setTimeout或requestAnimationFrame回调函数）
- 服务端渲染
- 错误边界自身抛出来的错误（而不是其子组件）

### Mounting 创建阶段

#### constructor()

- 获取props
- 初始化state
- 必须调用父类的构造方法super(props)，初始化实例(this,修饰父类的实例)
- 也可以进行一些初始化操作如执行bind操作

#### *componentWillMount()

- 在新版本里不建议使用，在以后会移除这个生命周期，把操作移到constructor或者componentDidMount中
- 组件被挂载到页面之前调用，无法获取页面DOM
- 可以调用setState()而不会触发重渲染
- 用于发送ajax请求获取数据

#### static getDerivedStateFromProps(nextProps, prevState)

- 组件实例化后和接受新属性时将会调用getDerivedStateFromProps
- 它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态
- 如果父组件导致了组件的重新渲染，即使属性没有更新，子组件这一方法也会被调用
- 调用this.setState()通常不会触发getDerivedStateFromProps

#### render() 

- 渲染组件到页面中，无法获取页面中的DOM对象
- 必须显示return返回一个jsx、jsx数组、null
- 不得在rander中调用setState方法，否则会递归调用，虽然允许直接对state赋值，但是不建议这么使用

#### componentDidMount()

- 组件已经挂载到页面后执行，可以获得DOM对象
- 可以执行setState方法，但是会触发重新渲染
- 多用于发送ajax请求数据，或者挂载DOM事件监听，执行对DOM操作

### Updating 运行和交互阶段

#### static getDerivedStateFromProps(props, state)

#### *componentWillReceiveProps(nextProps)

- 在新版本里不建议使用,在以后会移除这个生命周期，推荐使用getDerivedStateFromProps生命周期
- 组件接受新的props时触发
- 通过this.props获得之前的props，通过参数nextProps获得将要更新的props
- 可以在生命周期里响应属性的改变(使用setState处理状态改变)
- 只要props改变才会触发这个生命周期，修改state不会触发

#### shouldComponentUpdate(nextProps, nextState) 

- 当接收到新属性或状态时，shouldComponentUpdate()在渲染前被调用,默认为true
- 返回false后，componentWillUpdate，render，componentDidUpdate将不会被调用
- 该方法不会在初始化渲染或当使用forceUpdate()时被调用。
- 可以从从React.PureComponent继承，实现了浅属性和状态的比较
- 多用于性能优化

#### componentWillUpdate(nextProps, nextState)

- 在新版本里不建议使用,在以后会移除这个生命周期
- 组件将要更新时触发
- 不能修改状态，否则会循环渲染

#### render() 

- 这个生命周期可以执行多次

#### getSnapshotBeforeUpdate(prevProps, prevState)

- 在最新的渲染输出提交给DOM前将会立即调用。它让你的组件能在当前的值可能要改变前获得它们。
- 这一生命周期返回的任何值将会作为参数被传递给componentDidUpdate()。
- 多用于支持异步渲染

#### componentDidUpdate(prevProps, prevState，snapshot)

- 组件更新后执行
- 可以对新的DOM进行操作
- snapshot是getSnapshotBeforeUpdate生命周期的返回值

### Unmounting 卸载阶段

#### componentWillUnmount()

- 组件卸载之前被调用
- 用于执行清理工作，比如请除定时器

## 事件绑定

### React事件机制

- 采用驼峰式命名法进行属性绑定
- 需要注意this指向的绑定(createClass会自动绑定，但class不会)

### *JS原生方式绑定

- 通过ref取到DOM的引用
- 通过JS事件监听(addEventListener)进行事件绑定

## React单向数据流

- 数据应该是从上往下流动的，也就是由父组件将数据传递给子组件；
- 如果多个组件都要使用某个数据，最好将这部分共享的状态提升至他们最近的父组件当中进行管理；
- 单向数据流可以更快寻找和定位bug，但需要写更多的代码；

## 状态提升

- 通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。
- 多用于各个子组件都需要共同使用或者修改state

## Props数据类型检查（开发模式下使用）

React.PropTypes自Reactv15.5起已弃用。使用prop-types库代替。

```javascript
import PropTypes from 'prop-types';

Component.propTypes = {
    name: PropTypes.string，
    children: PropTypes.element // 限制传递一个React元素
};
```

## Props默认值

为组件的defaultProps设置一个对象，指定属性的默认值

```javascript
Component.defaultProps = {
    name: 'Stranger'
};
```

## refs

用于获得DOM对象或者子组件，不要过度使用，只能为DOM元素和class组件(或者createClass)指定的ref；

适合使用refs的情况
- 处理焦点、文本选择或媒体控制
- 触发强制动画
- 集成第三方DOM库

### 创建refs

- React.createRef()
- 回调refs
- 字符串方式(不建议使用)

```javascript
// 最新写法React v16.3引入
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    render() {
        return <div ref={this.myRef} />;
    }
}
// 当ref属性被用于一个普通的HTML元素时，React.createRef()将接收底层DOM元素作为它的current属性以创建ref 。
// 当ref属性被用于一个自定义类组件时，ref对象将接收该组件已挂载的实例作为它的current 。
// 你不能在函数式组件上使用ref属性，因为它们没有实例。

// 回调refs
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = null
        this.refsDiv = element => {
            this.myRef = element;
        };
    }
    render() {
        return <div ref={this.refsDiv} />;
    }
}
// 或
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div ref={el => this.myRef = el} />;
    }
}
// React将在组件挂载时将DOM元素传入ref回调函数并调用，当卸载时传入null并调用它。
// ref回调函数会在 componentDidMout和componentDidUpdate生命周期函数前被调用。

// 字符串方式(不建议使用)
<div ref="myRef"></div>
使用this.refs.myRef
```

如果ref回调以内联函数的方式定义，在更新期间它会被调用两次，第一次参数是null，之后参数是DOM元素。这是因为在每次渲染中都会创建一个新的函数实例。因此，React需要清理旧的ref并且设置新的。通过将ref的回调函数定义成类的绑定函数的方式可以避免上述问题，但是大多数情况下无关紧要。

### 对父组件暴露子组件的DOM节点

```javascript
// 将ref作为属性传递适用于类组件和函数式组件
function CustomTextInput(props) {
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}

class Parent extends React.Component {
    render() {
        return (<CustomTextInput inputRef={el => this.inputElement = el}/>);
    }
}
// 即使CustomTextInput是一个函数式组件，它也同样有效
```

### ref转发（v16.3以上版本）

```javascript
// 子组件（通过forwardRef方法创建）
const Child=React.forwardRef((props,ref)=>(
    <input ref={ref} />
));

// 父组件：
class Father extends React.Component{
    constructor(props){
        super(props);
        this.myRef=React.createRef();
    }
    componentDidMount(){
        console.log(this.myRef.current);
    }
    render(){
        return <Child ref={this.myRef}/>
    }
}
// 此时的myRef输出为：input
```

## 状态突变

浅比较(React.PureComponent)会忽略属性或状态突变的情况,所以需要创建一个新的对象进行setState，而不是去修改旧的state(比如push，this.state.obj.name = "")

## 高阶组件

高阶函数的定义：接收函数作为输入，输出另一个函数的一类函数，被称作高阶函数；
对于高阶组件，它描述的便是接受React组件作为输入，输出一个新的React组件的组件；

作用：可以用于替代混入（mixins）

## Context

const {Provider, Consumer} = React.createContext(defaultValue);
Context通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递props属性；
不要仅仅为了避免在几个层级下的组件传递props而使用context，它是被用于在多个层级的多个组件需要访问相同数据的情景。

```javascript
// 创建一个theme Context,  默认theme的值为light
// 注意：value中如果为对象请写在父组件的state中，否则每次Provider渲染都会创建新的对象，触发Consumner额外渲染
const ThemeContext = React.createContext('light');

function ThemedButton(props) {
  // ThemedButton组件从context接收theme
    return (
        <ThemeContext.Consumer>
            {theme => <Button {...props} theme={theme} />}
        </ThemeContext.Consumer>
    );
}

// 中间组件
function Toolbar(props) {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}
// 旧版本Context，仅做了解

const PropTypes = require('prop-types');

class Button extends React.Component {
    render() {
        return (
            <button style={{background: this.context.color}}> {/* 得到传递的数据 */}
                {this.props.children}
            </button>
        );
    }
}

Button.contextTypes = {
    color: PropTypes.string
};

class Message extends React.Component {
    render() {
        return (
            <div>
                {this.props.text} <Button>Delete</Button>
            </div>
        );
    }
}

class MessageList extends React.Component {
    getChildContext() { // 返回Context的数据
        return {color: "purple"};
    }

    render() {
        const children = this.props.messages.map((message) =>
            <Message text={message.text} />
        );
        return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
    color: PropTypes.string
};
```

## 片段(fragments)

可以使用`<></>`（是`<React.Fragment/>`的语法糖）包裹子元素，使组件返回一个列表，但并不会在页面中增加DOM;
`<></>`不能接受键值或者属性，如果需要key，可以使用`<React.Fragment />`，key是唯一可以传递给Fragment的属性

## 插槽(Portals)

Portals提供了一种很好的将子节点渲染到父组件以外的DOM节点的方式。

ReactDOM.createPortal(child, container)

- 第一个参数（child）是任何可渲染的React子元素，例如一个元素，字符串或碎片。
- 第二个参数（container）则是一个DOM元素（容器）。

注意：
- 尽管portal可以被放置在DOM树的任何地方，但在其他方面其行为和普通的React子节点行为一致。
- 包含事件冒泡。一个从 portal内部会触发的事件会一直冒泡至包含React树的祖先

## 代码拆分

### 动态引入

```javascript
import("./math").then(math => {
    //something
});
```

### React Loadable(动态加载库)

使用类似React Router和React Loadable库的关于如何配置基于路由的代码分割的例子。

```javascript
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
    loader: () => import('./routes/Home'),
    loading: Loading,
});

const About = Loadable({
    loader: () => import('./routes/About'),
    loading: Loading,
});

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
        </Switch>
  </Router>
);
```

## 严格模式(StrictMode)

StrictMode是一个用以标记出应用中潜在问题的工具。就像Fragment，StrictMode不会渲染任何真实的UI。它为其后代元素触发额外的检查和警告。

注意: 严格模式检查只在开发模式下运行，不会与生产模式冲突。

StrictMode目前有助于：

- 识别具有不安全生命周期的组件
- 有关旧式字符串ref用法的警告
- 检测意外的副作用

```javascript
import React from 'react';

function ExampleApplication() {
    return (
        <div>
            <Header />
            <React.StrictMode>
            <div>
                <ComponentOne />
                <ComponentTwo />
            </div>
        </React.StrictMode>
        <Footer />
    </div>
  );
}
```