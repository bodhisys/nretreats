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