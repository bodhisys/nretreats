/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 3: bazaar*/
var nret = nret || {};
(function($){

    nret.bazaar = {


        submitGeneric : function() {
            $BV.ui('rr', 'submit_generic', {});
        },

        initGenericFormEvent: function(){
            $('#initReviewsGeneric').on('click', function() {
                nret.bazaar.submitGeneric();
            });
        },

        init : function() {
            // nret.bazaar.adjustDropdownOnHover();
            nret.bazaar.initGenericFormEvent();
            // nret.bazaar.displayFeaturedReviews();
        }
    };

    jQuery(document).ready(function() {
        nret.bazaar.init();

    });

}(jQuery));