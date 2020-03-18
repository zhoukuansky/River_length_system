var url = "http://111.230.226.20:88";

//var userId = document.cookie.split(";")[0].split("=")[1];
var Token = document.cookie.split(";")[0].split("=")[1];

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


