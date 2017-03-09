/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 24*/
var nret = nret || {};
(function($){
    nret.styles = {
        growAnimationFiltersClass : function() {
            $('.initGrow').on('click', function(event) {
                var $element = $(this),
                    $elementParent = $element.parent().hasClass('input-container') ? $element.parent().parent() : $element.parent();
                $growMeElement = $('.growMe', $elementParent);
                $elementParent.toggleClass('open');
                $('.filter__options-wrapper__filter-option').not($elementParent).removeClass('open');
                $('.growMe').not($growMeElement).removeClass('show');
                $('.growMeMore').removeClass('show');
                $growMeElement.toggleClass('show');
                $('.cal').find('.input-container').removeClass('show');
                event.stopPropagation();
            });

            $('.initGrowMore').on('click', function(event) {
                var el = $('.growMeMore');
                var elParent = $(this).parent();
                elParent.toggleClass('open');
                $('.filter__options-wrapper__filter-option').not(elParent).removeClass('open');
                $('.growMe').removeClass('show');
                el.toggleClass('show');
                $('.cal').find('.input-container').removeClass('show');
                event.stopPropagation();
            });
        },
        moveMoreFilterLeft: function() {
            var w = $('.filter__more__block').eq(0).innerWidth();
            $('#moreFiltersWrapper').velocity({
                translateX: '-='+w
            });
        },
        moveMoreFilterLeftEvent: function() {
            $('#moreOptionsScrollLeft').on('click', function() {
                nret.styles.moveMoreFilterLeft()
            });
        },
        moveMoreFilterRight : function() {
            var w = $('.filter__more__block').eq(0).innerWidth();
            $('#moreFiltersWrapper').velocity({
                translateX: '+=' + w
            });
        },
        moveMoreFilterRightEvent: function() {
            $('#moreOptionsScrollRight').on('click', function() {
                nret.styles.moveMoreFilterRight();
            });
        },
        animateNumberCount : function(id, start, end, duration) {
            var range = end - start;
            var current = start;
            var increment = end > start? 1 : -1;
            var stepTime = Math.abs(Math.floor(duration / range));
            var obj = document.getElementById(id);
            var timer = setInterval(function() {
                current += increment;
                obj.innerHTML = current;
                if (current == end) {
                    clearInterval(timer);
                }
            }, stepTime);
        },
        init : function() {
            nret.styles.growAnimationFiltersClass();
            nret.styles.moveMoreFilterRightEvent();
            nret.styles.moveMoreFilterLeftEvent();
        }
    };

    jQuery(document).ready(function() {
        nret.styles.init();
    });
}(jQuery));