/*
 * 多层级全选/反选
 * Version: 0.1
 * Author: thone
 */
var ths = this; //解决this指向问题
var $checkAll = $(".check-all");
var $checkGroup = $(".check-group");
var $checkOne = $(".check-one");
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
    //总价
    var total = 0;
    //选中数
    var Num = 1;
    var totalNum = 0;
    //全选/反选
    $checkAll.click(function() {
        //自身改变
        var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
        $checkAll.attr("e-check", thischeck);
        checkSrcChange(thischeck, $checkAll);

        //分组全选
        $checkGroup.attr("e-check", thischeck);
        checkSrcChange(thischeck, $checkGroup);

        //所有单选check改变
        $checkOne.attr("e-check", thischeck);
        checkSrcChange(thischeck, $checkOne);

        if (thischeck == "1") {
            //初始化值
            total = 0;
            totalNum = 0;
            //计算总选中数
            $(".text-amount").each(function() {
                var goodsNum = parseFloat($.trim($(this).text()));
                totalNum = (parseFloat(totalNum) + parseFloat(goodsNum)).toFixed();
            });
            //所有单选对应的小计价格计算总价
            $(".subtotal-price").each(function() {
                var price = parseFloat($.trim($(this).text()));
                total = (parseFloat(total) + parseFloat(price)).toFixed(2);
            })
        } else {
            //初始化值
            total = 0;
            totalNum = 0;
        }
        //总选中数、总价赋值
        $(".total-num").text(totalNum);
        $(".total").text(total);
    });
    //分组全选/反选
    $checkGroup.click(function() {
        //自身改变
        var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
        $(this).attr("e-check", thischeck);
        checkSrcChange(thischeck, $(this));
        var parent = $(this).parent().parent().parent();
        //所有单选check改变
        var $checkOne = parent.next("tbody").find(".check-one");
        $checkOne.attr("e-check", thischeck);
        checkSrcChange(thischeck, $checkOne);

        //单组选择
        if (thischeck == "1") {
            //初始化值
            total = 0;
            totalNum = 0;

            //计算总选中数
            $(this).parent().parent().parent().next().find(".text-amount").each(function() {
                var goodsNum = parseFloat($.trim($(this).text()));
                totalNum = (parseFloat(totalNum) + parseFloat(goodsNum)).toFixed();
            });
            //所有单选对应的小计价格计算总价
            $(this).parent().parent().parent().next().find(".subtotal-price").each(function() {
                var price = parseFloat($.trim($(this).text()));
                total = (parseFloat(total) + parseFloat(price)).toFixed(2);

            })
        } else {

            //计算总选中数
            $(this).parent().parent().parent().next().find(".text-amount").each(function() {
                var goodsNum = parseFloat($.trim($(this).text()));
                totalNum = (parseFloat(totalNum) - parseFloat(goodsNum)).toFixed();
            });
            //所有单选对应的小计价格计算总价
            $(this).parent().parent().parent().next().find(".subtotal-price").each(function() {
                var price = parseFloat($.trim($(this).text()));
                total = (parseFloat(total) - parseFloat(price)).toFixed(2);

            })
        }

        //遍历所有分组全选 判断是否全选
        var checkOneSize = $(".check-group").size();
        var checkedOneSize = $(".check-group[e-check=1]").size();
        //父级 全选
        //多组全选
        if (checkOneSize == checkedOneSize) {
            $checkAll.attr("e-check", 1);
            checkSrcChange(1, $checkAll);
            //初始化值
            total = 0;
            totalNum = 0;

            //计算总选中数
            $(".text-amount").each(function() {
                var goodsNum = parseFloat($.trim($(this).text()));
                totalNum = (parseFloat(totalNum) + parseFloat(goodsNum)).toFixed();
            });
            //所有单选对应的小计价格计算总价
            $(".subtotal-price").each(function() {
                var price = parseFloat($.trim($(this).text()));
                total = (parseFloat(total) + parseFloat(price)).toFixed(2);
            })
        } else {
            $checkAll.attr("e-check", 0);
            checkSrcChange(0, $checkAll);
        }
        //总选中数、总价赋值
        $(".total-num").text(totalNum);
        $(".total").text(total);
    });
    $(".check-one").click(function() {
        //自身改变
        var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
        $(this).attr("e-check", thischeck);
        checkSrcChange(thischeck, $(this));
        var parent = $(this).parent().parent().parent();
        //一组单选数
        var checkOneSize = parent.find(".check-one").size();
        //每一组中选中的单选数
        var checkedOneSize = parent.find("[e-check=1]").size();
        //遍历单组单选 判断是否全选
        var $thisGroup = parent.prev("tbody").find(".check-group");
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
        //获取当前商品  所下的订单数
        var checkOneNum = parseFloat($(this).parent().siblings(".number-box").find(".text-amount").text());
        //单价
        var unitPrice = parseFloat($(this).parent().siblings(".unit-price").children(".price").text());
        //小计
        var numberPrice = parseFloat($(this).parent().siblings(".subtotal").children(".subtotal-price").text());

        //当前总选中数
        var $totalNum = $(".top-choose .total-num");
        var currNum = parseInt($.trim($totalNum.text()));

        // 判断是否为选中状态  1表示选中  0表示未选中
        if (thischeck == "1") {
            //增加选中数
            currNum = (parseInt(currNum) + parseInt(checkOneNum)).toFixed(0);
            //增加总价
            total = (parseFloat(total) + parseFloat(numberPrice)).toFixed(2);
        } else {
            //减去选中数
            currNum = (parseInt(currNum) - parseInt(checkOneNum)).toFixed(0);
            //减去总价
            total = (parseFloat(total) - parseFloat(numberPrice)).toFixed(2);
        }
        $(".total-num").text(currNum);
        $(".total").text(total);

    });

    /*---------数量的加减----------*/
    $(".plus").click(function() {
        //获取当前物品最大库存量
        var maxNum = $(this).siblings(".maxNum").val();
        //当前下单数量
        var num = $(this).siblings(".text-amount");
        var currGoodsNum = parseInt($.trim(num.text()));
        //单价
        var unitPrice = $(this).parent().parent().siblings(".unit-price").find(".price");
        var price = parseFloat($.trim(unitPrice.text()));
        //小计
        var $subtotal = $(this).parent().parent().siblings(".subtotal").find(".subtotal-price");

        if (currGoodsNum < maxNum) {
            currGoodsNum = currGoodsNum + 1;
            num.text(currGoodsNum);
            //防止数量计算时出现失真，故添加toFixed()
            var subtotal = parseFloat(price * currGoodsNum).toFixed(2);
            $subtotal.text(subtotal);

            /*判断当前物品的选中状态   0表示未选中  1表示选中 */
            var thischeck = $(this).parent().parent().siblings(".e-check").children("i").attr("e-check");
            if (thischeck == "1") {
                //当前总选中数
                var $totalNum = $(".top-choose .total-num");
                var currNum = parseInt($.trim($totalNum.text()));
                currNum += 1;
                $(".total-num").text(currNum);

                //计算总价，首先获取当前总价  
                var $total = $(".top-choose .total");
                var currTotal = parseFloat($.trim($total.text()));
                total = (parseFloat(total) + parseFloat(price)).toFixed(2);
                $(".total").text(total);
            }

        };
    })
    $(".minus").click(function() {
        //当前下单数量
        var num = $(this).siblings(".text-amount");
        var currGoodsNum = parseInt($.trim(num.text()));
        //单价
        var unitPrice = $(this).parent().parent().siblings(".unit-price").find(".price");
        var price = parseFloat($.trim(unitPrice.text()));
        //小计
        var $subtotal = $(this).parent().parent().siblings(".subtotal-price").find(".subtotal-price");


        /*判断当前物品的选中状态   0表示未选中  1表示选中 */
        var thischeck = $(this).parent().parent().siblings(".e-check").children("i").attr("e-check");
        if (thischeck == "1") {
            //选中
            //当前总选中数
            var $totalNum = $(".top-choose .total-num");
            var currNum = parseInt($.trim($totalNum.text()));
            //计算总价，首先获取当前总价  
            var $total = $(".top-choose .total");
            var currTotal = parseFloat($.trim($total.text()));

            //当前下单数量
            var num = $(this).siblings(".text-amount");
            var currGoodsNum = parseInt($.trim(num.text()));

            if (currGoodsNum > 1) {
                currGoodsNum = currGoodsNum - 1;
                num.text(currGoodsNum);
                //总选中数量减1
                currNum -= 1;
                //总价减当前商品单价
                total = (parseFloat(currTotal) - parseFloat(price)).toFixed(2);
                //当前数

                //计算小计  防止数量计算时出现失真，故添加toFixed()
                var subtotal = parseFloat(price * currGoodsNum).toFixed(2);
                $subtotal.text(subtotal);
            }
            $(".total-num").text(currNum);
            $(".total").text(total);
        } else {
            //没有选中
            if (currGoodsNum > 1) {
                currGoodsNum = currGoodsNum - 1;
                num.text(currGoodsNum);
                //防止数量计算时出现失真，故添加toFixed()
                var subtotal = parseFloat(price * currGoodsNum).toFixed(2);
                $subtotal.text(subtotal);
            }
        }
    });

})
