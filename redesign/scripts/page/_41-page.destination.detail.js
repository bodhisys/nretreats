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