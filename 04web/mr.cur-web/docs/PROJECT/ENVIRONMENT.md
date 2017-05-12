开发环境搭建 
===

本文档介绍前端基本开发环境搭建步骤，安装文档流程即可搭建前段开发环境。

---

### 工具准备

首先准备下表中的工具软件，前往官方或内网ftp服务器进行下载安装

软件名称|描述|地址
:---:|:---:|:---:
git|代码管理|https://git-scm.com/
nodejs|基础环境|http://nodejs.cn/
vscode|开发IDE|http://www.vscode.org/

### 代码检出

执行

```
git clone http://192.168.1.102:8080/gitbucket/git/jianweidong/web.git
```

即可检出前端代码

进入检出目录进行模块安装

```
cd web
npm install
```

开发环境即准备完成

### 开发IDE准备

打开`vscode`进行安装插件，请安装下列插件

* Beautify
* ESLint
* Material Icon Theme (可选)
* vetur
* VueHelper

修改`vscode`用户配置

`CODE`->`首选项`->`设置`

将如下内容粘贴入`setting.js`文件

```
{
    "workbench.iconTheme": "material-icon-theme",
    "editor.fontSize": 16,//字号根据自己需要调整
    "editor.formatOnSave": true,
    "beautify.language.html": ["htm", "html", "vue"]
}
```

开发IDE配置完成

### 启动代码 

启动代码有两种方式:

* npm run dev
* npm run mock

** npm run dev **

这种方式是直接以开发模式启动，直接访问服务端接口，用于开发调试

** npm run mock **

这种方式使用了数据模拟拦截请求，在访问服务端前拦截了发送请求，直接使用了`mockData`数据进行返回，用于无服务端调试


----
*本文档随时可能变更，请以最新文档为准*







