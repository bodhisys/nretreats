/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 21*/
var nret = nret || {};
(function($){


    nret.retreatSearchWidget = {

        changeLabelOnSelect : function() {
            $('.global-nav__destinations__destination-list-wrapper').find('.custom-check-input').on('change', function() {
                var destinationString = ' Destinations';
                var count = $(this).parents('.global-nav__destinations__destination-list-wrapper').find('.custom-check-input:checked').length;
                if (count === 1){ destinationString = ' Destination'; }
                if (count === 0){ count = ""; }
                $('.destination.home__search__choice').text(count + destinationString);
            });
        },

        init : function() {
            nret.retreatSearchWidget.changeLabelOnSelect();
        }
    };

    jQuery(document).ready(function() {
        nret.retreatSearchWidget.init();
    });

}(jQuery));