$(function() {
    /*路线查询*/
    var map = new BMap.Map("l-map");
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 12);
    map.enableScrollWheelZoom();

    var transit = new BMap.TransitRoute(map, {
        renderOptions: {
            map: map,
            panel: "r-result",
            autoViewport: true
        },
        onResultsHtmlSet: function() {
            $("#r-result").show()
        }
    });
    $("#result").click(function() {
        var start = $("#start").val(),
            end = $("#end").val();
        transit.search(start, end)
    });
    /*比例尺*/
    var top_left_control = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_TOP_LEFT
    });
    var top_left_navigation = new BMap.NavigationControl();
    var top_right_navigation = new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_SMALL
    });

    function add_control() {
        map.addControl(top_left_control);
        map.addControl(top_left_navigation)
    };
    //移除控件和比例尺
    function delete_control() {
        map.removeControl(top_left_control);
        map.removeControl(top_left_navigation)
    };
    add_control();
    /*餐厅*/
    var mPoint = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(mPoint, 15);
    var circle = new BMap.Circle(mPoint, 1000, {
        fillColor: "blue",
        strokeWeight: 3,
        fillOpacity: 0.3,
        strokeOpacity: 0.5,
        StrokeColor: "pink"
    });
    $(".restaurant").click(function() {

            map.addOverlay(circle);
            var local = new BMap.LocalSearch(map, {
                renderOptions: {
                    map: map,
                    autoViewport: false
                }
            });
            local.searchNearby('餐馆', mPoint, 1000)
        })
        /*酒店*/
    $(".hotel").click(function() {

            map.addOverlay(circle);
            var local = new BMap.LocalSearch(map, {
                renderOptions: {
                    map: map,
                    autoViewport: false
                }
            });
            local.searchNearby('酒店', mPoint, 1000)
        })
        /*娱乐*/
    $(".entertainment").click(function() {

            map.addOverlay(circle);
            var local = new BMap.LocalSearch(map, {
                renderOptions: {
                    map: map,
                    autoViewport: false
                }
            });

            local.searchNearby('KTV|电影院', mPoint, 1000);
        })
        /*景点*/
    $(".sight").click(function() {

            map.addOverlay(circle);
            var local = new BMap.LocalSearch(map, {
                renderOptions: {
                    map: map,
                    autoViewport: false
                }
            });

            local.searchNearby('景点', mPoint, 1000);
        })
        /*商场*/
    $(".market").click(function() {

            map.addOverlay(circle);
            var local = new BMap.LocalSearch(map, {
                renderOptions: {
                    map: map,
                    autoViewport: false
                }
            });

            local.searchNearby('商场', mPoint, 1000);
        })
        /*驾车*/
    $(".route_way a").hover(function() {
        $(this).addClass("selected");
        $(".route_way").eq(0).removeClass("selected")
    }, function() {
        $(this).removeClass("selected")
    })
    $("#driving").click(function() {

            var options = {
                onSearchComplete: function(results) {
                    if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
                        // 获取第一条方案
                        var plan = results.getPlan(0);
                        // 获取方案的驾车线路
                        var route = plan.getRoute(0);
                        // 获取每个关键步骤,并输出到页面
                        var s = [];
                        for (var j = 0; j < plan.getNumRoutes(); j++) {
                            var route = plan.getRoute(j);
                            for (var i = 0; i < route.getNumSteps(); i++) {
                                var step = route.getStep(i);
                                s.push((i + 1) + ". " + step.getDescription());
                            }
                        }
                        document.getElementById("r-result").innerHTML = s.join("<br/>");
                    }
                }
            };
            var driving = new BMap.DrivingRoute(map, options);
            var start = $("#start").val(),
                end = $("#end").val();
            driving.search(start, end, {
                waypoints: ['西直门', '德胜门']
            });
        })
        /*步行*/

    $("#walking").click(function() {
        var walking = new BMap.WalkingRoute(map, {
            renderOptions: {
                map: map,
                autoViewport: true
            }
        });
        var start = $("#start").val();
        var end = $("#end").val();
        walking.search(start, end);
    })

    /*费用*/


    $("#result1").click(function() {
            var driving = new BMap.DrivingRoute(map, {
                onSearchComplete: yyy,
                renderOptions: {
                    map: map,
                    autoViewport: true
                }
            });
            var start = $("#start").val();
            var end = $("#end").val();
            driving.search(start, end);
            //驾车查询
            function yyy(rs) {
                alert("从" + start + "到" + end + "打车总费用为:" + rs.taxiFare.day.totalFare + "元"); //计算出白天的打车费用的总价
            }

        })
        /*定位*/
    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function(e) {
        // 定位成功事件
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("当前定位地址为：" + address);
    });
    geolocationControl.addEventListener("locationError", function(e) {
        // 定位失败事件
        alert(e.message);
    });
    map.addControl(geolocationControl);
    var geolocation = new BMap.Geolocation(); // 添加定位控件
    geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            alert('您的位置：' + r.point.lng + ',' + r.point.lat);
        } else {
            alert('failed' + this.getStatus());
        }
    }, {
        enableHighAccuracy: true
    })

    /*路况*/
    var ctrl = new BMapLib.TrafficControl({
        showPanel: false //是否显示路况提示面板
    });
    map.addControl(ctrl);
    ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT);

    /*地图类型、缩略图控件*/
    var mapType1 = new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
    });
    var mapType2 = new BMap.MapTypeControl({
        anchor: BMAP_ANCHOR_TOP_LEFT
    });

    var overView = new BMap.OverviewMapControl();
    var overViewOpen = new BMap.OverviewMapControl({
        isOpen: true,
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT
    });
    //添加地图类型和缩略图
    function add_control1() {
        map.addControl(mapType1); //2D图，卫星图
        map.addControl(mapType2); //左上角，默认地图控件
        map.setCurrentCity("淄博"); //由于有3D图，需要设置城市哦
        map.addControl(overView); //添加默认缩略地图控件
        map.addControl(overViewOpen); //右下角，打开
    }

    $(".add").click(function() {
            add_control1();
        })
        //移除地图类型和缩略图
    function delete_control1() {
        map.removeControl(mapType1); //移除2D图，卫星图
        map.removeControl(mapType2);
        map.removeControl(overView);
        map.removeControl(overViewOpen);
    }

    $(".delete").click(function() {
        delete_control1();
    })
})
