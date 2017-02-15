//鼠标滑动显示文字详情
$(".demo1 .img-txt-item").hover(function() {
    $(this).children(".item-txt").stop().slideDown(400);
}, function() {
    $(this).children(".item-txt").stop().slideUp(400);
});
//鼠标滑动显示文字详情第二种方法
$(".demo2 .item-txt").hover(
    function() {
        $(this).stop().animate({
            top: "146px"
        }, 400)
    },
    function() {
        $(this).stop().animate({
            top: "193px"
        }, 400)
    });

