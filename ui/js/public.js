$(function() {

    //左侧菜单滚动监听
    $(".rg-content section").each(function(index, element) {
        $(element).waypoint(function() {
            var ele = $(element).attr("id");
            $(".lf-nav li").removeClass("active");
            $(".lf-nav li[name=" + ele + "]").addClass('active');
        });
    });
    /*左侧菜单单击效果开始*/
    $(".lf-nav .parent-nav > li").click(function() {
        $(".lf-nav .parent-nav > li").removeClass("active");
        $(this).addClass("active");
        $(".children-nav").hide();
        $(this).find(".children-nav").show();
    });
    $(".children-nav  li").click(function() {
        $(".children-nav  li").removeClass("active");
        $(this).addClass("active");
    });
    /*左侧菜单单击效果开始*/

    var $backToTop = $(".back-to-top");
    /*--------左侧菜单滚动监听开始-----------*/
    var toTopHeight = $(".lf-nav").offset().top;
    $(window).scroll(function() {
        if ($(document).scrollTop() > toTopHeight) {
            //显示返回顶部箭头
            $backToTop.show();
            if ('undefined' == typeof(document.body.style.maxHeight)) {
                //检测是否为IE6。jQuery1.9中去掉了msie的方法，所以只好这样写
                var scrollTop = $(document).scrollTop();
                $(".lf-nav").css({
                    'position': 'absolute',
                    'top': scrollTop + 'px'
                });

            } else {
                $(".lf-nav").addClass("nav-fixed");
            }

        } else {
            //隐藏返回顶部箭头
            $backToTop.hide();
            if ('undefined' == typeof(document.body.style.maxHeight)) {
                $(".lf-nav").css({
                    'position': 'absolute',
                    'top': '0px'
                });
            } else {
                $(".lf-nav").removeClass("nav-fixed");
            }
        }
    });
    /*--------左侧菜单滚动监听结束-----------*/
    // 返回顶部
    $backToTop.click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
})
