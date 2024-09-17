---
title: Windows 下使用 Hexo + GitHub Pages 搭建自己的博客指北
comment: true
aging: true
mathjax: true
code_block_shrink: false
date: 2024-09-16 11:07:14
tags:
  - Hexo
  - Git
  - NodeJS
  - 博客
categories: 博客搭建
---


## 〇、开始之前
{% note primary %}
这篇文章可能用于计算机社博客搭建教学。
{% endnote %}
在开始之前，你需要有：

- 一个健康的搜索引擎（遇到问题自己搜啊喂）
- 一个 GitHub 账号

{% note primary %}
如果上不去 Github 可以考虑尝试 [FastGithub](https://github.com/WangGithubUser/FastGithub) 或者 [Watt Toolkit](https://steampp.net/accelerate)……~~哦好像 Windows 7 都用不了，那我在想想办法罢。~~
{% endnote %}

## 一、安装 Git 和 Node.js

Git 在 [这里](https://git-scm.com/downloads) 找到自己的版本并安装。Node.js 在 [这里](https://nodejs.org) 找到自己电脑对应的版本并安装。

{% note primary %}
下载速度太慢？可以到这里找找！
Git: [https://github.com/waylau/git-for-win](https://github.com/waylau/git-for-win)
{% endnote %}

{% note primary %}
使用 Node.js 官方安装程序时，请确保勾选 Add to PATH 选项（默认已勾选）
{% endnote %}

安装好后，在 cmd / PowerShell 中分别输入 `git -v` `npm -v` `node -v`，若没有报错且返回的是版本号则安装成功。

![如图所示。](https://img.picui.cn/free/2024/09/16/66e82d9d5ae1d.png)

## 二、安装 Hexo

官网上给出的命令是 `npm install -g hexo-cli`，但我们~~出于众所周知的网络原因~~而不用，而是使用阿里的镜像源：
```cmd
npm install -g cnpm --registry=https://registry.npmmirror.com
cnpm install -g hexo-cli
```

这样就成功安装了 Hexo。

如果遇到形如 `Install fail! Error: EISDIR: illegal operation on a directory, symlink…` 的报错，那请尝试运行
```cmd
corepack enable
```
然后将 `npm` 换成 `pnpm`。

{% note primary %}
在网上找到开头为 `npm` 的命令，将其替换成 `cnpm` 或 `pnpm` 哦！
~~遇到问题了可以 `cnpm` 或 `pnpm` 换着试，没准就成功了呢~~
{% endnote %}

## 三、初始化 Hexo 项目

找一个心仪的位置，然后右键 → `Git Bash Here`。这时候出现的是 Git 命令窗口。输入
```git
hexo init 随便取一个名字
```
用来创建 Hexo 项目文件夹。这时发现卡住了，按 `Crtl + C` 取消，发现这个位置里已经有了一个以你刚才取的名字为名字的文件夹，里面已经有了基本的文件。

**这时候可以选择 `cd 你刚才取的名字` 进入文件夹进行下一步操作；也可以直接点进这个文件夹，然后右键 → `Git Bash Here`。**

**确定好自己已经在刚刚创建的文件夹后**，输入
```git
cnpm install
```
稍等一会，Hexo 就已经初始化好啦！

{% note primary %}
之后的命令默认在命令窗口中输入。  
按 `Crtl + C` 可以终止一个命令哦！
{% endnote %}

在终端中分别输入
```git
# 这个井号是注释的意思，别把这个也复制上去！！
hexo cl # 清理缓存
hexo g # 生成静态文件
hexo s # 启动本地服务器进行预览：在浏览器中访问http://localhost:4000查看效果。
```
即可在 [http://localhost:4000/](http://localhost:4000/) 中预览啦！

{% note danger %}
如果要在本地预览博客的话，每次修改博客文件后，都要执行这三条命令哦！
{% endnote %}

## 四、连接 Github

注册好 Github 后，再次右键 → `Git Bash Here`，输入：

```git
git config --global user.name "你的 GitHub 用户名"
git config --global user.email "你的 GitHub 邮箱"
```
创建 SSH 密匙：
```git
ssh-keygen -t rsa -C "你的 GitHub 邮箱"
```
然后一直回车即可。

这时候进入 `C:\Users\用户名\.ssh` 目录 **（要勾选显示“隐藏的项目”）**，用记事本 / VScode 打开公钥 id_rsa.pub 文件并复制里面的内容。登陆 GitHub，进入 Settings 页面，选择左边栏的 SSH and GPG keys，点击 New SSH key[（嫌麻烦的就直接点这吧）](https://github.com/settings/keys)。Title 随便取个名字，粘贴刚才复制的 id_rsa.pub 内容到 Key 中，点击 Add SSH key 完成添加。

![Pic 1](https://img.picui.cn/free/2024/09/17/66e927a7dbc6c.png)

输入
```cmd
ssh -T git@github.com
```
后，出现 `Are you sure…`，输入 `yes` 回车确认。显示 `Hi xxx! You've successfully……` 即连接成功。

## 五、创建仓库

点击 GitHub 主页右上角的加号 → New repository：

1. Repository name 中输入 **你的 GitHub 用户名**.github.io
1. 勾选 “Initialize this repository with a README”
1. 选填 Description

填好后点击 Create repository 创建。

![Pic 2](https://img.picui.cn/free/2024/09/17/66e9292932756.png)

## 六、上传至 GitHub

安装部署插件：
```git
npm install hexo-deployer-git --save
```

然后修改博客根目录下 _config.yml 文件末尾的 deploy 部分，修改成如下：

```yml
deploy:
  type: 'git'
  repo: https://github.com/你的 GitHub 名字/你的 GitHub 名字.github.io.git
  branch: main
```

完成后再输入
```git
hexo cl
hexo g
hexo d # 上传至 GitHub
```

如果没有报错的话，等不了一会你就能看到在 你的GitHub名字.github.io 上看到你刚上传的博客模板啦！


## 七、博客备份

众所周知，机房的电脑管理后硬盘是会被重置的。那除了把博客文件放在 U 盘里外，有没有什么更优雅的办法呢？我这里采用创建新仓库备份源文件的办法。

### 1. 创建仓库
与上文一样点击 GitHub 主页右上角的加号 → New repository：

1. Repository name 就随便取一个名字；
2. 选择 Private，这样你的仓库就是私密的了。

填好后点击 Create repository 创建。

### 2. 创建 git
直接将你仓库里的整个 repo 克隆下来（不会命令行的直接下载罢），然后复制其中的 .git 目录 到你博客的根目录下。
___
文章持续更新中…