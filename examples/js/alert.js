// 当前页面宽度 
function pageWidth() {
    return document.body.scrollWidth;
};
// 当前页面高度 
function pageHeight() {
    return document.body.scrollHeight;
};
//浏览器视口的宽度
function windowWidth() {
    var de = document.documentElement;
    return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth
};
//浏览器视口的高度
function windowHeight() {
    var de = document.documentElement;
    return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
};
// 浏览器水平滚动位置 
function scrollX() {
    var de = document.documentElement;
    return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
};
// 浏览器垂直滚动位置 
function scrollY() {
    var de = document.documentElement;
    return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
}; /*===========================简单遮罩层开始========================*/
// 1、在html页面创建id="overlay"的空div
// 2、在CSS中
// 显示遮罩层  
function showOverlay() {
    if (pageHeight() > windowHeight()) {
        $("#overlay").height(pageHeight());
    } else {
        $("#overlay").height(windowHeight());
    }
    $("#overlay").width(pageWidth());
    /*
     fadeTo第一个参数为速度，第二个为透明度;
     多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
    */
    $("#overlay").fadeTo(200, 0.3);
};
// 隐藏覆盖层 
function hideOverlay() {
    $("#overlay").fadeOut(200);
};
// 垂直定位到页面中心
function adjust(id) {
    var w = $(id).width();
    var h = $(id).height();
    var t = parseFloat(scrollY()) + parseFloat((windowHeight() / 2)) - (h / 2);
    if (t < 0) t = 0;
    $(id).css({
        top: t + 'px'
    });

};
/*===========================简单遮罩层结束========================*/

