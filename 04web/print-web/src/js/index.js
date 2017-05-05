/*
检查输入的内容
*/
// 检查输入通知单编号
function check_memo_number(input) {
    console.log("check_memo_number()" + input.value);
    var num_reg = "";
    if (input.value === null || input.value === "") {
        alert("通知单编号不能为空！");
    }
}

// 检查担保单位/借款单位/个人名称/债务人/联系人
function check_model_pname(input) {
    if (input.value === null || input.value === "") {
        alert("借款人不能为空！");
    }
}

// 检查贷款日期/贷款到期日期
function check_model_date(input) {
    if (input.value === null || input.value === "") {
        alert("日期不能为空！");
    }
}

// 检查金额
function check_model_amount(input) {
    if (input.value === null || input.value === "") {
        alert("金额不能为空！");
    }
}

// 检查贷款用途
function check_model_loaduse(input) {
    if (input.value === null || input.value === "") {
        alert("贷款用途不能为空！");
    }
}

// 检查案件编号
function check_model_casenum(input) {
    if (input.value === null || input.value === "") {
        alert("案件编号不能为空！");
    }
}

// 检查催收原由
function check_model_reason(input) {
    if (input.value === null || input.value === "") {
        alert("催收原由不能为空！");
    }
}

// 检查工作单位或地址
function check_model_address(input) {
    if (input.value === null || input.value === "") {
        alert("借款人地址不能为空！");
    }
}

// 检查联系电话
function check_model_phone(input) {
    if (input.value === null || input.value === "") {
        alert("联系电话不能为空！");
    }
}