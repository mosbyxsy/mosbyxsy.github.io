# 基于Node构建脚手架

*创建于：2020-05-11；更新于：2020-05-11*

脚手架[demo](https://github.com/mosbyxsy/mosby-cli)

## 基本步骤

- 在package.json中增加命令入口
- 在入口文件顶部添加#!/usr/bin/env node，声明脚本需要的解释器
- 完成脚手架并测试；在工程根目录下`npm link`生成全局链接（如果是普通模块在使用项目中`npm link modules`）
- npm发布

## 第三方库

- request：http模块
- inquirer：强大的用户命令行交互工具
- shelljs：在node脚本中执行shell命令
- chalk：给命令行增加颜色