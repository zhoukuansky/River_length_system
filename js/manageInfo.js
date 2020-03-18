var mark = $.getUrlParam("mark");
var id = $.getUrlParam("id");

//富文本初始化
var E = window.wangEditor;
var editor = new E('#newsBody');
editor.customConfig.uploadImgServer = 'http://111.230.226.20:88/file/uploadPic';
editor.customConfig.uploadFileName = 'file';
editor.create();

//标题等信息vue
var infoVue = new Vue({
    el: "#info",
    data: {
        idid: idid,
        source: "",
        title: "",
        author: "",
    }
})

$(function () {
    //点击编辑时查询
    if (idid == 3 && mark != "100") {
        urlStr = url + "/news/" + id,
            query(urlStr);
    }
    if (idid == 4 && mark != "100") {
        urlStr = url + "/streetDynamic/" + id,
            query(urlStr);
    }
    if (idid == 6 && mark != "100") {
        urlStr = url + "/institution/" + id,
            query(urlStr);
    }
})

//查询按钮
function query(urlStr) {
    $.ajax({
        url: urlStr,
        type: 'GET',
        dataType: "json",
        headers: {},
        success: function (res) {
            console.log(res);
            if (res.status == 0) {
                infoVue.title = res.data.title;
                infoVue.source = res.data.from;
                if (idid != 6) {
                    infoVue.author = res.data.author;
                }
                editor.txt.html(res.data.body);
            }
        },
        error: function (res) {
            console.log(res);
        }
    })
}

//新建提交按钮
function tijiao() {
    if (idid == 3) {
        if (mark == "100") {
            var urlAdd = '/news/addNews';
            $.ajax({
                url: url + urlAdd,
                type: 'POST',
                dataType: "json",
                headers: {
                    Token: Token,
                },
                data:
                    {
                        newsFrom: infoVue.source,
                        newsTitle: infoVue.title,
                        newsAuthor: infoVue.author,
                        newsBody: editor.txt.html()
                    },
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {
                        alert("新建记录成功");
                        window.location.href = "admin.html?idid=3";
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
        else {
            var urlAdd = '/news/update';
            $.ajax({
                url: url + urlAdd,
                type: 'POST',
                dataType: "json",
                headers: {
                    Token: Token,
                },
                data:
                    {
                        id: id,
                        newsFrom: infoVue.source,
                        newsTitle: infoVue.title,
                        newsAuthor: infoVue.author,
                        newsBody: editor.txt.html()
                    },
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {
                        alert("修改记录成功");
                        window.location.href = "admin.html?idid=3";
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
    else if (idid == 4) {
        if (mark == "100") {
            var urlUpdate = '/streetDynamic';
            $.ajax({
                url: url + urlUpdate,
                type: 'POST',
                dataType: "json",
                headers: {
                    Token: Token,
                },
                data:
                    {
                        dynamicFrom: infoVue.source,
                        title: infoVue.title,
                        body: editor.txt.html(),
                        author: infoVue.author,
                    },
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {
                        alert("新建记录成功");
                        window.location.href = "admin.html?idid=4";
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
        } else {
            var urlUpdate = '/streetDynamic/' + id;
            var json = {
                "dynamicFrom": infoVue.source,
                "author": infoVue.author,
                "title": infoVue.title,
                "body": editor.txt.html()
            }
            $.ajax({
                url: url + urlUpdate,
                type: 'PUT',
                dataType: "json",
                headers: {
                    Token: Token,
                },
                data: JSON.stringify(json),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {
                        alert("修改记录成功");
                        window.location.href = "admin.html?idid=4";
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
    else {
        if (mark == "100") {
            var urlUpdate = '/institution/add';
            $.ajax({
                url: url + urlUpdate,
                type: 'POST',
                dataType: "json",
                headers: {
                    Token: Token,
                },
                data:
                    {
                        institutionFrom: infoVue.source,
                        institutionTitle: infoVue.title,
                        institutionBody: editor.txt.html()
                    },
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {
                        alert("新建记录成功");
                        window.location.href = "admin.html?idid=6";
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

        else {
            var urlUpdate = '/institution/update';
            $.ajax({
                url: url + urlUpdate,
                type: 'POST',
                dataType: "json",
                headers: {
                    Token: Token,
                },
                data:
                    {
                        id: id,
                        institutionFrom: infoVue.source,
                        institutionTitle: infoVue.title,
                        institutionBody: editor.txt.html()
                    },
                success: function (res) {
                    console.log(res);
                    if (res.status == 0) {
                        alert("修改记录成功");
                        window.location.href = "admin.html?idid=6";
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
}