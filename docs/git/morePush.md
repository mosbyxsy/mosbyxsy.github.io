# push代码到多个远端(两个为例)

*创建于：2018-08-17；更新于：2018-08-17*

首先本地环境必须配置好允许对应多个远程库，可以参考[git对应多个远端](#docs/git/gitMore)

## 增加远程仓库

使用 `git remote add`命令增加远程仓库
```
git remote //显示所有远程仓库
git remote -v //显示远程仓库及对应push/fetch链接
git remote add originName url //增加远程库
```
每次提交代码需要分别push到两个远端库，但可以分别拉去代码（可能存在冲突）

## 增加远程仓库push地址

### 命令方式

使用`git remote set-url`命令
```
git remote set-url --add origin url //增加远程库origin地址
git remote -v //查看远端库信息
```
增加成功后可以看到两条push和一条fetch信息

### 配置文件

打开`.git/config`找到 `[remote "github"]`，添加对应的 url,原理同上
```
[remote "github"]
    url = 
    fetch = 
    url = 
```

使用增加远程仓库push地址方式，可以一次性推送到多个远端，但是pull只能从一个地址中拉取，适用于只push的项目