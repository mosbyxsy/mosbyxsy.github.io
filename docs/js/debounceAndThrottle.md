# 防抖和节流

*创建于：2019-06-13；更新于：2019-06-13*

基本都是使用定时器，时间戳或者定时器+时间戳实现；

## 防抖

防抖(debounce)：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。(如果高频持续触发只有在结束触发时候执行一次处理函数)；

```javascript
// 防抖
function debounce(fn, delay) {    
    let timeout = null;    
    return function(...arg) {     
        if(timeout !== null)   clearTimeout(timeout); 
        timeout = setTimeout(() => {
            fn.apply(this, arg); //注意this的指向   
        }, delay); 
    }
}
```

适用：频繁触发事件，但是只想在最后执行事件处理函数。比如关键词搜索(在用户输入停顿后才执行搜索，否则可能不断触发搜索请求，或者搜索结果不断刷新闪烁)；

## 节流

节流(throttle): 当持续触发事件时，保证一定时间段内只调用一次事件处理函数。(降低事件处理函数的执行次数，只有不断的触发事件，才能维持间断执行事件处理函数)；

```javascript
// 使用时间戳(刚开始触发会先执行一次，停止触发后，就不再执行)
function throttle(fn, delay) {            
　　let prev = 0;            
　　return function(..arg) {                                           
　　　　let now = Date.now();                
　　　　if (now - prev >= delay) {                    
　　　　　　fn.apply(this, args);                    
　　　　　　prev = Date.now();                
　　　　}            
　　}        
}
// 使用定时器(刚开始触发不会立即执行，最后一次触发后会延迟执行一次)
function throttle(fn, delay) {            
    let timer = null;            
    return function(...arg) {          
        if (!timer) {                  
            timer = setTimeout(() => { 
                fn.apply(this, args);  
                timer = null;          
            }, delay);                
        }            
    }        
}
// 定时器+时间戳(刚开是触发会先执行一次，最后一次触发后有可能会延迟执行一次)
function throttle(fn, delay) {     
    let timer = null;     
    let startTime = 0;     
    return function(...arg) {             
        let curTime = Date.now();             
        let remaining = delay - (curTime - startTime); 
        clearTimeout(timer);              
        if (remaining <= 0) {  
            fn.apply(this, args); 
            startTime = Date.now();
        } else {                    
            timer = setTimeout(() => {
               fn.apply(this, args);  
            }, remaining); 
        }      
    }
}
// 定时器+时间戳(上一种方法的改进)
function throttle(fn, delay) {     
    let timer = null;     
    let startTime = 0;     
    return function(...arg) {             
        let curTime = Date.now();             
        let remaining = delay - (curTime - startTime); 
        clearTimeout(timer);              
        timer = setTimeout(() => {
           fn.apply(this, args);
           startTime = Date.now();  
        }, remaining > 0 : remaining : 0);   
    }
}   
```

适用：频繁触发事件，但是需要间隔的执行事件处理函数。比如下拉刷新(在频繁的执行刷新的操作时，间隔的向后台发起请求，否则可能加重服务器的负担，同时也造成带宽的浪费)；

## 参考

- [js防抖和节流](https://www.cnblogs.com/momo798/p/9177767.html)
