# 删除git仓库提交记录

*创建于：2018-08-17；更新于：2018-08-17*

如果要删除所有提交历史记录，但将代码保持在当前状态，可以按照以下方式安全地执行此操作：
1. 尝试运行
`git checkout --orphan temporary_branch` //--orphan会新建一个无历史记录的分支
1. 添加所有文件 
`git add -A`
1. 提交更改 
`git commit -am "commit message"`
1. 删除分支 
`git branch -D master` //-D会强制性删除，为了确保数据安全，建议先备份数据
1. 将当前分支重命名 
`git branch -m master`
1. 最后，强制更新存储库 
`git push -f origin master`