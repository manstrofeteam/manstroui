/*
 * 多层级全选/反选
 * Version: 0.1
 * Author: thone
 */
var ths = this; //解决this指向问题
var $checkAll = $("#check-all");
var $checkGroup = $(".check-group");

var checkSrc = "img/e-check.png"; //显示的默认图片
var checkedSrc = "img/e-checked.png"; //选中后显示的图片

function checkSrcChange(check, obj) {
    if (check == 1) {
        obj.find("img").attr("src", checkedSrc);
    } else {
        obj.find("img").attr("src", checkSrc);
    }
};

$(function() {
    //全选/反选
    $checkAll.click(function() {
        //自身改变
        var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
        $(this).attr("e-check", thischeck);
        checkSrcChange(thischeck, $(this));

        //分组全选
        $checkGroup.attr("e-check", thischeck);
        checkSrcChange(thischeck, $checkGroup);

        //所有单选check改变
        $checkOne = $(this).parent().find(".check-one");
        console.log($checkOne);
        $checkOne.attr("e-check", thischeck);
        checkSrcChange(thischeck, $checkOne);


    });
    //分组全选/反选
    $checkGroup.click(function() {
        //自身改变
        var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
        $(this).attr("e-check", thischeck);
        checkSrcChange(thischeck, $(this));

        //所有单选check改变
        var $checkOne = $(this).parent().find(".check-one");
        $checkOne.attr("e-check", thischeck);
        checkSrcChange(thischeck, $checkOne);

        //遍历所有分组全选 判断是否全选
        var checkOneSize = $(".check-group").size();
        var checkedOneSize = $(".check-group[e-check=1]").size();
        //父级 全选

        if (checkOneSize == checkedOneSize) {
            $checkAll.attr("e-check", 1);
            checkSrcChange(1, $checkAll);
        } else {
            $checkAll.attr("e-check", 0);
            checkSrcChange(0, $checkAll);
        }

    });
    $(".check-one").click(function() {
        //自身改变
        var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
        $(this).attr("e-check", thischeck);
        checkSrcChange(thischeck, $(this));


        //一组单选数
        var checkOneSize = $(this).parent().find(".check-one").size();
        //每一组中选中的单选数
        var checkedOneSize = $(this).parent().find("[e-check=1]").size();

        //遍历单组单选 判断是否全选
        var $thisGroup = $(this).parent().siblings(".check-group");
        if (checkedOneSize == checkOneSize) {
            $thisGroup.attr("e-check", 1);
            checkSrcChange(1, $thisGroup);
        } else {
            $thisGroup.attr("e-check", 0);
            checkSrcChange(0, $thisGroup);
        }

        //所有单选数
        var allCheckOneSize = $(".check-one").size();
        //所有选中的单选数
        var allCheckedOneSize = $(".check-one[e-check=1]").size();
        //遍历单组单选 判断是否全选
        if (allCheckedOneSize == allCheckOneSize) {
            $checkAll.attr("e-check", 1);
            checkSrcChange(1, $checkAll);
        } else {
            $checkAll.attr("e-check", 0);
            checkSrcChange(0, $checkAll);
        }

    });
})

