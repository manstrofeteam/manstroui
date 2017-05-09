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
        $(".ms-overlay").height(pageHeight());
    } else {
        $(".ms-overlay").height(windowHeight());
    }
    $(".ms-overlay").width(pageWidth());
    /*
     fadeTo第一个参数为速度，第二个为透明度;
     多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
    */
    $(".ms-overlay").fadeTo(200, 0.5);
};
// 隐藏覆盖层
function hideOverlay() {
    $(".ms-overlay").fadeOut(200);
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

/**
 * 强度规则 
 * +-------------------------------------------------------+
 * 1) 任何少于6个字符的组合，弱；任何字符数的同类字符组合，弱； 
 * 2) 任何字符数的两类字符组合，中； 
 * 3) 12位字符数以下的三类或四类字符组合，强； 
 * 4) 12位字符数以上的三类或四类字符组合，非常好。
 *  +------------------------------------------------------- +
 */
//检测密码强度
function checkStrong(sValue) {
    var modes = 0;
    if (sValue.length < 6) return modes;
    if (/\d/.test(sValue)) modes++; //数字
    if (/[a-z]/.test(sValue)) modes++; //小写
    if (/[A-Z]/.test(sValue)) modes++; //大写
    if (/\W/.test(sValue)) modes++; //特殊字符
    switch (modes) {
        case 1:
            return 1;
            break;
        case 2:
            return 2;
        case 3:
        case 4:
            return sValue.length < 12 ? 3 : 4
            break;
    }
}

$(function() {
    // 点击遮罩层本身隐藏
    $(".ms-overlay").click(function() {
        hideOverlay();
    });
    /*========弹出层演示开始=======*/
    // 点击显示弹出层
    $(".show-dialog").click(function() {
        showOverlay();
        $(this).next(".ms-dialog").show();
    });
    //点击关闭按钮隐藏弹出层
    $(".ms-dialog .dialog-close").click(function() {
        hideOverlay();
        $(this).parent().hide();
    });
    /*========弹出层演示结束=======*/
    //
    /*下拉列表开始*/
    $('.ms-dropdown .dropdown-title').click(function() {
        $('.dropdown-menu').slideToggle(400);
        $('.dropdown-title .icon-caret').toggleClass("ms-flipy");
    });
    $('.ms-dropdown  .dropdown-menu li').click(function() {
        var liTxt = $(this).text();
        $('.dropdown-title span').text(liTxt);
        $('.dropdown-menu').slideToggle(400);
    });
    /*下拉列表结束*/
    /*---------数量的加减开始----------*/
    $(".ms-plus-minus .plus").click(function() {
        var num = $(this).siblings(".text-amount");
        var val = Number(num.val());
        if (val < 1000) {
            val = val + 1;
            num.attr("value", val);
        };
    });
    $(".ms-plus-minus .minus").click(function() {
        var num = $(this).siblings(".text-amount");
        var val = Number(num.val());
        if (val > 1) {
            val = val - 1;
            num.attr("value", val);
        };
    });

    /*---------数量的加减结束----------*/

    /*---------密码强度验证开始----------*/
    var oTips = $("#ms-pwd-strong #tips");
    var oInput = $("#ms-pwd-strong input");
    var aSpan = oTips.children("span");
    oInput.bind('focus keyup blur', function() {
        var index = checkStrong(this.value);
        // 改变输入框边框颜色
        this.className = index ? "correct" : "error";
        //改变右侧强度标识的颜色
        oTips.attr("class", "s" + index);
        for (var i = 0; i < aSpan.length; i++) {
            aSpan[i].className = "";
            index && (aSpan[index - 1].className = "active");
        }
    });
    /*---------密码强度验证结束----------*/

    /*---------进度条开始----------*/
    var progressVal = $(".ms-progress .progress-bar").attr("key");
    $(".progress-bar").stop().animate({
        width: progressVal
    });
    /*---------进度条结束----------*/

    /*======点击发送验证码开始======*/
    $(".send-code").click(function() {
        $(this).toggleClass("btn-info").toggleClass("btn-default");
        window.clearTimeout(countTimer);
        countTime = 6;
        countTimeFC();
    });
    /*======点击发送验证码结束======*/
});
/*========倒计时开始========*/
//倒计时间
var countTime;
//定时器
var countTimer;
//倒计时方法
function countTimeFC() {
    var $T = $(".send-code");
    //挂失申请
    if (countTime == "0") {
        $T.attr("disabled", false);
        $T.text("获取验证码");
        $T.toggleClass("btn-info").toggleClass("btn-default");
        countTime = 60;
    } else {
        $T.attr("disabled", true);
        var text = "重新发送(" + countTime + ")";
        $T.text(text);
        countTime--;
        countTimer = window.setTimeout(function() {
            countTimeFC();
        }, 1000);
    }
}
/*========倒计时结束========*/
/*========标签页切换开始========*/
$(".tab-nav li").click(function() {
    var tabLabel = $(this).attr("id");
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    $(".tab-content .tab-pane").hide();
    $("." + tabLabel).show();
});

/*========标签页切换结束========*/
