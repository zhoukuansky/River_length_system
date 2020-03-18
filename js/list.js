var page = {
    totalElements: 0,
    allPages: 1,
    last: false,
    first: true,
    size: 12,
    now: 1,
}
//分页vue
var pageVue = new Vue({
    el: "#pages",
    data: {
        number: page.now,
        allPages: page.allPages,
    }
})
//右侧导航vue
var title = new Vue({
    el: "#register",
    data: {
        register: []
    }
});
//主题列表vue
var listVue = new Vue({
    el: "#body_ul",
    data: {
        idid: idid,
        list: [
            {id: "", title: "加载失败...", insertTime: "", url: ""},
        ],
    }
});

var hezhangVue = new Vue({
    el: "#hezhang",
    data: {
        idid: idid,
    }
})

$(function () {
    switch (idid) {
        case "1":
            title.register = [{title: "新闻中心"}];
            queryList();
            break;
        case "2":
            title.register = [{title: "河长名单"}];
            qureyHezhang();
            break;
        case "3":
            title.register = [{title: "街镇动态"}];
            queryStreet();
            break;
        case "4":
            title.register = [{title: "工作简报"}];
            queryworkList();
            break;
        case "5":
            title.register = [{title: "地图展示"}];
            break;
        case "6":
            title.register = [{title: "政策制度"}];
            querypolicyList();
            break;
        case "7":
            title.register = [{title: "文件法规"}];
            queryFileList();
            break;
        default:
            break;
    }
})

//选择执行函数
function choose() {
    switch (idid) {
        case "1":
            queryList();
            break;
        case "2":
            qureyHezhang();
            break;
        case "3":
            queryStreet();
            break;
        case "4":
            queryworkList();
            break;
        case "5":
            break;
        case "6":
            querypolicyList();
            break;
        default:
            queryFileList();
            break;
    }
}

//查询街镇动态
function queryStreet() {
    $.ajax({
        url: url + "/streetDynamic",
        type: "GET",
        dataType: "json",
        data: {
            pageNum: page.now,
            pageSize: page.size,
        },
        headers: {},
        success: function (res) {
            if (res.status == 0) {
                listVue.list = res.data.content;
                for (let i = 0; i < listVue.list.length; i++) {
                    listVue.list[i].insertTime = listVue.list[i].insertTime.split(" ")[0];
                }

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.number = page.now;
                pageVue.allPages = page.allPages;
                console.log(res);
            }
        },
        error: function (res) {
            console.log(res)
        }
    })
}

//查询新闻列表
function queryList() {
    $.ajax({
        url: url + "/news/listNews",
        type: "GET",
        dataType: "json",
        data: {
            pageNum: page.now,
            pageSize: page.size,
        },
        ContentType: "application/json",
        headers: {},
        success: function (res) {
            if (res.status == 0) {
                listVue.list = res.data.content;
                for (let i = 0; i < listVue.list.length; i++) {
                    listVue.list[i].insertTime = listVue.list[i].insertTime.split(" ")[0];
                }

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.number = page.now;
                pageVue.allPages = page.allPages;
                console.log(res);
            }
        }
    })
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
    if (pageVue.number <= page.allPages && pageVue.number > 0) {
        page.now = pageVue.number;
        choose();
    } else {
        pageVue.number = page.now;
    }
}

//查询政策制度列表
function querypolicyList() {
    $.ajax({
        url: url + "/institution/list",
        type: "GET",
        dataType: "json",
        data: {
            pageIndex: page.now,
            pageSize: page.size,
        },
        ContentType: "application/json",
        headers: {},
        success: function (res) {
            if (res.status == 0) {
                listVue.list = res.data.content;
                for (let i = 0; i < listVue.list.length; i++) {
                    listVue.list[i].insertTime = listVue.list[i].insertTime.split(" ")[0];
                }

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.number = page.now;
                pageVue.allPages = page.allPages;
                console.log(res);
            }
        }
    })
}

//查询文件法规列表
function queryFileList() {
    $.ajax({
        url: url + "/fileRecorder",
        type: "GET",
        dataType: "json",
        data: {
            pageIndex: page.now,
            pageSize: page.size,
        },
        ContentType: "application/json",
        headers: {},
        success: function (res) {
            if (res.status == 0) {
                listVue.list = res.data.content;
                for (let i = 0; i < listVue.list.length; i++) {
                    listVue.list[i].url = url + listVue.list[i].url;
                    listVue.list[i].insertTime = listVue.list[i].insertTime.split(" ")[0];
                }

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.number = page.now;
                pageVue.allPages = page.allPages;
                console.log(res);
            }
        }
    })
}

//查询工作简报
function queryworkList() {
    $.ajax({
        url: url + "/bulletin",
        type: "GET",
        dataType: "json",
        data: {
            pageIndex: page.now,
            pageSize: page.size,
        },
        ContentType: "application/json",
        headers: {},
        success: function (res) {
            if (res.status == 0) {
                listVue.list = res.data.content;
                for (let i = 0; i < listVue.list.length; i++) {
                    listVue.list[i].url = url + listVue.list[i].url;
                    listVue.list[i].insertTime = listVue.list[i].insertTime.split(" ")[0];
                }

                page.allPages = res.data.totalPages;
                page.totalElements = res.data.totalElements;
                page.now = res.data.pageable.pageNumber + 1;
                page.first = res.data.first;
                page.last = res.data.last;

                pageVue.number = page.now;
                pageVue.allPages = page.allPages;
                console.log(res);
            }
        }
    })
}

//查询河长名单
function qureyHezhang() {
    $.ajax({
        url: url + "/news/0",
        type: "GET",
        dataType: "json",
        data: {},
        ContentType: "application/json",
        headers: {},
        success: function (res) {
            if (res.status == 0) {
                $("#name_list").html(res.data.body);
            }
        }
    })
}