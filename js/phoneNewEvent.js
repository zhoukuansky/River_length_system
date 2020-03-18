var id = getUrlParam("id");

var vueSelect = new Vue({
    el: "#form",
    data: {
        info: "",
        address: "",
        x: "",
        y: "",
        items: [
            { problemCategory: "加载失败" },
        ],
        type: "",
    }
})

$(function () {
    //获取url传参
    var addr = getUrlParam("addr");
    //alert(unescape(addr));
    addr = unescape(addr);
    if (addr != "null") {
        vueSelect.address = unescape(addr);
        vueSelect.x = getUrlParam("lng");
        vueSelect.y = getUrlParam("lat");
    }
    //ajax请求获取事件类别初始参数
    getClassify();

    // if (id != "null")
    //     queryEvent();
})

////ajax请求获取事件类别初始参数
function getClassify() {
    $.ajax({
        url: url + "/problemCategory/list",
        type: "GET",
        dataType: "json",
        data: {

        },
        ContentType: "application/json",
        headers: {
        },
        success: function (res) {
            if (res.status == 0) {
                vueSelect.items = res.data;
                vueSelect.type = res.data[0].id;
                console.log(res.data)
            }
        }
    })
}

//提交按钮绑定事件上传数据
function URLdata() {
    if (vueSelect.info == "" || vueSelect.address == "") {
        alert("数据未填写完整");
    } else {
        var file = document.getElementById("Ufile").files[0];
        if (typeof (file) == "undefined" || file.size <= 0) {
            alert("请选择图片");
            return;
        }
        else {
            if (file.size/1024>9000) {
                alert("上传图片不能大于9M，请重新选择")
            } else {
                var fileImg = new FormData();
                fileImg.append("pic", file); //加入文件对象
                fileImg.append("problemDesc", vueSelect.info);
                fileImg.append("address", vueSelect.address);
                fileImg.append("problemCategoryId", vueSelect.type);
                fileImg.append("longitude", vueSelect.x);
                fileImg.append("latitude", vueSelect.y);
                $.ajax({
                    url: url + "/event/add",
                    type: "POST",
                    dataType: "json",
                    contentType: false,
                    data: fileImg,
                    headers: {
                        Token: Token,
                    },
                    processData: false,
                    success: function (res) {
                        console.log(res);
                        if (res.status == 0) {
                            alert("上传成功");
                            window.location.href = "phoneAllEvents.html";
                        }
                        if (res.status == 400 || res.status == 402 || res.status == 403) {
                            alert("登陆超时，请重新登陆");
                            window.location.href = "phoneLogin.html";
                        }
                    },
                    error: function (e) {
                        alert("上传失败");
                        console.log(e);
                    }
                })
            }
        }
    }
}

//查询事件详细信息
// function queryEvent() {
//     $.ajax({
//         url: url + "/event/" + id,
//         type: "GET",
//         dataType: "json",
//         headers: {
//             Token: Token,
//         },
//         success: function (res) {
//             if (res.status == 0) {
//                 vueSelect.type = res.data.problemCategoryId;
//                 vueSelect.info = res.data.problemDesc;
//                 vueSelect.x = res.data.longitude;
//                 vueSelect.y = res.data.latitude;
//                 console.log(res.data)
//             }
//             if (res.status == 400 || res.status == 402||res.status==403) {
//                 alert("登陆超时，请重新登陆");
//                 window.location.href = "login.html";
//             }
//         }
//     })
// }