 jssor_1_slider_init = function() {

     var jssor_1_options = {
         $AutoPlay: true,
         $ArrowNavigatorOptions: {
             $Class: $JssorArrowNavigator$
         },
         $ThumbnailNavigatorOptions: {
             $Class: $JssorThumbnailNavigator$,
             $Cols: 4,
             $SpacingX: 4,
             $SpacingY: 4,
             $Orientation: 2,
             $Align: 0
         }
     };

     var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

     //responsive code begin
     //you can remove responsive code if you don't want the slider scales while window resizing
     function ScaleSlider() {
         var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
         if (refSize) {
             jssor_1_slider.$ScaleWidth(refSize);
         } else {
             window.setTimeout(ScaleSlider, 30);
         }
     }
     ScaleSlider();
     $Jssor$.$AddEvent(window, "load", ScaleSlider);
     $Jssor$.$AddEvent(window, "resize", ScaleSlider);
     $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
     //responsive code end
 };
