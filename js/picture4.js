var imgVue = new Vue({
    el: "#body",
    data: {
        title: "小微水体分布总览",
        src: "../images/zong.png",
        word: "zong.png",
    }
})

function btn0() {
    imgVue.title = "小微水体分布总览";
    imgVue.src = "../images/zong.png";
    imgVue.word = "zong.png";
}

function btn1() {
    imgVue.title = "水塘总分布图";
    imgVue.src = "../images/tang.png";
    imgVue.word = "tang.png";
}

function btn2() {
    imgVue.title = "池塘水体分布图";
    imgVue.src = "../images/detailed1.png";
    imgVue.word = "detailed1.png";
}

function btn3() {
    imgVue.title = "景观水体分布图";
    imgVue.src = "../images/detailed2.png";
    imgVue.word = "detailed2.png";
}

function btn4() {
    imgVue.title = "湿地水体分布图";
    imgVue.src = "../images/detailed3.png";
    imgVue.word = "detailed3.png";
}

function btn5() {
    imgVue.title = "养殖水体分布图";
    imgVue.src = "../images/detailed4.png";
    imgVue.word = "detailed4.png";
}
