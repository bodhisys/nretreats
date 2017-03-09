/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 14*/
var nret = nret || {};
(function($, Cookies) {
    var NRES_API_DATE_FORMAT_REQUEST = 'dd-M-yy',
        NRES_API_DATE_FORMAT_RESPONSE = 'dd-M-y';
    nret.header = {
        mblListen: function() {
            $('.mbl-btn-nav').on('click touchstart', function() {
                var _this = $(this);
                _this.toggleClass('open');
                var bar1 = _this.find('span:nth-child(1)'),
                    bar2 = _this.find('span:nth-child(2)'),
                    bar3 = _this.find('span:nth-child(3)'),
                    background = _this.find('span:nth-child(4)'),
                    navbar = $('.global-nav__right'),
                    navLeftLIs = $('.global-nav .navbar-left'),
                    navRightLIs = $('.global-nav .navbar-right');
                //navLIs = $('.global-nav__right #main-menu li').not(".last");
                if (_this.hasClass('open')) {
                    bar1.velocity({rotateZ: '405deg', translateY:'3px', translateX:'3px', backgroundColor:'#FFF'}, {duration: 200, easing: [0, -0.01, 0.1, 0.99]});
                    bar2.velocity({opacity:0}, {duration:100});
                    bar3.velocity({rotateZ: '-405deg', translateX:'2.2px', translateY:'-3px', backgroundColor:'#FFF'}, {duration: 200, easing: [0, -0.01, 0.1, 0.99]});
                    background.velocity({height:'50px'}, {duration:200, easing: [0, -0.01, 0, 0.99]});
                    navbar.velocity({translateY:'0%'}, {duration:200, easing: [0.77, 0.5, 0.59, 0.9]});
                    navLeftLIs.css({opacity:0});
                    navLeftLIs.css({opacity:0});
                    navRightLIs.velocity("transition.slideLeftIn", {stagger: 50, duration: 70, delay: 150});
                    navRightLIs.velocity("transition.slideLeftIn", {stagger: 50, duration: 70, delay: 150});
                    //navLIs.css({opacity:0});
                    //navLIs.velocity("transition.slideLeftIn", {stagger: 50, duration: 70, delay: 150});
                } else {
                    bar1.velocity({rotateZ: '0deg', translateY:'0px', translateX:'0px', backgroundColor:'#312f3c'}, {duration: 200, easing: [0, -0.01, 0.1, 0.99]});
                    bar2.velocity({opacity:1}, {duration:200});
                    bar3.velocity({rotateZ: '0deg', translateX:'0px', translateY:'0px', backgroundColor:'#312f3c'}, {duration: 200, easing: [0, -0.01, 0.1, 0.99]});
                    background.velocity({height:'0px'}, {duration:200, easing: [0, -0.01, 0, 0.99]});
                    navbar.velocity({translateY:'-100%'},
                        {duration:200,
                            easing: [0.77, 0.5, 0.59, 0.9],
                            complete: function() {
                                navbar.removeAttr('style');
                                $('.mobile-destination_subnav').removeClass('show');
                            }
                        }
                    );
                }
                return false;
            });

            $('.mbl-btn-search').on('click touchstart', function() {
                if ($('.mbl-btn-nav').hasClass('open')) $('.mbl-btn-nav').trigger('click');
                var _this = $(this);
                _this.toggleClass('open');
                var searchNavBackground = $('.mbl-search-background'),
                    bar1 = _this.find('span:nth-child(1)'),
                    bar2 = _this.find('span:nth-child(3)');
                if (_this.hasClass('open')) {
                    searchNavBackground.velocity({height:'50px'}, {duration:200, easing: [0, -0.01, 0, 0.99]});
                    bar1.velocity({opacity:1, rotateZ: '405deg', translateY:'3px', translateX:'3px', backgroundColor:'#FFF'}, {duration: 200, easing: [0, -0.01, 0.1, 0.99]});
                    bar2.velocity({opacity:1, rotateZ: '-405deg', translateX:'2.2px', translateY:'-3px', backgroundColor:'#FFF'}, {duration: 200, easing: [0, -0.01, 0.1, 0.99 ]});
                } else {
                    searchNavBackground.velocity({height:'0px'}, {duration:200, easing: [0, -0.01, 0, 0.99]});
                    bar1.velocity({opacity:0, rotateZ: '0deg', translateY:'0px', translateX:'0px', backgroundColor:'#312f3c'}, {duration: 200, easing: [0, -0.01, 0.1, 0.99]});
                    bar2.velocity({opacity:0, rotateZ: '0deg', translateX:'0px', translateY:'0px', backgroundColor:'#312f3c'}, {duration: 200,
                        easing: [0, -0.01, 0.1, 0.99],
                        complete: function() {}
                    });
                    nret.header.mblSearch.destroy();
                }
                return false;
            });


            $('.initMobileSearchDates').on('click', function() {
                if ($('.mbl-btn-nav').hasClass('open')) $('.mbl-btn-nav').trigger('click');
                var _this = $('.mbl-btn-search');
                _this.toggleClass('open');
                var searchNavBackground = $('.mbl-search-background'),
                    bar1 = _this.find('span:nth-child(1)'),
                    bar2 = _this.find('span:nth-child(3)');
                if (_this.hasClass('open')) {
                    searchNavBackground.velocity({height:'50px'}, {duration:200, easing: [0, -0.01, 0, 0.99]});
                    bar1.velocity({opacity:1, rotateZ: '405deg', translateY:'3px', translateX:'3px', backgroundColor:'#FFF'}, {duration: 200, easing: [0, -0.01, 0.1, 0.99]});
                    bar2.velocity({opacity:1, rotateZ: '-405deg', translateX:'2.2px', translateY:'-3px', backgroundColor:'#FFF'}, {duration: 200, easing: [0, -0.01, 0.1, 0.99 ]});
                    nret.header.mblSearch.build();
                } else {
                    searchNavBackground.velocity({height:'0px'}, {duration:200, easing: [0, -0.01, 0, 0.99]});
                    bar1.velocity({opacity:0, rotateZ: '0deg', translateY:'0px', translateX:'0px', backgroundColor:'#312f3c'}, {duration: 200, easing: [0, -0.01, 0.1, 0.99]});
                    bar2.velocity({opacity:0, rotateZ: '0deg', translateX:'0px', translateY:'0px', backgroundColor:'#312f3c'}, {duration: 200,
                        easing: [0, -0.01, 0.1, 0.99],
                        complete: function() {}
                    });
                    nret.header.mblSearch.destroy();
                }
                $('nav.global-nav .mbl-search-menu .options a.date').trigger('click');
                return false;
            });
        },
        mblCheckCookies: function() {
            var setCookies = {};
            setCookies.checkIn = Cookies.get('nret[start_date]');
            setCookies.checkOut = Cookies.get('nret[end_date]');
            setCookies.guests = Cookies.get('nret[guests]');
            setCookies.bedrooms = Cookies.get('retreat_list[bedrooms]');
            setCookies.beds = Cookies.get('retreat_list[beds]');
            setCookies.bathrooms = Cookies.get('retreat_list[bathrooms]');
            setCookies.subarea = Cookies.get('retreat_list[subarea][0]');
            setCookies.amenities = Cookies.get('retreat_list[amenities][0]');
            _.each(setCookies, function(cookieValue, cookieName) {
                if (cookieValue) {
                    var selectBoxEntry = '.select-box.' + cookieName;
                    $(selectBoxEntry).find('.entry').html(cookieValue);
                }
            });
        },
        mblSearch: {
            build: function() {
                var sHTML = $('#mbl-search').html();
                sHTML = $(sHTML);
                sHTML.find('.destinationFilterRefresh').on('click', function() {
                    var locationWithoutHash = window.location.href.split('#')[0],
                        newLocation = locationWithoutHash.split('?')[0];
                    window.location.href = newLocation + '?filterApplied=true';
                    window.location.reload();
                });
                $('.global-nav').append(sHTML);
                nret.header.mblCheckCookies();
                setTimeout(function() {
                    nret.destinationDetail.clearFilters();
                }, 800);
                var mblSearch = $('.mbl-search-menu');
                mblSearch.velocity({translateY: '0%'},{duration: 400, easing: [0.77, 0.5, 0.59, 0.9]});
                nret.header.mblSearch.applyListeners();
                nret.header.initExplorePage();
            },
            applyListeners: function() {
                var mblSearchMenuOption = $('.mbl-search-menu .options a');
                mblSearchMenuOption.on('click', function() {
                    var _this = $(this);
                    if (_this.hasClass('navigate')) {
                        window.location = _this.attr('href');
                        return false;
                    }
                    if (_this.hasClass('active')) {
                        return false;
                    } else {
                        var thisSect = _this.attr('class');
                        mblSearchMenuOption.removeClass('active');
                        _this.addClass('active');
                        $('.mbl-search-menu section').removeClass('active');
                        $('.mbl-search-menu section.' + thisSect).addClass('active');
                    }
                    return false;
                });

                $('.mbl-search-menu select').on('change', function() {
                    var $this = $(this),
                        selection = $this.find('option:selected').val();
                    if ($this.hasClass('guests')) Cookies.set('nret[guests]', selection);
                    if ($this.hasClass('bedrooms')) Cookies.set('retreat_list[bedrooms]', selection);
                    if ($this.hasClass('beds')) Cookies.set('retreat_list[beds]', selection);
                    if ($this.hasClass('bathrooms')) Cookies.set('retreat_list[bathrooms]', selection);
                    if ($this.hasClass('subarea')) Cookies.set('retreat_list[subarea][0]', selection);
                    if ($this.hasClass('amenities')) Cookies.set('retreat_list[amenities][0]', selection);
                    $this.parent('.select-box').find('.entry').text($this.find('option:selected').val());
                    if ($this.hasClass('location')) {
                        $('.start-exploring.explore').attr('href', '/node/' + selection);
                        $('.mbl-search-menu .select-box.loc').find('.entry').html($('.mbl-search-menu select.location').find('option:selected').length)
                    }
                });

                $('.mbl-search-menu .select-box.cal').on('click', function() {
                    var $this = $(this);
                    $('.mbl-search-menu .select-box.cal').removeClass('active');
                    $this.addClass('active');
                    $this.find('.calendar').datepicker({
                        minDate: new Date(),
                        onSelect: function() {
                            $this.removeClass('active');
                            var monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                                thisDate = $this.find('.calendar').datepicker('getDate'),
                                headingString = monthNames[thisDate.getMonth()] + ' ' + thisDate.getDate();
                            $this.find('.entry').text(' ' + headingString);
                            var checkInDate = $('.calendar.checkIn').datepicker('getDate'),
                                checkOutDate = $('.calendar.checkOut').datepicker('getDate');
                            if ($this.hasClass('checkIn')) {
                                var formatedStartDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkInDate).toUpperCase();
                                Cookies.set('nret[start_date]', formatedStartDate);
                                $('.calendar.checkOut').datepicker('setDate', checkInDate);
                            }
                            if ($this.hasClass('checkOut')) {
                                var formatedEndDate = $.datepicker.formatDate(NRES_API_DATE_FORMAT_REQUEST, checkOutDate).toUpperCase();
                                $('.calendar.checkOut').datepicker('setDate', checkInDate);
                                Cookies.set('nret[end_date]', formatedEndDate);
                                var checkIn = $('.calendar.checkIn').datepicker('getDate').getTime(),
                                    checkOut = $('.calendar.checkOut').datepicker('getDate').getTime(),
                                    nights = Math.round(Math.abs((checkIn - checkOut) / (24 * 60 * 60 * 1000)));
                                Cookies.set('nret[nights]', nights);
                            }
                        },
                        defaultDate: ($this.hasClass('checkOut') && $('.calendar.checkIn').datepicker('getDate')) ? $('.calendar.checkIn').datepicker('getDate') : null //for checkout datepicker, set default date to checkin date if exists
                    });
                });
            },
            destroy: function() {
                $('.mbl-search-menu-title').remove();
                var mblSearch = $('.mbl-search-menu');
                mblSearch.velocity(
                    {translateY: '-100%'},
                    {
                        duration: 200,
                        easing: [0.77, 0.5, 0.59, 0.9],
                        complete: function() {
                            mblSearch.remove();
                        }
                    }
                );
            }
        },
        phoneFix: function() {
            if (!$('body').hasClass('device-phone')) {
                var $link = $('.global-nav__tel'),
                    number = $link.html();
                $link.replaceWith('<span class="global-nav__tel">' + number + '</span>');
            }
        },
        openDestinationlistInNav: function() {
            var navEl = $('#main-menu').find('a[href="/destination"]');
            navEl.addClass('doNotClose');
            navEl.on('click', function(event) {
                if ($('body').hasClass('desktop') && window.innerWidth > 768) {
                    event.preventDefault();
                    $('nav.global-nav').find('.global-nav__destinations').toggleClass('show');
                }
            });
        },
        toggleDestinationListOnSelection: function() {
            $('a[data-opendestinationlist]').on('click', function() {
                var region = $(this).data('opendestinationlist');
                var elToOpen = $(this).closest('.global-nav__destinations__region').next('.global-nav__destinations__destination-list-wrapper').find('.' + region);
                var elToClose = $(this).closest('.global-nav__destinations__region').next('.global-nav__destinations__destination-list-wrapper').find('.global-nav__destination-list');
                if (!$(this).hasClass('active')) {
                    $(this).parent().siblings().find('a[data-opendestinationlist]').removeClass('active');
                    $(this).addClass('active');
                }
                if (!elToOpen.hasClass('show')) {
                    elToClose.not(elToOpen).removeClass('show');
                    elToOpen.addClass('show');
                }
            });
        },
        checkMenuHighlight: function() {
            //check if destination and pathname and apply menu highlight
            if (window.location.pathname.match(/destination/g)!==null) {
                $('#main-menu li.first').addClass('active');
            }
        },
        showMobileDestinationSubnav: function() {
            $('.mobile-destination_subnav').addClass('show');
        },
        hideMobileDestinationSubnav: function() {
            $('.mobile-destination_subnav').removeClass('show');
            $('.global-nav__right #main-menu li').velocity("transition.slideLeftIn", {stagger:50, duration:70, delay:150});
        },
        globalMessageListener: function() {
            var $modal = $('#global-message');
            if ($modal[0]) {
                $modal.on('click', function(event) {
                    var $target = $(event.target);
                    if ($target.hasClass('modal') || $target.hasClass('global-message-close')) {
                        event.preventDefault();
                        $modal.remove();
                        return false;
                    }
                });
            }
        },
        bookNowSearchOpenEvent : function () {
            nret.header.els.bookBtn.on('click', function() {
                nret.header.openBookNowSearch();
            });
        },

        bookNowSearchCloseEvent : function () {
            nret.header.els.closeBookBtn.on('click', function() {
                nret.header.closeBookNowSearch();
            });
        },

        openBookNowSearch : function() {
            if ( $('#retreat-search').length > 0 ) {
                $('.scroll-to-search').velocity("scroll", {
                    duration: 600,
                    offset: -140,
                    easing: "ease-in-out"
                });
            } else if($('body').hasClass('home-page')) {
                $('.scroll-to-search').velocity("scroll", {
                    duration: 600,
                    offset: -330,
                    easing: "ease-in-out"
                });
            } else {
                nret.header.els.retreatSearch.velocity(
                    {opacity:1}, {display: 'flex'}
                );
            }
            nret.header.els.retreatSearch.addClass('show');
        },

        closeBookNowSearch : function() {
            nret.header.els.retreatSearch.velocity(
                {opacity:0}, {display: 'none'}
            );
            nret.header.els.retreatSearch.removeClass('show');
        },

        initExplorePage : function() {
            var retreats,
                retreatIdArray,
                exploreUrl,
                retreatIdString,
                exploreDate,
                exploreNights,
                exploreGuests,
                exploreBedrooms,
                exploreBathrooms,
                exploreBeds,
                explorePets,
                exploreEnvironments,
                exploreAmenitiesArray = [],
                exploreAmenities,
                $amenities = $('[data-more-filter-amenities]'),
                $destinationLabel = $('.destination-label'),
                $checkinLabel = $('.checkin-label'),
                $checkoutLabel = $('.checkout-label'),
                $bedroomLabel = $('.bedroom-label'),
                valid,
                exploreExperiences;
            $('.initHomeRetreatReset').on('click', function(event){
                event.preventDefault();
                //clear destinations
                $(".global-nav__destinations").find("input:checked").removeAttr('checked').change();
                Cookies.set('nret[location_id]', '');
                //clear bedrooms
                $('.bedrooms.home__search__choice, #bedroom-label').text('Bedrooms');
                Cookies.set('retreat_list[bedrooms]', '');
                //clear dates

                if($('body').hasClass('home-page')){
                    $('.checkin-sublabel, .checkout-sublabel').css({opacity: 0});
                    $.datepicker._clearDate('#bookingCheckIn');
                    $.datepicker._clearDate('#bookingCheckOut');
                } else {
                    $.datepicker._clearDate('#bookingCheckInNav');
                    $.datepicker._clearDate('#bookingCheckOutNav');
                    $('.checkin-sublabel, .checkout-sublabel').removeClass('show');
                }

                $('.checkin-label').text("Check In");
                $('.checkout-label').text("Check Out");


            })

            $('.initHomeRetreatSearch').on('click', function(event) {
                event.preventDefault();
                retreatIdArray = [];
                valid = true;
                nret.destinationDetail.setCookiesBedrooms();
                if( $(this).hasClass('start-exploring') ) {
                    // mobile search relies on multiple select
                    // .val() returns an array of selected choices
                    retreatIdArray = $('.location').val();
                } else {
                    // Desktop search does not rely on multiple select
                    retreats = $('.global-nav__destinations__destination-list-wrapper').find('.custom-check-input');
                    retreats.each(function() {
                        if ($(this).is(':checked') && $(this).prop('disabled') === false) {
                            retreatIdArray.push($(this).attr('data-home-location'));
                        }
                    });
                }

                if ( $('#retreat-search').length ) {
                    nret.destinationDetail.setCookiesGuest();
                    nret.destinationDetail.setCookiesBed();
                    nret.destinationDetail.setCookiesBathroom();
                    nret.destinationDetail.setCookiesArea();
                    nret.destinationDetail.setCookiesAmenities();
                }
                // build explore url
                if (retreatIdArray.length !== null) {
                    retreatIdString = retreatIdArray.join(',');
                }

                $amenities.each(function(i) {
                    var amenityCookie = Cookies.get('retreat_list[amenities][' + i + ']');
                    if(amenityCookie) {
                        exploreAmenitiesArray.push(amenityCookie);
                    }
                });
                exploreDate = Cookies.get('nret[start_date]');
                exploreNights = Cookies.get('nret[nights]');
                exploreGuests = Cookies.get('nret[guests]') || 0;
                exploreBedrooms = Cookies.get('retreat_list[bedrooms]') || 0;
                exploreBeds = Cookies.get('retreat_list[beds]') || 0;
                exploreBathrooms = Cookies.get('retreat_list[bathrooms]') || 0 	;
                explorePets = 'both';
                exploreEnvironments = 'all';
                if (exploreAmenitiesArray.length > 0) {
                    exploreAmenities = 	exploreAmenitiesArray.join(',');
                } else {
                    exploreAmenities ='all';
                }
                exploreExperiences = 'all';
                exploreUrl = '/explore/' + retreatIdString + '/' + exploreDate + '/' +  exploreNights + '/' + exploreGuests + '/' + exploreBedrooms + '/' + exploreBeds + '/' + exploreBathrooms + '/' + explorePets + '/' + exploreEnvironments + '/' + exploreAmenities + '/' +exploreExperiences;
                Cookies.set('nret[location_id]', retreatIdString);

                // Validate on Homepage
                if ($('#home').length) {
                    $destinationLabel.removeClass('error');
                    $checkinLabel.removeClass('error');
                    $checkoutLabel.removeClass('error');
                    $bedroomLabel.removeClass('error');
                    if (retreatIdArray.length === 0) {
                        $destinationLabel.addClass('error');
                        valid = false;
                    }
                    if (exploreDate === undefined) {
                        $checkinLabel.addClass('error');
                        valid = false;
                    }
                    if (exploreNights === undefined) {
                        $checkoutLabel.addClass('error');
                        valid = false;
                    }
                }

                if(valid === true) {
                    location = exploreUrl;
                }


            });
        },

        init: function() {
            nret.header.els = {
                bookBtn : $('#openBookNowSearch'),
                closeBookBtn : $('#closeBookInNav'),
                retreatSearch : $('.global-nav__retreat_search')
            }
            nret.header.mblListen();
            nret.header.phoneFix();
            nret.header.openDestinationlistInNav();
            nret.header.toggleDestinationListOnSelection();
            nret.header.initExplorePage();
            nret.header.checkMenuHighlight();
            nret.header.globalMessageListener();
            nret.header.bookNowSearchOpenEvent();
            nret.header.bookNowSearchCloseEvent();
        }
    };

    $(document).ready(function() {
        nret.header.init();
    });
})(jQuery, Cookies);