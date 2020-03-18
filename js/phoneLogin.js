var url = "http://111.230.226.20:88";

$("#submit").click(function () {
    var userName = $.trim($("#username").val());
    var passWord = $.trim($("#password").val());

    if (userName != "" && passWord != "") {
        //alert(passWord);
        var uPattern = /^[a-zA-Z0-9]{2,10}$/;
        var wPattern = /^[a-zA-Z0-9]{4,16}$/;
        if (!uPattern.test(userName)) {
            $("#username").val("");
            $("#tishi").html("请输入2到10位用户名！");
            if (!wPattern.test(passWord)) {
                $("#password").val("");
            }
        } else if (!wPattern.test(passWord)) {
            {
                $("#password").val("");
                $("#password").focus();
                $("#tishi").html("请输入4到16位密码！");
            }
        }
        else {
            $.ajax({
                url: url + "/login",
                type: "POST",
                dataType: "json",
                data: {
                    username: userName,
                    password: passWord,
                },
                headers: {},
                success: function (res) {
                    if (res.status == 0) {
                        if (res.data.role != "admin") {
                            //document.cookie = "userId=" + res.data.userId;
                            document.cookie = "Token=" + res.data.token;
                            window.location.href = "phoneAllEvents.html";
                        }
                        else {
                            alert("请转往管理员登陆");
                            window.location.href = "../managePages/login.html";
                        }
                    }
                    else {
                        $("#tishi").html("用户名或密码错误");
                    }
                },
                error: function (res) {
                    console.log(res);
                }
            })
        }
    }
})
