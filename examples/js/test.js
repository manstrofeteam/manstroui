$(function() {
    //初始化预抵预离时间
    initDate();
    //初始化 房型列表
    findRoomTypes();
    //初始化 推荐营地列表
    findTJCamps();
    //初始化 相关路线列表
    findXGRoute();
    // 根据预抵预离时间筛选房型列表
    $(".dateSearch .roomSearch").click(function() {
      findRoomTypes();
      // 将选定的预抵预离时间    传值到预订流程中 
      setDate();

    });
    // 营地介绍和评论tab页面切换效果
    var campDescLi = $("#navigation .campDescLi");
    var campCommLi = $("#navigation .campCommLi");
    campDescLi.click(function() {
      campCommLi.removeClass("current");
      $(this).addClass("current");
      $("#campImgDesc").show();
    });
    campCommLi.click(function() {
      $("#campImgDesc").hide();
      campDescLi.removeClass("current");
      $(this).addClass("current");
    });


  })
  //查找对应营地的房型列表列表
function findRoomTypes() {
  var webCampId = $("#webCampId").val();
  var campId = $("#campId").val();
  var startDate = $("#startDate").val();
  var endDate = $("#endDate").val();

  $.ajax({
    type: "POST",
    url: "/smartCamp/webFront/findCampRoomDescByCampId.do?webCampId=" + webCampId + "&campId=" + campId + "&startDate=" + startDate + "&endDate=" + endDate,
    dataType: "html",
    success: function(info) {
      $('#campRoomLists').html(info);
    }
  });
}
// 初始化预抵预离时间
function initDate() {
  //初始化预抵预离时间
  var curDate = new Date();
  var nowDate = curDate.Format("yyyy-MM-dd");
  var nextDay = new Date((curDate / 1000 + 86400) * 1000).Format("yyyy-MM-dd");
  $("#startDate").val(nowDate);
  $("#endDate").val(nextDay);
  $(".startDateVal").val(nowDate);
  $(".startDateSpan").text(nowDate);
  $(".endDateVal").val(nextDay);
  $(".endDateSpan").text(nextDay);
  var days = getDays(nowDate, nextDay);
  $(".dayNum").text(days);
}

// 将选定的预抵预离时间    传值到预订流程中 
function setDate() {
  var startDate = $("#startDate").val();
  var endDate = $("#endDate").val();
  $(".startDateVal").val(startDate);
  $(".startDateSpan").text(startDate);
  $(".endDateVal").val(endDate);
  $(".endDateSpan").text(endDate);
  var days = getDays(startDate, endDate);
  $(".dayNum").text(days);
}
var loadi;

function publicComment() {
  $.ajax({
    url: '/smartCamp/comment/saveByAdd.do',
    type: 'POST',
    data: $("#dataForm").serialize(),
    dataType: "json",
    onSubmit: function(param) {
      loadi = layer.load();
    },
    success: function(data) {
      if (data.success == "T") {
        layer.msg('评论保存成功', {
          icon: 1
        }, function() {
          layer.close(loadi);
          window.location.reload();
        });
      } else if (data.success == "F") {
        //返回错误信息
        var message = data.message;
        layer.msg(message, {
          icon: 2
        });
        layer.close(loadi);
      }
    }
  });
}
