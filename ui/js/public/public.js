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
};
/*===========================简单遮罩层开始========================*/
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
    $("#overlay").fadeTo(200, 0.5);
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

/*===========================格式化时间开始========================*/
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
/*===========================格式化时间结束========================*/
/*========================判断是否是IE浏览器开始========================*/
function isIE() { //ie?  
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
};
/*========================判断是否是IE浏览器结束========================*/

