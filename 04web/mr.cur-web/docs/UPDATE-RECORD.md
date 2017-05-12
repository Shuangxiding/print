更新记录
===

2017.03.23

1. 获取级联城市列表方法添加缓存，加快获取速度

2017.03.24

1. 修改data-grid-item组件内容设置方法，删除`content`属性，修改为直接使用`slot`赋值,支持添加复杂数据

例:

```
<data-grid>
    // bad
    <data-grid-item :content="content"></data-grid-item>
    // good
    <data-grid-item>{{content}}</data-grid-item>
```

2017.03.25

1.更新data-box组件，添加defaultSelection属性，支持默认选择项设置

例:

```
<data-box row-key="id" :defaultSelction="xxx">
```

2.新增details-tab组件，消息框样式选项卡

例:
```
<details-tab :tabsArr="tabsArr">
  <template slot="anjian">
        1
    </template>
    <template slot="sec">
        2
  </template>
</details-tab>
tabsArr: [{ title: '案件处理', pane: 'anjian'}, {title: '案件详情',pane: 'sec'}]
```
