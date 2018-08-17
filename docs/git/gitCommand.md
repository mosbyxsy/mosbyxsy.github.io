# git常用命令

*创建于：2018-08-17；更新于：2018-08-17*

## config

```
git config --global user.name "name" #设置提交用户名
git config --global user.email "your@email.com" #设置提交邮箱
git config --list #查看配置的信息
git config -e #打开config配置文件
git config --global push.defualt matching #设置push方式默认为matching
git config --global push.default simple #设置push方式默认为matching,2.0默认方式
git config format.pretty oneline #显示历史记录时，每个提交的信息只显示一行
git config color.ui true #彩色的 git 输出
git config --global alias.st status #自定义指令
git remote #查看远端库
git remote -v #查看远端库及url
git remote show origin #查看远端库origin信息
git remote prune origin #更新远程库origin到本地(移除本地不存在的分支)
git remote add origin url #添加远程库
git remote origin set-url URL #修改远端origin的url
git remote set-url --add origin url #远端origin增加url
git remote set-url --delete origin url #远端origin删除url
git remote remove origin #删除该远程库
git help config #获取帮助信息(浏览器打开)
```
当一个远端库对应多个地址，`git pull`只能拉取远端库的第一个地址；

## ssh配置

```
ssh-keygen -t rsa -C "your@email.com" #生成密钥（可以不设置密码）
```

- 其中`your@email.com`只作为注释信息，`-t`指定加密类型，`-C`添加注释;
- 如果使用默认设置，会在`~/.ssh/`生成两个文件id_rsa(私钥)和id_rsa.pub(公钥);
- 把id_rsa.pub文件内容复制到github（一个公钥只能添加到一个github账号上，配置多账号请参考[另一篇文章](docs/gitMoce)）或者gitlab等平台上;
- 使用`ssh -T url`测试是否配置成功
- 如果设置设置了密码，可以参考ssh-agent的相关内容；

## 新建仓库

```
git init #初始化仓库
git status #获得状态
git add file #添加文件到暂存区(还可以使用.和*,或者-A)
git commit -m "message" #提交到本地版本库
git remote add origin url #添加远端库
git push origin master #推送到远端（增加-u设置默认远端库）
```

## clone克隆已有的库

```
git clone url #克隆到当前目录（git clone url mypro克隆到指定文件夹）
```
之后操作与本地新建类似，值得注意的是`git clone`的`url`支持多种协议，常用为`ssh`和`https`;

## 查看某个文件历史

```
git log --pretty=oneline file #列出文件的所有改动历史
git show commitId #某次的改动的修改记录
git log -p commitId #某次的改动的修改记录
git blame file #显示文件的每一行是在那个版本最后修改。
git whatchanged file #显示某个文件的每个版本提交信息：提交日期，提交人员，版本号，提交备注（没有修改细节）
```

## 部分命令详细介绍

### add

```
git add . #添加所有文件的改变(最新等效-A)
git add -u #添加已经跟踪的文件改变
```

### status

```
git status #查看文件状态
```

### commit

```
git commit #提交更新(第一行为概述，第三行起为详细描述)
git commit -m "message" #提交并添加说明
git commit -a #跳过暂存区，直接把所有跟踪的修改提交
git commit -am "message" #直接提交所有跟踪的修改并提交
git commit --amend #修改最后一次提交(可以修改说明，或者把新的提交一起修改)
git commit -m "#number" #关联issue(可以包含其它说明)
git commit -m "fix #number" #关联并关闭issue
git commit -m "说明标题" -m "说明详细描述" #提交并添加详细说明
```

### 文件操作

```
git rm --cached file #取消跟踪
git rm file #删除文件并建修改添加到暂存区
git mv file_from file_to #重命名跟踪文件
```

### reset

```
git reset HEAD #取消暂存区的修改，修改退回工作区
git reset --mixed HEAD #取消暂存区的修改，修改退回工作区，效果同上(重置到版本库，并影响暂存区和工作区)
git reset -- #重置暂存区的修改，修改退回工作区，效果同上(重置暂存区，修改返回工作区)
git reset --hard HEAD^ #撤销上一次提交并不保留修改
git reset --mixed HEAD~10 #撤销上10次提交，并把修改退回到工作区
git reset --soft HEAD~n #撤销上n次提交，保留工作区和暂存区的修改
```

### revert

```
git revert HEAD #撤销前一次提交
git revert commitid #撤销指定commitid提交
会生成一个新的commit来抵消之前的修改，并保留提交历史
```

### checkout

```
git checkout -- file #取消工作区文件修改
git checkout -- . #取消工作的所有文件修改
git checkout HEAD^ file #从上一个版本库的文件修改取出到工作空间
git checkout branch_name #切换到分支
git checkout -b branch_name #从当前分支新建分支并切换到新建的分支
```

### diff

```
git diff file #查看指定文件修改
git diff --stat #显示简单的文件修改
git diff #比较Worktree和Index之间的差异
git diff --cached #比较Index和HEAD之间的差异
git diff HEAD #比较Worktree和HEAD之间的差异
git diff branch #比较Worktree和branch之间的差异
git diff branch1 branch2 #比较两支分支之间的差异
git diff commitid commitid #比较两次提交之间的差异
git diff master..test #显示两个分支之间的差异
git diff master test #显示两个分支之间的差异(效果同上)
git diff master...test #你想找出master,test的共有父分支和test分支之间的差异
```

### stash

```
git stash #保存工作区修改(已跟踪文件)，清空工作区
git stash list #查看所有的stash
git stash apply #恢复工作现场
git stash drop #删除最近一个stash
git stash pop #恢复到上次工作现场，并删除最近一个stash(等同于apply与drop同时执行)
git stash apply stash@{0} #恢复到指定工作现场
```

### merge

```
git merge test #将test分支合并到当前分支
git merge --squash test #将test上的commit压缩为一条合并到当前分支
git merge --ff test #快速合并，如果冲突需要解觉冲突并增加commit节点
git marge --ff-only test #只有能快速合并才合并，否则取消合并
git merge --no-ff test #不使用快速合并，会产生一个新的commit节点(记录进行了一次merge操作)
```

### cherry-pick

```
git cherry-pick commitid #拣选合并，将commitid合并到当前分支
git cherry-pick -n commitid #拣选多个提交
git cherry-pick -x commitid #拣选合并，保留原有提交者
git cherry-pick start_commit end_commit #拣选区间提交合并，左开右闭(不包含start_commit)
```

### rebase

```
git rebase master #将当前分支相对于master分支多出的提交，变基到master(master可以快速合并到相同的commit)
git rebase master branch1 #效果同上，但是会先切换到branch1分支
git rebase --onto master commitid #限制回滚范围，rebase当前分支从commitid以后的提交到master
git rebase --onto branch1 branch2 branch3 #将branch3与branch2之间的差集应用到branch1分支上
git rebase --onto commit1 commit2 commit3 #将(commit2, commit3]应用到commit1之后
git rebase --interactive #交互模式，修改commit
git rebase --continue #处理完冲突继续合并
git rebase --skip #跳过
git rebase --abort #取消合并
```

### branch

```
git branch #查看本地分支
git branch -r #查看远端分支
git branch -a #查看所有分支
git branch -v #查看本地分支及最后一次提交信息
git branch --merge #查看已经合并到当前分支的分支
git branch --no-merge #查看未合并到当前分支的分支
git branch -m old_branch new_branch #重命名分支
git branch branch_name #新建分支
git checkout -b branch_name #基于当前分支新建分支并切换到新建的分支
git checkout -b branch_name origin/branch_name #取回远程主机的更新以后，在它的基础上创建一个新的分支
git branch --set-upstream dev origin/dev #将本地分支dev与远端dev分支建立连接
git branch -d branch_name #删除本地分支
git branch -D branch_name #强制删除
git push origin :branch_name #删除远程分支
git push origin --delete branch_name #删除远程分支
```

### push

```
git push <远程主机名> <本地分支名>:<远程分支名> #<来源地>:<目的地>
git push origin dev:dev #将本地分支dev推送到远程分支dev
git push origin master #本地分支推送与之存在”追踪关系”的远程分支(通常两者同名)，如果该远程分支不存在，则会被新建
git push origin :master #删除远程指定分支
git push origin --delete master #同上，删除远程指定分支
git push origin #本地分支与远程分支建立追踪，可以直接推送
git push #只有一个远端，或者设置了默认远端，可以直接推送
git push -u origin master #将本地的master分支推送到origin主机，同时指定origin为默认主机，后面就可以不加任何参数使用git push了
git config --global push.defualt matching #设置push方式默认为matching
git config --global push.default simple #设置push方式默认为matching,2.0默认方式
git push --all origin #推送所有分支
git push --force origin #强行推送(--force等效-f)
git push origin --tags #推送标签到远端
```

### pull

```
git pull <远程主机名> <远程分支名>:<本地分支名> #<来源地>:<目的地>
git pull origin next:master #取回远端next分支与本地master分支合并
git pull origin next #取回远端next分支与当前分支合并(等效于git fetch origin与git merge origin/next结合)
git pull origin #拉取代码(前提是建立了分支追追踪，比如clone时，所有本地分支默认与远程主机的同名分支，建立追踪关系)
(git branch --set-upstream master origin/next #建立master与origin/next分支的追踪关系)
git pull #拉取代码(前提是设置了默认远端及分支追踪)
git pull --rebase <远程主机名> <远程分支名>:<本地分支名> #使用rebase模式拉取代码
```

### fetch

```
git fetch <远程主机名> #将远程主机更新取回本地(可以用git branch -r查看分支)
git fetch origin branch_name #取回指定分支更新
(之后可以执行下列操作)
git checkout -b new_branch origin/master #在origin/master基础上创建分支
git merge origin/master #将更新合并到本地
```

### tag

```
git tag #查看标签列表
git tag tag_name #对当前commit创建标签
git tab tag_name commitId #为指定的commit创建标签
git show tag_name #查看指定标签详细信息
git tag -l 'v1.4.2.*' #查看v1.4.2.*标签
git tag -a tag_name -m 'message' #新建带注释标签(-a指定标签名，-m指定注释)
git tag -s tag_name -m 'message' #使用GPG来签署标签(如果有自己的私钥)
git checkout tag_name #切换到标签
git push origin tag_name #将标签推送到远端
git push origin --tags #一次性全部推送本地标签
git tag -d tag_name #删除标签
git push origin :refs/tags/tag_name #删除远程标签
git pull --all #获取远程所有内容包括标签
```

### diff

```
git diff file #工作区与暂存区比较
git diff HEAD file #工作区与版本库(HEAD)比较
git diff --staged/--cached file #暂存区与版本库(HEAD)比较
git diff branch_name file #不同分支文件比较
git diff commitId file #与某次提交文件比较
```

### log

```
git log #查看最近提交历史记录
git log --pretty=online #单行显示提交日志
git log --graph --pretty=oneline --abbrev-commit #树状，单行，缩略commitId
git log -num #显示num条日志
git reflog #查看所有分支的所有提交记录
git log --since=1.day #一天内的提交记录
git log --since=2018-07-05 #查看2018-07-05提交记录
git log --pretty="%h - %s" --author=name #查看某人提交的日志
git log -p -2 #查看两次提交的内容修改
git log -p commitId #查看某次提交的内容修改
git log --stat #显示每次提交修改的大概内容(比如几个增加，几个修改，几个删除)
git log --pretty=format:"%h - %an, %ar : %s" #定制要显示的记录格式
git log --pretty=format:'%h : %s' --date-order --graph #拓扑顺序展示
git log --pretty=format:'%h : %s - %ad' --date=short #日期YYYY-MM-DD显示(--date=short简短时间显示)
git log --pretty=oneline 文件名 #列出文件的所有改动历史

%H	提交对象（commit）的完整哈希字串
%h	提交对象的简短哈希字串
%T	树对象（tree）的完整哈希字串
%t	树对象的简短哈希字串
%P	父对象（parent）的完整哈希字串
%p	父对象的简短哈希字串
%an	作者（author）的名字
%ae	作者的电子邮件地址
%ad	作者修订日期（可以用 -date= 选项定制格式）
%ar	作者修订日期，按多久以前的方式显示
%cn	提交者(committer)的名字
%ce	提交者的电子邮件地址
%cd	提交日期
%cr	提交日期，按多久以前的方式显示
%s	提交说明
%d  分支信息
```

### 源(远端主机)

```
git remote add origin_name url #增加源
git remote #显示全部源
git remote -v #显示全部源+详细信息
git remote rename origin1 origin2 #重命名源
git remote rm origin #删除源
git remote show origin #查看指定源的全部信息
```