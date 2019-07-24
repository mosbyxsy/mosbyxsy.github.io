# node版本

*创建于：2019-07-24；更新于：2019-07-24*

平时在开发时总是纠结于使用哪个版本的node，每个版本有什么区别，今天做一下总结；

## Semver(语义化版本)

Node.js 的版本命名规则遵循语义化版本（Semantic Versioning），版本号分为三部分;

- 第一个数字（semver-major）增加，表示有不兼容的改变；
- 第二个数字（semver-minor）增加，表示有保持兼容的新特性；
- 第三个数字（semver-patch）增加，表示有在保持兼容性与特性不变的前提下的改动，比如修复了 bug 或者改进了文档。
- 例外，比如安全更新即使会导致不兼容，为了能够更新到所有 major 版本，也依然是 semver-minor。

## node版本

node官网提供LTS(Long Term Support,长期维护或者稳定版)，Current(最新版/开发版)；以每年4月和10月作为节点更新；

### 要点

- 每年4月(偶数，会进入LTS流程)和10月（奇数）发布一个主要版本(即Major号变更，每6个月)，作为Current版本；
- LTS版本要经历两个阶段：活跃期（Active）与维护期（Maintenance)，每一个LTS都会有一个代号，从元素周期表取元素名，按照字母表排序，挑选出合适的。v4的代号是 Argon(氩)，v6的代号是 Boron（硼）；
- 每个LTS周期为3年，每个时刻Current版本只有一个，LTS版本可能有3个，LTS-Active版本可能有2个；
- 每个奇数版本只会维护8个月(利用这个版本为下一个 LTS 做准备)
- 在Node.js官网中给出的LTS版本总是处于LTS的最新版本(10月份更新大版本)。

### LTS流程：

1. Current: 第一年的四月到十月(6个月)。这个阶段会修复bug，增加新特性，不断改善，还可能删掉一些兼容性影响太大的改进，此时这个版本的minor版本会不断增加。
1. LTS active(活跃期): 第一年的十月到第三年的四月(18个月)。主要在不改变兼容性的情况下，周期性修改自身Bug与合并其他版本的重要修改。
1. LTS maintenance(维护器): 第三年的四月到第四年的四月(12个月)。只负责修改本版本的Bug以及特别紧急的如安全性问题。
1. End-of-life: 结束，不再维护。

## 参考

- [Node.js中LTS和Current的有啥区别？](https://www.jianshu.com/p/014a14713dce)
- [理解Node.js的版本发布](https://baijiahao.baidu.com/s?id=1626332802026818591&wfr=spider&for=pc)