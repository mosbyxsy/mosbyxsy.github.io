# fetch

*创建于：2019-01-24；更新于：2019-01-24*

前端数据请求从XMLHttpRequest(XHR)，发展到Jquery ajax(基于原生XHR的封装，支持jsonp)，再到fetch，Axios(Axios本质上也是对原生XHR的封装，只不过它是Promise的实现版本)；fetch也是原生API，基于Promise设计的，但存在兼容性问题，需要一系列polyfill；

## 使用方法

使用方法：`fetch(url[, init]).then(response => console.log(response))`，返回的是一个Promise对象；

示例代码：
```javascript
fetch(url).then(function(response) {
    if (response.ok) {
        response.json();
    }
}).then(function(data) {
    console.log(data);
}).catch(function(error) {
    console.log(err);
})
// 使用箭头函数
fetch(url).then(response) => {
    if (response.ok) {
        response.json();
    }
}).then(data => console.log(data))
.catch(error => console.log(err))
// 使用async/await语法
async function test() {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
}
```

参数说明：
- url：要获取的资源
- init：可选，对象
    - method(String): 请求使用的方法，如 GET、POST。
    - headers(Object): 请求的头信息，默认为{}。
    - body(String): 请求的 body信息，注意 GET或 HEAD方法的请求不能包含 body信息。
    - mode(String): 请求的模式，如 cors、 no-cors 或者 same-origin。
    - credentials(String): omit(默认，不发送cookie)、same-origin(同源发送cookie) 或者 include(无论跨域还是同源都发送cookie)。
    
response说明：
- status(number): HTTP返回的状态码，范围在100-599之间
- statusText(String): 服务器返回的状态文字描述，例如Unauthorized,上图中返回的是Ok
- ok(Boolean): 如果状态码是以2开头的，则为true
- headers:  HTTP请求返回头
- body:  返回体，这里有处理返回体的一些方法
- mode:  跨域配置，same-origin(不允许跨域)，cors(cors跨域，需要服务端支持)，no-cors(cors跨域,不需要服务器端支持)

数据处理方法：
- text()： 将返回体处理成字符串类型
- json()： 返回json数据
- blob()： 返回一个Blob对象

具体使用中会加上：
```javascript
import 'es6-promise/auto';
import 'whatwg-fetch'; //或其他polyfill
```

## 优点

- 语法简洁，更加语义化
- 基于标准 Promise实现，支持 async/await

## 特别说明

### 兼容性解决

- promise的polyfill：es6-promise
- fetch的polyfill：isomorphic-fetch和whatwg-fetch
- jsonp: fetch-jsonp

如果需要兼容到IE8(IE8它使用的是ES3，而IE9则对ES5部分支持)，请参考[【传统 Ajax 已死，Fetch 永生}】](https://github.com/camsong/blog/issues/2);

### fetch的polyfill实现原理

首先判断浏览器是否原生支持fetch，否则结合Promise使用XMLHttpRequest的方式来实现；这正是whatwg-fetch的实现思路，而同构应用中使用的isomorphic-fetch，其客户端fetch的实现是直接require whatwg-fetch来实现的。

### fetch默认不携带cookie

默认情况下, fetch不会从服务端发送或接收任何cookies, 如果站点依赖于用户 session，则会导致未经认证的请求(要发送 cookies，必须设置 credentials选项)。

### fetch请求对某些错误http状态不会reject

当接收到一个代表错误的 HTTP状态码时，从 fetch()返回的 Promise不会被标记为 reject， 即使该 HTTP响应的状态码(status)是404或500。相反，它会将 Promise状态标记为resolve(但是会将resolve的返回值的ok属性设置为false)，仅当网络故障时或请求被阻止时，才会标记为 reject。具体使用中往往需要二次封装。

### fetch跨域

fetch只支持cors跨域，通过设置mode选项：
- same-origin：该模式是不允许跨域的，对应的response type为basic。
- cors: 以cors的形式跨域；当然该模式也可以同域请求不需要后端额外的CORS支持；其对应的response type为cors。
- no-cors: 该模式用于跨域请求但是服务器不带CORS响应头，也就是服务端不支持CORS；其对应的response type为opaque。但是不能访问响应返回的内容

fetch不支持jsonp，但是可以使用fetch-jsonp进行jsonp跨域请求(fetch-jsonp是基于Promise，通过动态创建script标签实现的jsonp,实现上与fetch不相关)。

### 其他

- fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
- fetch没有办法原生监测请求的进度，而XHR可以。

## 参考

- [传统 Ajax 已死，Fetch 永生](https://github.com/camsong/blog/issues/2)
- [从ajax到fetch、axios](https://juejin.im/post/5acde23c5188255cb32e7e76)
- [Jquery ajax, Axios, Fetch区别之我见](https://segmentfault.com/a/1190000012836882)
- [ES6跨域数据访问fetch-jsonp](https://blog.csdn.net/liu942626/article/details/79317837)
- [fetch使用的常见问题及解决办法](https://www.cnblogs.com/huilixieqi/p/6494380.html)
