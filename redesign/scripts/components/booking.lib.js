/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 6*/
var nret = nret || {};
(function($, Cookies) {
    var NRES_API_DATE_FORMAT_REQUEST = 'dd-M-yy',
        NRES_API_DATE_FORMAT_RESPONSE = 'dd-M-y',
        NRES_OVERLAY_DATE_FORMAT = 'M dd',
        NUMBER_OF_MONTHS = window.innerWidth < 769 ? 1 : 2,
        $checkInDateInput = $('#check-in'),
        $checkOutDateInput = $('#check-out'),
        $checkInOverlay = $('.check-in-overlay'),
        $checkInSubLabel = $('.checkin-sublabel'),
        $checkOutOverlay = $('.check-out-overlay'),
        $checkOutSubLabel = $('.checkout-sublabel'),
        $adultsInput = $('#bookingAdultCount'),
        $childrenInput = $('#bookingChildrenCount'),
        $bookingError = $('#booking-error'),
        $bookingForm = $('#bookingWidgetForm'),
        $bookingSubmit = $('#bookingWidgetForm button[type="submit"]'),
        regionId = $('#bookingRegionId').val(),
        currencySymbols = {
            '3': '&#36;',
            '2': '&#8364;',
            '1': '&#163;'
        },
        naturalRetreatsBookingConfig = {
            currencySymbol: currencySymbols[regionId],
            retreatId: $('.retreat').attr('data-retreat-id'),
            nodeId: $('.retreat').attr('data-node-id')
        };

    var NaturalRetreatsBooking = function(config) {
        var self = this;

        self.arrivalDates = [];
        self.departureDates = [];
        self.departureDatesBeyond = [];
        self.checkInDatepicker = undefined;
        self.checkOutDatepicker = undefined;

        self.clear = clear;
        self.clearCheckInDatepicker = clearCheckInDatepicker;
        self.clearCheckOutDatepicker = clearCheckOutDatepicker;
        self.hideBookingError = hideBookingError;
        self.hideCalendarError = hideCalendarError;
        self.getArrivalDates = getArrivalDates;
        self.getDepartureDates = getDepartureDates;
        self.getDepartureDatesBeyond = getDepartureDatesBeyond;
        self.showBookingError = showBookingError;
        self.showCalendarError = showCalendarError;
        self.updatePrice = updatePrice;

        initialize();

        function initialize() {
            self.checkInDatepicker = new CheckInDatepicker(self, config);
            self.checkOutDatepicker = new CheckOutDatepicker(self, config);

            var todayDate = new Date(),
                startDateCookie = Cookies.get('nret[start_date]'),
                endDateCookie = Cookies.get('nret[end_date]');
            self.getArrivalDates(todayDate, function() {
                self.checkInDatepicker.refresh();
                $checkInDateInput.prop('disabled', false);
                if (startDateCookie && endDateCookie) {
                    var splitStartDate = startDateCookie.toLowerCase().split('-'),
                        splitEndDate = endDateCookie.toLowerCase().split('-'),
                        months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
                        startDateMonth = months.indexOf(splitStartDate[1]),
                        endDateMonth = months.indexOf(splitEndDate[1]),
                        startDate = new Date(splitStartDate[2], startDateMonth, splitStartDate[0]),
                        endDate = new Date(splitEndDate[2], endDateMonth, splitEndDate[0]),
                        formatedStartDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, startDate).toUpperCase();
                    self.checkOutDatepicker.showLoader();
                    $.get('/api/v1/getoptdeparture/' + config.retreatId + '/' + formatedStartDate, function(response) {
                        self.checkOutDatepicker.hideLoader();
                        $("#initEnquiry").prop('disabled', false);

                        if (response.error) {
                            self.showBookingError('Error getting dates.');
                        } else {
                            var formatedEndDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_RESPONSE, endDate).toUpperCase(),
                                departureDate = response.data.filter(function(departureDateCompare) {
                                    return departureDateCompare.deptdate === formatedEndDate;
                                })[0];
                            if (!departureDate || departureDate.status !== 'A') {
                                self.showBookingError('Sorry, your dates are not available.');
                                $checkInDateInput.datepicker('setDate', startDate);
                                var formatedStartDateOverlay = $.datepicker.formatDate(NRES_OVERLAY_DATE_FORMAT, startDate).toUpperCase();
                                $checkInOverlay.text(formatedStartDateOverlay);
                                $checkInSubLabel.addClass('show');
                                $checkInDateInput.parent().addClass('booking-error init-error');
                                $checkOutDateInput.datepicker('setDate', endDate);
                                var formatedEndDateOverlay = $.datepicker.formatDate(NRES_OVERLAY_DATE_FORMAT, endDate).toUpperCase();
                                $checkOutOverlay.text(formatedEndDateOverlay);
                                $checkOutSubLabel.addClass('show');
                                $checkOutDateInput.parent().addClass('booking-error init-error');
                                $bookingSubmit.removeClass('booking-error');
                            } else {
                                _preloadDates(startDate, endDate);
                            }
                        }
                    });
                } else {
                    $("#initEnquiry").prop('disabled', false);
                }
            });

            var guestsNum = Cookies.get('nret[guests]');
            if (guestsNum) {
                var $element = $('a[data-value="' + guestsNum + '"][data-input-target="bookingAdultCount"]'),
                    optionValue = $element.text(),
                    inputTargetId = $element.data('inputTarget'),
                    inputTarget = $('#' + inputTargetId);
                inputTarget.val(optionValue);
            }

            _addListeners();
        }

        function _addListeners() {
            $('.filter__options-wrapper__filter-option.filter__dropdown .strike').on('click', function() {
                var $element = $(this),
                    optionValue = $element.text(),
                    inputTargetId = $(this).data('inputTarget'),
                    inputTarget = $('#' + inputTargetId);
                inputTarget.val(optionValue);
            });

            $('.launch-mobile-booking-widget').click(function() {
                $bookingForm.addClass('open');
                $('html').addClass('no-scroll-mobile');
            });

            $('.close-mobile-booking-widget').click(function() {
                $bookingForm.removeClass('open');
                $('html').removeClass('no-scroll-mobile');
            });

            $('#bookingPetsCheck').on('change', function() {
                self.updatePrice();
            });

            $bookingForm.submit(function(event) {
                if (!_isValid()) event.preventDefault();
                var checkInDate = $checkInDateInput.datepicker('getDate'),
                    formatedStartDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkInDate).toUpperCase(),
                    adultsAmount = $adultsInput.val() ? parseInt($adultsInput.val()) : 0,
                    childrenAmount = $childrenInput.val() ? parseInt($childrenInput.val()) : 0,
                    guestAmount = adultsAmount + childrenAmount;
                $('#bookingStartDate').val(formatedStartDate);
                $('#bookingGuestsCount').val(guestAmount);
                $('#bookingPetsCheck').is(':checked') ? $('#bookingPets').val('1') : $('#bookingPets').val('0');
                nret.booking.sendToBVOnSuccess(0, 0, $('#display-price-h').val(),'', $('.retreat').attr('data-retreat-id'), '');
                Cookies.set('retreat_id', $('.retreat').attr('data-retreat-id'));
                Cookies.set('region_id', $('#bookingRegionId').val());

                if ( $('.input__promo').val() === '' ) {
                    Cookies.remove('promo_code');
                };
            });

            $adultsInput.on('change', function() {
                $adultsInput.parent().removeClass('booking-error');
            });
        }

        function _isValid() {
            self.hideBookingError();
            var inputsToValidate = [
                    {
                        $element: $checkInDateInput,
                        name: 'check in date'
                    },
                    {
                        $element: $checkOutDateInput,
                        name: 'check out date'
                    },
                    {
                        $element: $adultsInput,
                        name: 'guest amount'
                    },
                ],
                containsError = false,
                errorText = 'Please select your',
                missingInputs = [];
            for (var i = 0; i < inputsToValidate.length; i++) {
                var inputIsValid = inputsToValidate[i].$element.val() !== '';
                if (inputIsValid) {
                    if(inputsToValidate[i].name === 'guest amount'){
                        inputsToValidate[i].$element.parent().removeClass('booking-error');
                    } else if (inputsToValidate[i].$element.parent().hasClass('init-error')) {
                        containsError = true;
                    }
                } else {
                    containsError = true;
                    inputsToValidate[i].$element.parent().addClass('booking-error');
                    missingInputs.push(inputsToValidate[i].name);
                }
            }
            $childrenInput.parent().removeClass('booking-error');
            if (containsError) {
                switch(missingInputs.length) {
                    case 1:
                        errorText += ' ' + missingInputs[0];
                        break;
                    case 2:
                        errorText += ' ' + missingInputs[0] + ' and ' + missingInputs[1];
                        break;
                    default:
                        for (var i = 0; i < missingInputs.length; i++) {
                            if (i === missingInputs.length - 1) {
                                errorText += ', and';
                            } else if (i !== 0) {
                                errorText += ',';
                            }
                            errorText += ' ' + missingInputs[i];
                        }
                }
                self.showBookingError(errorText);
                return false;
            } else {
                var adultsAmount = $adultsInput.val() ? parseInt($adultsInput.val()) : 0,
                    childrenAmount = $childrenInput.val() ? parseInt($childrenInput.val()) : 0,
                    guestAmount = adultsAmount + childrenAmount,
                    maxGuestAmount = parseInt($('#sleeps').val());
                if (guestAmount > maxGuestAmount) {
                    $adultsInput.parent().addClass('booking-error');
                    if ($childrenInput.val()) $childrenInput.parent().addClass('booking-error');
                    self.showBookingError('Your selection exceeds the maximum guest amount.');
                    return false;
                } else {
                    $adultsInput.parent().removeClass('booking-error');
                    $childrenInput.parent().removeClass('booking-error');
                    return true;
                }
            }
            return true;
        }

        function _preloadDates(startDate, endDate) {
            self.checkInDatepicker.preloadDate(startDate);
            self.checkOutDatepicker.preloadDate(endDate);
        }

        function _sortByDate(a, b) {
            var aDate = a.hasOwnProperty('caldate') ? a.caldate : a.deptdate,
                bDate = b.hasOwnProperty('caldate') ? b.caldate : b.deptdate;
            if (new Date(aDate) < new Date(bDate)) {
                return -1;
            }
            if (new Date(aDate) > new Date(bDate)) {
                return 1;
            }
            return 0;
        }

        var _newBookingWidgetPromoPriceHtml = $('#newBookingWidgetPromoPrice').html();
        function clear() {
            clearCheckInDatepicker();
            clearCheckOutDatepicker();
            $('#newBookingWidgetPromoPrice').html(_newBookingWidgetPromoPriceHtml);
        }

        function clearCheckInDatepicker() {
            self.checkInDatepicker.clear();
            Cookies.remove('nret[start_date]');
        }

        function clearCheckOutDatepicker() {
            self.checkOutDatepicker.clear();
            self.departureDates = [];
            self.departureDatesBeyond = [];
            Cookies.remove('nret[end_date]');
        }

        function getArrivalDates(startDate, callback) {
            self.checkInDatepicker.showLoader();
            $("#initEnquiry").prop('disabled', true); //disable button until ajax calls are finished
            var formatedStartDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, startDate).toUpperCase(),
                jqXHR = $.get('/api/v1/getoptarrival/' + config.retreatId + '/' + formatedStartDate, function(response) {
                    self.checkInDatepicker.hideLoader();
                    if (response.error || response.data === null) {
                        self.showBookingError('Error getting check in dates.');
                    } else {
                        $.merge(self.arrivalDates, response.data);
                        self.arrivalDates.sort(_sortByDate);
                        typeof callback === 'function' && callback();
                    }
                });
            return jqXHR;
        }

        function getDepartureDates(startDate, callback) {
            self.checkOutDatepicker.showLoader();
            var formatedStartDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, startDate).toUpperCase(),
                jqXHR = $.get('/api/v1/getoptdeparture/' + config.retreatId + '/' + formatedStartDate, function(response) {
                    self.checkOutDatepicker.hideLoader();
                    if (response.error) {
                        self.showBookingError('Error getting check out dates.');
                    } else {
                        for (var i = 0; i < response.data.length; i++) {
                            var newDateData = response.data[i],
                                departureDate = self.departureDates.filter(function(departureDateCompare) {
                                    return departureDateCompare.deptdate === newDateData.deptdate;
                                })[0];
                            if (!departureDate) {
                                self.departureDates.push(newDateData);
                            }
                        }
                        self.departureDates.sort(_sortByDate);
                        typeof callback === 'function' && callback();
                    }
                });
            return jqXHR;
        }

        function getDepartureDatesBeyond(startDate, callback) {
            self.checkOutDatepicker.showLoader();
            var formatedStartDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, startDate).toUpperCase(),
                jqXHR = $.get('/api/v1/getoptdeparture/' + config.retreatId + '/' + formatedStartDate, function(response) {
                    self.checkOutDatepicker.hideLoader();
                    if (response.error) {
                        self.showBookingError('Error getting check out dates.');
                    } else {
                        for (var i = 0; i < response.data.length; i++) {
                            var newDateData = response.data[i],
                                departureDateBeyond = self.departureDatesBeyond.filter(function(departureDateCompare) {
                                    return departureDateCompare.deptdate === newDateData.deptdate;
                                })[0];
                            if (!departureDateBeyond) {
                                self.departureDatesBeyond.push(newDateData);
                            }
                        }
                        self.departureDatesBeyond.sort(_sortByDate);
                        typeof callback === 'function' && callback();
                    }
                });
            return jqXHR;
        }

        function hideBookingError() {
            $bookingError
                .hide()
                .text('');
            $bookingSubmit.removeClass('booking-error');
        }

        function hideCalendarError() {
            $('#calendar-error').remove();
        }

        function showBookingError(errorMessage) {
            $bookingError
                .show()
                .text(errorMessage);
            $bookingSubmit.addClass('booking-error');
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

        function updatePrice() {
            var checkOutDate = $checkOutDateInput.datepicker('getDate');
            if (checkOutDate) {
                var formatedDepartureDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_RESPONSE, checkOutDate).toUpperCase(),
                    departureDate = self.departureDates.filter(function(departureDateCompare) {
                        return departureDateCompare.deptdate.toUpperCase() === formatedDepartureDate;
                    })[0];
                if (departureDate) {
                    var displayPriceString = $('#bookingPetsCheck').is(':checked') ? departureDate.displaypricepets : departureDate.displayprice,
                        displayPrice = parseFloat(displayPriceString).toFixed(2);
                    if (departureDate.displaydiscount && departureDate.displaydiscount !== 0) {
                        var beforePrice = parseFloat(displayPrice) + parseFloat(departureDate.displaydiscount);
                        $('#newBookingWidgetPromoPrice').html('Your subtotal is <span class="line-through">' + config.currencySymbol + beforePrice.toFixed(2) + '</span> ' + config.currencySymbol + displayPrice);
                    } else {
                        $('#newBookingWidgetPromoPrice').html('Your subtotal is ' + config.currencySymbol + displayPrice);
                    }
                    $('#display-price-h').val(config.currencySymbol + displayPrice);
                } else {
                    $('#newBookingWidgetPromoPrice').html(_newBookingWidgetPromoPriceHtml);
                }
            } else {
                $('#newBookingWidgetPromoPrice').html(_newBookingWidgetPromoPriceHtml);
            }
        }
    };

    var CheckInDatepicker = function(parent, config) {
        var self = this;

        self.displayedMonth = undefined; // 1 to 12
        self.displayedYear = undefined;
        self.clear = clear;
        self.hideLoader = hideLoader;
        self.preloadDate = preloadDate;
        self.refresh = refresh;
        self.showLoader = showLoader;

        initialize();

        function initialize() {
            $checkInDateInput.datepicker({
                dateFormat: $checkInDateInput.data('dateFormat'),
                minDate: 0,
                numberOfMonths: NUMBER_OF_MONTHS,
                beforeShow: function() {
                    _updateDateTracking();
                    _beforeShow();
                },
                beforeShowDay: _beforeShowDay,
                onChangeMonthYear: function(year, month) {
                    self.displayedMonth = month;
                    self.displayedYear = year;
                },
                onSelect: _onSelect
            });
            _updateDateTracking();
        }

        var _calendarListenersTimeout;
        function _addCalendarListeners() {
            clearTimeout(_calendarListenersTimeout);
            if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible')) {
                $('.ui-datepicker-prev:not(.ui-state-disabled), .ui-datepicker-next:not(.ui-state-disabled)').on('click.bookingwidget', function(){
                    _beforeShow();
                })

                $('.clear-dates button, button.clear-dates').on('click', function() {
                    parent.clear();
                });
                $('.ui-state-default').on('click', function(event) {
                    $('.ui-state-default').parent().removeClass('calendar-error');
                    var $element = $(this),
                        selectionDate = new Date(),
                        day = $element.text(),
                        month,
                        year;
                    if ($('.ui-datepicker-multi').length && $element.closest('.ui-datepicker-group-last').length) {
                        month = self.displayedMonth > 11 ? 1 : self.displayedMonth + 1,
                            year = self.displayedMonth > 11 ? self.displayedYear + 1 : self.displayedYear;
                    } else {
                        month = self.displayedMonth;
                        year = self.displayedYear;
                    }
                    selectionDate.setFullYear(year, month - 1, day);
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

        var _addLegendTimeout;
        function _addLegend() {
            clearTimeout(_addLegendTimeout);
            var legendMarkup = [
                '<div id="calendar-legend">',
                '<ul>',
                '<li class="available"><div class="legend-icon"></div>&nbsp;Available</li>',
                '<li class="check-in-only"><div class="legend-icon"></div>&nbsp;Check In Only</li>',
                '<li class="unavailable"><div class="legend-icon"></div>&nbsp;Unavailable</li>',
                '<li class="clear-dates"><button><div class="icon icon_close"></div>&nbsp;Clear Dates</button></li>',
                '</ul>',
                '</div>'
            ].join('');
            if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible')) {
                $('#ui-datepicker-div')
                    .addClass('ui-datepicker-check-in')
                    .removeClass('ui-datepicker-check-out');
                if (!$('#calendar-legend').length) $('#ui-datepicker-div').append(legendMarkup);
            } else {
                _addLegendTimeout = setTimeout(_addLegend, 10);
            }
        }

        function _beforeShow() {
            if (window.innerWidth < 769 && !$.contains('.filter-option-check-in', '#ui-datepicker-div')) {
                var detachedDatepicker = $('#ui-datepicker-div').detach();
                detachedDatepicker.appendTo('.filter-option-check-in');
            }
            _addLegend();
            _addCalendarListeners();
        }

        var jqXHR;
        function _beforeShowDay(date) {
            if (!parent.arrivalDates.length) return [false, "", null];
            var todayDate = new Date();
            if (date < todayDate) return [false, "", null];
            var formatedDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_RESPONSE, date).toUpperCase(),
                arrivalDate = parent.arrivalDates.filter(function(arrivalDateCompare) {
                    return arrivalDateCompare.caldate.toUpperCase() === formatedDate;
                })[0];
            if (!arrivalDate) {
                if (!jqXHR || jqXHR.readyState === 4) {
                    jqXHR = parent.getArrivalDates(date, function() {
                        $("#initEnquiry").prop('disabled', false);
                        self.refresh();
                    });
                }
                return [false, "", null];
            }
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                isSelectable = arrivalDate && arrivalDate.available === 1 && arrivalDate.valid_arrival,
                cssClassName = '';
            if (arrivalDate && arrivalDate.available === 1 && !arrivalDate.valid_arrival) {
                cssClassName += ' fake-selectable';
            }
            if (isSelectable) {
                if (arrivalDate.checkin_only) cssClassName += ' check-in-only';
            }
            if (checkInDate) {
                if (date.getTime() === checkInDate.getTime()) cssClassName += ' check-in-date';
                var formatedCheckInDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_RESPONSE, checkInDate).toUpperCase(),
                    checkInArrivalDate = parent.arrivalDates.filter(function(arrivalDateCompare) {
                        return arrivalDateCompare.caldate.toUpperCase() === formatedCheckInDate;
                    })[0];
                if (checkInArrivalDate) {
                    var nightMinimum = checkInArrivalDate.min_stay;
                    var lastMinimumDate = new Date(checkInDate);
                    lastMinimumDate.setDate(lastMinimumDate.getDate() + nightMinimum - 1);
                    if (date <= lastMinimumDate && date > checkInDate) cssClassName += ' included-in-minimum';
                    if (date.getTime() === lastMinimumDate.getTime()) cssClassName += ' included-in-minimum-last';
                }
            }
            if (checkOutDate && date.getTime() === checkOutDate.getTime()) cssClassName += ' check-out-date';
            if (checkInDate && checkOutDate && date < checkOutDate && date > checkInDate) cssClassName += ' in-between';
            return [isSelectable, cssClassName.trim(), null];
        }

        function _isValidSelection(selectionDate) {
            parent.hideCalendarError();
            var formatedDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_RESPONSE, selectionDate).toUpperCase(),
                arrivalDate = parent.arrivalDates.filter(function(arrivalDateCompare) {
                    return arrivalDateCompare.caldate.toUpperCase() === formatedDate;
                })[0],
                isValid;
            if (!arrivalDate) {
                parent.showCalendarError('Sorry, the date you have selected is not available.');
                isValid = false;
            } else if (arrivalDate.available <= 0) {
                parent.showCalendarError('Sorry, the date you have selected is not available.');
                isValid = false;
            } else if (!arrivalDate.valid_arrival) {
                parent.showCalendarError('Sorry, the day of week selected is not available for check in.');
                isValid = false;
            } else {
                var nightMinimum = arrivalDate.min_stay,
                    startingIndex = parent.arrivalDates.indexOf(arrivalDate),
                    nightMinimumIsAvailable = true;
                for (var index = 1; index < nightMinimum; index++) {
                    var includedDate = parent.arrivalDates[startingIndex + index];
                    if (typeof includedDate === 'undefined' || includedDate === null || includedDate.available <= 0) {
                        nightMinimumIsAvailable = false;
                        break;
                    }
                }
                if (!nightMinimumIsAvailable) {
                    parent.showCalendarError('Sorry, some dates included in the ' + nightMinimum + ' night minimum are not available.');
                    isValid = false;
                } else {
                    isValid = true;
                }
            }
            return isValid;
        }

        function _onSelect() {
            $checkInDateInput.parent().removeClass('booking-error init-error');
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                formatedDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkInDate).toUpperCase(),
                formatedDateOverlay = $.datepicker.formatDate(NRES_OVERLAY_DATE_FORMAT, checkInDate).toUpperCase();
            $checkInOverlay.text(formatedDateOverlay);
            $checkInSubLabel.addClass('show');
            Cookies.set('nret[start_date]', formatedDate);
            if ($checkOutDateInput.is(':disabled')) $checkOutDateInput.prop('disabled', false);
            $checkOutDateInput.datepicker('option', 'defaultDate', checkInDate);
            if (!checkOutDate) {
                setTimeout(function() {
                    $checkOutDateInput.datepicker('show');
                }, 250);
            }
            parent.clearCheckOutDatepicker();
            parent.getDepartureDates(checkInDate, function() {
                parent.checkOutDatepicker.refresh();
            });
            parent.updatePrice();
        }

        function _updateDateTracking() {
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                today = new Date();
            self.displayedMonth = checkInDate ? checkInDate.getMonth() + 1 : today.getMonth() + 1;
            self.displayedYear = checkInDate ? checkInDate.getFullYear() : today.getFullYear();
        }

        function clear() {
            $checkInDateInput
                .datepicker('setDate', null)
                .datepicker('hide')
                .blur();
            $checkInOverlay.text('Check In');
            $checkOutDateInput
                .prop('disabled', true)
                .blur();
            _updateDateTracking();
        }

        function hideLoader() {
            clearInterval(_showLoaderInterval);
            $('#calendar-loader').remove();
        }

        function preloadDate(date) {
            $checkInDateInput.datepicker('setDate', date);
            var formatedDateOverlay = $.datepicker.formatDate(NRES_OVERLAY_DATE_FORMAT, date).toUpperCase();
            $checkInOverlay.text(formatedDateOverlay);
            $checkInSubLabel.addClass('show');
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                formatedDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkInDate).toUpperCase();
            Cookies.set('nret[start_date]', formatedDate);
            if ($checkOutDateInput.is(':disabled')) $checkOutDateInput.prop('disabled', false);
            $checkOutDateInput.datepicker('option', 'defaultDate', checkInDate);
            parent.clearCheckOutDatepicker();
            parent.getDepartureDates(checkInDate, function() {
                parent.updatePrice();
            });
        }

        function refresh() {
            $checkInDateInput.datepicker('refresh');
            _beforeShow();
        }

        var _showLoaderInterval;
        function showLoader() {
            clearInterval(_showLoaderInterval);
            var loaderMarkup = '<div id="calendar-loader"></div>';
            _showLoaderInterval = setInterval(function() {
                if (!$('#calendar-loader').length) $('#ui-datepicker-div').append(loaderMarkup);
            }, 10);
        }
    };

    var CheckOutDatepicker = function(parent, config) {
        var self = this;

        self.displayedMonth = undefined; // 1 to 12
        self.displayedYear = undefined;
        self.clear = clear;
        self.hideLoader = hideLoader;
        self.preloadDate = preloadDate;
        self.refresh = refresh;
        self.showLoader = showLoader;

        initialize();

        function initialize() {
            $checkOutDateInput.datepicker({
                dateFormat: $checkOutDateInput.data('dateFormat'),
                minDate: 0,
                numberOfMonths: NUMBER_OF_MONTHS,
                beforeShow: function() {
                    _updateDateTracking();
                    _beforeShow();
                },
                beforeShowDay: _beforeShowDay,
                onChangeMonthYear: function(year, month) {
                    self.displayedMonth = month;
                    self.displayedYear = year;
                },
                onSelect: _onSelect
            });
        }

        var _calendarListenersTimeout;
        function _addCalendarListeners() {
            clearTimeout(_calendarListenersTimeout);
            if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible')) {
                $('.ui-datepicker-prev:not(.ui-state-disabled), .ui-datepicker-next:not(.ui-state-disabled)').on('click.bookingwidget', function() {
                    _beforeShow();
                });
                $('.clear-dates button, button.clear-dates').on('click', function() {
                    parent.clear();
                });
                $('.ui-state-default').on('click.bookingwidget', function(event) {
                    $('.ui-state-default').parent().removeClass('calendar-error');
                    var $element = $(this),
                        selectionDate = new Date(),
                        day = $element.text(),
                        month,
                        year;
                    if ($('.ui-datepicker-multi').length && $element.closest('.ui-datepicker-group-last').length) {
                        month = self.displayedMonth > 11 ? 1 : self.displayedMonth + 1,
                            year = self.displayedMonth > 11 ? self.displayedYear + 1 : self.displayedYear;
                    } else {
                        month = self.displayedMonth;
                        year = self.displayedYear;
                    }
                    selectionDate.setFullYear(year, month - 1, day);
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

        var _addLegendTimeout;
        function _addLegend() {
            clearTimeout(_addLegendTimeout);
            var legendMarkup = [
                '<div id="calendar-legend">',
                '<ul>',
                '<li class="available"><div class="legend-icon"></div>&nbsp;Available</li>',
                '<li class="check-out-only"><div class="legend-icon"></div>&nbsp;Check Out Only</li>',
                '<li class="unavailable"><div class="legend-icon"></div>&nbsp;Unavailable</li>',
                '<li class="clear-dates"><button><div class="icon icon_close"></div>&nbsp;Clear Dates</button></li>',
                '</ul>',
                '</div>'
            ].join('');
            if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible')) {
                $('#ui-datepicker-div')
                    .removeClass('ui-datepicker-check-in')
                    .addClass('ui-datepicker-check-out');
                if (!$('#calendar-legend').length) $('#ui-datepicker-div').append(legendMarkup);
            } else {
                _addLegendTimeout = setTimeout(_addLegend, 10);
            }
        }

        function _beforeShow() {
            if (window.innerWidth < 769 && !$.contains('.filter-option-check-out', '#ui-datepicker-div')) {
                var detachedDatepicker = $('#ui-datepicker-div').detach();
                detachedDatepicker.appendTo('.filter-option-check-out');
            }
            _addLegend();
            _addCalendarListeners();
        }

        var jqXHR;
        function _beforeShowDay(date) {
            if (!parent.departureDates.length) return [false, "", null];
            var todayDate = new Date();
            if (date < todayDate) return [false, "", null];
            var formatedDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_RESPONSE, date).toUpperCase(),
                departureDate = parent.departureDates.filter(function(departureDateCompare) {
                    return departureDateCompare.deptdate.toUpperCase() === formatedDate;
                })[0];
            if (!departureDate) {
                var departureDateBeyond = parent.departureDatesBeyond.filter(function(departureDateCompare) {
                    return departureDateCompare.deptdate.toUpperCase() === formatedDate;
                })[0];
                if (!departureDateBeyond && (!jqXHR || jqXHR.readyState === 4)) {
                    jqXHR = parent.getDepartureDatesBeyond(date, function() {
                        self.refresh();
                    });
                    return [false, "", null];
                } else {
                    departureDate = departureDateBeyond;
                }
            }
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                isSelectable = departureDate && departureDate.status === 'A',
                isFakeSelectable = departureDate && departureDate.available > 0,
                cssClassName = '';
            if (isSelectable) {
                if (departureDate.check_out_only) cssClassName += ' check-out-only';
            } else if (isFakeSelectable) {
                if (departureDate.check_out_only) cssClassName += ' check-out-only';
                cssClassName += ' fake-selectable';
            }
            if (checkInDate) {
                if (date.getTime() === checkInDate.getTime()) cssClassName += ' check-in-date';
                var formatedCheckInDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_RESPONSE, checkInDate).toUpperCase(),
                    checkInArrivalDate = parent.arrivalDates.filter(function(arrivalDateCompare) {
                        return arrivalDateCompare.caldate.toUpperCase() === formatedCheckInDate;
                    })[0];
                if (checkInArrivalDate) {
                    var nightMinimum = checkInArrivalDate.min_stay;
                    var lastMinimumDate = new Date(checkInDate);
                    lastMinimumDate.setDate(lastMinimumDate.getDate() + nightMinimum - 1);
                    if (date <= lastMinimumDate && date > checkInDate) cssClassName += ' included-in-minimum';
                    if (date.getTime() === lastMinimumDate.getTime()) cssClassName += ' included-in-minimum-last';
                }
            }
            if (checkOutDate && date.getTime() === checkOutDate.getTime()) cssClassName += ' check-out-date';
            if (checkInDate && checkOutDate && date < checkOutDate && date > checkInDate) cssClassName += ' in-between';
            return [isSelectable, cssClassName.trim(), null];
        }

        function _isValidSelection(selectionDate, element) {
            parent.hideCalendarError();
            var formatedDepartureDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_RESPONSE, selectionDate).toUpperCase(),
                departureDate = parent.departureDates.filter(function(departureDateCompare) {
                    return departureDateCompare.deptdate.toUpperCase() === formatedDepartureDate;
                })[0],
                isValid;
            if (departureDate) {
                switch(departureDate.status) {
                    case 'A':
                        isValid = true;
                        break;
                    case 'B':
                        parent.showCalendarError('Sorry, select a date after your check in date.');
                        isValid = false;
                        break;
                    case 'M':
                        var checkInDate = $checkInDateInput.datepicker('getDate'),
                            formatedArrivalDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_RESPONSE, checkInDate).toUpperCase(),
                            arrivalDate = parent.arrivalDates.filter(function(arrivalDateCompare) {
                                return arrivalDateCompare.caldate.toUpperCase() === formatedArrivalDate;
                            })[0];
                        if (arrivalDate) {
                            var nightMinimum = arrivalDate.min_stay;
                            parent.showCalendarError('Sorry, there is a ' + nightMinimum + ' night minimum for the date you selected.');
                        } else {
                            parent.showCalendarError('Sorry, there is a night minimum for the date you selected.');
                        }
                        isValid = false;
                        break;
                    case 'D':
                        parent.showCalendarError('Sorry, the day of week selected is not available for check out.');
                        isValid = false;
                        break;
                    case 'U':
                    default:
                        parent.showCalendarError('Sorry, the date you selected is not available.');
                        isValid = false;
                }
            } else {
                parent.showCalendarError('Sorry, the date you selected is not available.');
                isValid = false;
            }
            return isValid;
        }

        function _onSelect() {
            $checkOutDateInput.parent().removeClass('booking-error init-error');
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                formatedStartDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkInDate).toUpperCase(),
                formatedEndDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkOutDate).toUpperCase(),
                formatedEndDateOverlay = $.datepicker.formatDate(NRES_OVERLAY_DATE_FORMAT, checkOutDate).toUpperCase();
            $checkOutOverlay.text(formatedEndDateOverlay);
            $checkOutSubLabel.addClass('show');
            Cookies.set('nret[end_date]', formatedEndDate);
            if (checkInDate && checkOutDate) {
                var timeDifference = Math.abs(checkOutDate.getTime() - checkInDate.getTime()),
                    nights = Math.round(timeDifference / 86400000),
                    adultsAmount = $adultsInput.val() ? parseInt($adultsInput.val()) : 0,
                    childrenAmount = $childrenInput.val() ? parseInt($childrenInput.val()) : 0,
                    guests = adultsAmount + childrenAmount,
                    pets = $('#bookingPets').val();
                if ($('#booking-nights').length) $('#booking-nights').val(nights);
                Cookies.set('nret[nights]', nights);
                $.get('/api/v1/enquiry/' + config.nodeId + '/' + formatedStartDate + '/' + nights + '/' + guests + '/' + pets);
            }
            parent.updatePrice();
        }

        function _updateDateTracking() {
            var checkOutDate = $checkOutDateInput.datepicker('getDate'),
                defaultDate = $checkOutDateInput.datepicker('option', 'defaultDate'),
                today = new Date();
            if (checkOutDate) {
                self.displayedMonth = checkOutDate.getMonth() + 1;
                self.displayedYear = checkOutDate.getFullYear();
            } else {
                self.displayedMonth = defaultDate ? defaultDate.getMonth() + 1 : today.getMonth() + 1;
                self.displayedYear = defaultDate ? defaultDate.getFullYear() : today.getFullYear();
            }
        }

        function clear() {
            $checkInDateInput.blur();
            $checkOutDateInput
                .datepicker('setDate', null)
                .datepicker('hide')
                .blur();
            $checkOutOverlay.text('Select Date');
            _updateDateTracking();
        }

        function hideLoader() {
            clearInterval(_showLoaderInterval);
            $('#calendar-loader').remove();
        }

        function preloadDate(date) {
            $checkOutDateInput.datepicker('setDate', date);
            var formatedDateOverlay = $.datepicker.formatDate(NRES_OVERLAY_DATE_FORMAT, date).toUpperCase();
            $checkOutOverlay.text(formatedDateOverlay);
            $checkOutSubLabel.addClass('show');
            var checkInDate = $checkInDateInput.datepicker('getDate'),
                checkOutDate = $checkOutDateInput.datepicker('getDate'),
                formatedDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkOutDate).toUpperCase();
            Cookies.set('nret[end_date]', formatedDate);
            if (checkInDate && checkOutDate) {
                var timeDifference = Math.abs(checkOutDate.getTime() - checkInDate.getTime()),
                    nights = Math.round(timeDifference / 86400000);
                if ($('#booking-nights').length) $('#booking-nights').val(nights);
                Cookies.set('nret[nights]', nights);
            }
            parent.updatePrice();
        }

        function refresh() {
            $checkOutDateInput.datepicker('refresh');
            _beforeShow();
        }

        var _showLoaderInterval;
        function showLoader() {
            clearInterval(_showLoaderInterval);
            var loaderMarkup = '<div id="calendar-loader"></div>';
            _showLoaderInterval = setInterval(function() {
                if (!$('#calendar-loader').length) $('#ui-datepicker-div').append(loaderMarkup);
            }, 10);
        }
    };

    if ($checkInDateInput.length && $checkOutDateInput.length) new NaturalRetreatsBooking(naturalRetreatsBookingConfig);
}(jQuery, Cookies));