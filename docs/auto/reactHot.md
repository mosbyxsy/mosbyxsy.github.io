# React热更新配置

*创建于：2018-12-10；更新于：2018-12-10*

## 安装

使用react热更新需要安装webpack-dev-server，react-hot-loader,html-webpack-plugin

## 配置

### 增加入口文件

```javascript
//在正式代码前添加入口
entry: {
    index: [
        'react-hot-loader/patch',
        "./src/root.jsx"
    ]
}
```

### 对jsx文件处理的babel增加plugin

```javascript
{
    test: /\.jsx?/, 
    use: [
        {
            loader: "babel-loader",
            options: {
                presets: ['env', 'react'],
                plugins: ["react-hot-loader/babel"]//增加插件
            }
        }
    ],
    exclude: /node_modules/
}
```

### devServer配置

```javascript
devServer: {
    contentBase:false,
    host: '127.0.0.1',
    port: '9999',
    inline: true,//使用inline模式
    compress: false,
    historyApiFallback: true,
    hot: true,//启动热更新，必须搭配new webpack.HotModuleReplacementPlugin()插件
    hotOnly: true,//可选
    open: true
}
```

也可以配置启动命令，省去配置`HotModuleReplacementPlugin`插件，命令增加`--hot`

### 配置模板文件

```javascript
new HtmlWebpackPlugin({
    template: "./src/template.html",//模板
    title: '测试页面',//自定义title
    inject: true//自动插入js和css
}),
new webpack.NamedModulesPlugin(), //用于启动HMR时可以显示模块的相对路径
new webpack.HotModuleReplacementPlugin(),   //hot module replacement 启动模块热替换的插件
```

## 代码修改

- 将根组件从入口文件分离出去，并使用import引入
- 在入口文件增加以下代码
```javascript
if (module.hot) {
    module.hot.accept()
}
//或者
const render = (App) => {
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
    document.getElementById('root')
    )
}
render(App);
// Hot Module Replacement API 
if (module.hot) {
    module.hot.accept('./app', () => {
        render(require('./app').default)
    })
}
```

## 注意

使用React热更新不能分离css(使用extract-text-webpack-plugin插件)
