var imgNews = ["", "", ""];
var show = ["showPhoto", "", ""];
var btnNow = ["btn btn-xs btn-success", "btn btn-xs btn-default", "btn btn-xs btn-default"];
var src = ["../images/1.jpg", "../images/2.jpg", "../images/3.jpg"];
var app = new Vue({
    el: '#imgimg',
    data: {
        imgNews0: imgNews[0],
        imgNews1: imgNews[1],
        imgNews2: imgNews[2],
        show0: show[0],
        show1: show[1],
        show2: show[2],
        src0: src[0],
        src1: src[1],
        src2: src[2],
        btn0: btnNow[0],
        btn1: btnNow[1],
        btn2: btnNow[2],
    }
})

var searchVue = new Vue({
    el: "#search",
    data: {
        baidu: "",
    }
})

var newsVue = new Vue({
    el: "#news_list",
    data: {
        items: [
            { id: "", title: "加载失败...", insertTime: "" },
        ]
    }
})

var policyVue = new Vue({
    el: "#policy",
    data: {
        items: [
            { id: "", title: "加载失败...", insertTime: "" },
        ]
    }
})

var eventVue = new Vue({
    el: "#event",
    data: {
        items: [
            { id: "", title: "加载失败...", insertTime: "", url: "" },]
    }
})

$(function () {
    var img = setInterval("now()", 2000);
    queryNews();
    queryPolicy();
    queryFile();
})

//查询文件法规
function queryFile() {
    $.ajax({
        url: url + "/fileRecorder",
        type: "GET",
        dataType: "json",
        data: {
            pageSize: 13,
        },
        ContentType: "application/json",
        headers: {
        },
        success: function (res) {
            if (res.status == 0) {
                eventVue.items = res.data.content;
                for (let i = 0; i < eventVue.items.length; i++) {
                    eventVue.items[i].url = url + eventVue.items[i].url;
                    eventVue.items[i].insertTime = eventVue.items[i].insertTime.split(" ")[0];
                }
            }
        }
    })
}

//百度搜索功能
function searchBaiDu() {
    if (searchVue.baidu !=""){
        window.open("http://www.baidu.com/s?word=" + searchVue.baidu);
    }
}

//查询新闻
function queryNews() {
    $.ajax({
        url: url + "/news/listNews",
        type: "GET",
        dataType: "json",
        data: {
            pageSize: 13,
        },
        ContentType: "application/json",
        headers: {
        },
        success: function (res) {
            if (res.status == 0) {
                newsVue.items = res.data.content;
                for (let i = 0; i < newsVue.items.length; i++) {
                    newsVue.items[i].insertTime = newsVue.items[i].insertTime.split(" ")[0];
                }
            }
        }
    })
}

//查询政策
function queryPolicy() {
    $.ajax({
        url: url + "/institution/list",
        type: "GET",
        dataType: "json",
        data: {
            pageSize: 13,
        },
        ContentType: "application/json",
        headers: {
        },
        success: function (res) {
            if (res.status == 0) {
                policyVue.items = res.data.content;
                for (let i = 0; i < policyVue.items.length; i++) {
                    policyVue.items[i].insertTime = policyVue.items[i].insertTime.split(" ")[0];
                }
                console.log(policyVue.items);
            }
        }
    })
}

//图片轮播 按钮点击
function btnClick(id) {
    for (let i = 0; i < 3; i++) {
        if (show[i] == "showPhoto") {
            show[i] = "";
            btnNow[i] = "btn btn-xs btn-default";
        }
    }
    show[id] = "showPhoto";
    btnNow[id] = "btn btn-xs btn-success";
    for (let i = 0; i < 3; i++) {
        app.show0 = show[0];
        app.show1 = show[1];
        app.show2 = show[2];
        app.btn0 = btnNow[0];
        app.btn1 = btnNow[1];
        app.btn2 = btnNow[2];
    }
}

//图片 定时轮播
function now() {
    for (let i = 0; i < 3; i++) {
        if (show[i] == "showPhoto") {
            if (i < 2) {
                show[i] = "";
                show[i + 1] = "showPhoto";
                btnNow[i] = "btn btn-xs btn-default";
                btnNow[i + 1] = "btn btn-xs btn-success";
                break;
            } else {
                show[2] = "";
                show[0] = "showPhoto";
                btnNow[2] = "btn btn-xs btn-default";
                btnNow[0] = "btn btn-xs btn-success";
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        app.show0 = show[0];
        app.show1 = show[1];
        app.show2 = show[2];
        app.btn0 = btnNow[0];
        app.btn1 = btnNow[1];
        app.btn2 = btnNow[2];
    }
}