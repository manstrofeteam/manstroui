$(function() {
    //右侧快捷方式鼠标滑动事件
    $(".icon-shortcut li").hover(function() {
        $(this).children(".icon-tip").stop().fadeIn(400);
    }, function() {
        $(this).children(".icon-tip").stop().fadeOut(400);
    });
    //返回顶部 滚动监听
    var backToTop = $(".icon-shortcut .back-to-top");
    $(window).scroll(function() {
        var scrollTopVal = $(window).scrollTop();
        if (scrollTopVal > 320) {
            //返回顶部按钮显示
            backToTop.fadeIn(600);
        } else {
            //返回顶部按钮隐藏
            backToTop.fadeOut(600);
        }
    });
    //当点击跳转链接后，回到页面顶部位置
    backToTop.click(function() {
        $('body, html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});

