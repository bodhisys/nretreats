/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 22*/
var nret = nret || {};
(function($){

    nret.scrollController = {

        anchorScrolling : function() {
            var linkSource,
                linkTarget;
            $('.anchor-link').on('click', function(e){
                e.preventDefault();
                // Get ID of target
                linkSource = $(this).attr('data-link-source');

                // Find Target
                linkTarget = $('*[data-anchor="' + linkSource + '"]');

                // Scroll to Target
                linkTarget.velocity("scroll", {
                    duration: 600,
                    offset: -180,
                    easing: "ease-in-out"
                });

            });
        },

        stickySubNav : function() {

            //2 States for the sticky sub nav
            //1: Has booking widget
            //2: No booking widget

            //State determined by switch below based on .booking-widget length

            //Variables determined by state
            //stickyElement: the element that can be stuck
            //handlerfunction: the function to fire when hitting the waypoint; direction is passed to this
            //offset: the offset of when the sticky hits based on the top of the object

            var bookingWidgetLength = $('.booking-widget').length;
            var stickyElement = null;
            var stickyOffset = null;
            var handlerfunction = null;

            var stickyBookingHandler =  function(direction) {
                $('.global-nav').toggleClass('stuck');
                if (direction == 'up') {
                    $('.booking-widget').removeAttr('style');
                } else if (direction == 'down') {
                    $('.booking-widget').velocity({
                        top:45
                    },350);
                    $('.booking-widget').velocity({
                        opacity:1
                    },250);
                }
            };

            var genericHandler = function(direction) {
                $('.global-nav').toggleClass('stuck');
                if (direction == 'up') {
                    $('.subnav-container').removeAttr('style');
                } else if (direction == 'down') {
                    $('.subnav-container').velocity({
                        top:50
                    },350);
                    $('.subnav-container').velocity({
                        opacity:1
                    },250);
                }

            };

            switch(bookingWidgetLength) {
                case 0:
                    stickyElement = $('.subnav-container')[0];
                    $('.subnav-container').removeClass('stuck');
                    stickyOffset = ($('.subnav-container').height() + 28);
                    handlerfunction = function(direction){genericHandler(direction)};
                    break;
                case 1:
                    stickyElement = $('.booking-widget')[0];
                    stickyOffset = -65;
                    handlerfunction = function(direction){stickyBookingHandler(direction)};
                    break;
                default:
                    stickyElement = $('.booking-widget')[0];
                    stickyOffset = -65;
                    handlerfunction = function(direction){stickyBookingHandler(direction)};
                    break;
            };


            var sticky = new Waypoint.Sticky({
                element: stickyElement,
                handler: function(direction) {
                    handlerfunction(direction);
                },
                offset:stickyOffset
            });
        },

        pauseVideoOnScrollPosition : function() {
            if ( $('body').hasClass('desktop') ) {
                if ( $('.about__full-video').length > 0 ) {
                    var sticky = new Waypoint.Sticky({
                        element: $('.scroll-catch'),
                        handler: function(direction) {
                            if (direction == 'up') {
                                document.getElementById('aboutBgVid').play();
                            } else if (direction == 'down') {
                                document.getElementById('aboutBgVid').pause();
                            }
                        },  offset:550
                    })
                }
            }
        },

        highlightSubnavOnScrollPositionEvent : function() {
            // $(window).scroll(nret.scrollController.highlightSubnavOnScrollPosition());
        },

        highlightSubnavOnScrollPosition : function() {
            var aChildren = $('.subnav li').children(); // find the a children of the list items
            var aArray = []; // create the empty aArray
            for (var i=0; i < aChildren.length; i++) {
                var aChild = aChildren[i];
                var linkSrc = $(aChild).attr('data-link-source');
                aArray.push(linkSrc);
            } // this for loop fills the aArray with attribute href values
            $(window).scroll(function() {
                var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
                var windowHeight = $(window).height(); // get the height of the window
                var docHeight = $(document).height();



                for (var i=0; i < aArray.length; i++) {
                    var anchorEl = aArray[i];

                    throw new Error("break here");
                    var anchorElAttr = anchorEl.dataset.anchor;
                    var divPos = $(anchorEl).offset().top; // get the offset of the div from the top of page
                    var divHeight = $(anchorEl).height(); // get the height of the div in question
                    if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                        $("a[data-link-source='" + anchorElAttr + "']").addClass("active");
                    } else {
                        $("a[data-link-source='" + anchorElAttr + "']").removeClass("active");
                    }
                }

            });


        },


        init : function() {
            nret.scrollController.anchorScrolling();
            nret.scrollController.pauseVideoOnScrollPosition();
            // nret.scrollController.highlightSubnavOnScrollPosition();
            if ( $('.booking-widget').length > 0 || $('.subnav-container').length > 0 ) {
                if ( $('body').hasClass('node-type-retreat') || $('body').hasClass('desktop') || window.innerWidth >= 900 ) {
                    nret.scrollController.stickySubNav();
                }
            }

        }
    };

    jQuery(document).ready(function() {
        nret.scrollController.init();
    });

}(jQuery));