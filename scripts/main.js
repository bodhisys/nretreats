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

$(document).ready(function(){
    $(window).load(function() {
        $('.destination-slider').flexslider({
            animation: "slide",
            animationLoop: true,
            itemWidth: 210,
            itemMargin: 5,
            minItems: 1,
            maxItems: 2,
            slideshow: false,
            reverse: false,
            touch: true,
            controlNav: false
        });
        $('.guest-reviews-slider').flexslider({
            animation: "slide",
            animationLoop: false,
            slideshow: false,
            touch: true,
            controlNav: false
        });
        $('.special-offer-slider').flexslider({
            animation: "slide",
            animationLoop: false,
            itemWidth: 210,
            itemMargin: 5,
            minItems: 2,
            maxItems: 2,
            slideshow: false,
            touch: true,
            controlNav: false
        });
    });
});