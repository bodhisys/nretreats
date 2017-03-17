/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 19*/
var nret = nret || {};
(function ($) {

    nret.realEstatePage = {

        stickySubNav_RealEstate: function() {
            var realEstateSubNav = $('.real-estate-community-nav').length > 0;
            var stickyElement = null;
            var stickyOffset = null;
            var handlerfunction = null;

            var stickyRealEstateSubNavHandler =  function(direction) {
                $('.real-estate-header').toggleClass('stuck');
                if (direction == 'up') {
                    $('.real-estate-community-nav').removeAttr('style');
                } else if (direction == 'down') {
                    $('.real-estate-community-nav').velocity({
                        top:45
                    },350);
                    $('.real-estate-community-nav').velocity({
                        opacity:1
                    },250);
                }
            };

            if(realEstateSubNav) {
                stickyElement = $('.real-estate-community-nav')[0];
                stickyOffset = 30;
                handlerfunction = function(direction){stickyRealEstateSubNavHandler(direction)};
            }

            var sticky = new Waypoint.Sticky({
                element: stickyElement,
                handler: function(direction) {
                    handlerfunction(direction);
                },
                offset:stickyOffset
            });
        },

        realEstatePageListeners: function(){
            $('.real-estate-mobile-navigation-open').on('click', function () {
                $(this).toggleClass('open');
            });

            $('.has-subnavigation > button').on('click', function () {
                $(this).closest('.has-subnavigation').siblings().removeClass('open');
                $(this).closest('.has-subnavigation').toggleClass('open');
            });

            $('.real-estate-submenu-item > button').on('click', function () {
                $(this).closest('.real-estate-submenu-item').siblings().removeClass('open active');
                $(this).closest('.real-estate-submenu-item').toggleClass('open').addClass('active');
            });

            $('.real-estate-footer-menu-item h4 button').on('click', function () {
                $(this).closest('.real-estate-footer-menu-item').siblings().removeClass('open');
                $(this).closest('.real-estate-footer-menu-item').toggleClass('open');
            });

            $('.launch-contact-modal').on('click', function () {
                $('.real-estate-contact-form-modal').fadeIn();
            });

            $('.close-contact-modal').on('click', function () {
                $('.real-estate-contact-form-modal').fadeOut();
            });
        },

        init: function(){
            nret.realEstatePage.realEstatePageListeners();
            if ($('.real-estate-community-nav').length > 0) {
                if ( $('body').hasClass('node-type-retreat') || $('body').hasClass('desktop') || window.innerWidth >= 900 ) {
                    nret.realEstatePage.stickySubNav_RealEstate();
                }
            }
        }
    };

    jQuery(document).ready(function() {
        nret.realEstatePage.init()
    })

}(jQuery));