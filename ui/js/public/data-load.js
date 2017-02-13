$(function() {
    // 加载公共模块代码
    $("[data-load]").each(function() {
        $(this).load($(this).data("load"), function() {});
    });
})
