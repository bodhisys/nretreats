/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 32*/
var nret = nret || {};
(function($) {

    nret.offer = {

        setofferCookeis : function() {

            $('a[data-offer-type]').on('click', function() {
                var type = $(this).attr('data-offer-type');
                Cookies.set('offer_list[type]', type);
            });

            $('a[data-offer-location]').on('click', function() {
                var location = $(this).attr('data-offer-location');
                Cookies.set('offer_list[location]', location);
            });

        },

        removeofferCookies : function() {
            $('.filter__clear').on('click', function() {
                Cookies.remove('offer_list');
            });
        },

        adjustFilterTextOnLoad: function() {
            var locationText = Cookies.get('offer_list[location]');
            var typeText = Cookies.get('offer_list[type]');
            var environmentText = Cookies.get('offer_list[environment]');
            var locationText = Cookies.get('offer_list[location]');

            // WORK IN PROGRESS


        },

        init : function() {
            nret.offer.setofferCookeis();
            nret.offer.removeofferCookies();
        }

    };


    jQuery(document).ready(function() {
        if ( $('body').hasClass('page-offers') ) {
            nret.offer.init();
        }
    });

}(jQuery));