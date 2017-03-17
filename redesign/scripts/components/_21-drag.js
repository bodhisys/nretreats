/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 9*/
var nret = nret || {};
(function($){
    var dragPos = 0,
        dragBarW;
    nret.drag = {
        initDraggable : function() {
            $('.scroll-el').draggable(
                { axis: "x" },
                { containment: '.scroll-el-wrapper', scroll: false },
                { drag: function( event, ui ) {
                    dragPos = ui.position.left;
                    nret.drag.slideElements($(this));
                }
                });
            dragBarW = $('.scroll-el-wrapper').innerWidth() - 25;
        },

        resizeScreen : function () {
            window.onresize = function() {
                nret.drag.initDraggable();
            }
        },

        initSlide :function () {
            if($(window).innerWidth() > 767 && $('body').hasClass('desktop')  ){
                window.requestAnimationFrame(nret.drag.slideElements);
            }
        },

        slideElements : function(el) {
            var scrollEl = el.parents('.scroll-drag').prev();
            var dragScrollToPercent = (dragPos / dragBarW) * 100,
                pixelsToSlide = scrollEl[0].scrollWidth - scrollEl[0].clientWidth;
            scrollEl[0].scrollLeft = (pixelsToSlide * (dragScrollToPercent * .01));
        },

        init : function() {
            nret.drag.initDraggable();
        }
    };

    jQuery(document).ready(function() {
        if ( $('.scroll-drag').length > 0 ) {
            nret.drag.init();
            nret.drag.resizeScreen();
        }
    });
}(jQuery));