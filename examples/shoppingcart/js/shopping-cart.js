/*
 * 购物车多选/反选插件
 * 计算总个数、总价格
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
        //选中数
        var Num = 1;
        var totalNum = 0;


        /*---------数量的加减----------*/
        $(".plus").click(function() {


            //获取当前物品最大库存量
            var maxNum = $(this).siblings(".maxNum").val();
            //当前下单数量
            var num = $(this).siblings(".text-amount");
            var currGoodsNum = parseInt($.trim(num.val()));
            //单价
            var unitPrice = $(this).parent().parent().siblings(".unit-price").find(".price");
            var price = parseFloat($.trim(unitPrice.text()));
            //小计
            var $subtotal = $(this).parent().parent().siblings(".subtotal").find(".subtotal-price");
            if (currGoodsNum < maxNum) {

                currGoodsNum = currGoodsNum + 1;
                num.val(currGoodsNum);
                //防止数量计算时出现失真，故添加toFixed()
                var subtotal = parseFloat(price * currGoodsNum).toFixed(2);
                $subtotal.text(subtotal);

                /*判断当前物品的选中状态   0表示未选中  1表示选中 */
                var thischeck = $(this).parent().parent().siblings(".e-check").children("span").attr("e-check");

                if (thischeck == "1") {
                    //当前总选中数
                    var $totalNum = $(".top-choose .total-num");
                    var currNum = parseInt($.trim($totalNum.text()));
                    console.log(currNum);
                    currNum = (parseInt(currNum) + 1).toFixed(0);
                    // currNum += 1;
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
            var currGoodsNum = parseInt($.trim(num.val()));
            //单价
            var unitPrice = $(this).parent().parent().siblings(".unit-price").find(".price");
            var price = parseFloat($.trim(unitPrice.text()));
            //小计
            var $subtotal = $(this).parent().parent().siblings(".subtotal").find(".subtotal-price");


            /*判断当前物品的选中状态   0表示未选中  1表示选中 */
            var thischeck = $(this).parent().parent().siblings(".e-check").children("span").attr("e-check");
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
                var currGoodsNum = parseInt($.trim(num.val()));

                if (currGoodsNum > 1) {
                    //总选中数量减1
                    currNum -= 1;
                    //总价减当前商品单价
                    total = (parseFloat(total) - parseFloat(price)).toFixed(2);

                    //当前数
                    currGoodsNum = currGoodsNum - 1;
                    num.val(currGoodsNum);
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
                    num.val(currGoodsNum);
                    //防止数量计算时出现失真，故添加toFixed()
                    var subtotal = parseFloat(price * currGoodsNum).toFixed(2);
                    $subtotal.text(subtotal);
                }
            }
        });


        //全选
        $checkAll.on(opts.tapType, function() {

            var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
            //自身check改变
            $(this).attr("e-check", thischeck);
            //所有单选check改变
            $checkOne.attr("e-check", thischeck);
            //图片链接替换
            checkSrcChange(thischeck, ths.find("*[e-check]"));

            if (thischeck == "1") {
                //初始化值
                total = 0;
                totalNum = 0;
                //计算总选中数
                $(".text-amount").each(function() {
                        var goodsNum = parseFloat($.trim($(this).val()));
                        totalNum = (parseFloat(totalNum) + parseFloat(goodsNum)).toFixed(0);
                    })
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

        //单选
        $checkOne.on(opts.tapType, function() {
            var thischeck = $(this).attr("e-check") == 0 ? 1 : 0;
            //自身check改变
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

            //获取当前商品  所下的订单数
            var checkOneNum = parseFloat($(this).parent().siblings(".number-box").find(".text-amount").val());
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

        //替换图片和checkbox选中状态
        var checkSrcChange = function(check, obj) {
            if (check == 1) {
                obj.find("img").attr("src", opts.checkedSrc);
            } else {
                obj.find("img").attr("src", opts.checkSrc);
            }
        };
        //鼠标浮动到单个商品记录 效果
        $(".goods-list ").hover(function() {
            $(this).find(".delete ").show();
            $(this).find(".delete ").css("display ", "inline-block ");
            $(this).addClass("active");
        }, function() {
            $(this).find(".delete ").hide();
            $(this).removeClass("active");
        })

        //删除单个商品
        $(".delete ").click(function() {
            /*layer.confirm('你确定要删除该商品吗？', {
                btn: ['确认', '取消'] //按钮
            }, function() {
                //执行删除
            });*/

            $(this).parent().parent().remove();

            //初始化值
            total = 0;
            totalNum = 0;
            //计算总选中数
            $(".choose-item[e-check='1']").each(function() {
                var $currTr = $(this).parent().parent();

                var goodsNum = parseFloat($.trim($currTr.find(".text-amount").val()));
                totalNum = (parseFloat(totalNum) + parseFloat(goodsNum)).toFixed(0);

                var price = parseFloat($.trim($currTr.find(".subtotal-price").text()));
                total = (parseFloat(total) + parseFloat(price)).toFixed(2);

            })
            $(".total-num").text(totalNum);
            $(".total").text(total);

            //判断全选的选中状态
            var thischeck = $checkAll.attr("e-check") == 0 ? 1 : 0;
            //自身check改变
            $checkAll.attr("e-check", thischeck);
            //图片链接替换
            checkSrcChange(thischeck, $checkAll);


        });
        //删除多个商品
        $(".goods-del").click(function() {
            /*layer.confirm('你确定要删除选中的商品吗？', {
                btn: ['确认', '取消'] //按钮
            }, function() {
                //执行删除
            });*/
            $(".choose-item[e-check='1']").each(function() {
                $(this).parent().parent().remove();
            });
            //初始化值
            total = 0;
            totalNum = 0;
            //计算总选中数
            $(".choose-item[e-check='1']").each(function() {
                var $currTr = $(this).parent().parent();

                var goodsNum = parseFloat($.trim($currTr.find(".text-amount").val()));
                totalNum = (parseFloat(totalNum) + parseFloat(goodsNum)).toFixed(0);

                var price = parseFloat($.trim($currTr.find(".subtotal-price").text()));
                total = (parseFloat(total) + parseFloat(price)).toFixed(2);

            })
            $(".total-num").text(totalNum);
            $(".total").text(total);

            //判断全选的选中状态
            var thischeck = $checkAll.attr("e-check") == 0 ? 1 : 0;
            //自身check改变
            $checkAll.attr("e-check", thischeck);
            //图片链接替换
            checkSrcChange(thischeck, $checkAll);

        });


    };
    //----------Html
    $.each($('*[e-fun = check]'), function(i) {
        var checkSrc = $('*[e-fun = check]').eq(i).attr("e-check-src");
        var checkedSrc = $('*[e-fun = check]').eq(i).attr("e-checked-src");
        var tapType = $('*[e-fun = check]').eq(i).attr("e-tap-type");
        $('*[e-fun = check]').eq(i).check({ checkSrc: checkSrc, checkedSrc: checkedSrc, tapType: tapType });
    });

})(jQuery);
