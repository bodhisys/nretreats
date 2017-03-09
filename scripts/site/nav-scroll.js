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