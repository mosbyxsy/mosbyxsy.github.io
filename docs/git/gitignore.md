# git文件忽略

*创建于：2020-10-19；更新于：2020-10-19*

## 本地

在根目录下创建`.gitignore`文件，并填入需要忽略的文件夹及文件

## 全局

1. 在全局用户目录下创建文件`.gitignore_global`文件`vim ~/.gitignore_global`，并在其中输入全局要忽略的文件夹及文件
1. 设置全局忽略文件`git config --global core.excludesfile ~/.gitignore_global`
1. 查看当前配置`git config --list`

```
// .gitignore_global文件
.idea
*.project
```