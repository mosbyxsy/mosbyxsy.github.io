# windows常用命令

*创建于：2018-08-17；更新于：2018-08-17*

## windows命令行工具及对比

windows系统自带命令行工具cmd，win10支持PowerShell；PowerShell是cmd的超集，几乎支持所有cmd命令，以及大部分Linux命令，同时具备颜色显示功能，显示更加整洁美观，但相比cmd更强大的同时，也更占用内存。

## 打开命令行

1. 使用快捷键win + R打开运行窗口，输入命令cmd（powershell）；
1. 在文件夹空白处按住Shift，然后右键弹出快捷菜单，可以看到“在此处打开命令行窗口”（win10为“在此处打开PowerShell窗口”）；

## cmd常用命令

使用tab智能补全，上下键复用命令；
- `cd 目录`切换目录（切换硬盘为`盘符：`例如D:）
- `md 文件夹`创建文件夹
- `mkdir 文件夹`创建文件夹
- `dir`显示目录中的内容
- `rd 文件夹`删除文件夹（空）
- `rd /s/q 文件夹`安静模式删除目录下的所有文件及目录
- `del 文件`删除文件
- `type 文件`显示文件内容
- `cls`清除屏幕
- `ver`显示当前windows系统的版本号
- `exit`推出cmd窗口
- `ipconfig`查看ip信息
- `ping 网址/ip`测试网址或ip连接情况

## PowerShell常用命令

PowerShell可以使用上面cmd命令，此外还包括部分Linux命令

- `cd 目录`切换目录（`cd ~`回到用户主目录，`cd ..`放回上一层目录）
- `ls`显示当前文件夹下的所有文件及目录
- `pwd`显示当前路径
- `clear`清除屏幕
- `rm 文件`删除文件
- `tree`显示目录树
- `cat 文件`显示文件信息
- `cp`复制（也可以重命名）
- `mv`移动文件

## *查看端口占用情况

有时部分软件总是提示端口被占用，但是却不知道是哪个程序占用，如何解除占用，可以按如下方式；

- `netstat -ano`列出所有端口使用情况
- `netstat -aon|findstr "PID码"`列出特定PID占用
- `tasklist|findstr "PID码"`查看特定PID占用的程序或者进程（可以在任务管理器中查看）
- `taskkill /f /t /im 进程`关闭进程（可以在任务管理器中进行）