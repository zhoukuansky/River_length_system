var page = {
    totalElements: 0,
    allPages: 1,
    last: false,
    first: true,
    size: 8,
    now: 1,
}

var tableVue = new Vue({
    el: "#table",
    data: {
        items: [
            {id: "", problemDesc: "加载失败", insertTime: "加载失败", status: 0,}
        ]
    }
})

var pageVue = new Vue({
    el: "#pages",
    data: {
        now: page.now,
        allPages: page.allPages,
    }
})

$(function () {
    queryEvent();
})

//查询相关事件
function queryEvent() {
    $.ajax({
        url: url + "/event/relationAndNewList",
        type: "POST",
        dataType: "json",
        ContentType: "application/json",
        data: {
            pageSize: page.size,
            pageIndex: page.now,
            status: "0,1",
            sort: "asc_status,desc_insertTime"
        },
        headers: {
            Token: Token
        },
        success: function (res) {
            if (res.status == 0) {
                tableVue.items = res.data.content;
                for (let i = 0; i < tableVue.items.length; i++) {
                    tableVue.items[i].insertTime = tableVue.items[i].insertTime.split(" ")[0];
                }
                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.now = page.now;
                pageVue.allPages = page.allPages;
                console.log(res);
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "phoneLogin.html";
            }
        },
        error: function (res) {
            console.log(res);
        }
    })
}

//翻页
function addPage() {
    if (page.now < page.allPages) {
        page.now++;
        queryEvent();
    }
}

//减页
function subPage() {
    if (page.now != 1) {
        page.now--;
        queryEvent();
    }
}

//跳转页面
function skipPage() {
    if (pageVue.now <= page.allPages && pageVue.now > 0) {
        page.now = pageVue.now;
        queryEvent();
    } else {
        pageVue.now = page.now;
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
                window.location.href = "phoneAllEvents.html";
            }
            if (res.status == 400 || res.status == 402 || res.status == 403) {
                alert("登陆超时，请重新登陆");
                window.location.href = "phoneLogin.html";
            }
        }
    })
}
