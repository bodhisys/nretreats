/**
 * Created by Subash Maharjan on 3/10/2017.
 */
$(document).ready(function(){
    var mainbottom = $('.global-nav').height(); //$('.home__hero-wrapper').offset().top; // + $('.top-nav').height();

    // on scroll,
    $(window).on('scroll',function(){

        // we round here to reduce a little workload
        var stop = Math.round($(window).scrollTop());

        if (stop > mainbottom) {
            $('.global-nav').addClass('sticky-top-nav');
        } else {
            $('.global-nav').removeClass('sticky-top-nav');
        }

    });
});
