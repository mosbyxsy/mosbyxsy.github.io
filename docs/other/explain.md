# 前端名词解释

*创建于：2020-09-11；更新于：2020-09-11*

## W3C万维网联盟

[万维网联盟](https://www.w3.org/)（World Wide Web Consortium, W3C）是Web领域的国际标准化组织，开发开放Web标准。W3C标准是一些列标准的集合，主要包括三个方面：结构（Structure）、表现（Presentation）和行为（Behavior）。  
结构化标准语言主要包括XHTML和XML，表现标准语言主要包括CSS，行为标准主要包括对象模型（DOM）、ECMAScript等。这些标准大部分由W3C起草和发布，也有一些是其他标准组织制订的标准，比如ECMA的ECMAScript标准。

[W3C标准](https://www.w3.org/TR/)查询[流程](https://www.w3.org/2019/Process-20190301/#Reports):WD(工作草案) -> CR(候选标准) -> PR(提案标准) -> REC(W3C标准)

具体流程：
- Publication of the First Public Working Draft(WD)
- Publication of zero or more revised Working Drafts.
- Publication of a Candidate Recommendation.(CR)
- Publication of a Proposed Recommendation.(PR)
- Publication as a W3C Recommendation.(REC)随着技术的发展，有可能变为Edited Recommendation,Amended Recommendation,Superseded Recommendation,Obsolete Recommendation
- Possibly, Publication as an Edited or Amended Recommendation

此外没有成为正式标准会被Working Group Note记录,为非正式标准提供稳定有用的参考文档，或为未生成标准而放弃的工作提供文档。

## ECMA与TC39

ECMA(欧洲计算机制造协会)后[改为](https://www.ecma-international.org/memento/history.htm)(Ecma International,欧洲信息和通信系统标准化协会),是一个开发计算机硬件、通信和程序语言标准的非盈利组织,因该组织中[TC39](https://www.ecma-international.org/memento/tc39.htm)(第39号技术委员会)维护JavaScript语言的核心规范ECMA-262（即 ECMAScript）而为人所知。  
相关规范可以在[GitHub](https://github.com/tc39)上找到，其中：
- [ecma262](https://github.com/tc39/ecma262)仓库主要维护ECMAScript规范文档
- [proposals](https://github.com/tc39/proposals)仓库主要维护提案的列表及进度

一种新的语法从提案到变成正式标准，需要经历五个阶段：
- Stage 0 - Strawman（展示阶段）
- Stage 1 - Proposal（征求意见阶段）
- Stage 2 - Draft（草案阶段）
- Stage 3 - Candidate（候选人阶段）
- Stage 4 - Finished（定案阶段）

## ECMAScript与Javascript

Javascript是ECMAScript规范的实现。早期除了有网景公司的Javascript，还有微软的JScript，Macromedia公司的ActionScript，任何人或组织都可以依照规范来实现语言；但现今Javascript和ECMAScript两个词已经可互换使用。  
ECMAScript只用来标准化JavaScript这种语言的基本语法结构，与部署环境相关的标准都由其他标准规定，比如DOM的标准就是由W3C制定的。

## Javascript

JavaScript由ECMAScript、DOM、BOM三部分组成;
- ECMAScript：描述了该语言的语法和基本对象，由ECMA提供标准。
- DOM：文档对象模型，描述处理网页内容的方法和接口，通过document对象实现，由W3C提供标准。
- BOM：浏览器对象模型，描述与浏览器进行交互的方法和接口，通过window对象实现，缺乏相应标准由浏览器实现。

## ES6

ES6正式名称为ES2015,但有时也泛指ES5.1之后的ECMAScript标准。TC39会在每年的6月份正式发布新版。

各大浏览器对 ES6 的支持可以查看[kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/)

## MDN

[MDN](https://developer.mozilla.org/zh-CN/)是一个提供Web技术和促进Web技术软件的不断发展的学习平台;

- Web标准（例如：[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)、[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)和[JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)）
- 开放Web应用开发
- Firefox(网景浏览器的延续，由Mozilla开发)附加组件开发

需要说明的是，Mozilla已经[宣布](https://blog.mozilla.org/blog/2017/10/18/mozilla-brings-microsoft-google-w3c-samsung-together-create-cross-browser-documentation-mdn/)与微软(迁移原来的[MSDN](https://blogs.windows.com/msedgedev/2017/10/18/documenting-web-together-mdn-web-docs/))，Google，三星和W3C联手打造Web开发文档库MDN(MDN Web Docs)。

## 浏览器内核

浏览器内核分为渲染引擎和js引擎，渲染引擎负责页面的渲染排布，js引擎负责Javascript的解释和执行。由于Javascript引擎越来越独立，通常所说的浏览器内核就单指渲染引擎。

- Chrome	WebKit->Blink(2013)	JavascriptCore->V8
- Firefox	Gecko	SpiderMonkey(v1.0-v3.0)->TraceMonkey(v3.5-v3.6)->JagerMonkey(v4.0+)
- IE	Trident->Edge(2015斯巴达)->Blink(2019)	JScript(IE3-IE8)->Chakra(IE9)->V8(2019)
- Safari	WebKit	SquirrelFish->SquirrelFish Extreme(Nitro)
- Opera	Presto->Blink(2013)	Carakan->V8

## 参考

- [W3C](https://www.w3.org/)
- [关于查看W3C文档](https://www.clloz.com/programming/front-end/2018/10/03/w3c-standard-drafts/)
- [W3C规范制定流程](http://www.ayqy.net/blog/w3c规范制定流程/)
- [ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/intro)
- [2019 年的 JavaScript 新特性学习指南](https://juejin.im/post/6844903757608665096)
- [ECMAScript和JavaScript的区别](https://blog.csdn.net/pan_junbiao/article/details/90316255)

