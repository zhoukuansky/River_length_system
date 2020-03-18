//得到id参数和markinput标志位
var id = $.getUrlParam("id");
var markInput = $.getUrlParam("markInput");

var eventInfo = new Vue({
    el: "#table",
    data: {
        idid:idid,

        markInput: markInput,
        type: "",
        info: "",
        uploadUserName:"",
        dealUserName:"",
        time: "",
        xy: "",
        addr: "",
        src: "",
        pro: "",
        startTime: "",
        endTime: "",
        doInfo: "",
    }
})
var wordVue = new Vue({
    el: "#word",
    data: {
        word: "",
        markInput: markInput,
    }
})

var problemId;

$(function () {
    if (markInput == 0) queryInfo();
    if (markInput == 1) nowDo();
    if (markInput == 2) endDo();
})

//新事件查询事件详情
function queryInfo() {
    $.ajax({
        url: url + "/event/" + id,
        type: "GET",
        dataType: "json",
        headers: {
            Token: Token,
        },
        success: function (res) {
            if (res.status == 0) {
                console.log(res.data);

                eventInfo.type = res.data.problemCategory;
                eventInfo.info = res.data.problemDesc;
                eventInfo.time = res.data.insertTime;
                eventInfo.uploadUserName = res.data.uploadUsername;
                eventInfo.xy = res.data.longitude + "," + res.data.latitude;
                eventInfo.src = res.data.imageUrl;
                if (res.data.statusId == 0)
                    eventInfo.pro = "新事件";
                if (res.data.statusId == 1)
                    eventInfo.pro = "正在处理";
                eventInfo.addr = res.data.address;
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        }
    })
}

//正在处理事件详情
function nowDo() {
    $.ajax({
        url: url + "/event/" + id,
        type: "GET",
        dataType: "json",
        headers: {
            Token: Token,
        },
        success: function (res) {
            if (res.status == 0) {
                console.log(res.data);
                problemId = res.data.problemDeals[0].id;

                eventInfo.type = res.data.problemCategory;
                eventInfo.info = res.data.problemDesc;
                eventInfo.time = res.data.insertTime;
                eventInfo.xy = res.data.longitude + "," + res.data.latitude;
                eventInfo.src = res.data.imageUrl;
                eventInfo.uploadUserName = res.data.uploadUsername;
                eventInfo.dealUserName = res.data.problemDeals[0].userDesc;
                eventInfo.startTime = res.data.problemDeals[0].pullTime;

                if (res.data.statusId == 0)
                    eventInfo.pro = "新事件";
                if (res.data.statusId == 1)
                    eventInfo.pro = "正在处理";
                eventInfo.addr = res.data.address;
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        }
    })
}

//完成事件详情
function endDo() {
    $.ajax({
        url: url + "/event/" + id,
        type: "GET",
        dataType: "json",
        headers: {
            Token: Token,
        },
        success: function (res) {
            if (res.status == 0) {
                console.log(res.data);

                eventInfo.type = res.data.problemCategory;
                eventInfo.info = res.data.problemDesc;
                eventInfo.time = res.data.insertTime;
                eventInfo.xy = res.data.longitude + "," + res.data.latitude;
                eventInfo.src = res.data.imageUrl;
                eventInfo.uploadUserName = res.data.uploadUsername;

                eventInfo.startTime = res.data.problemDeals[0].pullTime;
                eventInfo.endTime = res.data.problemDeals[0].pushTime;
                eventInfo.doInfo = res.data.problemDeals[0].pushDesc;
                eventInfo.dealUserName = res.data.problemDeals[0].userDesc;

                eventInfo.pro = "事件已完成";
                eventInfo.addr = res.data.address;
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        }
    })
}

//完成事件
function tijiao() {
    if (wordVue.word == "") {
        alert("文本输入不能为空")
    } else {
        $.ajax({
            url: url + '/deal/push',
            type: 'POST',
            dataType: "json",
            headers: {
                Token: Token,
            },
            data:
                {
                    problemId: problemId,
                    dealDesc: wordVue.word,
                    pushStatus: 3,
                },
            success: function (res) {
                console.log(res);
                if (res.status == 0) {
                    alert("此事件处理完成");
                    window.location.href = "admin.html?idid=1";
                }
                if (res.status == 400 || res.status == 402 || res.status == 403) {
                    alert("登陆超时，请重新登陆");
                    window.location.href = "login.html";
                }
            },
            error: function (res) {
                console.log(res);
            }
        })
    }
}