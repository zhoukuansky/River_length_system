var map = new BMap.Map("bMap");
var point = new BMap.Point(103.8536827185, 30.7034700141);
map.centerAndZoom(point, 15);

//map.enableScrollWheelZoom();
//map.disableDoubleClickZoom();

var pp = new BMap.Point(103.875556, 30.745833);

//地址解析变量
var geoc = new BMap.Geocoder();
var markPoint;
var lng, lat;

var mapVue = new Vue({
    el: "#map_info",
    data: {
        gain: "",
        detailed: "",
    }
})

var poolStyle = { fillColor: "rgb(150, 199, 156)", strokeWeight: 1, fillOpacity: 1 };
var poolInformation = [];

//河流样式
var riverStyle = { strokeColor: "rgb(71, 158, 213)", strokeWeight: 3, strokeOpacity: 1, };
//洼地样式
var depressionStyle = { fillColor: "rgb(216, 165, 165)", strokeColor: "rgb(216, 165, 165)", strokeOpacity: 0, fillOpacity: 1 }

$(function () {
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
                mapMark = 3;
            }
        }
    })
})

//不转换坐标渲染区域
function addPool(point, num, poolStyle) {
    var cir = new BMap.Circle(point, Math.sqrt(num / Math.PI), poolStyle);
    map.addOverlay(cir);

    var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
        offset: new BMap.Size(10, 25), // 指定定位位置    
        imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
    });

    var mark = new BMap.Marker(point, { icon: myIcon });
    map.addOverlay(mark);
}

//转换坐标之后渲染区域
function addPoolTranslate(point, num, poolStyle, poolInformation) {
    translateCallback = function (data) {
        if (data.status === 0) {
            var cir = new BMap.Circle(data.points[0], Math.sqrt(num / Math.PI), poolStyle);
            map.addOverlay(cir);

            var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
                offset: new BMap.Size(10, 25), // 指定定位位置    
                imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
            });

            var mark = new BMap.Marker(data.points[0], { icon: myIcon });
            map.addOverlay(mark);

            mark.addEventListener("click", function () {
                alert(
                    "水域名:" + poolInformation.poolName + "\n" +
                    "经纬度：" + poolInformation.longitude + "," + poolInformation.latitude + "\n" +
                    "位置：" + poolInformation.position + "\n" +
                    "面积：" + poolInformation.poolArea + "\n" +
                    "功能类型：" + poolInformation.poolFunDesc + "\n" +
                    "管理员：" + poolInformation.linkUser + "\n" +
                    "存在问题：" + poolInformation.existProblem + "\n"
                );
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

    // polyline.addEventListener("click", function () {
    //     document.getElementById("modal2").style.display = "block";
    //     modal2Vue.riverName = name;
    // });
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

//不转换坐标渲染洼地
function addDepressio(point, name) {
    var polygon = new BMap.Polygon(point, depressionStyle);
    map.addOverlay(polygon);

    // polygon.addEventListener("click", function () {
    //     document.getElementById("modal2").style.display = "block";
    //     modal2Vue.riverName = name;
    // });
}

//获取洼地
function getDepression() {
    $.getJSON("../../jsonData/depression.json", function (res) {
        var pointRiver = [];
        console.log(res)
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
                //         alert(
                //             "水域名:" + poolInformation[i].poolName + "\n" +
                //             "经纬度：" + poolInformation[i].longitude + "," + poolInformation[i].latitude + "\n" +
                //             "位置：" + poolInformation[i].position + "\n" +
                //             "面积：" + poolInformation[i].poolArea + "\n" +
                //             "功能类型：" + poolInformation[i].poolFunDesc + "\n" +
                //             "管理员：" + poolInformation[i].linkUser + "\n" +
                //             "存在问题：" + poolInformation[i].existProblem + "\n"
                //         );
                //     });
                // }
            }
        }
    })
}

//地址解析函数
function analysis(point) {
    geoc.getLocation(point, function (rs) {
        var addComp = rs.addressComponents;
        //alert(addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber);
        mapVue.gain = addComp.province + addComp.city + addComp.district;
        if (addComp.street != "")
            mapVue.detailed = addComp.street + addComp.streetNumber;
    });
}

//h5定位
function getPosition() {
    var options = {
        enableHighAccuracy: true,
        timeout: 1000,
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
    lng = x, lat = y;
    var nowPonit = new BMap.Point(x, y);

    //坐标转换
    translateCallback = function (data) {
        if (data.status === 0) {
            var marker = new BMap.Marker(data.points[0]);
            map.addOverlay(marker);
            //           map.setCenter(data.points[0]);
            map.setCenter(pp);
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
            map.panTo(pp);
            //alert('您的位置：' + r.point.lng + ',' + r.point.lat);
            lng = r.point.lng, lat = r.point.lat;
            //地址解析
            analysis(r.point);
        }
        else {
            alert("定位失败");
        }
    }, { enableHighAccuracy: true })
}

//点击地图地址解析
map.addEventListener("touchend", function (e) {
    var pt = e.point;
    map.removeOverlay(markPoint);
    var mkk = new BMap.Marker(e.point);
    map.addOverlay(mkk);
    markPoint = mkk;
    analysis(pt);

    lng = e.point.lng, lat = e.point.lat;
});

//确认按钮触发
function submit() {
    if (mapVue.gain != "" && mapVue.detailed != "") {
        var str = mapVue.gain + mapVue.detailed;
        str = escape(str);
        window.location.href = "phoneNewEvent.html?addr=" + str + "&lng=" + lng + "&lat=" + lat;
    } else {
        alert("地址未填写完整！");
    }
}

//百度地力手机版是默认阻止自定义覆盖物的click事件的。map.disableDragging()会解除这种阻止。显然这不是一个好办法。
//我们可以设置map的touchstart事件，map.addEventListener('touchstart',function(e){});其中e对象中保留了我们点击的那个覆盖物element，e.domEvent.srcElement。获得这个element后，我们可以调用element.click()来触发自定义覆盖物的点击事件。

//关于状态码
//BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
//BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
//BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
//BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
//BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
//BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
//BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
//BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
//BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)