# Angular

*创建于：2019-07-04；更新于：2019-07-04*

[Angualr](https://angular.io/)是一款来自谷歌的开源的web前端框架，诞生于2009年，已经被用于Google的多款产品当中,适合开发中大型项目；

[Angular中文文档](https://angular.cn/)

## 安装和创建项目

```
npm i -g @angular/cli //安装脚手架
ng v //查看版本信息
ng new projectName //创建一个项目，加上参数 --skip-install 跳过npm i
ng serve --open //启动项目
ng g component components/home //创建一个组件
ng g service services/storage //创建一个服务
```

## 基础语法

```
// 绑定文本
{{}}
// 绑定html
<div [innerHTML]="html"></div>
// 绑定属性
<div [id]="在组件中定义的变量"></div>
// 绑定class
<div [ngClass]="{'red': true, 'blue': false}">ngClass绑定一个对象</div>
<div [ngStyle]="{'background-color':'green'}">ngStyle绑定样式对象</div>
<div [hidden]="true" >隐藏</div>
// 数据循环
<li *ngFor="let item of list;let i = index;">{{item}} --{{i}}</li>
<li template="ngFor let item of list">{{item}}</li>
// 条件判断
<p *ngIf="list.length > 3">ngIF 判断是否显示</p>
<p template="ngIf list.length > 3">ngIF 判断是否显示</p>
// ngSwitch
<ul [ngSwitch]="score">
    <li *ngSwitchCase="1">1</li>
    <li *ngSwitchCase="2">2</li>
    <li *ngSwitchDefault>默认</li>
</ul>
// 事件绑定
<button class="button" (click)="getData()">点击</button>
<input type="text" (keyup)="keyUpFn($event)"/>
// 双向数据绑定（module中需要引入FormsModule）
<input type="text" [(ngModel)]="inputValue"/>
// 管道
<p>{{today | date:'yyyy-MM-dd HH:mm:ss' }}</p>
```

## 循环

```
// *语法糖
<li *ngFor="let item of items; index as i; trackBy: trackByFn">...</li>
// template语法
<li template="ngFor let item of items; index as i; trackBy: trackByFn">...</li>
// <ng-template> 元素
<ng-template ngFor let-item [ngForOf]="items" let-i="index" [ngForTrackBy]="trackByFn">
  <li>...</li>
</ng-template>
<!--等价于-->
<ng-template ngFor let-item="$implicit" [ngForOf]="items" let-i="index" 
   [ngForTrackBy]="trackByFn">
  <li>...</li>
</ng-template>
```

trackBy为接受一个带两个参数（index和item）的函数,自定义返回跟踪结果，以比对上次的跟踪结果，如果不一样，那么就刷新变化的页面实例（减少不必要的dom刷新而带来性能的提升）

## 服务

- 创建一个服务`ng g service services/storage`
- 在根组件或者使用组件中声明服务(在6.x版本之后可以直接在创建服务是传入provideIn参数)
- 在具体组件的构造函数中注入服务(`constructor(private storage: StorageService)`)
- *一个服务可以调用其他服务

## @ViewChild

父组件获取子组件的实例(或者原生Dom)

### 使用方法

- 在dom中添加Id(`<div #box>这是一个我要获得的Dom<div>`)
- 在组件中使用ViewChild装饰器定义属性(`@ViewChild('box) box: ElementRef;)
- 在组件中获得Dom或者实例(`this.box.nativeElement`)

## @Input

父组件给子组件传值。父组件不仅可以给子组件传递简单的数据，还可把自己的方法以及整个父组件传给子组件；

### 使用方法

- 父组件调用子组件时定义自定义属性(`<app-header [mag]="msg"></app-header>`)
- 子组件使用Input装饰器接收属性(`@Input() msg:string`)

## @Output

子组件通过@Output(广播)触发父组件的方法

- 子组件中实例化EventEmitter(`@Output() private outer = new EventEmitter<string>();`)
- 子组件通过EventEmitter对象实例广播数据(`this.outer.emit('msg');`)
- 父组件调用子组件的时候，定义接收事件(`<app-header (outer)="runParent($event)"></app-header>`)
- 事件触发父组件的方法，同时拿到子组件的数据(`runParent(){}`)

## 生命周期

[angular生命周期](https://www.angular.cn/guide/lifecycle-hooks)包括8个钩子函数，每个接口(接口是可选的)都有唯一的一个钩子方法。钩子在组件/指令创建，更新，销毁阶段执行，部分钩子只有组件才有；

- ngOnChanges：当 Angular（重新）设置数据绑定输入属性时响应，首次调用一定会发生在 ngOnInit()之前；
- ngOnInit：在Angular第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。在第一轮 ngOnChanges()完成之后调用，只调用一次。(发起请求，复杂的初始化逻辑)
- ngDoCheck：检测，并在发生Angular无法或不愿意自己检测的变化时作出反应。在每个变更检测周期中，紧跟在 ngOnChanges()和ngOnInit()后面调用。
- ngAfterContentInit：当Angular把外部内容投影进组件/指令的视图之后调用。第一次ngDoCheck()之后调用，只调用一次。
- ngAfterContentChecked：每当Angular完成被投影组件内容的变更检测之后调用。ngAfterContentInit()和每次ngDoCheck()之后调用。
- ngAfterViewInit：当Angular初始化完组件视图及其子视图之后调用。第一次 ngAfterContentChecked()之后调用，只调用一次。(Dom操作)
- ngAfterViewChecked：每当Angular做完组件视图和子视图的变更检测之后调用。ngAfterViewInit()和每次ngAfterContentChecked()之后调用。
- ngOnDestroy：每当Angular每次销毁指令/组件之前调用并清扫；

## Rxjs

RxJS是ReactiveX 编程理念的JavaScript版本。ReactiveX来自微软，它是一种针对异步数据流的编程。它将一切数据，包括HTTP请求，DOM事件或者普通数据等包装成流的形式，然后用强大丰富的操作符对流进行处理，使你能以同步编程的方式处理异步数据，并组合不同的操作符来轻松优雅的实现你所需要的功能。

RxJS是一种针对异步数据流编程工具。Angular引入内置RxJS。

- [GitHub](https://github.com/ReactiveX/RxJS)
- [中文文档](https://cn.rx.js.org/)

```
let stream = new Observable(observer => {
    let count = 0;
    setTimeout(() => {
        observer.next(++count);
    }, 2000);
});
// 订阅
let disposable = stream.subscribe(value => console.log(value));
// 取消订阅
disposable.unsubscribe();
// 使用工具方法(6.x版本与之前的使用方法不同)
stream.pipe(
    filter(val => val%2==0),
    map(val => val*val)
).subscribe(value => console.log(value));
// 延迟执行
import {Observable,fromEvent} from 'rxjs';
import {map,filter,throttleTime} from 'rxjs/operators';
let button = document.querySelector('button');
fromEvent(button, 'click').pipe(
    throttleTime(1000);
) .
subscribe(() => console.log(`Clicked`));
```

## HttpClient

Angular内置HttpClientModule模块请求模块,也可以使用其他包装的请求，例如[axios](https://github.com/axios/axios)

- 在根模块中引入并注入HttpClientModule(使用jsonp还需要HttpClientJsonpModule)
    ```
    import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule
    ]
    ```
- 在服务或者组件中引入并注入HttpClient
    ```
    import {HttpClient,HttpHeaders} from "@angular/common/http";
    constructor(public http:HttpClient) { }
    this.http
    ```
- 具体请求
    ```
    // get请求
    this.http.get("api").subscribe(response => {});
    // post请求
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post("api", parm, httpOptions).subscribe(response => {});
    // jsonp
    this.http.jsonp(api,'callback').subscribe(response => {});
    ```

## 路由

1. 生成一个带有路由的项目
1. 在路由模块里配置路由(如app-routing.module.ts)
    ```
    const routes: Routes = [
        {path: 'home', component: HomeComponent},
        {path: 'news', component: NewsComponent},
        {path: 'news/:id', component: NewsComponent},
        { //默认路由
            path: '**',
            redirectTo: '/home',
        }
    ];
    ```
1. 在模板中加入路由挂载点(`<router-outlet></router-outlet>`)

### 路由跳转

在模板中跳转:
```
// active为选中的css class
<a routerLink="/home" routerLinkActive="active">首页</a>
<a routerLink="/news" routerLinkActive="active">新闻</a>
```
js中跳转:
```
import { Router } from '@angular/router';
constructor(private router: Router) {}
this.router.navigate(['/news', id]);
```

### 动态路由

```
// 路由定义
{path: 'news/:id', component: NewsComponent},
// 发出
// js跳转
import { Router} from '@angular/router';
constructor(private router: Router) {}
this.router.navigate(['/news'，123]);
// dom跳转
<a routerLink="['/news/', '123']" >新闻</a>
// 接收
import { ActivatedRoute } from '@angular/router';
constructor(private router: ActivatedRoute) {}
this.route.params.subscribe(data => console.log(data));
```

### get传值

```
// 发出
// js跳转
import { Router ,NavigationExtras} from '@angular/router';
constructor(private router: Router) {}
let navigationExtras: NavigationExtras = {
    queryParams: { 'session_id': '123' }, //传值
    fragment: 'anchor' // 锚点
};
this.router.navigate(['/news'],navigationExtras);
// dom跳转
<a routerLink="/news" [queryParams]="{id: 1}">新闻</a>
// 接收
import { ActivatedRoute } from '@angular/router';
constructor(private router: ActivatedRoute) {}
this.route.queryParams.subscribe(data => console.log(data));
```

### 嵌套路由

```
// 路由配置
{
    path: 'news',
    component: NewsComponent,
    children: [
        {
            path: 'newslist',
            component: NewslistComponent
        },
        {
            path: 'newsadd',
            component: NewsaddComponent
        },
        {
            path: '**',
            component: NewslistComponent
        }
    ]
}
// 在父组件模板中增加
<router-outlet></router-outlet>
```

## 注意点

### 引入图片
`<img src="assets/images/img1.png" />`

### ngIf和ngFor不能在同一标签上




