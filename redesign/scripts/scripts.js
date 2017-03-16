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