/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 36*/
var nret = nret || {};
(function ($) {
    nret.realEstateHomepage = {
        addListeners: function () {
            $('.real-estate-homepage-nav__menu-item > button').on('click', function () {
                $(this).closest('.real-estate-homepage-nav__menu-item').siblings().removeClass('active open');
                $(this).closest('.real-estate-homepage-nav__menu-item').toggleClass('open').addClass('active');
            });
        },
        init: function () {
            nret.realEstateHomepage.addListeners();
        }
    };
}(jQuery));