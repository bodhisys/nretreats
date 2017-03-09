/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 27*/
var nret = nret || {};
(function($) {
    nret.page_booking = {

        showPageContents : function () {
            $('.booking-page').find('> .wrapper').addClass('show');
        },

        init: function() {
            nret.page_booking.showPageContents();
        }
    };
    jQuery(document).ready(function() {
        if ( $('.booking-page').length > 0 ) {
            nret.page_booking.init();
        }
    });
}(jQuery));