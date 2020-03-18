var timeVue = new Vue({
    el: "#title_info",
    data: {
        idid: idid,
        autor: "加载失败...",
        time: "加载失败...",
        title: "加载失败...",
    }
})
// var eventVue = new Vue({
//     el: "#event_info",
//     data: {
//         idid: idid,
//         name: "",
//         time: "",
//         type: "",
//         info: "",
//         xy: "",
//         addr: "",
//         status: "",
//         src: "",
//     }
// })

var id = $.getUrlParam("id");

$(function () {
    switch (idid) {
        case "1":
            queryNews();
            break;
        case "2":
            break;
        case "3":
            queryStreet();
            break;
        case "4":
            break;
        case "5":
            break;
        case "6":
            queryPolicy();
            break;
        case "7":
            break;
        default:
            break;
    }
})

//查询政策制度详情
function queryPolicy() {
    $("#author").css("display", "none");
    $.ajax({
        url: url + "/institution/" + id,
        type: "GET",
        dataType: "json",
        data: {},
        ContentType: "application/json",
        headers: {},
        success: function (res) {
            if (res.status == 0) {
                $(".info").html(res.data.body);
                timeVue.autor = res.data.author;
                timeVue.time = res.data.insertTime;
                timeVue.title = res.data.title;
                console.log(res.data);
            }
        }
    })
}

//查询新闻详情
function queryNews() {
    $.ajax({
        url: url + "/news/" + id,
        type: "GET",
        dataType: "json",
        data: {},
        ContentType: "application/json",
        headers: {},
        success: function (res) {
            if (res.status == 0) {
                $(".info").html(res.data.body);
                timeVue.autor = res.data.author;
                timeVue.time = res.data.insertTime;
                timeVue.title = res.data.title;
                console.log(res.data);
            }
        }
    })
}

//查询街镇动态详情
function queryStreet() {
    $.ajax({
        url: url + "/streetDynamic/" + id,
        type: "GET",
        dataType: "json",
        data: {},
        ContentType: "application/json",
        headers: {},
        success: function (res) {
            if (res.status == 0) {
                $(".info").html(res.data.body);
                timeVue.autor = res.data.author;
                timeVue.time = res.data.insertTime;
                timeVue.title = res.data.title;
                console.log(res.data);
            }
        }
    })
}


//查询事件详情
// function queryEvent() {
//     $.ajax({
//         url: url + "/event/" + id,
//         type: "GET",
//         dataType: "json",
//         data: {
//         },
//         ContentType: "application/json",
//         headers: {

//         },
//         success: function (res) {
//             if (res.status == 0) {
//                 eventVue.name = res.data.username;
//                 eventVue.time = res.data.insertTime;
//                 eventVue.type = res.data.problemCategory;
//                 eventVue.info = res.data.problemDesc;
//                 eventVue.status = res.data.statusDesc;
//                 eventVue.xy = res.data.longitude + "," + res.data.latitude;
//                 eventVue.addr = res.data.address;
//                 eventVue.src = res.data.imageUrl;
//                 console.log(eventVue.src)
//             }
//         }
//     })
// }

