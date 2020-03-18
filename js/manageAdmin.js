//翻页vue
var page = {
    totalElements: 0,
    allPages: 1,
    last: false,
    first: true,
    size: 18,
    now: 1,
}

//页面翻页功能vue
var pageVue = new Vue({
    el: "#pages",
    data: {
        totalElements: 0,
        nowPage: 1,
        allPages: 1,
    }
})
//操作vue
var caozuoVue = new Vue({
    el: "#caozuo",
    data: {
        idid: idid,
    }
})
//用户和事件类型vue
var eventTypeVue = new Vue({
    el: "#one-modal-body",
    data: {
        idid: idid,
        typeInput: "",
        typeInput2: "",
        role: "",
        items: [{ problemCategory: "加载失败", desc: "加载失败" }],
    }
})
//用户类型标题提示
var typeTopicVue = new Vue({
    el: "#type_topic",
    data: {
        idid: idid,
    }
}
)

//判断用户新建还是更新标志位
var userMark;
//保存用户编辑时的id传值
var userID;

//街镇vue
var streetVue = new Vue({
    el: "#streetTable",
    data: {
        idid: idid,
        num: page.size * (page.now - 1),
        items: [
            { title: "加载失败", insertTime: "加载失败", author: "加载失败" },
        ]
    }
})
//未完成事件vue
var newEventVue = new Vue({
    el: "#newEventTable",
    data: {
        idid: idid,
        num: page.size * (page.now - 1),
        items: [
            { statusMark: true, problemDesc: "加载失败", insertTime: "加载失败" }
        ]
    }
})
//已完成事件vue
var oldEventVue = new Vue({
    el: "#oldEventTable",
    data: {
        num: page.size * (page.now - 1),
        idid: idid,
        items: [
            { problemDesc: "加载失败", insertTime: "加载失败", }
        ]
    }
})
//用户vue
var userVue = new Vue({
    el: "#usersTable",
    data: {
        idid: idid,
        num: page.size * (page.now - 1),
        items: [
            { loginName: "加载失败", username: "加载失败", tel: "加载失败", userCategory: "加载失败", }
        ]
    }
})
//新闻vue
var newsVue = new Vue({
    el: "#newsTable",
    data: {
        idid: idid,
        num: page.size * (page.now - 1),
        items: [
            { title: "加载失败", author: "加载失败", insertTime: "加载失败" },
        ]
    }
})
//政策主题vue
var policyVue = new Vue({
    el: "#policy",
    data: {
        num: page.size * (page.now - 1),
        idid: idid,
        items: [
            { title: "加载失败", insertTime: "加载失败", cc: "加载失败", dd: "加载失败", ee: "加载失败", }
        ]
    }
})
//工作简报vue
var workVue = new Vue({
    el: "#work",
    data: {
        num: page.size * (page.now - 1),
        idid: idid,
        items: [
            { title: "加载失败", insertTime: "加载失败", cc: "加载失败", dd: "加载失败", ee: "加载失败", }
        ]
    }
})
//文件法规vue
var fileVue = new Vue({
    el: "#file",
    data: {
        idid: idid,
        num: page.size * (page.now - 1),
        items: [
            { title: "加载失败", insertTime: "加载失败", }
        ]
    }
})
//新上传文件法规vue
var newFileVue = new Vue({
    el: "#two_modal",
    data: {
        fileTopic: "",
    }
})
//新用户vue
var newUserVue = new Vue({
    el: "#user-modal-body",
    data: {
        loginName: "",
        userName: "",
        tel: "",
        quanxian: "",
        items: [{ desc: "加载失败", id: "" }],
    }
})
//修改密码vue
var passwordVue = new Vue({
    el: "#password-modal-body",
    data: {
        newPass: "",
        newPassPro: "",
    }
})


$(function () {
    choose();
})

function choose() {
    switch (idid) {
        case "0":
            queryNewEvent();
            break;
        case "1":
            queryOldEvent();
            break;
        case "2":
            userList();
            break;
        case "3":
            queryNews();
            break;
        case "4":
            queryStreet();
            break;
        case "5":
            queryWork();
            break;
        case "6":
            queryPolicy();
            break;
        default:
            queryLaws();
            break;
    }
}

//翻页
function addPage() {
    if (page.now < page.allPages) {
        page.now++;
        choose();
    }
}
//减页
function subPage() {
    if (page.now != 1) {
        page.now--;
        choose();
    }
}
//跳转页面
function skipPage() {
    if (pageVue.nowPage <= page.allPages && pageVue.nowPage > 0) {
        page.now = pageVue.nowPage;
        choose();
    } else {
        pageVue.nowPage = page.now;
    }
}
//首页
function firstPage() {
    if (page.now != 1) {
        page.now = 1;
        choose();
    }
}
//尾页
function lastPage() {
    if (page.now != page.allPages) {
        page.now = page.allPages;
        choose();
    }
}

//选中或取消所有checkbox
function checkboxALL() {
    if ($("#checkboxALL").get(0).checked) {
        $("input[type='checkbox'][name='checkbox']").prop("checked", true);
    } else {
        $("input[type='checkbox'][name='checkbox']").prop("checked", false);
    }
}


//查询街镇动态列表
function queryStreet() {
    $.ajax({
        url: url + "/streetDynamic",
        type: "GET",
        dataType: "json",
        data: {
            pageNum: page.now,
            pageSize: page.size,
        },
        ContentType: "application/json",
        headers: {
        },
        success: function (res) {
            if (res.status == 0) {
                streetVue.items = res.data.content;
                streetVue.num = (res.data.pageable.pageNumber) * page.size;

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.nowPage = page.now;
                pageVue.allPages = page.allPages;
                pageVue.totalElements = page.totalElements;
                console.log(res.data);
            }
        }
    })
}
//查询新闻列表
function queryNews() {
    $.ajax({
        url: url + "/news/listNews",
        type: "GET",
        dataType: "json",
        data: {
            pageNum: page.now,
            pageSize: page.size,
        },
        ContentType: "application/json",
        headers: {
        },
        success: function (res) {
            if (res.status == 0) {
                newsVue.items = res.data.content;
                newsVue.num = (res.data.pageable.pageNumber) * page.size;

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.nowPage = page.now;
                pageVue.allPages = page.allPages;
                pageVue.totalElements = page.totalElements;
                console.log(res.data);
            }
        }
    })
}
//查询所有用户
function userList() {
    $.ajax({
        url: url + "/users/list",
        type: "POST",
        dataType: "json",
        data: {
            pageNum: page.now,
            pageSize: page.size,
        },
        ContentType: "application/json",
        headers: {
            Token: Token,
        },
        success: function (res) {
            if (res.status == 0) {
                userVue.items = res.data.content;
                userVue.num = (res.data.pageable.pageNumber) * page.size;

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.nowPage = page.now;
                pageVue.allPages = page.allPages;
                pageVue.totalElements = page.totalElements;
                console.log(res.data);
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        }
    })
}
//查询政策制度列表
function queryPolicy() {
    $.ajax({
        url: url + "/institution/list",
        type: "GET",
        dataType: "json",
        data: {
            pageIndex: page.now,
            pageSize: page.size,
        },
        ContentType: "application/json",
        headers: {
        },
        success: function (res) {
            if (res.status == 0) {
                policyVue.items = res.data.content;
                policyVue.num = (res.data.pageable.pageNumber) * page.size;

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.nowPage = page.now;
                pageVue.allPages = page.allPages;
                pageVue.totalElements = page.totalElements;
                console.log(res.data);
            }
        }
    })
}
//查询文件法规列表
function queryLaws() {
    $.ajax({
        url: url + "/fileRecorder",
        type: "GET",
        dataType: "json",
        data: {
            pageIndex: page.now,
            pageSize: page.size,
        },
        ContentType: "application/json",
        headers: {
        },
        success: function (res) {
            if (res.status == 0) {
                fileVue.items = res.data.content;
                fileVue.num = (res.data.pageable.pageNumber) * page.size;
                for (let i = 0; i < fileVue.items.length; i++) {
                    fileVue.items[i].url = url + fileVue.items[i].url;
                }

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.nowPage = page.now;
                pageVue.allPages = page.allPages;
                pageVue.totalElements = page.totalElements;
                console.log(res.data);
            }
        }
    })
}
//查询工作简报列表
function queryWork() {
    $.ajax({
        url: url + "/bulletin",
        type: "GET",
        dataType: "json",
        data: {
            pageIndex: page.now,
            pageSize: page.size,
        },
        ContentType: "application/json",
        headers: {
        },
        success: function (res) {
            if (res.status == 0) {
                workVue.items = res.data.content;
                workVue.num = (res.data.pageable.pageNumber) * page.size;
                for (let i = 0; i < workVue.items.length; i++) {
                    workVue.items[i].url = url + workVue.items[i].url;
                }

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.nowPage = page.now;
                pageVue.allPages = page.allPages;
                pageVue.totalElements = page.totalElements;
                console.log(res.data);
            }
        }
    })
}
//查询未完成事件列表
function queryNewEvent() {
    console.log(page.now)

    $.ajax({
        url: url + "/event/adminList",
        type: "POST",
        dataType: "json",
        data: {
            pageIndex: page.now,
            pageSize: page.size,
            status: "0,1",
            sort: "asc_status,desc_insertTime",
        },
        ContentType: "application/json",
        headers: {
            Token: Token,
        },
        success: function (res) {
            if (res.status == 0) {
                newEventVue.items = res.data.content;
                newEventVue.num = (res.data.pageable.pageNumber) * page.size;
                for (let i = 0; i < newEventVue.items.length; i++) {
                    if (newEventVue.items[i].status == 0)
                        newEventVue.items[i].statusMark = true;
                    else
                        newEventVue.items[i].statusMark = false;
                }

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.nowPage = page.now;
                pageVue.allPages = page.allPages;
                pageVue.totalElements = page.totalElements;
                console.log(res.data.content);
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        }
    })
}
//查询已完成事件列表
function queryOldEvent() {
    $.ajax({
        url: url + "/event/adminList",
        type: "POST",
        dataType: "json",
        data: {
            pageIndex: page.now,
            pageSize: page.size,
            status: 3,
        },
        ContentType: "application/json",
        headers: {
            Token: Token,
        },
        success: function (res) {
            if (res.status == 0) {
                oldEventVue.items = res.data.content;
                oldEventVue.num = (res.data.pageable.pageNumber) * page.size;

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.nowPage = page.now;
                pageVue.allPages = page.allPages;
                pageVue.totalElements = page.totalElements;
                console.log(res.data);
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        }
    })
}

var deleteId;
//获取元素id值
function getId(e) {
    deleteId = $(e).attr("value");
}

//删除
function deleteRecord() {
    if (idid == 4) {
        deleteStreet();
        return;
    }
    var urlStr;
    switch (idid) {
        case "0":
            //urlStr = "/event";
            break;
        case "1":
            //urlStr = "/event";
            break;
        case "2":
            urlStr = "/users/delete";
            break;
        case "3":
            urlStr = "/news";
            break;
        case "4":
            //          urlStr = "/streetDynamic";
            break;
        case "5":
            urlStr = "/bulletin";
            break;
        case "6":
            urlStr = "/institution";
            break;
        default:
            urlStr = "/fileRecorder";
            break;
    }

    if (deleteId == "-1") {
        var idStr;
        var count = 0;
        var check = document.getElementsByName("checkbox");
        for (let i = 0; i < check.length; i++) {
            if (check[i].checked) {
                if (count == 0) idStr = check[i].value;
                else
                    idStr = idStr + "," + check[i].value;
                count = 1;
            }
        }
        if (idStr == null) {
            alert("您未选中任何选项,请选择删除项!");
            return;
        }
    } else {
        var idStr = deleteId;
    }

    console.log(idStr);
    console.log(url + urlStr);
    console.log(Token);

    var type = "DELETE";
    if (idid == 2) {
        type = "POST";
    }

    $.ajax({
        url: url + urlStr + "?ids=" + idStr,
        headers: {
            Token: Token,
        },
        type: type,
        // dataType:"json",
        // timeout : 1000,
        data: {
            // ids:idStr,
        },
        success: function (res) {
            console.log(res)
            if (res.status == 0) {
                alert("删除成功！");
                window.location.href = "admin.html?idid=" + idid;
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        },
        error: function (res) {
            console.log(res)
        }
    })
}
//单条删除街镇动态
function deleteStreet() {
    $.ajax({
        url: url + "/streetDynamic/" + deleteId,
        headers: {
            Token: Token,
        },
        type: "DELETE",
        // dataType:"json",
        // timeout : 1000,
        data: {
            // ids:idStr,
        },
        success: function (res) {
            console.log(res)
            if (res.status == 0) {
                alert("删除成功！");
                window.location.href = "admin.html?idid=" + idid;
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        },
        error: function (res) {
            console.log(res)
        }
    })
}

//新增事件
function addrecords(mark) {
    if (idid == 3 || idid == 6 || idid == 4)
        window.location.href = "manageInfo.html?mark=100&idid=" + idid;
    if (idid == 5 || idid == 7)
        document.getElementById("two_modal").style.display = "block";
    if (idid == 2) {
        userMark = mark;
        document.getElementById("user_modal").style.display = "block";
        $.ajax({
            url: url + "/userCategory",
            type: "GET",
            dataType: "json",
            data: {
            },
            ContentType: "application/json",
            success: function (res) {
                if (res.status == 0) {
                    newUserVue.items = res.data;
                    newUserVue.quanxian = res.data[0].id;
                }
            }
        })
    }
}

//点击接收事件，开始处理
function jieshou(e) {
    var valId = $(e).attr("value");
    $.ajax({
        url: url + "/deal/pull",
        type: "POST",
        dataType: "json",
        data: {
            eventId: valId,
        },
        headers: {
            Token: Token,
        },
        success: function (res) {
            if (res.status == 0) {
                window.location.href = "admin.html?idid=" + idid;
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        }
    })
}

//用户和事件类型管理按钮点击事件
function typeManage() {
    document.getElementById("one_modal").style.display = "block";
    if (idid == 0 || idid == 1) {
        $.ajax({
            url: url + "/problemCategory/list",
            type: "GET",
            dataType: "json",
            data: {
            },
            ContentType: "application/json",
            success: function (res) {
                if (res.status == 0) {
                    eventTypeVue.items = res.data;
                }
            }
        })
    }
    if (idid == 2) {
        $.ajax({
            url: url + "/userCategory",
            type: "GET",
            dataType: "json",
            data: {
            },
            ContentType: "application/json",
            success: function (res) {
                if (res.status == 0) {
                    eventTypeVue.items = res.data;
                }
            }
        })
    }
}
//模态框关闭事件,并把输入框置空
function btnClose() {
    document.getElementById("one_modal").style.display = "none";
    eventTypeVue.typeInput = "";
    eventTypeVue.typeInput2 = "";
    document.getElementById("two_modal").style.display = "none";
    newFileVue.fileTopic = "";
    document.getElementById("user_modal").style.display = "none";
    newUserVue.loginName = "";
    newUserVue.userName = "";
    newUserVue.tel = "";
    newUserVue.quanxian = "";
    newUserVue.items = [{ desc: "加载失败", id: "" }];
    document.getElementById("password_modal").style.display = "none";
    passwordVue.newPass = "";
    passwordVue.newPassPro = "";
}
//删除用户类型和事件类型
function typeDelete(e) {
    var typeId = $(e).attr("value");

    if (idid == 0 || idid == 1) {
        $.ajax({
            url: url + "/problemCategory/" + typeId,
            type: "DELETE",
            dataType: "json",
            headers: {
                Token: Token,
            },
            data: {
            },
            ContentType: "application/json",
            success: function (res) {
                if (res.status == 0) {
                    typeManage();
                }
                if (res.status == 400 || res.status == 402 || res.status == 403) {
                    alert("登陆超时，请重新登陆");
                    window.location.href = "login.html";
                }
            }
        })
    }
    if (idid == 2) {
        $.ajax({
            url: url + "/userCategory?id=" + typeId,
            type: "DELETE",
            dataType: "json",
            headers: {
                Token: Token,
            },
            ContentType: "application/json",
            success: function (res) {
                if (res.status == 0) {
                    typeManage();
                }
                if (res.status == 400 || res.status == 402 || res.status == 403) {
                    alert("登陆超时，请重新登陆");
                    window.location.href = "login.html";
                }
            }
        })
    }
}
//新建用户类型和事件类型
function newType() {
    if (idid == 0 || idid == 1) {
        $.ajax({
            url: url + "/problemCategory/add",
            type: "POST",
            dataType: "json",
            headers: {
                Token: Token,
            },
            data: {
                desc: eventTypeVue.typeInput,
            },
            ContentType: "application/json",
            success: function (res) {
                if (res.status == 0) {
                    typeManage();
                }
                if (res.status == 400 || res.status == 402 || res.status == 403) {
                    alert("登陆超时，请重新登陆");
                    window.location.href = "login.html";
                }
            }
        })
    }
    if (idid == 2) {
        var json = {
            "desc": eventTypeVue.typeInput,
            "role": eventTypeVue.typeInput2,
        }
        $.ajax({
            url: url + "/userCategory",
            type: "POST",
            dataType: "json",
            headers: {
                Token: Token,
                "Content-Type": "application/json",
            },
            data:JSON.stringify(json),
            success: function (res) {
                if (res.status == 0) {
                    typeManage();
                }
                if (res.status == 400 || res.status == 402 || res.status == 403) {
                    alert("登陆超时，请重新登陆");
                    window.location.href = "login.html";
                }
            }
        })
    }
}

//新建工作简报、文件法规
function fileSubmit() {
    var fileurl;
    if (idid == 5) fileurl = "/bulletin";
    if (idid == 7) fileurl = "/fileRecorder";

    if (newFileVue.fileTopic == "") {
        alert("主题不能为空")
    }
    else {
        var file = document.getElementById("Ufile").files[0];
        if (typeof (file) == "undefined" || file.size <= 0) {
            alert("请选择上传文件文件");
            return;
        }

        var newFile = new FormData();
        newFile.append("file", file);
        newFile.append("fileName", newFileVue.fileTopic);

        $.ajax({
            url: url + fileurl,
            type: "POST",
            dataType: "json",
            headers: {
                Token: Token,
            },
            processData: false,// 是否序列化data属性，默认true(注意：false时type必须是post)
            contentType: false,// 当有文件要上传时，此项是必须的，否则后台无法识别文件流的起始位置
            clearForm: true,//提交后是否清空表单数据
            data: newFile,
            success: function (res) {
                if (res.status == 0) {
                    window.location.href = "admin.html?idid=" + idid;
                }
                if (res.status == 400 || res.status == 402 || res.status == 403) {
                    alert("登陆超时，请重新登陆");
                    window.location.href = "login.html";
                }
            }
        })
    }

}

//新建或者编辑用户提交点击按钮
function newUer() {
    if (userMark == 0) {
        if (newUserVue.loginName == "" || newUserVue.userName == "" || newUserVue.tel == "") {
            alert("表单未填写完整");
        }
        else {
            $.ajax({
                url: url + "/users/add",
                type: "POST",
                dataType: "json",
                headers: {
                    Token: Token,
                },
                data: {
                    loginName: newUserVue.loginName,
                    username: newUserVue.userName,
                    userCategoryId: newUserVue.quanxian,
                    tel: newUserVue.tel,
                },
                success: function (res) {
                    if (res.status == 0) {
                        window.location.href = "admin.html?idid=" + idid;
                    }
                    if (res.status == 400 || res.status == 402 || res.status == 403) {
                        alert("登陆超时，请重新登陆");
                        window.location.href = "login.html";
                    }
                }
            })
        }
    }
    if (userMark == 1) {
        if (newUserVue.loginName == "" || newUserVue.userName == "" || newUserVue.tel == "") {
            alert("表单未填写完整");
        }
        else {
            $.ajax({
                url: url + "/users/adminUpdateUser",
                type: "POST",
                dataType: "json",
                headers: {
                    Token: Token,
                },
                data: {
                    id: userID,
                    loginName: newUserVue.loginName,
                    username: newUserVue.userName,
                    userCategoryId: newUserVue.quanxian,
                    tel: newUserVue.tel,
                },
                success: function (res) {
                    if (res.status == 0) {
                        window.location.href = "admin.html?idid=" + idid;
                    }
                    if (res.status == 400 || res.status == 402 || res.status == 403) {
                        alert("登陆超时，请重新登陆");
                        window.location.href = "login.html";
                    }
                }
            })
        }
    }
}

//编辑用户 获取信息
function updateUser(e, mark) {
    userMark = mark;
    var userId = $(e).attr("value");
    userID = userId;
    document.getElementById("user_modal").style.display = "block";
    $.ajax({
        url: url + "/userCategory",
        type: "GET",
        dataType: "json",
        data: {
        },
        ContentType: "application/json",
        success: function (res) {
            if (res.status == 0) {
                newUserVue.items = res.data;
                $.ajax({
                    url: url + "/users/detail?id=" + userId,
                    type: "GET",
                    dataType: "json",
                    data: {
                    },
                    ContentType: "application/json",
                    success: function (res) {
                        if (res.status == 0) {
                            newUserVue.loginName = res.data.loginName;
                            newUserVue.tel = res.data.tel;
                            newUserVue.userName = res.data.username;
                            newUserVue.quanxian = res.data.userCategoryId;
                        }
                    }
                })
            }
        }
    })
}

//管理员修改密码
function updePassword(e) {
    var userId = $(e).attr("value");
    document.getElementById("password_modal").style.display = "block";
    $("#password_btn1").attr("value", userId);
}
//修改密码确认事件
function passwordSubmit(e) {
    var userId = $(e).attr("value");
    $.ajax({
        url: url + "/users/adminChangePassword",
        type: "POST",
        dataType: "json",
        data: {
            userId: userId,
            newPassword: passwordVue.newPass,
            newPasswordRep: passwordVue.newPassPro,
        },
        ContentType: "application/json",
        headers: {
            Token: Token,
        },
        success: function (res) {
            if (res.status == 0) {
                alert("密码修改成功");
                window.location.href = "admin.html?idid=" + idid;
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "login.html";
            }
        }
    })
}