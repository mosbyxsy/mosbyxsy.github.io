# win开机记录查询

*创建于：2019-03-22；更新于：2018-03-22*

有时候我们可能需要查询电脑的开机记录。

## systeminfo

快捷键`win + R`输入cmd，打开命令行工具，输入`systeminfo`,可以输出系统信息，包括系统初始安装日期，系统启动时间(有可能仅仅是之前的某次开机时间)，硬件信息等

## 事件查看器

使用系统自带的时间查看器，可以比较全面的查看系统的一些事件。

1. 右键'此电脑'或者'我的电脑',选择管理菜单
1. 计算机管理(本地)-事件查看器-Windows日志-系统
1. 筛选当前日志-所有事件ID
    - 6005 事件日志服务启动(开机，有时候会缺失)
    - 6006 事件日志服务已停止(关机，有时候会缺失)
    - 30   固件报告了启动指标(bios启动，开机，比较准确)
