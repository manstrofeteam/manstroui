/*此处放置公共组件的JS*/

/** 强度规则**/
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
    /*下拉列表开始*/
    $('.dropdown .dropdown-title').click(function() {
        $('.dropdown-menu').slideToggle(400);
    });
    $('.dropdown-menu li').click(function() {
        var liTxt = $(this).text();
        $('.dropdown-title span').text(liTxt);
        $('.dropdown-menu').slideToggle(400);
    });
    /*下拉列表结束*/
    /*---------数量的加减开始----------*/
    $(".plus-minus .plus").click(function() {
        var num = $(this).siblings(".text-amount");
        var val = Number(num.val());
        if (val < 1000) {
            val = val + 1;
            num.attr("value", val);
        };
    });
    $("plus-minus .minus").click(function() {
        var num = $(this).siblings(".text-amount");
        var val = Number(num.val());
        if (val > 1) {
            val = val - 1;
            num.attr("value", val);
        };
    });

    /*---------数量的加减结束----------*/
    /*---------分页开始----------*/
    laypage({
        cont: $('#pagination'), //容器。值支持id名、原生dom对象，jquery对象,
        pages: 20, //总页数
        skip: true, //是否开启跳页
        skin: '#d9534f',
        groups: 3 //连续显示分页数
    });
    /*---------分页结束----------*/
    /*---------密码强度验证开始----------*/
    var oTips = $("#check-pwd-strong #tips");
    var oInput = $("#check-pwd-strong input");
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

    /*---------等级积分进度条开始----------*/
    $(".sure").click(function() {
        var val = $(".input").val();
        $(".progress-bar-yellow").stop().animate({
            width: val
        })
    });
    /*---------等级积分进度条结束----------*/
    /*---------生日插件开始----------*/
    var datenow = new Date().Format("yyyy-MM-dd");
    //用户生日
    var birthday = '1991-04-14';
    if (birthday != '') {
        datenow = birthday;
    }
    $("#birthday").birthdaypicker({
        dateFormat: "bigEndian",
        monthFormat: "short",
        placeholder: true,
        hiddenDate: true,
        // 设定默认日期
        defaultDate: datenow
    });
    /*---------生日插件结束----------*/
    /*---------省市区联动开始----------*/
    //初始化
    var selectVal = new CitySelect({
        data: data,
        provId: "#prov",
        cityId: '#city',
        areaId: '#area',
        isSelect: true // 默认为true 选择第一项 如果页面有指定省市区项时，就显示指定项。
            // 如果false，就选中 "请选择"
    });
    /*---------省市区联动结束----------*/

});
