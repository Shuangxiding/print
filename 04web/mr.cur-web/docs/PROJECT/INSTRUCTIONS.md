项目说明
===

本项目前端是基于`vue2`进行开发`spa`应用

主要使用的技术栈如下图:

![前端技术栈](/images/前端技术栈.png)

### 核心

项目核心框架采用`vue２`进行搭建，围绕`vue　2`采用了`vue-router`路由系统完成页面路由,使用`vuex`实现项目中单项数据流。

* vue
* vue-router
* vuex

### UI

项目UI采用基于vue2的`Element-UI`进行实现，样式实现基于预处理器`less`进行开发

* element-ui
* less
* css/css3

### 语言

前端开发语言是基于原生的`JavaScript`进行开发，使用的`ES2016`完成语言扩展(*通过Babel实现*)，其中语言开发规范使用`JavaScript-Standard-Style`标准配合`eslint`进行代码规范检测

### 代码管理

前端项目代码管理通过`git`进行代码仓库管理,具体分支提交规范，请查看代码仓库说明

### 理论概念

* MVVM

MVVM是由微软最早提出并应用到WPF数据绑定模型，它使用了`view`,`viewmodel`,`model`三层设计，`viewmodel`设定`model`与`view`之间的绑定管理,这样通过对数据的修改实现响应式的UI变化。


* FLUX

首先要分清数据绑定与数据流之间的区别,`FLUX`就是一种单项数据流模型，他的大概流向为:

* 用户访问 View
* View 发出用户的 Action
* Dispatcher 收到 Action，要求 Store 进行相应的更新
* Store 更新后，发出一个"change"事件
* View 收到"change"事件后，更新页面

数据总是"单向流动"，任何相邻的部分都不会发生数据的"双向流动"。这保证了流程的清晰
