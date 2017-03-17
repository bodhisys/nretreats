/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 41*/
var nret = nret || {};
(function($) {
    nret.retreatDetail = {
        scrollToReview: function() {
            if (window.location.hash == "#reviews") {
                // Scroll to Target
                $('.product__reviews').velocity("scroll", {
                    duration: 600,
                    offset: -180,
                    easing: "ease-in-out"
                });
            }
        },
        init: function() {
            nret.retreatDetail.scrollToReview();
        }
    };
}(jQuery));