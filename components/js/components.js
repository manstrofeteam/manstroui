/*此处放置公共组件的JS*/
$(function() {
    //左侧菜单滚动监听
    $(".rg-content section").each(function(index, element) {
        $(element).waypoint(function() {
            var ele = $(element).attr("id");
            $(".lf-nav li").removeClass("active");
            $(".lf-nav li[name=" + ele + "]").addClass('active');
        });
    });
    /*菜单单击平滑过渡到相应位置开始*/
    $(".lf-nav li").click(function() {
        $(".lf-nav li").removeClass("active");
        $(this).addClass("active");
        var name = $(this).attr("name");
        var top = $("#" + name).offset().top - 20;
        $("html,body").animate({ scrollTop: top }, 800);
    });
    /*菜单单击平滑过渡到相应位置结束*/
    /*--------左侧菜单滚动监听开始-----------*/
    var toTopHeight = $(".lf-nav").offset().top;
    $(window).scroll(function() {
        if ($(document).scrollTop() > toTopHeight) {
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
            if ('undefined' == typeof(document.body.style.maxHeight)) {
                $(".lf-nav").css({
                    'position': 'absolute',
                    'top': toTopHeight + 'px'
                });
            } else {
                $(".lf-nav").removeClass("nav-fixed");
            }
        }
    });
    /*--------左侧菜单滚动监听结束-----------*/

    /*---------返回顶部开始----------*/
    var backToTop = $('.back-to-top');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 200) {
            backToTop.fadeIn(400);
        } else {
            backToTop.fadeOut(400);
        }
    });
    //当点击跳转链接后，回到页面顶部位置
    backToTop.click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    /*---------返回顶部结束----------*/


});

