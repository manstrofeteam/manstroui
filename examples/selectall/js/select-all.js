/*
 * 网站常用效果插件
 * ManstroUI
 * Version: 0.1
 * Author: THONE
 */

(function($) {
    //多选  EDIT.THONE.2016.07.07
    $.fn.check = function(opts) {
        opts = $.extend({
            tapType: "click", //默认的点击方式---click,touchend
            checkSrc: "img/e-check.png", //显示的默认图片
            checkedSrc: "img/e-checked.png" //选中后显示的图片
        }, opts || {});

        var ths = this; //解决this指向问题

        var $checkAll = ths.find("*[e-check-all]");
        var $checkOne = ths.find("*[e-check-one]");

        //总价
        var total = 0;

        //全选
        $checkAll.on(opts.tapType, function() {
            //自身check改变
            var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
            $(this).attr("e-check", thischeck);
            //所有单选check改变
            $checkOne.attr("e-check", thischeck);
            if (thischeck == "1") {
                //初始化值
                total = 0;
                //所有单选对应的价格计算总价
                $(".price").each(function() {
                    var price = parseFloat($.trim($(this).text()));
                    total += price;
                })
            } else {
                total = 0;
            }
            $(".total").text(total);

            //图片链接替换
            checkSrcChange(thischeck, ths.find("*[e-check]"));
        });

        //单选
        $checkOne.on(opts.tapType, function() {
            //自身check改变
            var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
            $(this).attr("e-check", thischeck);

            //图片链接替换
            checkSrcChange(thischeck, $(this));

            //遍历所有单选 判断是否全选
            var checkOneSize = $checkOne.size();
            var checkedOneSize = ths.find("*[e-check-one][e-check=1]").size();

            if (checkOneSize == checkedOneSize) {
                $checkAll.attr("e-check", 1);
                checkSrcChange(1, $checkAll);
            } else {
                $checkAll.attr("e-check", 0);
                checkSrcChange(0, $checkAll);
            }

            //获取对应数值
            var price = parseFloat($(this).children(".price").text());
            // 判断是否为选中状态
            if (thischeck == "1") {
                //选中
                total += price;
                $(".total").text(total);
            } else {
                total -= price;
                $(".total").text(total);
            }
        });

        //替换图片和checkbox选中状态
        var checkSrcChange = function(check, obj) {
            if (check == 1) {
                obj.find("img").attr("src", opts.checkedSrc);
            } else {
                obj.find("img").attr("src", opts.checkSrc);
            }
        };


    };
    //----------Html
    $.each($('*[e-fun = check]'), function(i) {
        var checkSrc = $('*[e-fun = check]').eq(i).attr("e-check-src");
        var checkedSrc = $('*[e-fun = check]').eq(i).attr("e-checked-src");
        var tapType = $('*[e-fun = check]').eq(i).attr("e-tap-type");
        $('*[e-fun = check]').eq(i).check({ checkSrc: checkSrc, checkedSrc: checkedSrc, tapType: tapType });
    });

})(jQuery);

