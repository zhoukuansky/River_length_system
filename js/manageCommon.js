var day = new Date();
var date = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
var week = day.getDay();
var aWeek = new Array("日", "一", "二", "三", "四", "五", "六");
var weekStr = "周" + aWeek[week];
date = date + " " + weekStr;

var url = "http://111.230.226.20:88";
var user = document.cookie.split(";")[0].split("=")[1];
var Token = document.cookie.split(";")[1].split("=")[1];

//获取id和idid传值
$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//得到uidid参数，并判断active类应该在哪儿
var idid = $.getUrlParam("idid");
var s = $("a[name='aa']");
$("a[name='aa']").eq(idid).addClass("active");
if (idid == "" || idid == null) {
    $("a[name='aa']").eq(0).addClass("active");
}
//页面右上角vue
var ulVue = new Vue({
    el: "#ul_right",
    data: {
        userId: user,
        time: date,
    }
})
//下线按钮函数
function loginOut() {
    $.ajax({
        url: url + "/logout",
        headers: {
            Token: Token,
        },
        type: "GET",
        success: function (res) {
            if (res.status == 0 || res.status == 400) {
                document.cookie = "user=" + "";
                document.cookie = "Token=" + "";
                window.location.href = "login.html";
            }
            if (res.status == 400 || res.status == 402||res.status==403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        },
        error: function () {
            alert(下线失败);
        }
    })
}

