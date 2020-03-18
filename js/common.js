var day = new Date();
var date = day.getFullYear() + "年" + (day.getMonth() + 1) + "月" + day.getDate() + "日";
var week = day.getDay();
var aWeek = new Array("日", "一", "二", "三", "四", "五", "六");
var weekStr = "周" + aWeek[week];
var app = new Vue({
    el: '#date_now',
    data: {
        dateNow: date,
        weekNow: weekStr
    }
})
var url="http://111.230.226.20:88";
//获取id和idid传值
$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//得到uidid参数
var idid = $.getUrlParam("idid");
var s = $("a[name='aa']");
$("a[name='aa']").eq(idid).addClass("active");
if (idid == "" || idid == null) {
    $("a[name='aa']").eq(0).addClass("active");
}
    
//section选择
function selectChange(id) {
    var select = document.getElementById(id);
    var index = select.selectedIndex;
    var urlSelect = select.options[index].value;
    console.log(urlSelect)
    if (urlSelect != "")
        window.location.href = urlSelect;
} 

