//得到uidid参数
var xy = $.getUrlParam("xy");
var xydata=xy.split(",");
x=xydata[0],y=xydata[1];

var map = new BMap.Map("map");
var point = new BMap.Point(x, y);

map.centerAndZoom(point, 13);

var marker = new BMap.Marker(point);
map.addOverlay(marker);

map.enableScrollWheelZoom();


var modalVue = new Vue({
    el: "#modal",
    data: {
        riverName: "",
        xy: "",
        position: "",
        riverArea: "",
        type: "",
        headerName: "",
        headerTel: "",
    }
})

var modal2Vue = new Vue({
    el: "#modal2",
    data: {
        riverName: "",
    }
})

//湖泊样式
var poolStyle = { fillColor: "rgb(150, 199, 156)", strokeWeight: 1, fillOpacity: 1 };
var poolInformation = [];
var circle = [];

//河流样式
var riverStyle = { strokeColor: "rgb(71, 158, 213)", strokeWeight: 3, strokeOpacity: 1, };
//洼地样式
var depressionStyle = { fillColor: "rgb(216, 165, 165)",strokeColor:"rgb(216, 165, 165)", strokeOpacity: 0, fillOpacity: 1 }

var geoc = new BMap.Geocoder();

$(function () {
    var modal = document.getElementById("modal");
    //获取区域函数
    getArea();
    //获取河流
    getRiver();
    //获取洼地
    getDepression();
    //获取当前位置
    //getPosition();

    var mapMark = 3;
    map.addEventListener("zoomend", function () {
        if (map.getZoom() < 13) {
            //           alert(map.getZoom())
            if (mapMark != 1) {
                riverStyle = { strokeColor: "#87CEFA", strokeWeight: 0.5, strokeOpacity: 1, };
                map.clearOverlays();
                getArea();
                getRiver();
                getDepression();
                map.addOverlay(marker);
                mapMark = 1;
            }
        }
        if (map.getZoom() >= 13 && map.getZoom() <= 15) {
            //alert(map.getZoom())
            if (mapMark != 2) {
                riverStyle = { strokeColor: "#87CEFA", strokeWeight: 3, strokeOpacity: 1, };
                map.clearOverlays();
                getArea();
                getRiver();
                getDepression();
                map.addOverlay(marker);
                mapMark = 2;
            }
        }
        if (map.getZoom() > 15) {
            //           alert(map.getZoom())
            if (mapMark != 3) {
                riverStyle = { strokeColor: "#87CEFA", strokeWeight: 7, strokeOpacity: 1, };
                map.clearOverlays();
                getArea();
                getRiver();
                getDepression();
                map.addOverlay(marker);
                mapMark = 3;
            }
        }
    })
})

//获取区域函数
function getArea() {
    $.ajax({
        url: url + "/pool",
        type: "GET",
        dataType: "json",
        data: {},
        ContentType: "application/json",
        headers: {},
        success: function (res) {
            //console.log(res.data)
            if (res.status == 0) {
                poolInformation = res.data;
                //调用显示函数
                for (let i = 0; i < poolInformation.length; i++) {
                    poolInformation[i].poolArea = poolInformation[i].poolArea / 100;
                    addPoolTranslate(new BMap.Point(poolInformation[i].longitude, poolInformation[i].latitude), poolInformation[i].poolArea, poolStyle, poolInformation[i]);
                }

                //添加点击事件监听器
                // for (let i = 0; i < circle.length; i++) {
                //     circle[i].addEventListener("click", function () {
                //         alert(1)
                //         modal.style.display = "block";
                //         modalVue.riverName = poolInformation[i].poolName;
                //         modalVue.xy = poolInformation[i].longitude + "," + poolInformation[i].latitude;
                //         modalVue.position = poolInformation[i].position;
                //         modalVue.riverArea = poolInformation[i].poolArea;
                //         modalVue.type = poolInformation[i].poolFunDesc;
                //         modalVue.headerName = poolInformation[i].linkUser;
                //         modalVue.headerTel = poolInformation[i].existProblem;
                //     });
                // }
            }
        }
    })
}

//获取河流
function getRiver() {
    $.getJSON("../../jsonData/rivers.json", function (res) {
        var pointRiver = [];
        console.log(res)
        for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].rivers.length; j++) {
                //console.log(res.data[i].rivers[j].longitude, res.data[i].rivers[j].latitude);
                pointRiver.push(new BMap.Point(res.data[i].rivers[j].longitude, res.data[i].rivers[j].latitude));
            }
            //map.panTo(pointRiver[0]);
            addRiver(pointRiver, res.data[i].name);
            pointRiver = [];
        }
    });
}
//获取洼地
function getDepression() {
    $.getJSON("../../jsonData/depression.json", function (res) {
        var pointRiver = [];
        //console.log(res)
        for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].rivers.length; j++) {
                //console.log(res.data[i].rivers[j].longitude, res.data[i].rivers[j].latitude);
                pointRiver.push(new BMap.Point(res.data[i].rivers[j].longitude, res.data[i].rivers[j].latitude));
            }
            //map.panTo(pointRiver[0]);
            addDepressio(pointRiver, res.data[i].name);
            pointRiver = [];
        }
    });
}

function btnSure() {
    modal.style.display = "none";
    document.getElementById("modal2").style.display = "none";
};


//不转换坐标渲染洼地
function addDepressio(point, name) {
    var polygon = new BMap.Polygon(point, depressionStyle);
    map.addOverlay(polygon);

    polygon.addEventListener("click", function () {
        document.getElementById("modal2").style.display = "block";
        modal2Vue.riverName = name;
    });
}
//不转换坐标渲染河流
function addRiver(point, name) {
    alert(1)
    var polyline = new BMap.Polyline(point, riverStyle);
    map.addOverlay(polyline);

    polyline.addEventListener("click", function () {
        document.getElementById("modal2").style.display = "block";
   //     modal2Vue.riverName = name;
    });
}

//转换坐标之后渲染河流
function addRiverTranslate(point) {

    translateCallback = function (data) {
        console.log(data.points)
        if (data.status === 0) {
            var polyline = new BMap.Polyline(data.points, riverStyle);
            map.addOverlay(polyline);
        }
    }
    var convertor = new BMap.Convertor();
    convertor.translate(point, 1, 5, translateCallback);
}

//不转换坐标渲染圆形区域
function addPool(point, num, poolStyle) {
    var cir = new BMap.Circle(point, Math.sqrt(num / Math.PI), poolStyle);
    map.addOverlay(cir);
    //    circle.push(cir);
}

//转换坐标之后渲染圆形区域
function addPoolTranslate(point, num, poolStyle, poolInformation) {
    translateCallback = function (data) {
        if (data.status === 0) {
            var cir = new BMap.Circle(data.points[0], Math.sqrt(num / Math.PI), poolStyle);
            map.addOverlay(cir);
            //            circle.push(cir);

            //添加点击事件监听器
            cir.addEventListener("click", function () {
                modal.style.display = "block";
                modalVue.riverName = poolInformation.poolName;
                modalVue.xy = poolInformation.longitude + "," + poolInformation.latitude;
                modalVue.position = poolInformation.position;
                modalVue.riverArea = poolInformation.poolArea;
                modalVue.type = poolInformation.poolFunDesc;
                modalVue.headerName = poolInformation.linkUser;
                modalVue.headerTel = poolInformation.existProblem;
            });
        }
    }
    var convertor = new BMap.Convertor();
    var pointArr = [];
    pointArr.push(point);
    convertor.translate(pointArr, 1, 5, translateCallback)
}

//不转换坐标渲染河流
function addRiver(point, name) {
    var polyline = new BMap.Polyline(point, riverStyle);
    map.addOverlay(polyline);

    polyline.addEventListener("click", function () {
        document.getElementById("modal2").style.display = "block";
        modal2Vue.riverName = name;
    });
}
