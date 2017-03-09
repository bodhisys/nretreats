/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 15*/
var nret = nret || {};
(function($) {


    nret.imageGallery = {

        initImageGallery : function() {
            if ( $('.image-gallery').length > 0 ) {
                $('.image-gallery').slick({
                    arrows: false,
                    infinite: true,
                    slidesToShow: 1,
                    asNavFor: '.image-gallery-photographer',
                    variableWidth: true
                });
                $('.image-gallery-photographer').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: '.image-gallery'
                });
            }
        },

        initBasicCarousel : function () {
            var $carousel = $('.js-carousel');
            $carousel.slick({
                arrows: false,
                infinite: true,
                slidesToShow: 1,
                waitForAnimate: false,
                dots: true
            })
        },

        basicCarouselControls : function () {
            var $carouselPrev = $('.js-carousel-prev'),
                $carouselNext = $('.js-carousel-next'),
                $carouselParent = $('.js-carousel-parent'),
                $carousel = $('.js-carousel');

            $carouselNext.on('click', function() {
                $(this).closest($carouselParent).find($carousel).slick('slickNext');
            });
            $carouselPrev.on('click', function() {
                $(this).closest($carouselParent).find($carousel).slick('slickPrev');
            });
        },

        imageGalleryControls : function() {
            if ( $('.image-gallery').length > 0 ) {
                $('.image-gallery__navigation-left').on('click', function(){
                    $(this).closest('.image-gallery__parent').find('.image-gallery').slick('slickPrev');
                });

                $('.image-gallery__navigation-right').on('click', function(){
                    $(this).closest('.image-gallery__parent').find('.image-gallery').slick('slickNext');
                });
            }
        },

        initRoomTypeCarousel : function() {
            if ( $('.room-type-detail__multi__carousel').length > 0 ) {
                $('.room-type-detail__multi__carousel').slick({
                    arrows:false,
                    infinite:true,
                    waitForAnimate:false
                });
            }
        },

        roomTypeCarouselFilterControls : function() {
            var index;
            if ( $('.room-type-detail__multi__header__filter').length > 0 ) {
                $('.room-type-detail__multi__header__filter__choice').on('click', doSomething);
                function doSomething() {
                    index = $(this).attr('data-room-index');

                    if ( !$(this).hasClass('active') ) {
                        $('.room-type-detail__multi__header__filter__choice').removeClass('active');
                        $(this).addClass('active')
                    }
                    nret.imageGallery.roomTypeCarouselGoToIndex(index);
                }

            }
        },

        roomTypeCarouselGoToIndex : function(index) {
            $('.room-type-detail__multi__carousel').slick('slickGoTo', index);
        },

        // Offers row & Explorer row becomes a carousel at certain page width
        responsiveImageGallery : function() {
            var imageGalleryMobile = $('.image-gallery-mobile');
            if( imageGalleryMobile ) {
                window.onresize = function() {
                    if (window.innerWidth <= 768 && !imageGalleryMobile.hasClass('slick-initialized')) {
                        nret.imageGallery.mobileOffersRowGallery();
                    } else if (window.innerWidth >= 769 && imageGalleryMobile.hasClass('slick-initialized')) {
                        imageGalleryMobile.slick('destroy');
                    }
                }
            }
            if ( window.innerWidth <= 768 ) {
                nret.imageGallery.mobileOffersRowGallery();
            }
        },
        // Function to make offers row into carousel
        mobileOffersRowGallery : function() {
            var center = true;
            if ( $('.image-gallery-mobile').hasClass('explore-team-row') ) {
                center=false;
            }
            $('.image-gallery-mobile').slick({
                arrows: false,
                infinite: true,
                dots: true,
                slidesToShow: 1,
                waitForAnimate: false
            });
        },

        init : function() {
            nret.imageGallery.initImageGallery();
            nret.imageGallery.imageGalleryControls();
            nret.imageGallery.initRoomTypeCarousel();
            nret.imageGallery.initBasicCarousel();
            nret.imageGallery.basicCarouselControls();
            nret.imageGallery.responsiveImageGallery();
            nret.imageGallery.roomTypeCarouselFilterControls();
        }
    };
    jQuery(document).ready(function() {
        nret.imageGallery.init();
    });
}(jQuery));