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
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 26*/
var nret = nret || {};
(function($) {


    nret.about = {

        embedInstagramPics : function() {
            var feed = new Instafeed({
                get: 'user',
                userId: '1101490324',
                clientId: 'c8d28a45dd02413e975170c69d007168',
                sortBy: 'most-recent',
                resolution: 'standard_resolution',
                template: '<div class="instagram-block" style="background:url({{image}}) no-repeat center center;background-size:contain;background-position:top;"><div class="instagram-block__cta"><span class="icon icon_instagram"></span></div></div>',
                limit: 2
            });
            feed.run();
        },

        controlPlaybackOnAbout : function() {
            var aboutBgVid = document.getElementById('aboutBgVid')
            $('#launchMobileAboutVideo').on('click', function() {
                aboutBgVid.webkitEnterFullscreen();
                aboutBgVid.play();

            });
        },

        init : function() {
            nret.about.embedInstagramPics();
            nret.about.controlPlaybackOnAbout();
        }

    };
}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 27*/
var nret = nret || {};
(function($) {
    nret.page_booking = {

        showPageContents : function () {
            $('.booking-page').find('> .wrapper').addClass('show');
        },

        init: function() {
            nret.page_booking.showPageContents();
        }
    };
    jQuery(document).ready(function() {
        if ( $('.booking-page').length > 0 ) {
            nret.page_booking.init();
        }
    });
}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 28*/
var nret = nret || {};
(function($, Cookies) {
    var NRES_API_DATE_FORMAT_REQUEST = 'dd-M-yy',
        NRES_API_DATE_FORMAT_RESPONSE = 'dd-M-y',
        NRES_OVERLAY_DATE_FORMAT = 'M dd',
        NUMBER_OF_MONTHS = window.innerWidth < 769 ? 1 : 2,
        $checkInDateInput = $('#destination-check-in'),
        $checkInSubLabel = $('.checkin-sublabel'),
        $checkOutDateInput = $('#destination-check-out'),
        $checkInOverlay = $('.check-in-overlay'),
        $checkOutSubLabel = $('.checkout-sublabel'),
        $checkOutOverlay = $('.check-out-overlay'),

        $filterError = $('#booking-error'),
        $filterForm = $('#bookingWidgetForm'),
        $filterSubmit = $('#bookingWidgetForm button[type="submit"]');

    var NaturalRetreatsFilter = function() {
        var self = this;

        self.arrivalDates = [];
        self.departureDates = [];
        self.checkInDatepicker = undefined;
        self.checkOutDatepicker = undefined;

        self.clear = clear;
        self.clearCheckInDatepicker = clearCheckInDatepicker;
        self.clearCheckOutDatepicker = clearCheckOutDatepicker;
        self.hideFilterError = hideFilterError;
        self.hideCalendarError = hideCalendarError;
        self.showFilterError = showFilterError;
        self.showCalendarError = showCalendarError;
        initialize();
        function initialize() {
            self.checkInDatepicker = new CheckInDatepicker(self);
            self.checkOutDatepicker = new CheckOutDatepicker(self);

            var startDateCookie = Cookies.get('nret[start_date]'),
                endDateCookie = Cookies.get('nret[end_date]');
            if (startDateCookie && endDateCookie) {
                var splitStartDate = startDateCookie.toLowerCase().split('-'),
                    splitEndDate = endDateCookie.toLowerCase().split('-'),
                    months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                    startDateMonth = months.indexOf(splitStartDate[1]),
                    endDateMonth = months.indexOf(splitEndDate[1]),
                    startDate = new Date(splitStartDate[2], startDateMonth, splitStartDate[0]),
                    endDate = new Date(splitEndDate[2], endDateMonth, splitEndDate[0]);
                $checkInDateInput.datepicker('setDate', startDate);
                var formatedStartDateOverlay = $.datepicker.formatDate(NRES_OVERLAY_DATE_FORMAT, startDate).toUpperCase();
                $checkInOverlay.text(formatedStartDateOverlay);
                if ($checkOutDateInput.is(':disabled')) $checkOutDateInput.prop('disabled', false);
                var checkInDate = $checkInDateInput.datepicker('getDate');
                $checkOutDateInput.datepicker('option', 'defaultDate', checkInDate);
                $checkOutDateInput.datepicker('setDate', endDate);
                var formatedEndDateOverlay = $.datepicker.formatDate(NRES_OVERLAY_DATE_FORMAT, endDate).toUpperCase();
                $checkOutOverlay.text(formatedEndDateOverlay);
            }

            _listeners();
        }

        function _listeners() {
            // $filterForm.submit(function(event) {
            // 	if (!_isValid()) event.preventDefault();
            // });
        }

        function _isValid() {
            self.hideFilterError();
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                containsError = false;
            if (checkOutDate && !checkInDate) {
                containsError = true;
                $checkInDateInput.parent().addClass('booking-error');
                $checkOutDateInput.parent().removeClass('booking-error');
                self.showFilterError('Please select your check in date');
            } else if (checkInDate && !checkOutDate) {
                containsError = true;
                $checkInDateInput.parent().removeClass('booking-error');
                $checkOutDateInput.parent().addClass('booking-error');
                self.showFilterError('Please select your check out date');
            } else {
                $checkInDateInput.parent().removeClass('booking-error');
                $checkOutDateInput.parent().removeClass('booking-error');
            }
            return containsError;
        }

        function clear() {
            clearCheckInDatepicker();
            clearCheckOutDatepicker();
        }

        function clearCheckInDatepicker() {
            self.checkInDatepicker.clear();
            Cookies.remove('nret[start_date]');
        }

        function clearCheckOutDatepicker() {
            self.checkOutDatepicker.clear();
            self.departureDates = [];
            Cookies.remove('nret[end_date]');
        }

        function hideFilterError() {
            $filterError
                .hide()
                .text('');
            $filterSubmit.removeClass('booking-error');
        }

        function hideCalendarError() {
            $('#calendar-error').remove();
        }

        function showFilterError(errorMessage) {
            $filterError
                .show()
                .text(errorMessage);
            $filterSubmit.addClass('booking-error');
        }

        function showCalendarError(errorMessage) {
            var errorMarkup = [
                '<div id="calendar-error">',
                '<p>' + errorMessage + '</p>',
                '<button class="launch-enquiry">Ask about these dates <span class="side-arrow"></span></button>',
                '</div>'
            ].join('');
            $('#calendar-legend').before(errorMarkup);
            $('.launch-enquiry').click(function() {
                $('.retreat-detail__enquiry-window').addClass('show');
                $('.retreat-detail__enquiry-window').scrollLock();
            });
        }
    };

    var CheckInDatepicker = function(parent) {
        var self = this;

        self.clear = clear;
        self.refresh = refresh;

        initialize();

        function initialize() {
            $checkInDateInput.datepicker({
                dateFormat: $checkInDateInput.data('dateFormat'),
                minDate: 0,
                numberOfMonths: NUMBER_OF_MONTHS,
                beforeShow: _beforeShow,
                beforeShowDay: _beforeShowDay,
                onSelect: _onSelect
            });
        }

        var _calendarListenersTimeout;
        function _addCalendarListeners() {
            clearTimeout(_calendarListenersTimeout);
            if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible')) {
                $('.ui-datepicker-prev:not(.ui-state-disabled), .ui-datepicker-next:not(.ui-state-disabled)').click(function() {
                    _beforeShow();
                });
                $('.clear-dates button, button.clear-dates').on('click', function() {
                    parent.clear();
                });
                $('.ui-state-default').on('click', function() {
                    $('.ui-state-default').parent().removeClass('calendar-error');
                    var $element = $(this),
                        year = $element.parent().data('year'),
                        month = $element.parent().data('month'),
                        day = $element.text(),
                        selectionDate = new Date();
                    selectionDate.setFullYear(year, month, day);
                    if (!_isValidSelection(selectionDate)) {
                        event.preventDefault();
                        event.stopPropagation();
                        $(this).parent().addClass('calendar-error');
                    }
                });
            } else {
                _calendarListenersTimeout = setTimeout(_addCalendarListeners, 10);
            }
        }

        function _beforeShow() {
            if (window.innerWidth < 769 && !$.contains('.filter-option-check-in', '#ui-datepicker-div')) {
                var detachedDatepicker = $('#ui-datepicker-div').detach();
                detachedDatepicker.appendTo('.filter-option-check-in');
            }
            _addCalendarListeners();
        }

        function _beforeShowDay(date) {
            var todayDate = new Date();
            if (date <= todayDate) return [false, "", null];
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                isSelectable = true,
                cssClassName = '';
            if (checkInDate && date.getTime() === checkInDate.getTime()) cssClassName += ' check-in-date';
            if (checkOutDate && date.getTime() === checkOutDate.getTime()) cssClassName += ' check-out-date';
            if (checkInDate && checkOutDate && date < checkOutDate && date > checkInDate) cssClassName += ' in-between';
            return [isSelectable, cssClassName.trim(), null];
        }

        function _isValidSelection(selectionDate) {
            parent.hideCalendarError();
            var todayDate = new Date(),
                isValid;
            if (selectionDate <= todayDate) {
                parent.showCalendarError('Sorry, the date you have selected is not available.');
                isValid = false;
            } else {
                isValid = true;
            }
            return isValid;
        }

        function _onSelect() {
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                formatedDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkInDate).toUpperCase(),
                formatedDateOverlay = $.datepicker.formatDate(NRES_OVERLAY_DATE_FORMAT, checkInDate).toUpperCase();
            $checkInOverlay.text(formatedDateOverlay);
            Cookies.set('nret[start_date]', formatedDate);
            if($('.filter__cal-wrapper-out').length > 0) {
                $('.filter__cal-wrapper-in').removeClass('show');
                $('.filter__cal-wrapper-out').addClass('show');
            }
            if ($checkOutDateInput.is(':disabled')) $checkOutDateInput.prop('disabled', false);
            $checkOutDateInput.datepicker('option', 'defaultDate', checkInDate);
            if (!checkOutDate) {
                setTimeout(function() {
                    $checkOutDateInput.datepicker('show');
                }, 250);
            }
            $checkInSubLabel.addClass('show');
            parent.clearCheckOutDatepicker();
        }

        function clear() {
            $checkInDateInput
                .datepicker('setDate', null)
                .datepicker('hide')
                .blur();
            $checkInOverlay.text('Select Date');
            $checkOutDateInput
                .prop('disabled', true)
                .blur();
        }

        function refresh() {
            $checkInDateInput.datepicker('refresh');
            _beforeShow();
        }
    };

    var CheckOutDatepicker = function(parent) {
        var self = this;

        self.clear = clear;
        self.refresh = refresh;

        initialize();

        function initialize() {
            $checkOutDateInput.datepicker({
                dateFormat: $checkOutDateInput.data('dateFormat'),
                minDate: 0,
                numberOfMonths: NUMBER_OF_MONTHS,
                beforeShow: _beforeShow,
                beforeShowDay: _beforeShowDay,
                onSelect: _onSelect
            });
        }

        var _calendarListenersTimeout;
        function _addCalendarListeners() {
            clearTimeout(_calendarListenersTimeout);
            if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible')) {
                $('.ui-datepicker-prev:not(.ui-state-disabled), .ui-datepicker-next:not(.ui-state-disabled)').click(function() {
                    _beforeShow();
                });
                $('.clear-dates button, button.clear-dates').on('click', function() {
                    parent.clear();
                });
                $('.ui-state-default').on('click', function() {
                    $('.ui-state-default').parent().removeClass('calendar-error');
                    var $element = $(this),
                        year = $element.parent().data('year'),
                        month = $element.parent().data('month'),
                        day = $element.text(),
                        selectionDate = new Date();
                    selectionDate.setFullYear(year, month, day);
                    if (!_isValidSelection(selectionDate, this)) {
                        event.preventDefault();
                        event.stopPropagation();
                        $(this).parent().addClass('calendar-error');
                    }
                });
                if (window.innerWidth >= 769) {
                    $('#ui-datepicker-div tbody td')
                        .on('mouseenter', function _beforeShowMouseenter() {
                            if ($(this).hasClass('ui-datepicker-other-month')) return;
                            var checkInDate = $checkInDateInput.datepicker('getDate'),
                                checkOutDate = $checkOutDateInput.datepicker('getDate');
                            if (checkInDate && !checkOutDate) {
                                var elementIndex = $('#ui-datepicker-div tbody td').index(this),
                                    $checkInDateCell = $('#ui-datepicker-div tbody td.check-in-date'),
                                    startingIndex = $checkInDateCell.length ? $('#ui-datepicker-div tbody td').index($checkInDateCell) : 0;
                                $('#ui-datepicker-div tbody td').each(function(index, element) {
                                    if (index < startingIndex || $(element).hasClass('check-in-date')) return true;
                                    if (index >= elementIndex) return false;
                                    $(element).addClass('hover-in-between');
                                });
                            }
                        })
                        .on('mouseleave', function _beforeShowMouseleave() {
                            $('#ui-datepicker-div tbody td').removeClass('hover-in-between');
                        });
                }
            } else {
                _calendarListenersTimeout = setTimeout(_addCalendarListeners, 10);
            }
        }

        function _beforeShow() {
            if (window.innerWidth < 769 && !$.contains('.filter-option-check-out', '#ui-datepicker-div')) {
                var detachedDatepicker = $('#ui-datepicker-div').detach();
                detachedDatepicker.appendTo('.filter-option-check-out');
            }
            _addCalendarListeners();
        }

        function _beforeShowDay(date) {
            var todayDate = new Date();
            if (date < todayDate) return [false, "", null];
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                isSelectable = true,
                cssClassName = '';
            if (checkInDate && date.getTime() === checkInDate.getTime()) cssClassName += ' check-in-date';
            if (checkOutDate && date.getTime() === checkOutDate.getTime()) cssClassName += ' check-out-date';
            if (checkInDate && checkOutDate && date < checkOutDate && date > checkInDate) cssClassName += ' in-between';
            return [isSelectable, cssClassName.trim(), null];
        }

        function _isValidSelection(selectionDate, element) {
            parent.hideCalendarError();
            var todayDate = new Date(),
                checkInDate = $checkInDateInput.datepicker('getDate'),
                isValid;
            if (selectionDate <= todayDate) {
                parent.showCalendarError('Sorry, the date you selected is not available.');
                isValid = false;
            } else if (selectionDate <= checkInDate) {
                parent.showCalendarError('Sorry, select a date after your check in date.');
                isValid = false;
            } else {
                isValid = true;
            }
            return isValid;
        }

        function _onSelect() {
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                formatedEndDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkOutDate).toUpperCase(),
                formatedEndDateOverlay = $.datepicker.formatDate(NRES_OVERLAY_DATE_FORMAT, checkOutDate).toUpperCase();
            $checkOutOverlay.text(formatedEndDateOverlay);
            Cookies.set('nret[end_date]', formatedEndDate);
            $checkOutDateInput.datepicker('option', 'defaultDate', checkInDate);
            if (checkInDate && checkOutDate) {
                var timeDifference = Math.abs(checkOutDate.getTime() - checkInDate.getTime()),
                    nights = Math.round(timeDifference / 86400000);
                Cookies.set('nret[nights]', nights);
            }
            $checkOutSubLabel.addClass('show');
        }

        function clear() {
            $checkInDateInput.blur();
            $checkOutDateInput
                .datepicker('setDate', null)
                .datepicker('hide')
                .blur();
            $checkOutOverlay.text('Select Date');
        }

        function refresh() {
            $checkOutDateInput.datepicker('refresh');
            _beforeShow();
        }
    };

    nret.destinationDetail = {
        setCookiesAmenities: function () {
            $('input[data-more-filter-amenities]:checked').each(function (i, el) {
                Cookies.set('retreat_list[amenities][' + i + ']', $(el).attr('data-more-filter-amenities'));
            });
            $('input[data-more-filter-amenities]').not(':checked').each(function (i, el) {
                var amenity = $(this).attr('data-more-filter-amenities');
                $.each(document.cookie.split(/; */), function () {
                    var splitCookie = this.split('=');
                    if (splitCookie[1] == amenity) {
                        var cookieToDelete = decodeURIComponent(splitCookie[0]);
                        Cookies.remove(cookieToDelete);
                    }
                });
            });
        },
        setCookiesArea: function () {
            $('input[data-more-filter-area]:checked').each(function (i, el) {
                Cookies.set('retreat_list[subarea][' + i + ']', $(el).attr('data-more-filter-area'));
            });
            $('input[data-more-filter-area]').not(':checked').each(function (i, el) {
                var areaLocation = $(this).attr('data-more-filter-area');
                $.each(document.cookie.split(/; */), function () {
                    var splitCookie = this.split('=');
                    if (splitCookie[0].indexOf('subarea') !== -1 && splitCookie[1] == areaLocation) {
                        var cookieToDelete = decodeURIComponent(splitCookie[0]);
                        Cookies.remove(cookieToDelete);
                    }
                });
            });
        },
        setCookiesBathroom: function() {
            $('[name="filter-bathroom-choice"]').each(function(){
                if ($(this).is(':checked')) {
                    var val = $(this).val();
                    Cookies.set('retreat_list[bathrooms]', val);
                }
            });
        },

        setCookiesGuest : function () {
            $('[name="filter-guest-choice"]').each(function(){
                if ($(this).is(':checked')) {
                    var val = $(this).val();
                    Cookies.set('nret[guests]', val);
                }
            });
        },
        setCookiesBed: function() {
            $('[name="filter-bed-choice"]').each(function(){
                if ($(this).is(':checked')) {
                    var val = $(this).val();
                    Cookies.set('retreat_list[beds]', val);
                }
            });
        },

        setCookiesBedrooms : function () {
            $('a[data-more-filter-bedrooms]').on('click', function() {
                var bedrooms = $(this).attr('data-more-filter-bedrooms'),
                    str = ' Bedrooms';
                if($(this).html() === "1") {
                    str = ' Bedroom'
                }
                $('.bedroom-label').html($(this).html() + str);
                Cookies.set('retreat_list[bedrooms]', bedrooms);
            });
        },
        refreshPage: function() {
            $('#destinationFilterRefresh, #destinationMoreFilterRefresh').on('click', function(){
                nret.destinationDetail.setCookiesGuest();
                nret.destinationDetail.setCookiesBed();
                nret.destinationDetail.setCookiesBathroom();
                nret.destinationDetail.setCookiesArea();
                nret.destinationDetail.setCookiesAmenities();

                history.pushState('', document.title, window.location.pathname);
                window.location.href = window.location.href+"#filtered";
                window.location.reload();
            });
        },
        clearFilters: function() {
            $('#destinationFilterClear, .destinationFilterClear').on('click', function(){
                nret.destinationDetail.clearTheFilters();
            });
        },
        clearTheFilters: function(e) {
            if (e) e.preventDefault();
            Cookies.remove('nret[start_date]');
            Cookies.remove('nret[end_date]');
            Cookies.remove('nret[nights]');
            Cookies.remove('nret[guests]');
            Cookies.remove('retreat_list[bedrooms]');
            Cookies.remove('retreat_list[beds]');
            Cookies.remove('retreat_list[bathrooms]');
            $('input[data-more-filter-amenities]').each(function(i,el) {
                Cookies.remove('retreat_list[amenities][' + i + ']');
            });
            $('input[data-more-filter-area]').each(function(i,el) {
                Cookies.remove('retreat_list[subarea][' + i + ']');
            });
            window.location.reload();
        },
        listen: function() {
            $('.filter-choice-one').on('click', function() {
                var el = $(this);
                $(this).toggleClass('filter-selected');
                if( $(this).parents('ul').hasClass('single-choice-list') ) {
                    $(this).parents('ul').find('.filter-selected').not(el).removeClass('filter-selected');
                }
            });

            $('#moreFiltersWrapper .filter-choice-one').on('click', nret.destinationDetail.updateMoreFiltersCount);
            $('#moreFiltersWrapper input').on('change', nret.destinationDetail.updateMoreFiltersCount);
            $('.retreat-listing__list-bg .empty .reset').on('click', nret.destinationDetail.clearTheFilters);
        },
        updateMoreFiltersCount: function() {
            var count = $('#moreFiltersWrapper input:checked').length;
            if(count > 0) {
                $('#more-label').html('More Filters (' + count + ')');
            } else {
                $('#more-label').html('More Filters');
            }
        },
        deleteForeignCookies: function() {
            $.each(document.cookie.split(/; */), function()  {
                var splitCookie = this.split('=');
                // name is splitCookie[0], value is splitCookie[1]
                var foreignPrefixes = [
                    'destination',
                    'journal_list'
                ];

                foreignPrefixes.forEach(function(prefix) {
                    if(splitCookie[0].indexOf(prefix) !== -1) {
                        Cookies.remove(decodeURIComponent(splitCookie[0]));
                    }
                });
            });
        },

        readBedroomsCookie: function() {
            var $label = $('#bedroom-label');
            var bedroomsCookie = Cookies.get('retreat_list[bedrooms]');
            var bedroomCount;

            if(bedroomsCookie) {
                bedroomCount = parseInt(bedroomsCookie);
                if(bedroomCount === 1) {
                    $label.html('1 bedroom');
                } else {
                    $label.html( bedroomCount + ' bedrooms');
                }
            }
        },

        readGuestsCookie: function() {
            var guestCookie =  Cookies.get('nret[guests]');
            if(guestCookie) {
                $('[data-more-filter-guest=' + guestCookie + ']').prop('checked',true);
            }
        },
        readBedsCookie: function() {
            var bedsCookie = Cookies.get('retreat_list[beds]');
            if(bedsCookie) {
                $('[data-more-filter-bed=' + bedsCookie + ']').prop('checked',true);
            }
        },
        readBathroomsCookie: function() {
            var bathroomsCookie = Cookies.get('retreat_list[bathrooms]');
            if(bathroomsCookie) {
                $('[data-more-filter-bathroom=' + bathroomsCookie + ']').prop('checked',true);
            }
        },
        readAmenityCookies: function() {
            var $amenities = $('[data-more-filter-amenities]');
            $amenities.each(function(i) {
                var amenityCookie = Cookies.get('retreat_list[amenities][' + i + ']');
                if(amenityCookie) {
                    $('[data-more-filter-amenities=' + amenityCookie + ']').prop('checked',true);
                }
            });
        },
        readAreaCookies: function() {
            var $areas = $('[data-more-filter-area]');
            $areas.each(function(i) {
                var areaCookie = Cookies.get('retreat_list[subarea][' + i + ']');
                if(areaCookie) {
                    $('[data-more-filter-area=' + areaCookie + ']').prop('checked', true);
                }
            });
        },
        scrollToListing: function() {
            if(window.location.hash === "#listing" || window.location.hash === "#filtered") {
                // Scroll to Target
                $(window).on('load', function(){
                    $('.retreat-listing__list').velocity("scroll", {
                        duration: 600,
                        offset: -180,
                        easing: "ease-in-out"
                    });
                });
            }
        },
        showMoreRetreatsEvent : function() {
            var viewMore = $('.retreat-listing__block-small.retreat-listing__show-next');
            var viewAll = $('.retreat-listing__block-small.retreat-listing__show-all');
            $('#showMoreRetreats').on('click', function() {
                if ( $(this).hasClass('retreat-listing__view-more') ) {
                    if ($(this).hasClass('retreat-listing__view-last')) {
                        $(this).remove();
                        viewMore.removeClass('retreat-listing__show-next reveal-block');
                        nret.helpers.revealHidden();

                    } else {
                        $(this).removeClass('retreat-listing__view-more').addClass('retreat-listing__view-all').text('View All');
                        viewMore.removeClass('retreat-listing__show-next reveal-block');
                        nret.helpers.revealHidden();

                    }
                } else if( $(this).hasClass('retreat-listing__view-all') ) {
                    viewAll.removeClass('retreat-listing__show-all reveal-block');
                    nret.helpers.revealHidden();
                    $(this).remove();
                }
            });
        },
        readCookies: function() {
            nret.destinationDetail.readGuestsCookie();
            nret.destinationDetail.readBedroomsCookie();
            nret.destinationDetail.readBedsCookie();
            nret.destinationDetail.readBathroomsCookie();
            nret.destinationDetail.readAmenityCookies();
            nret.destinationDetail.readAreaCookies();
            nret.destinationDetail.updateMoreFiltersCount();
        },
        checkScroll: function(){
            var scrollTop = $('section[data-scrolltop]'),
                retreatBlock = $('.retreat-listing__block-small'),
                topOffset = $('.filter-block__wrapper').offset().top;

            if(!scrollTop.length){
                return;
            }

            scrollTop = scrollTop.data('scrolltop');
            //set offset to retreat if any retreats exist after filtering
            if(retreatBlock.length){
                topOffset = $(retreatBlock[scrollTop]).offset().top;
            }

            var scrollto = topOffset - ( $('.subnav-container').height() + $('.global-nav').height() );
            $('body,html').animate({scrollTop:scrollto},2200);
        },
        addStringToReviewCount: function() {
            if ( $('.bv-rating-label').length > 0 ) {
                $('.bv-rating-label').each(function() {
                    var reviewCount = $(this).text();
                    $(this).text(reviewCount + " Reviews");
                });
            }
        },
        emptyCheck: function() {
            if($('.retreat-listing__list .wrapper .retreat-listing__block-small').length) {
                $('.retreat-listing__list .retreat-listing__list-bg').attr('style','');
                $('.retreat-listing__list .retreat-listing__list-bg .empty').hide();
            } else {
                $('.retreat-listing__list .retreat-listing__list-bg').show();
                $('.retreat-listing__list .retreat-listing__list-bg .empty').show();
            }
        },
        removeDuplicateMblMenu : function () {
            $('body').children('#mbl-search').remove();
        },

        showCalendarsInFilterBlock : function( ) {
            $('.filter-option-check-in').on('click', function() {
                $('.filter__cal-wrapper-out').removeClass('show');
                $('.filter__cal-wrapper-in').addClass('show');
            });
            $('.filter-option-check-out').on('click', function() {
                $('.filter__cal-wrapper-in').removeClass('show');
                $('.filter__cal-wrapper-out').addClass('show');
            });
        },

        addNoMapClass : function () {
            if ($('.content-grid__offer-row').length === 0) {
                $('.content-listing__map').addClass('no-map');
            }
        },

        init: function() {
            $("div.lazy").lazyload({
                effect: "fadeIn"
            });

            nret.destinationDetail.deleteForeignCookies();
            nret.destinationDetail.readCookies();
            nret.destinationDetail.listen();
            nret.destinationDetail.refreshPage();
            nret.destinationDetail.showCalendarsInFilterBlock();
            nret.destinationDetail.clearFilters();
            nret.destinationDetail.setCookiesBedrooms();
            nret.destinationDetail.checkScroll();
            nret.destinationDetail.showMoreRetreatsEvent();
            nret.destinationDetail.removeDuplicateMblMenu();
            nret.destinationDetail.addNoMapClass();

            // wait till reviews load
            window.setTimeout(nret.destinationDetail.addStringToReviewCount, 3000);
            nret.destinationDetail.scrollToListing();
            nret.destinationDetail.emptyCheck();

            new NaturalRetreatsFilter();
        }
    };
}(jQuery, Cookies));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 29*/
var nret = nret || {};
(function($, Cookies) {
    nret.destinationListing = {
        setResultsNum: function() {
            var length = $('.destination-listing__block').not('.hide').length;
            $('#filterResultsCount').text(length);
        },
        clearListener: function() {
            $('.filter__clear').on('click', function() {
                $('.filter-selected').removeClass('filter-selected');
                nret.filters.filterElements();
                nret.destinationListing.setResultsNum();
                nret.destinationListing.els.guestLabel.html('No. of Guests');
                $('.region-list .filter-choice-init').each(function(i,el) {
                    Cookies.remove('destination[region][' + i + ']');
                });
                Cookies.remove('nret[guests]');
                nret.destinationListing.els.regionLabel.html('Region');
            });
        },
        regionListener: function() {
            $('.region-list .filter-choice-init').on('click', function() {
                var $item = $(this),
                    $list = $item.parent().parent(),
                    selectedCount;

                $item.toggleClass('filter-selected');
                selectedCount = $list.find('.filter-selected').length;
                if(selectedCount > 1) {
                    nret.destinationListing.els.regionLabel.html('Region (' + selectedCount + ')');
                } else {
                    nret.destinationListing.els.regionLabel.html('Region');
                }
                $('.region-list .filter-choice-init').each(function(i,el) {
                    Cookies.remove('destination[region][' + i + ']');
                });
                $('.region-list .filter-choice-init.filter-selected').each(function(i,el) {
                    Cookies.set('destination[region][' + i + ']', $(el).attr('data-filter-choice'));
                });
            });
        },
        guestListener: function() {
            $('.guest-list .filter-choice-init').on('click', function() {
                var $item = $(this);
                var guests = $item.attr('data-filter-choice').replace('sleeps-','');
                nret.destinationListing.els.guestLabel.html($item.html());
                $item.toggleClass('filter-selected');
                $('.guest-list').find('.filter-selected').not($item).removeClass('filter-selected');
                Cookies.set('nret[guests]', guests);
            });
        },
        deleteForeignCookies: function() {
            $.each(document.cookie.split(/; */), function()  {
                var splitCookie = this.split('=');
                // name is splitCookie[0], value is splitCookie[1]
                var foreignPrefixes = [
                    'retreat_list',
                    'journal_list'
                ];
                foreignPrefixes.forEach(function(prefix) {
                    if (splitCookie[0].indexOf(prefix) !== -1) {
                        Cookies.remove(decodeURIComponent(splitCookie[0]));
                    }
                });
            });
        },
        readRegionCookies: function() {
            var $regions = $('.region-list .filter-choice-init'),
                selectedCount;
            $regions.each(function(i) {
                var regionCookie = Cookies.get('destination[region][' + i + ']');
                if (regionCookie) {
                    $('.region-list .filter-choice-init[data-filter-choice=' + regionCookie + ']').addClass('filter-selected');
                }
            });
            selectedCount = $('.region-list .filter-choice-init.filter-selected').length;
            if (selectedCount > 1) {
                nret.destinationListing.els.regionLabel.html('Region (' + selectedCount + ')');
            } else {
                nret.destinationListing.els.regionLabel.html('Region');
            }
        },
        readGuestsCookie: function() {
            var guestsCookie = Cookies.get('nret[guests]'),
                guestCount;
            if (guestsCookie) {
                $('.guest-list .filter-choice-init[data-filter-choice=sleeps-' + guestsCookie + ']').addClass('filter-selected');
                guestCount = parseInt(guestsCookie);
                if (guestCount === 1) {
                    nret.destinationListing.els.guestLabel.html('1 guest');
                } else {
                    nret.destinationListing.els.guestLabel.html( guestCount + ' guests');
                }
            }
        },

        toggleListMap : function () {
            $('.destination-listing__toggle-btn').on('click', function() {
                if ( $(this).attr('id') === 'destinationListingListToggle' ) {
                    nret.destinationListing.toggleShowList();
                } else if ( $(this).attr('id') === 'destinationListingMapToggle' ) {
                    nret.destinationListing.toggleShowMap();
                }
            });
        },

        toggleShowMap : function () {
            $('#destinationListingListToggle').removeClass('btn__blue').addClass('btn__transparent');
            $('#destinationListingMapToggle').removeClass('btn__transparent').addClass('btn__blue');
            $('.destination-listing__row').velocity({opacity:0},{display:'none'});
            $('.destination-listing__map').velocity('transition.slideUpIn');
        },

        toggleShowList : function () {
            $('#destinationListingMapToggle').removeClass('btn__blue').addClass('btn__transparent');
            $('#destinationListingListToggle').removeClass('btn__transparent').addClass('btn__blue');
            $('.destination-listing__map').velocity({opacity:0},{display:'none'},{duration:'100'});
            $('.destination-listing__row').delay(200).velocity('transition.slideUpIn');
        },

        closeMapCard : function() {
            $('.map-card__close').on('click', function() {
                $(this).parents('.map-card__container').removeClass('show');
            });
        },

        init: function() {
            nret.destinationListing.els = {
                guestLabel : $('#guests-label'),
                regionLabel : $('#region-label')
            }
            nret.destinationListing.deleteForeignCookies();
            nret.destinationListing.readRegionCookies();
            nret.destinationListing.readGuestsCookie();
            nret.destinationListing.setResultsNum();
            nret.destinationListing.clearListener();
            nret.destinationListing.regionListener();
            nret.destinationListing.guestListener();
            nret.destinationListing.toggleListMap();
            nret.destinationListing.closeMapCard();
        }
    };
}(jQuery, Cookies));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File: 30*/
var nret = nret || {};
(function($, Cookies) {
    var HOME_SEARCH_DATE_FORMAT = 'M dd',
        NRES_API_DATE_FORMAT_REQUEST = 'dd-M-yy',
        NUMBER_OF_MONTHS = window.innerWidth < 769 ? 1 : 2,
        $checkInDateInput,
        $checkOutDateInput;
    if ( $('#home').length > 0 || $('#retreat-search').length > 0 ) {
        $checkInDateInput = $('#bookingCheckIn');
        $checkOutDateInput = $('#bookingCheckOut');
        $('.destination-check-in-nav').prop('disabled', true);
    } else {
        $checkInDateInput = $('#bookingCheckInNav');
        $checkOutDateInput = $('#bookingCheckOutNav');
    }

    var NaturalRetreatsFilter = function() {
        var self = this;

        self.checkInDatepicker = undefined;
        self.checkOutDatepicker = undefined;

        self.clear = clear;
        self.clearCheckInDatepicker = clearCheckInDatepicker;
        self.clearCheckOutDatepicker = clearCheckOutDatepicker;

        initialize();

        function initialize() {
            self.checkInDatepicker = new CheckInDatepicker(self);
            self.checkOutDatepicker = new CheckOutDatepicker(self);

            var startDateCookie = Cookies.get('nret[start_date]'),
                endDateCookie = Cookies.get('nret[end_date]');
            if (startDateCookie && endDateCookie) {
                var splitStartDate = startDateCookie.toLowerCase().split('-'),
                    splitEndDate = endDateCookie.toLowerCase().split('-'),
                    months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                    startDateMonth = months.indexOf(splitStartDate[1]),
                    endDateMonth = months.indexOf(splitEndDate[1]),
                    startDate = new Date(splitStartDate[2], startDateMonth, splitStartDate[0]),
                    endDate = new Date(splitEndDate[2], endDateMonth, splitEndDate[0]);
                $checkInDateInput.datepicker('setDate', startDate);
                if ($checkOutDateInput.is(':disabled')) $checkOutDateInput.prop('disabled', false);
                var checkInDate = $checkInDateInput.datepicker('getDate');
                $checkOutDateInput.datepicker('option', 'defaultDate', checkInDate);
                $checkOutDateInput.datepicker('setDate', endDate);
            }
        }

        function clear() {
            clearCheckInDatepicker();
            clearCheckOutDatepicker();
        }

        function clearCheckInDatepicker() {
            self.checkInDatepicker.clear();
            Cookies.remove('nret[start_date]');
        }

        function clearCheckOutDatepicker() {
            self.checkOutDatepicker.clear();
            Cookies.remove('nret[end_date]');
        }
    };

    var CheckInDatepicker = function(parent) {
        var self = this;

        self.clear = clear;
        self.refresh = refresh;

        initialize();

        function initialize() {
            $checkInDateInput.datepicker({
                dateFormat: $checkInDateInput.data('dateFormat'),
                minDate: 0,
                numberOfMonths: NUMBER_OF_MONTHS,
                beforeShow: _beforeShow,
                beforeShowDay: _beforeShowDay,
                onSelect: _onSelect
            });
        }

        var _calendarListenersTimeout;
        function _addCalendarListeners() {
            clearTimeout(_calendarListenersTimeout);
            if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible')) {
                $('.ui-datepicker-prev:not(.ui-state-disabled), .ui-datepicker-next:not(.ui-state-disabled)').click(function() {
                    _beforeShow();
                });
                $('.clear-dates button, button.clear-dates').on('click', function() {
                    parent.clear();
                });
            } else {
                _calendarListenersTimeout = setTimeout(_addCalendarListeners, 10);
            }
        }

        function _beforeShow() {
            if (!$.contains('.home__search__check-in-wrapper', '#ui-datepicker-div')) {
                var detachedDatepicker = $('#ui-datepicker-div').detach();
                detachedDatepicker.appendTo('.home__search__check-in-wrapper');
            }
            _addCalendarListeners();
        }

        function _beforeShowDay(date) {
            var todayDate = new Date();
            if (date <= todayDate) return [false, "", null];
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                isSelectable = true,
                cssClassName = '';
            if (checkInDate && date.getTime() === checkInDate.getTime()) cssClassName += ' check-in-date';
            if (checkOutDate && date.getTime() === checkOutDate.getTime()) cssClassName += ' check-out-date';
            if (checkInDate && checkOutDate && date < checkOutDate && date > checkInDate) cssClassName += ' in-between';
            return [isSelectable, cssClassName.trim(), null];
        }

        function _onSelect() {
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                formatedDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkInDate).toUpperCase(),
                formatedDateLabel = $.datepicker.formatDate(HOME_SEARCH_DATE_FORMAT, checkInDate).toUpperCase();
            nret.home.els.checkInLabel.text(formatedDateLabel.toLowerCase());
            nret.home.els.checkInSubLabel.addClass('show');
            Cookies.set('nret[start_date]', formatedDate);
            if ($checkOutDateInput.is(':disabled')) $checkOutDateInput.prop('disabled', false);
            $checkOutDateInput.datepicker('setDate', checkInDate);
            if (nret.header.els.retreatSearch.hasClass('show')) {
                $('.initHomeDropdown.check-out').eq(0).trigger('click');
            } else {
                $('.initHomeDropdown.check-out').eq(1).trigger('click');
            }
            // If on retreat search page
            if ($('#retreat-search').length) {
                $('.checkout-label').trigger('click');
            }

            setTimeout(function() {
                $checkOutDateInput.datepicker('show');
            }, 250);

            // parent.clearCheckOutDatepicker();
            nret.home.closeCheckInOpenCheckOut();
        }

        function clear() {
            $checkInDateInput
                .datepicker('setDate', null)
                .datepicker('hide')
                .blur();
            $checkOutDateInput
                .prop('disabled', true)
                .blur();
            nret.home.els.checkInLabel.text('Check In');
        }

        function refresh() {
            $checkInDateInput.datepicker('refresh');
            _beforeShow();
        }
    };

    var CheckOutDatepicker = function(parent) {
        var self = this;

        self.clear = clear;
        self.refresh = refresh;

        initialize();

        function initialize() {
            $checkOutDateInput.datepicker({
                dateFormat: $checkOutDateInput.data('dateFormat'),
                minDate: 0,
                numberOfMonths: NUMBER_OF_MONTHS,
                beforeShow: _beforeShow,
                beforeShowDay: _beforeShowDay,
                onSelect: _onSelect
            });
        }

        var _calendarListenersTimeout;
        function _addCalendarListeners() {
            clearTimeout(_calendarListenersTimeout);
            if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible')) {
                $('.ui-datepicker-prev:not(.ui-state-disabled), .ui-datepicker-next:not(.ui-state-disabled)').click(function() {
                    _beforeShow();
                });
                $('.clear-dates button, button.clear-dates').on('click', function() {
                    parent.clear();
                });
                if (window.innerWidth >= 769) {
                    $('#ui-datepicker-div tbody td')
                        .on('mouseenter', function _beforeShowMouseenter() {
                            if ($(this).hasClass('ui-datepicker-other-month')) return;
                            var checkInDate = $checkInDateInput.datepicker('getDate'),
                                checkOutDate = $checkOutDateInput.datepicker('getDate');
                            if (checkInDate && !checkOutDate) {
                                var elementIndex = $('#ui-datepicker-div tbody td').index(this),
                                    $checkInDateCell = $('#ui-datepicker-div tbody td.check-in-date'),
                                    startingIndex = $checkInDateCell.length ? $('#ui-datepicker-div tbody td').index($checkInDateCell) : 0;
                                $('#ui-datepicker-div tbody td').each(function(index, element) {
                                    if (index < startingIndex || $(element).hasClass('check-in-date')) return true;
                                    if (index >= elementIndex) return false;
                                    $(element).addClass('hover-in-between');
                                });
                            }
                        })
                        .on('mouseleave', function _beforeShowMouseleave() {
                            $('#ui-datepicker-div tbody td').removeClass('hover-in-between');
                        });
                }
            } else {
                _calendarListenersTimeout = setTimeout(_addCalendarListeners, 10);
            }
        }

        function _beforeShow(date) {
            if (!$.contains('.home__search__check-out-wrapper', '#ui-datepicker-div')) {
                var detachedDatepicker = $('#ui-datepicker-div').detach();
                detachedDatepicker.appendTo('.home__search__check-out-wrapper');
            }
            _addCalendarListeners();
        }

        function _beforeShowDay(date) {
            var todayDate = new Date();
            if (date < todayDate) return [false, "", null];
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                isSelectable = true,
                cssClassName = '';
            if (checkInDate && date.getTime() === checkInDate.getTime()) cssClassName += ' check-in-date';
            if (checkOutDate && date.getTime() === checkOutDate.getTime()) cssClassName += ' check-out-date';
            if (checkInDate && checkOutDate && date < checkOutDate && date > checkInDate) cssClassName += ' in-between';
            return [isSelectable, cssClassName.trim(), null];
        }

        function _onSelect() {
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                formatedEndDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkOutDate).toUpperCase(),
                formatedEndDateLabel = $.datepicker.formatDate(HOME_SEARCH_DATE_FORMAT, checkOutDate).toUpperCase();
            nret.home.els.checkOutLabel.text(formatedEndDateLabel.toLowerCase());
            nret.home.els.checkOutSubLabel.addClass('show');
            Cookies.set('nret[end_date]', formatedEndDate);
            $checkOutDateInput.datepicker('option', 'defaultDate', checkInDate);
            if (checkInDate && checkOutDate) {
                var timeDifference = Math.abs(checkOutDate.getTime() - checkInDate.getTime()),
                    nights = Math.round(timeDifference / 86400000);
                Cookies.set('nret[nights]', nights);
            }
            $('.home__search__check-out-wrapper').removeClass('show-now show open');
        }

        function clear() {
            $checkInDateInput.blur();
            $checkOutDateInput
                .datepicker('setDate', null)
                .datepicker('hide')
                .blur();
            nret.home.els.checkOutLabel.text('Check Out');
        }

        function refresh() {
            $checkOutDateInput.datepicker('refresh');
            _beforeShow();
        }
    };

    nret.home = {
        addBodyClass: function() {
            if ( $('#home').length > 0 ) {
                $('body').addClass('home-page');
            }
        },
        closeNavBanner: function() {
            // fade out and remove element
            $('.global-nav__banner').velocity({
                opacity:0
            },500, function() { $(this).remove(); });

            $('.global-nav').velocity({
                top:0
            }, 200);

            $('.explorer__help-modal').velocity({
                top:120
            },{delay:200, duration:180});
        },
        closeNavBannerEvent: function () {
            $('#navBannerClose').on('click', function() {
                nret.home.closeNavBanner();
            });

            window.setTimeout(nret.home.closeNavBanner , 10000);
        },
        openExploreChoiceList: function(el) {
            var list = el.find('.home__choices__list-wrapper');
            if (el.hasClass('open')) {
                list.velocity(
                    {opacity:1 }, {display:'block'}
                )
            }
        },
        closeExplorerChoiceList: function() {
            $('.home__choices__list-wrapper').velocity(
                {opacity: 0},
                {display: 'none'}
            )
        },
        openExploreChoiceListEvent: function() {
            $('.dropdown').find('.inner').on('click', function() {
                var el = $(this);
                if (el.hasClass('open')) {
                    el.removeClass('open');
                } else {
                    $('.dropdown').find('.inner').not(el).removeClass('open');
                    el.addClass('open');
                }
                nret.home.closeExplorerChoiceList();
                nret.home.openExploreChoiceList(el);
            });
        },
        initHomeSearchByDateEvent: function() {
            $('#dateSearch').on('click', function() {
                $(this).addClass('active');
                $('#exploreSearch').removeClass('active');
                nret.home.openHomeSearchByDate();
            });
        },
        initHomeExploreEvent: function() {
            $('#exploreSearch').on('click', function() {
                window.location.href = '/destination';
                $(this).addClass('active');
                $('#dateSearch').removeClass('active');
            });
        },
        openHomeSearchByDate: function() {
            nret.home.els.homeSearchDropdownTitle.addClass('show');
            nret.home.els.choicesSearchDropdownWrapper.addClass('show');
            $('.choices-explore, .home__choices__list-wrapper').removeClass('show');
        },
        openHomeExplore: function() {
            nret.home.els.homeSearchDropdownTitle.removeClass('show');
            nret.home.els.choicesSearchDropdownWrapper.removeClass('show');
            $('.choices-explore').addClass('show');
            $('.home__search__dropdown').removeClass('show');
        },
        openSearchByDateDropdown: function() {
            var $title = $('.initHomeDropdown');
            $title.on('click', function() {
                var $activeTitle = $(this).find('.home__search__choice');
                if ($title.attr('data-home-search')) {
                    var val = $(this).attr('data-home-search');
                    var el = $(this).parents('.home__retreat-search').find('.home__search__dropdown[data-home-search="'+ val +'"]');
                    el.toggleClass('show open');
                    $('.home__search__dropdown').not(el).removeClass('show open');
                }
                $('.home__search__choice').not($activeTitle).removeClass('active')
                $activeTitle.addClass('active');
            });
        },
        changeStartBtnColorOnSelection: function() {
            var textToCompare = $('.home__search__choice');
            if (textToCompare.eq(0).text() !== 'Destination' && textToCompare.eq(1).text() !== 'Check-In' && textToCompare.eq(2).text() !== 'Check-Out' && textToCompare.eq(3).text() !== 'Guests') {
                $('#initHomeSearch').addClass('btn__blue').removeClass('btn__transparent');
            }
        },
        closeCheckInOpenCheckOut: function() {
            if ($('body').hasClass('home-page')) {
                $('.home__search__check-in-wrapper').removeClass('show');
                $('.home__search__check-out-wrapper').addClass('show-now open');
            }
            if ($('.filter__filter-option__calendar').length) {
                $('.filter-option__calendar-check-in').removeClass('show');
                $('.filter-option__calendar-check-out').addClass('show');
                $('.filter__options-wrapper__filter-option.filter-option-check-in').removeClass('open');
                $('.filter__options-wrapper__filter-option.filter-option-check-out').addClass('open');
            }
        },
        selectLocationValueEvent: function() {
            $('.home__search__dropdown-location-block').find('a').on('click', function() {
                var $this = $(this);
                nret.home.selectLocationValue($this);
            });
        },
        selectLocationValue: function($this) {
            var val = $this.text();
            nret.home.els.homeSearchDropdownTitle.find('.title[data-home-search="location"]').html(val + '<span class="icon icon_carrot-down"></span>');
        },
        saveDataFromClicksOnHomeSearch: function() {
            $('a[data-home-bedrooms]').on('click', function(event) {
                var bedrooms = $(this).attr('data-home-bedrooms');
                var bedroomString = ' Bedrooms';
                if (bedrooms === '1'){ bedroomString = ' Bedroom'; }
                $(this).addClass('filter-selected');
                $('a[data-home-bedrooms]').not($(this)).removeClass('filter-selected');
                $('.bedrooms.home__search__choice').html($(this).html() + bedroomString);
                $('ul[data-home-search="bedrooms"]').removeClass('show');
                Cookies.set('retreat_list[bedrooms]', bedrooms);
                nret.home.changeStartBtnColorOnSelection();
                event.stopPropagation();
            });

            $('a[data-home-experience]').on('click', function() {
                var experience = $(this).attr('data-home-experience');
                Cookies.set('destination_experience', experience);
                nret.home.changeStartBtnColorOnSelection();
            });

            $('a[data-home-environment]').on('click', function() {
                var environment = $(this).attr('data-home-environment');
                Cookies.set('destination_environment', environment);
                nret.home.changeStartBtnColorOnSelection();
            });
        },
        initLocationTabs: function() {
            $('.region-titles .title').on('click', function() {
                var $title = $(this);
                var index = $title.index();
                $('.region-titles .current.title').removeClass('current');
                $('.destination-groups .current.group').removeClass('current');
                $title.addClass('current');
                $('.destination-groups').find('.group').eq(index).addClass('current');
            });
        },
        homepageVideoController: function() {
            if ($('.video__bg').length) {
                var video_container = $('.video__bg'),
                    video_urls = video_container.data('videourl'),
                    video_toggles = $('.video-toggle').find('p'),
                    currentVideo = 0,
                    currentVideoContainer;
                return {
                    init: function() {
                        var videoPlayer = this.createVideoContainer();
                        video_container.append(videoPlayer);
                    },
                    changeHomepageVideo: function(setVideoNumber) {
                        currentVideo =  setVideoNumber || currentVideo + 1;
                        if (currentVideo > video_urls.length - 1) {
                            currentVideo = 0;
                        }

                        var videoPlayer = this.createVideoContainer();
                        video_container.prepend(videoPlayer);

                        // video_toggles.removeClass('selected');
                        // $(video_toggles[currentVideo]).addClass('selected');
                    },
                    createVideoContainer: function() {
                        var video_player = '<video poster="" preload="auto" id="homeBgVid" muted>';
                        video_player += 	'<source class="mp4" src="'+video_urls[currentVideo]+'" type="video/mp4">';
                        video_player += '</video>';
                        video_player = $(video_player);

                        video_player.on('canplay', function() {
                            this.play();
                        });

                        video_player.on('ended', function() {
                            this.changeHomepageVideo();
                        }.bind(this));

                        if (currentVideoContainer) {
                            currentVideoContainer.animate({'opacity': 0}, 800, function() {
                                currentVideoContainer.remove();
                                currentVideoContainer = video_player;
                            });
                        } else {
                            currentVideoContainer = video_player;
                        }
                        return video_player;
                    }
                }
            }
        },
        deleteForeignCookies: function() {
            // WHAT DOES THIS FUNCTION DO AND WHY?
            $.each(document.cookie.split(/; */), function() {
                var splitCookie = this.split('=');
                // name is splitCookie[0], value is splitCookie[1]
                var foreignPrefixes = [
                    'destination',
                    'retreat_list',
                    'journal_list'
                ];
                foreignPrefixes.forEach(function(prefix) {
                    if (splitCookie[0].indexOf(prefix) !== -1) {
                        Cookies.remove(decodeURIComponent(splitCookie[0]));
                    }
                });
            });
        },
        readCookies : function () {
            var checkInCookie = Cookies.get('nret[start_date]'),
                checkInCookieLabel = moment(checkInCookie, 'DD-MMM-YYYY').format('MMM Do'),
                checkOutCookie = Cookies.get('nret[end_date]'),
                checkOutCookieLabel = moment(checkOutCookie, 'DD-MMM-YYYY').format('MMM Do'),
                destinationIdCookie = Cookies.get('nret[location_id]'),
                bedroomsCookie = Cookies.get('retreat_list[bedrooms]');

            if (checkInCookie) {
                console.log()
                nret.home.els.checkInLabel.text(checkInCookieLabel);
                nret.home.els.checkInSubLabel.addClass('show');
            }
            if (checkOutCookie) {
                nret.home.els.checkOutLabel.text(checkOutCookieLabel);
                nret.home.els.checkOutSubLabel.addClass('show');
            }
            // Reassign destinationIdCookie
            if(destinationIdCookie) {
                destinationIdCookie = destinationIdCookie.split(',');
                var destinationIdCount = destinationIdCookie.length;
                var destinationString = ' Destinations';
                if (destinationIdCookie === 1){ destinationString = ' Destination'; }
                $('.destination.home__search__choice').text(destinationIdCount + destinationString);
                $('.global-nav__destination-list').find('input').each(function() {
                    var $this = $(this);
                    $(destinationIdCookie).each(function(i, v) {
                        if ($this.attr('data-home-location') === v){
                            $this.prop('checked', true);
                        }
                    });
                });
            }

            if (bedroomsCookie) {
                var bedroomString = ' Bedrooms';
                if (bedroomsCookie === '1'){ bedroomString = ' Bedroom'; }
                if (bedroomsCookie !== '0') {
                    $('.bedrooms.home__search__choice, #bedroom-label').text(bedroomsCookie + bedroomString);
                } else {
                    $('.bedrooms.home__search__choice, #bedroom-label').text('Select Destination');
                }
            }
        },

        scrollToBookingWidget : function () {
            $('.scroll-once').on('click', 'h3', function() {
                if ($('.home__retreat-search-container').hasClass('scroll-once')) {
                    $('.scroll-to-search').velocity("scroll", {
                        duration: 600,
                        offset: -330,
                        easing: "ease-in-out"
                    });
                }
                $('.home__retreat-search-container').removeClass('scroll-once');
            });
        },

        init: function() {
            nret.home.els = {
                checkInLabel : $('.checkin-label'),
                checkInSubLabel : $('.checkin-sublabel'),
                checkOutLabel : $('.checkout-label'),
                checkOutSubLabel : $('.checkout-sublabel'),
                homeSearchDropdownTitle : $('.home__search__dropdown-title'),
                choicesSearchDropdownWrapper : $('.choices-search__dropdown-wrapper')
            }
            nret.home.initHomeSearchByDateEvent();
            nret.home.closeNavBannerEvent();
            nret.home.saveDataFromClicksOnHomeSearch();
            nret.home.addBodyClass();
            nret.home.initHomeExploreEvent();
            nret.home.selectLocationValueEvent();
            nret.home.openSearchByDateDropdown();
            nret.home.initLocationTabs();
            nret.home.readCookies();
            //nret.home.scrollToBookingWidget();

            new NaturalRetreatsFilter();

            var homepageVideoController = new this.homepageVideoController();
            if ($('.video__bg').length) {
                homepageVideoController.init();
            }
        }
    };

    jQuery(document).ready(function() {
        nret.home.init();
    });

}(jQuery, Cookies));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 31*/
var nret = nret || {};
(function($) {


    nret.journal = {

        setFeaturedArticleToTop : function() {
            var el = $('.journal-listing__featured-article').eq(0);
            $('#journalArticleContainer').prepend(el);
        },

        setJournalCookeis : function() {
            $('a[data-journal-type]').on('click', function() {
                var type = $(this).attr('data-journal-type');
                Cookies.set('journal_list[type]', type);
                $('a[data-journal-type]').removeClass('filter-selected');
                $(this).toggleClass('filter-selected');
            });

            $('a[data-journal-location]').on('click', function() {
                var location = $(this).attr('data-journal-location');
                Cookies.set('journal_list[location]', location);
                $('a[data-journal-location]').removeClass('filter-selected');
                $(this).toggleClass('filter-selected');
            });

            $('a[data-journal-environment]').on('click', function() {
                var environment = $(this).attr('data-journal-environment');
                Cookies.set('journal_list[environment]', environment);
                $('a[data-journal-environment]').removeClass('filter-selected');
                $(this).toggleClass('filter-selected');
            });

            $('a[data-journal-experience]').on('click', function() {
                var experience = $(this).attr('data-journal-experience');
                Cookies.set('journal_list[experience]', experience);
                $('a[data-journal-experience]').removeClass('filter-selected');
                $(this).toggleClass('filter-selected');
            });

        },

        removeJournalCookies : function() {
            $('.filter__clear').on('click', function() {
                Cookies.remove('journal_list[type]');
                Cookies.remove('journal_list[location]');
                Cookies.remove('journal_list[environment]');
                Cookies.remove('journal_list[experience]');
                window.location.reload();
            });
        },

        deleteForeignCookies: function() {
            $.each(document.cookie.split(/; */), function()  {
                var splitCookie = this.split('=');
                // name is splitCookie[0], value is splitCookie[1]
                var foreignPrefixes = [
                    'destination',
                    'retreat_list'
                ];

                foreignPrefixes.forEach(function(prefix) {
                    if(splitCookie[0].indexOf(prefix) !== -1) {
                        Cookies.remove(decodeURIComponent(splitCookie[0]));
                    }
                });
            });
        },

        loadMoreJournalArticles : function() {
            var page = 1,
                el,
                loading = false,
                loader = $('#journalLoader');
            $(window).scroll(function() {
                if( $(window).scrollTop() + $(window).height() > $(document).height() - 800 ) {

                    if ( loading == false ) {
                        loading = true;
                        loader.fadeIn();
                        $.ajax({
                            url: Drupal.settings.basePath + 'views/ajax',
                            type: 'post',
                            data: {
                                view_name: 'journal_list',
                                view_display_id: 'page',
                                page: page
                            },
                            dataType: 'json',
                            success: function (response) {
                                if (response[1] !== undefined) {
                                    var viewHtml = response[1].data;
                                    el = $( '<div></div>' );
                                    el.html(viewHtml);
                                    var newsBlock = $('.news-block, .journal-listing__featured-article', el); // All the journal article elements
                                    var journalContainer = $('#journalArticleContainer');
                                    loader.fadeOut();
                                    journalContainer.append(newsBlock)
                                    Drupal.attachBehaviors();
                                    page++;
                                    el = undefined;
                                    loading = false;
                                    if ( newsBlock.length < 8 ) {
                                        loading = true;
                                    }
                                }
                            }
                        });
                    }
                }
            });
        },

        init : function() {
            nret.journal.setFeaturedArticleToTop();
            nret.journal.deleteForeignCookies();
            nret.journal.setJournalCookeis();
            nret.journal.removeJournalCookies();
            nret.journal.loadMoreJournalArticles();
        }

    };


}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 32*/
var nret = nret || {};
(function($) {

    nret.offer = {

        setofferCookeis : function() {

            $('a[data-offer-type]').on('click', function() {
                var type = $(this).attr('data-offer-type');
                Cookies.set('offer_list[type]', type);
            });

            $('a[data-offer-location]').on('click', function() {
                var location = $(this).attr('data-offer-location');
                Cookies.set('offer_list[location]', location);
            });

        },

        removeofferCookies : function() {
            $('.filter__clear').on('click', function() {
                Cookies.remove('offer_list');
            });
        },

        adjustFilterTextOnLoad: function() {
            var locationText = Cookies.get('offer_list[location]');
            var typeText = Cookies.get('offer_list[type]');
            var environmentText = Cookies.get('offer_list[environment]');
            var locationText = Cookies.get('offer_list[location]');

            // WORK IN PROGRESS


        },

        init : function() {
            nret.offer.setofferCookeis();
            nret.offer.removeofferCookies();
        }

    };


    jQuery(document).ready(function() {
        if ( $('body').hasClass('page-offers') ) {
            nret.offer.init();
        }
    });

}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 32*/
var nret = nret || {};
(function($) {
    nret.page_promotion = {
        triggerClickOnSelect : function() {
            $('.select__wrapper').on('click', function() {
                $(this).find('select').trigger('click');
            });
        },

        changeDropdownValue : function() {
            var select = $('.select__wrapper').find('select');
            select.on('change', function() {
                val = $(this).val();
                $(this).parent('.select__wrapper').find('.select-text').text(val);
            });
        },

        validateFormFields : function () {
            var valid = true;
            var emailVal = $('.validate-email').val();
            var arr = [];
            if(nret.helpers.validateEmail(emailVal) === false) {
                valid = false;
                $('.validate-email').addClass('error');
            }

            $('.validate-text').each(function() {
                if ($(this).val() === '') {
                    valid = false;
                    $(this).addClass('error');
                }
            });

            $('.validate-select').each(function() {
                if ($(this).val() === null) {
                    valid = false;
                    $(this).parent().addClass('error');
                }
            });

            if( !$('#toc').is(':checked')) {
                valid = false;
                $('.toc-error').addClass('error');
            }

            if ( valid === true ) {
                $('input:checked[name="Answer2[]"]').each(function(){
                    arr.push($(this).val());
                    $(this).attr('disabled', true);
                });
                $('#answer2_array').val(arr.join(';'));
                nret.page_promotion.sendFormToNRES();
            }
        },

        sendFormToNRESEvent : function() {
            $('#airbnbCompFormSubmit').on('click', function (e) {
                nret.page_promotion.validateFormFields();
            });
        },

        sendFormToNRES : function(){
            var form = $('form#airbnbCompForm'),
                data = form.serialize();
            $.ajax({
                url: '/api/v1/newsletter',
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (response) {
                    $('.success-remove').fadeOut(function() {
                        $(this).remove();
                        $('.promo__form-wrapper').find('.container').addClass('success');
                        $('.copy__thank-you').fadeIn();
                        $('.promotion').addClass('success');
                        $('.promo__form-wrapper').addClass('success');
                        $('.legal').remove();
                    });
                }
            });
        },

        openTCModal : function() {
            $('.initToc').on('click', function() {
                nret.page_promotion.els.promotionTerms.addClass('show');
            });
        },

        closeTCModal : function() {
            nret.page_promotion.els.promotionTerms.on('click', function(e) {
                if (e.target !== this) {
                    return;
                }
                nret.page_promotion.els.promotionTerms.removeClass('show');
            });
        },

        init: function() {
            nret.page_promotion.els = {
                promotionTerms : $('.promotion__terms-service')
            }
            nret.page_promotion.sendFormToNRESEvent();
            nret.page_promotion.changeDropdownValue();
            nret.page_promotion.openTCModal();
            nret.page_promotion.closeTCModal();
        }
    };
}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 40*/
var nret = nret || {};
(function($) {
    nret.page_retreatSearch = {
        openDestinationList: function() {
            var $el = $('.global-nav__destinations__destination-list-wrapper');
            $('#destination-label').on('click', function() {
                $('.growMeMore, .growMe').not($el).removeClass('show');
                $el.toggleClass('show');
            });
        },

        viewMore: function() {
            $('.retreat-view-more').on('click', function(e){
                e.preventDefault();
                var $el = $('.retreats-search-results .retreat-listing__block-small.hide');
                for(var i = 0; i < 30; i++){
                    if($($el[i]).length > 0){
                        $($el[i]).removeClass('hide').addClass('show');
                    } else {
                        $('.retreat-view-more').fadeOut();
                    }
                }
            })
        },

        initResults: function(){
            var $el = $('.retreats-search-results .retreat-listing__block-small');
            for(var i = 0; i < 30; i++){
                if($($el[i])){
                    $($el[i]).removeClass('hide').addClass('show');
                }
            }
            if($el.length < 20){
                $('.too-many-results').hide();
            }
            if($el.length <= 30){
                $('.retreat-view-more').hide();
            }
        },

        init: function() {
            nret.page_retreatSearch.openDestinationList();
            nret.page_retreatSearch.initResults();
            nret.page_retreatSearch.viewMore();
        }
    };
}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 41*/
var nret = nret || {};
(function($) {
    nret.retreatDetail = {
        scrollToReview: function() {
            if (window.location.hash == "#reviews") {
                // Scroll to Target
                $('.product__reviews').velocity("scroll", {
                    duration: 600,
                    offset: -180,
                    easing: "ease-in-out"
                });
            }
        },
        init: function() {
            nret.retreatDetail.scrollToReview();
        }
    };
}(jQuery));