var url = "http://111.230.226.20:88";

$("#submit").click(function () {
    var userName = $.trim($("#username").val());
    var passWord = $.trim($("#password").val());

    if (userName != "" && passWord != "") {
        //alert(passWord);
        var uPattern = /^[a-zA-Z0-9]{2,10}$/;
        var wPattern = /^[a-zA-Z0-9]{5,16}$/;
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
                $("#tishi").html("请输入5到16位密码！");
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
                        if (res.data.role == "admin") {
                            document.cookie = "user=" + userName;
                            document.cookie = "Token=" + res.data.token;
                            window.location.href = "admin.html?idid=0";
                        }
                        else {
                            alert("您不是管理员，请去往用户登陆");
                            window.location.href = "../phonePages/phoneLogin.html";
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


