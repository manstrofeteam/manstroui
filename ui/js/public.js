$(function() {

    //左侧菜单单击效果
    $(".lf-nav .parent-nav > li").click(function() {
        $(".lf-nav .parent-nav > li").removeClass("active");
        $(this).addClass("active");
        $(".children-nav").hide();
        $(this).find(".children-nav").show();
    });
    $(".lf-nav .children-nav  li").click(function() {
        $(".lf-nav .children-nav  li").removeClass("active");
        $(this).addClass("active");
    });

    //单层左侧菜单导航滚动监听
    // $(".rg-content section").each(function(index, element) {
    //     $(element).waypoint(function() {
    //         var ele = $(element).attr("id");
    //         $(".lf-nav li").removeClass("active");
    //         $(".lf-nav li[name=" + ele + "]").addClass('active');
    //     });
    // });

    //多层左侧菜单导航滚动监听
    $(".rg-content .section-title").each(function(index, element) {
        $(element).waypoint(function() {
            var ele = $(element).attr("id");
            console.log(ele);
            //判断属于父级【parent-nav】还是子级【children-nav】
            var $curr = $(".lf-nav li[name=" + ele + "]");
            var flag = $curr.parent().attr("class");
            if (flag == "parent-nav") {
                $(".lf-nav li").removeClass("active");
                $curr.addClass('active');
                $(".children-nav").hide();
            } else {
                $(".lf-nav li").removeClass("active");
                $curr.addClass('active');
                $curr.parent().parent().addClass('active');
                $(".children-nav").hide();
                $curr.parent().show();
            }
        });
    });

    //左侧菜单区域和返回顶部箭头滚动监听
    var $backToTop = $(".back-to-top");
    var toTopHeight = $(".lf-nav").offset().top;
    $(window).scroll(function() {
        var scrollTop = $(document).scrollTop();
        if (scrollTop > toTopHeight) {
            //显示返回顶部箭头
            $backToTop.show();
            //检测是否为IE6。jQuery1.9中去掉了msie的方法，所以只好这样写
            if ('undefined' == typeof(document.body.style.maxHeight)) {
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
    // 返回顶部
    $backToTop.click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });
})
