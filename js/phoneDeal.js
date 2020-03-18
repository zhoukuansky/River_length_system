var id = getUrlParam("id");
var idid = getUrlParam("idid");

var tableVue = new Vue({
    el: "#table",
    data: {
        idid:idid,

        uploadUserName:"",
        dealUserName:"",
        type: "",
        desc: "",
        time: "",
        xy: "",
        addr: "",
        process: "",
        src: "",
        addr: "",
        startTime:"",
        endTime:"",
        doInfo:"",
    }
})

var textVue=new Vue({
    el:"#text",
    data:{
        idid:idid,
        textarea:"",
    }
})

var problemId;

$(function () {
    if(idid==0)
    queryNew();
    if(idid==1)
    queryDeal();
    if(idid==3)
    queryFinish();
})

function queryNew() {
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

                tableVue.type = res.data.problemCategory;
                tableVue.desc = res.data.problemDesc;
                tableVue.time = res.data.insertTime;
                tableVue.uploadUserName=res.data.uploadUsername;
                tableVue.xy = res.data.longitude + "," + res.data.latitude;
                tableVue.src = res.data.imageUrl;
                if (res.data.statusId == 0)
                    tableVue.process = "新事件";
                if (res.data.statusId == 1)
                    tableVue.process = "正在处理";
                tableVue.addr = res.data.address;
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        }
    })
}

function queryDeal(){
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

                tableVue.type = res.data.problemCategory;
                tableVue.desc = res.data.problemDesc;
                tableVue.time = res.data.insertTime;
                tableVue.xy = res.data.longitude + "," + res.data.latitude;
                tableVue.src = res.data.imageUrl;
                tableVue.uploadUserName=res.data.uploadUsername;
                tableVue.startTime = res.data.problemDeals[0].pullTime;
                tableVue.dealUserName = res.data.problemDeals[0].userDesc;

                if (res.data.statusId == 0)
                    tableVue.process = "新事件";
                if (res.data.statusId == 1)
                    tableVue.process = "正在处理";
                tableVue.addr = res.data.address;
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        }
    }) 
}

function queryFinish(){
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

                tableVue.type = res.data.problemCategory;
                tableVue.desc = res.data.problemDesc;
                tableVue.time = res.data.insertTime;
                tableVue.xy = res.data.longitude + "," + res.data.latitude;
                tableVue.src = res.data.imageUrl;
                tableVue.uploadUserName=res.data.uploadUsername;
                tableVue.startTime = res.data.problemDeals[0].pullTime;
                tableVue.endTime = res.data.problemDeals[0].pushTime;
                tableVue.doInfo =res.data.problemDeals[0].pushDesc;
                tableVue.dealUserName = res.data.problemDeals[0].userDesc;


                tableVue.process = "事件已完成";
                tableVue.addr = res.data.address;
            }
            if (res.status == 400 || res.status == 402||res.status==403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        }
    })
}

//提交按钮
function finish(){
    if (textVue.textarea == "") {
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
                dealDesc: textVue.textarea,
                pushStatus: 3,
            },
            success: function (res) {
                console.log(res);
                if (res.status == 0) {
                    alert("此事件处理完成");
                    window.location.href = "phoneAllEvents.html";
                }
                if (res.status == 400 || res.status == 402||res.status==403) {
                    alert("登陆超时，请重新登陆");
                    window.location.href = "phoneLogin.html";
                }
            },
            error: function (res) {
                console.log(res);
            }
        })
    }
}