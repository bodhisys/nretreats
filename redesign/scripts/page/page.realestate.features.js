/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 20*/
var nret = nret || {};
(function ($) {
    var Carousel = function (element) {
        var self = this;
        var $carouselItems = $('.real-estate-carousel__item', element);
        var $paginationButtons = $('.real-estate-carousel__pagination button', element);
        var xDown = null;
        var yDown = null;

        if ($carouselItems.length <= 1) return;

        self.activeIndex = $('.real-estate-carousel__item.active', element).index();
        self.itemLength = $carouselItems.length;

        self.next = next;
        self.previous = previous;
        self.paginate = paginate;

        init();


        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        };

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                if ( xDiff > 0 ) {
                    /* left swipe */
                    self.previous();
                } else {
                    /* right swipe */
                    self.next();
                }
            } else {
                if ( yDiff > 0 ) {
                    /* up swipe */
                } else {
                    /* down swipe */
                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
        };

        function init() {
            $('.real-estate-carousel__next', element).on('click', function () {
                self.next();
            });

            $('.real-estate-carousel__previous', element).on('click', function () {
                self.previous();
            });

            element.addEventListener('touchstart', handleTouchStart, false);
            element.addEventListener('touchmove', handleTouchMove, false);

            $paginationButtons.on('click', function () {
                var newIndex = $(this).index();
                self.paginate(newIndex);
            });
        }

        function _wrapIndex(index) {
            var wrappedIndex;
            if (index < 0) {
                wrappedIndex = self.itemLength - 1;
            } else if (index >= self.itemLength) {
                wrappedIndex = 0;
            } else {
                wrappedIndex = index;
            }
            return wrappedIndex;
        }

        function next() {
            var newIndex = self.activeIndex + 1;
            paginate(newIndex);
        }

        function previous() {
            var newIndex = self.activeIndex - 1;
            paginate(newIndex);
        }

        function paginate(index) {
            $carouselItems.removeClass('active');
            $paginationButtons.removeClass('active');
            self.activeIndex = _wrapIndex(index);
            $carouselItems.eq(self.activeIndex).addClass('active');
            $paginationButtons.eq(self.activeIndex).addClass('active');
        }
    };

    $('.real-estate-carousel').each(function (index, element) {
        new Carousel(element);
    });
}(jQuery));

(function ($) {
    $contactForm = $('#real-estate-contact-form');
    if (!$contactForm) return;

    $('input[type=radio][name=real-estate-topic]', $contactForm).on('change', function () {
        var topic = this.value === 'marketing' ? 'developing' : this.value;
        $('.real-estate-contact-form__follow-up', $contactForm).hide();
        $('.real-estate-contact-form__follow-up--' + topic, $contactForm).show();
    });

    $contactForm.submit(function(event) {
        event.preventDefault();
        var timer;
        var data = $(this).serializeArray();
        var originalSubmitValue = $('#real-estate-contact-form button[type=submit]').text();
        $('#real-estate-contact-form button[type=submit]').text('Sending...');
        $.ajax({
            type: 'POST',
            url: '/api/v1/realstatecontact',
            data: data,
            success: function(response) {
                if (response.error) {
                    $('#real-estate-contact-form button[type=submit]').text('Error, Try Again');
                } else {
                    $('#real-estate-contact-form button[type=submit]').text('Sent');
                }
                window.clearTimeout(timer);
                timer = setTimeout(function() {
                    $('#real-estate-contact-form button[type=submit]').text(originalSubmitValue);
                }, 5000);
            }
        });
    });
}(jQuery));