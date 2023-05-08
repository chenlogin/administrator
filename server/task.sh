#!/bin/bash

# 定时任务
# 备份db.json数据，每周日凌晨1:30执行
# crontab -e
# 30 1 * * 0 /bin/sh /data/workspace/www/saasmanager.net/server/task.sh >/dev/null 2>&1

cdate=$(date +"%Y-%m-%d_%H-%M-%S")
basepath=/data/workspace/www/saasmanager.net
sourcepath=$basepath/server/db/db.json
destpath=$basepath/server/db.bank/$cdate

# 创建目录
mkdir -p $destpath

# 备份db.json文件
cp -rf $sourcepath $destpath
