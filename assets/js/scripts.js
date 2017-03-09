/*!
 * Natural Retreats Theme - naturalretreats v3.3.7+1 (http://www.subashmaharjan.com/bizCoach)
 * Copyright 2013-2017 Subash Maharjan
 */
$(document).ready(function(){
    $(window).load(function() {
        $('.destination-slider').flexslider({
            animation: "slide",
            animationLoop: false,
            itemWidth: 210,
            itemMargin: 5,
            minItems: 2,
            maxItems: 3,
            slideshow: false,
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
$(document).ready(function(){
    var mainbottom = $('.hero').offset().top; // + $('.top-nav').height();

    // on scroll, 
    $(window).on('scroll',function(){

        // we round here to reduce a little workload
        var stop = Math.round($(window).scrollTop());

        if (stop > mainbottom) {
            $('.top-nav').addClass('sticky-top-nav');
        } else {
            $('.top-nav').removeClass('sticky-top-nav');
        }

    });
});