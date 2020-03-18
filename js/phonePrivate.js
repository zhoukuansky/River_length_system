var contentVue = new Vue({
    el: "#conent",
    data: {
        user: "加载失败",
        name: "加载失败",
        phone: "加载失败",
        pass: "",
        newPass: "",
        newPass2: "",
    }
})
$(function () {
    queryUser();
})
//查询user信息
function queryUser() {
    $.ajax({
        url: url + "/users",
        type: "GET",
        dataType: "json",
        ContentType: "application/json",
        data: {
        },
        headers: {
            Token: Token
        },
        success: function (res) {
            if (res.status == 0) {
                contentVue.user = res.data.loginName;
                contentVue.name = res.data.username;
                contentVue.phone = res.data.tel;
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
//修改信息
function updateInfo() {
    if (contentVue.user == "" || contentVue.name == "" || contentVue.phone == "") {
        alert("修改信息不能为空");
    } else {
        $.ajax({
            url: url + "/users/update",
            type: "POST",
            dataType: "json",
            headers: {
                Token: Token,
            },
            data: {
                loginName: contentVue.user,
                username: contentVue.name,
                tel: contentVue.phone,
            },
            success: function (res) {
                if (res.status == 0) {
                    alert("修改信息成功")
                    window.location.href = "phonePrivate.html";
                }
                if (res.status == 400 || res.status == 402||res.status==403) {
                    alert("登陆超时，请重新登陆");
                    window.location.href = "phoneLogin.html";
                }
            }
        })
    }
}
//修改密码
function updateMima() {
    if (contentVue.pass == "" || contentVue.newPass == "" || contentVue.newPass2 == "") {
        alert("修改信息不能为空");
    } else {
        $.ajax({
            url: url + "/users/changeOwnPassword",
            type: "POST",
            dataType: "json",
            headers: {
                Token: Token,
            },
            data: {
                oldPassword: contentVue.pass,
                newPassword: contentVue.newPass,
                newPasswordRep: contentVue.newPass2,
            },
            success: function (res) {
                if (res.status == 0) {
                    if (res.data != null) {
                        alert(res.data);
                        contentVue.pass = "";
                        contentVue.newPass = "";
                        contentVue.newPass2 = "";
                    }
                    else{
                        alert(res.msg);
                    }
                }
                if(res.status == 1){
                    alert(res.msg)
                }
                if (res.status == 400 || res.status == 402||res.status==403) {
                    alert("登陆超时，请重新登陆");
                    window.location.href = "phoneLogin.html";
                }
            }
        })
    }
}