目录结构
===

环境目录结构
---

```
.
├── Dockerfile      dockerfile编译文件
├── README.md       项目说明文件
├── build           生产发布目录
├── config          项目编译配置目录
├── docs            开发文档目录
├── index.html      项目载体文件
├── node_modules    包依赖目录
├── package.json    包依赖管理文件
├── src             开发目录
├── static          静态资源目录
├── test            项目测试目录
├── theme           项目主体目录
└── yarn.lock       包依赖关系文件
```


### /src

该目录是开发主目录，代码编写均在该目录下进行

### /docs

该目录是开发文档目录，项目文档均在该目录下

代码目录结构
---

```
src
├── App.vue     应用载体文件                 
├── assets      资源文件目录
│   ├── fonts       字体资源目录
│   │   └── iconfont.ttf
│   ├── images      图片资源目录
│   │   └── login-bg.png
│   └── logo.png
├── components      组件目录
│   ├── DataBox.vue
│   ├── DataGrid.vue
│   ├── DataGridItem.vue
│   ├── NavBar.vue
│   ├── NavHeader.vue
│   ├── NavTab.vue
│   ├── Tree.vue
│   ├── TreeNode.vue
│   ├── VerifyCode.vue
│   └── WorkBench.vue
├── config      项目配置目录
│   ├── app.js      系统配置文件
│   ├── router      路由配置目录
│   │   ├── index.js    路由主配置文件
│   │   └── menu        菜单配置目录
│   │       ├── approval-manage.js
│   │       ├── call-acc.js
│   │       ├── case-manage.js
│   │       ├── config-manage.js
│   │       ├── customer-manage.js
│   │       ├── index.js
│   │       ├── repair-manage.js
│   │       ├── smart-acc.js
│   │       ├── system-manage.js
│   │       └── visit-acc.js
│   └── servers     服务配置目录
│       ├── app.js
│       ├── call-acc.js
│       ├── index.js
│       ├── user.js
│       └── visit-acc.js
├── main.js     程序入口文件
├── mock        数据模拟目录
│   ├── data
│   │   ├── app.js
│   │   ├── call-acc.js
│   │   ├── index.js
│   │   ├── smart-acc.js
│   │   ├── user.js
│   │   └── visit-acc.js
│   └── mock.js
├── store       vuex数据存储
│   ├── actions.js
│   ├── getters.js
│   ├── index.js
│   ├── modules
│   │   ├── call-acc.js
│   │   └── visit-acc.js
│   └── mutations.js
├── styles      样式资源目录
│   ├── common.less     公共样式文件
│   ├── default.less    默认样式文件
│   ├── layout.css      flex布局样式文件
│   ├── theme       自定义主题目录
│   │   ├── alert.css
│   │   ├── autocomplete.css
│   │   ├── badge.css
│   │   ├── base.css
│   │   ├── breadcrumb-item.css
│   │   ├── breadcrumb.css
│   │   ├── button-group.css
│   │   ├── button.css
│   │   ├── card.css
│   │   ├── carousel-item.css
│   │   ├── carousel.css
│   │   ├── cascader.css
│   │   ├── checkbox-group.css
│   │   ├── checkbox.css
│   │   ├── col.css
│   │   ├── collapse-item.css
│   │   ├── collapse.css
│   │   ├── color-picker.css
│   │   ├── date-picker.css
│   │   ├── dialog.css
│   │   ├── dropdown-item.css
│   │   ├── dropdown-menu.css
│   │   ├── dropdown.css
│   │   ├── fonts
│   │   │   ├── element-icons.ttf
│   │   │   └── element-icons.woff
│   │   ├── form-item.css
│   │   ├── form.css
│   │   ├── icon.css
│   │   ├── index.css
│   │   ├── input-number.css
│   │   ├── input.css
│   │   ├── loading.css
│   │   ├── menu-item-group.css
│   │   ├── menu-item.css
│   │   ├── menu.css
│   │   ├── message-box.css
│   │   ├── message.css
│   │   ├── notification.css
│   │   ├── option-group.css
│   │   ├── option.css
│   │   ├── pagination.css
│   │   ├── popover.css
│   │   ├── progress.css
│   │   ├── radio-button.css
│   │   ├── radio-group.css
│   │   ├── radio.css
│   │   ├── rate.css
│   │   ├── reset.css
│   │   ├── row.css
│   │   ├── scrollbar.css
│   │   ├── select-dropdown.css
│   │   ├── select.css
│   │   ├── slider.css
│   │   ├── spinner.css
│   │   ├── step.css
│   │   ├── steps.css
│   │   ├── submenu.css
│   │   ├── switch.css
│   │   ├── tab-pane.css
│   │   ├── table-column.css
│   │   ├── table.css
│   │   ├── tabs.css
│   │   ├── tag.css
│   │   ├── theme-variables.css
│   │   ├── time-picker.css
│   │   ├── time-select.css
│   │   ├── tooltip.css
│   │   ├── tree.css
│   │   └── upload.css
│   └── variable.less       样式变量文件
├── util        功能模块目录
│   ├── common.js       基础模块
│   ├── directive.js    指令模块
│   ├── filters.js      过滤器模块
│   ├── helper.js       辅助插件模块
│   ├── net.js          网络通讯模块
│   └── storage.js      本地存储模块
└── views       页面视图目录
    ├── 404.vue     404页面文件
    ├── Home.vue    功能主页
    ├── Login.vue   登陆页
    ├── Test
    │   ├── Page1.vue
    │   ├── Page2.vue
    │   ├── Page3.vue
    │   ├── Page4.vue
    │   └── Page5.vue
    ├── Work.vue    催收中心
    ├── call-acc
    │   ├── CallCase.vue
    │   └── CallHandledCase.vue
    ├── smart-acc
    │   ├── EmailAcc.vue
    │   └── MessageAcc.vue
    └── visit-acc
        ├── AssistApplication.vue
        ├── VisitCase.vue
        └── VisitHandledCase.vue
```

### /assets

该目录为资源文件目录，项目中用到的图片文件，字体文件等资源文件放在该目录下，页面中通过相对路径进行访问

### /components

该目录为功能组件目录，项目中公共组件存放在该目录下

### /config 

该目录为项目配置目录，该目录下存放项目相关全局配置数据

### /mock

该目录为数据模拟目录，该目录下存放模拟数据信息，当服务端接口未完成时，可以通过配置模拟数据完成接口请求

### /store

该目录为基于vuex的单向数据流目录，用于跨组建之间的数据传递以及更新

### /styles

该目录为样式资源目录，该目录下存放全局样式文件

### /util

该目录为功能库目录，用于提供封装好的功能类库

### /views

该目录为业务视图目录，所有的业务试图存放于该目录下