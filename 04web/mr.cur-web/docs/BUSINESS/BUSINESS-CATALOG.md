业务目录
===

本次业务整理根据原型效果设计产生，具体页面可以通过原型设计进行浏览。

原型地址:[ttps://192.168.1.2/svn/cuibei/trunk/01Req/原型](ttps://192.168.1.2/svn/cuibei/trunk/原型)

原型地址为内网地址，请选择最新目录日期进行浏览

---
模块目录
---

催大人系统业务划分为

* **4种业务分类**
* **11个业务模块**
* **36个功能页面**

具体划分如下:

模块名称|页面数量|备注|编号
:---:|:---:|:---:|:---:|
基础模块|3|基础业务|00FFFF|
电话催收|2|催收业务|01FFFF|call-acc
外访催收|3|催收业务|02FFFF|visit-acc
智能催收|4|催收业务|03FFFF|smart-acc
催收管理|6|催收业务|无权限控制|manage-acc
案件管理|7|信息管理业务|04FFFF|case-manage
修复管理|4|信息管理业务|05FFFF|repair-manage
审批管理|2|信息管理业务|06FFFF|approval-manage
客户信息|1|信息管理业务|07FFFF|customer-manage
配置管理|2|系统配置业务|08FFFF|config-manage
系统管理|2|系统配置业务|09FFFF|system-manage


页面目录
---

*ps:斜体页面名称是目录导航页面，无法在首页菜单中浏览，可通过具体业务进入*

#### 基础模块   ３   00FFFF

页面|文件名|编号|描述
:---:|:---:|:---:|:---:
登录|Login||
首页|Home||
我的工作台|Work||

#### 电话催收   ２   01FFFF

页面|文件名||编号描述
:---:|:---:|:---:|:---:
电催案件|CallCase|0101FF|
已处理记录|CallHandledCase|0102FF|

#### 外访催收   ３ 02FFFF

页面|文件名||编号描述
:---:|:---:|:---:|:---:
协催申请审批|AssistApplication|0201FF|
外访客户|VisitCase|0202FF|
已处理记录|VisitHandledCase|0203FF|

#### 智能催收   ４   03FFFF

页面|文件名|编号|描述
:---:|:---:|:---:|:---:
短信催收|MessageAcc|0301FF|
电子邮件催收|EmailAcc|0302FF|
语音群呼|VoiceAcc|0303FF|
*打印信函*|PrintLetter||
=======
页面|描述|编号
:---:|:---:|:---:
短信催收|MessageAcc|0301FF
电子邮件催收|EmailAcc|0302FF
语音群呼||0303FF
*打印信函*||

#### 催收管理   ６

页面|文件名|编号|描述
:---:|:---:|:---:|:---:
催收中心|AccCenter||
跟进记录|FollowRecord||
案件还款|CaseRepay||
协催申请记录|AssistApplicationRecord||
发送信息记录|SendMessageRecord||


#### 案件管理   7   04FFFF

页面|文件名|编号|描述
:---:|:---:|:---:|:---:
委托方管理|ClientManage|0401FF|
案件导入|CaseImport|0402FF|
案件分配|CaseAllocate|0403FF|
案件再分配|CaseReallocate|0404FF||

*案件详情*|CaseDetail||
*案件详情-客户信息*|CustomerInfo||
*案件详情-还款信息*|PepayInfo||
*案件详情-材料下载*|CaseDownload||


#### 修复管理   4   05FFFF

页面|文件名|编号|描述
:---:|:---:|:---:|:---:
案件修复|CaseRepair|0501FF|
修复记录|CaseRepairRecord|0502FF|
*修复详情*|CaseRepairDetail||
*修复信息*|CaseRepairInfo||
*原始信息*|CaseOriginInfo||

#### 审批管理   2   06FFFF

页面|文件名|编号|描述
:---:|:---:|:---:|:---:
费用减免审批|CostReduce|0601FF|
减免审批|CostApproval||
减免跟进|CostFollow||
还款审核|RepairReview|0602FF|
<!--规则库调整审批|-->


#### 客户查询   1   07FFFF

页面|文件名|编号|描述
:---:|:---:|:---:|:---:
客户信息查询|CustomerQuery|0701FF|

#### 配置管理   2   08FFFF

页面|文件名|编号|描述
:---:|:---:|:---:|:---:
客户资料配置|CustomerConfig|0801FF|
模板配置|TemplateConfig|0802FF|

#### 系统管理   2   09FFFF

页面|文件名|编号|描述
:---:|:---:|:---:|:---:
机构与用户管理|UserManage|0901FF|
角色管理|RoleManage|0902FF|


## 页面分类整理

* 工作台页面
* 电话催收模块
* 外访催收模块
