var map = new BMap.Map("map");
var point = new BMap.Point(103.8536827185, 30.7034700141);
map.centerAndZoom(point, 15);

map.enableScrollWheelZoom();

//湖泊样式
var poolStyle = { fillColor: "rgb(150, 199, 156)", strokeWeight: 1, fillOpacity: 1 };
var poolInformation = [];
var circle = [];

//河流样式
var riverStyle = { strokeColor: "rgb(71, 158, 213)", strokeWeight: 4, strokeOpacity: 1, };
//洼地样式
var depressionStyle = { fillColor: "rgb(216, 165, 165)",strokeColor:"rgb(216, 165, 165)", strokeOpacity: 0, fillOpacity: 1 }

var geoc = new BMap.Geocoder();

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

var addrVue = new Vue({
    el: "#position",
    data: {
        xy: "",
        addr: "",
    }
})

$(function () {
    var modal = document.getElementById("modal");
    //获取区域函数
    getArea();
    //获取河流
    getRiver();
    //获取洼地
    getDepression();
    //获取当前位置
    getPosition();

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
    $.getJSON("../jsonData/rivers.json", function (res) {
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
    $.getJSON("../jsonData/depression.json", function (res) {
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
    var polyline = new BMap.Polyline(point, riverStyle);
    map.addOverlay(polyline);

    polyline.addEventListener("click", function () {
        document.getElementById("modal2").style.display = "block";
        modal2Vue.riverName = name;
    });
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

//地址解析函数
function analysis(point) {
    geoc.getLocation(point, function (rs) {
        var addComp = rs.addressComponents;
        //alert(addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber);
        addrVue.addr = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
    });
}

//h5定位
function getPosition() {
    var options = {
        enableHighAccuracy: true,
        timeout: 100,
        maximumAge: 0
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
    } else {
        alert("浏览器不支持地理定位。");
    }
}

//h5定位成功
function showPosition(position) {
    var x = position.coords.longitude; //经度 
    var y = position.coords.latitude;//纬度 
    var nowPonit = new BMap.Point(x, y);

    //坐标转换
    translateCallback = function (data) {
        if (data.status === 0) {
            var marker = new BMap.Marker(data.points[0]);
            map.addOverlay(marker);
            addrVue.xy = data.points[0].lng + "," + data.points[0].lat;
            //地址解析
            analysis(data.points[0]);
        }
    }
    var convertor = new BMap.Convertor();
    var pointArr = [];
    pointArr.push(nowPonit);
    convertor.translate(pointArr, 1, 5, translateCallback);
}

//h5定位失败，使用浏览器
function showError(error) {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {

            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            //          map.panTo(r.point);
            //alert('您的位置：' + r.point.lng + ',' + r.point.lat);
            addrVue.xy = r.point.lng + "," + r.point.lat;
            //地址解析
            analysis(r.point);
        }
        else {
            alert("定位失败");
        }
    }, { enableHighAccuracy: true })
}