/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*!
 Waypoints Sticky Element Shortcut - 4.0.0
 Copyright © 2011-2015 Caleb Troughton
 Licensed under the MIT license.
 https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
 */
(function() {
    'use strict'

    var $ = window.jQuery
    var Waypoint = window.Waypoint

    /* http://imakewebthings.com/waypoints/shortcuts/sticky-elements */
    function Sticky(options) {
        this.options = $.extend({}, Waypoint.defaults, Sticky.defaults, options)
        this.element = this.options.element
        this.$element = $(this.element)
        this.createWrapper()
        this.createWaypoint()
    }

    /* Private */
    Sticky.prototype.createWaypoint = function() {
        var originalHandler = this.options.handler

        this.waypoint = new Waypoint($.extend({}, this.options, {
            element: this.wrapper,
            handler: $.proxy(function(direction) {
                var shouldBeStuck = this.options.direction.indexOf(direction) > -1
                var wrapperHeight = shouldBeStuck ? this.$element.outerHeight(true) : ''

                this.$wrapper.height(wrapperHeight)
                this.$wrapper.css({position:'relative','z-index':1})
                this.$element.toggleClass(this.options.stuckClass, shouldBeStuck)

                if (originalHandler) {
                    originalHandler.call(this, direction)
                }
            }, this)
        }))
    }

    /* Private */
    Sticky.prototype.createWrapper = function() {
        if (this.options.wrapper) {
            this.$element.wrap(this.options.wrapper)
        }
        this.$wrapper = this.$element.parent()
        this.wrapper = this.$wrapper[0]
    }

    /* Public */
    Sticky.prototype.destroy = function() {
        if (this.$element.parent()[0] === this.wrapper) {
            this.waypoint.destroy()
            this.$element.removeClass(this.options.stuckClass)
            if (this.options.wrapper) {
                this.$element.unwrap()
            }
        }
    }

    Sticky.defaults = {
        wrapper: '<div class="sticky-wrapper" />',
        stuckClass: 'stuck',
        direction: 'down right'
    }

    Waypoint.Sticky = Sticky
}())
;
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 1: Helpers*/
var nret = nret || {};
(function($) {
    nret.helpers = {
        isIe : function() {
            $(window).load(function() {
                if(navigator.userAgent.match(/Trident.*rv:11\./)) nret.helpers.els.body.addClass('ie11');
            });
        },
        awfulFixToMobileSearchBarNotFocusing : function() {
            $('#globalSearchMbl').find('input').on('touchstart', function() {
                $(this).css('width', '84%');
            });
        },
        countrySelectEvent : function() {
            $('#initCountrySelect').on('click', function(){
                $('.global-nav__banner__country-dropdown').toggleClass('open');
            });
        },
        disableScrolling : function() {
            // http://stackoverflow.com/a/16324762
            $.fn.scrollLock=function(){return $(this).on("DOMMouseScroll mousewheel",function(h){var g=$(this),f=this.scrollTop,d=this.scrollHeight,b=g.height(),i=h.originalEvent.wheelDelta,a=i>0,c=function(){h.stopPropagation();h.preventDefault();h.returnValue=false;return false};if(!a&&-i>d-b-f){g.scrollTop(d);return c()}else{if(a&&i>f){g.scrollTop(0);return c()}}})};$.fn.scrollRelease=function(){return $(this).off("DOMMouseScroll mousewheel")};
        },

        closeElementOnDocumentClick : function() {
            // if click is NOT on any trigger element or any element with modal class
            $(document).on('click', function(event) {
                if (!$(event.target).closest('.doNotClose, .ui-icon, .ui-corner-all').length) {
                    $('.open').removeClass('show show-now');
                    if ($('.filter__options-wrapper__filter-option').length) {
                        $('.filter__options-wrapper__filter-option').removeClass('open');
                    }
                }
            });
        },

        whatTypeOfDevice : function() {
            if(WURFL.form_factor == "Tablet"){
                nret.helpers.els.body.addClass('device-tablet');
                nret.helpers.els.body.addClass('mobile');
            } else if (WURFL.form_factor == "Smartphone") {
                nret.helpers.els.body.addClass('device-phone');
                nret.helpers.els.body.addClass('mobile');
            } else {
                nret.helpers.els.body.addClass('device-desktop');
                nret.helpers.els.body.addClass('desktop');
            }
        },

        triggerClickOnFooterNewsletterLink : function () {
            if ( nret.helpers.els.body.hasClass('mobile') ) {
                var el = $('.footer__item.newsletter').find('.footer__item-title');
                el.on('click', function() {
                    $(this).next().trigger('click');
                });
            }
        },

        validateEmailEvent : function() {
            $('.form-submit').on('submit', function(){
                var validateTheEmail = $(this).find('.email-validation');
                var emailValue = validateTheEmail.val();
                if ( nret.helpers.validateEmail(emailValue) == false ) {
                    return false;
                } else {
                    return true;
                }
            });
        },
        validateEmail : function(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        },
        noLink : function() {
            $('.nolink').on('click', function(e){
                e.preventDefault();
            });
        },
        lazyLoad : function() { // Refine this function
            $('.lazy').lazyload({
                threshold : 500
            });
        },
        openMoreOnActivitiesMapListEvent : function() {
            $('.image-on-image__intro-copy__list-item').find('h4').on('click', function() {
                var el = $(this).parent();

                if ( el.hasClass('open') ) {
                    $('.image-on-image__intro-copy__list-item').removeClass('open');
                } else {
                    $('.image-on-image__intro-copy__list-item').not(el).removeClass('open');
                    el.addClass('open');
                }
                nret.helpers.closeMoreOnActivitiesMapList(el);
                nret.helpers.openMoreOnActivitiesMapList(el);
            });
        },
        openMoreOnActivitiesMapList : function(el) {
            if ( el.hasClass('open') ) {
                el.find('.long-dash').velocity({
                    width:30,
                    marginRight:10
                }, {duration:200});
                el.find('.image-on-image__list-copy').velocity({
                    maxHeight:600,
                    opacity:1
                }, {duration:800});
            }
        },
        closeMoreOnActivitiesMapList: function(el) {
            $('.image-on-image__intro-copy__list-item').find('.long-dash').velocity({
                width:0,
                marginRight:0
            });
            $('.image-on-image__intro-copy__list-item').find('.image-on-image__list-copy').velocity({
                maxHeight:0,
                opacity:0
            });
        },
        revealHidden: function() {
            var allMods = $(".hide-block");
            allMods.each(function(i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass("reveal-block");
                }
            });
        },
        revealHiddenOnScroll : function () {
            nret.helpers.els.win.scroll(function(event) {
                nret.helpers.revealHidden();
            });
        },
        phoneHelperOpen : function() {
            $('.explorer__help-modal-inner').velocity(
                {opacity:1}, {display:'flex'}
            );
        },
        phoneHelperClose : function() {
            $('.explorer__help-modal-inner').velocity(
                {opacity:0}, {display:'none'}
            );

            $('.explorer__help-modal').velocity({
                backgroundColorAlpha: 0,
            });
        },
        phoneHelperCloseAfterTime : function() {
            window.setTimeout(closePhone, 10000);

            function closePhone() {
                if ( $('.explorer__phone').find('.inner').hasClass('fresh') ) {
                    nret.helpers.phoneHelperClose();
                    $('.explorer__phone').find('.inner').removeClass('open');
                }
            }
        },
        phoneHelperEvent : function() {
            // open to start
            $('.explorer__phone').find('.inner').on('click', function(){
                $(this).removeClass('fresh');
                if ( $(this).hasClass('open') ) {
                    nret.helpers.phoneHelperClose();
                    $(this).removeClass('open');
                } else {
                    $(this).addClass('open');
                    nret.helpers.phoneHelperOpen();
                }
            });
        },
        animateIdlePhone : function() {
            window.setTimeout(runEveryMinute, 10000);
            function runEveryMinute() {
                setInterval(wigglePhone, 50000);
            }
            function wigglePhone() {
                if ( !$('.explorer__phone').find('.inner').hasClass('open') ) {
                    $(".explorer__phone").addClass("tada").delay(1200).queue(function(next){
                        $(this).removeClass("tada");
                        next();
                    });
                }
            }
        },
        sortDestinationNamesAlphabeticallyByState : function() {
            $groups = $('.sort-list');
            var sortByState = function(a,b){
                a = $(a).find(".strike").text().split(',');
                b = $(b).find(".strike").text().split(',');

                a = a[a.length -1];
                b = b[b.length -1];

                return a == b ? 0
                    : a < b ? -1
                        :         +1
            }

            var sortByName = function(a,b){
                a = $(a).find(".strike").text();
                b = $(b).find(".strike").text();
                return a == b ? 0
                    : a < b ? -1
                        :         +1
            }

            var sortLocation = function(a,b){
                return sortByState(a,b) || sortByName(a,b);
            }

            $groups.each(function(){
                var $groupEl = $(this).find('li');
                var alphabeticallyOrderedElements = $groupEl.sort(sortLocation);

                $(this).html(alphabeticallyOrderedElements);

            });
        },
        // Wrap trigger element with dropdown element.
        // This will look for the next element & pass the ID to showdropdown function.
        // .not('.region') and .not('#acquisitionFormRegion') were added by Andres Bonilla to make normal selects on acquisition page work
        dropdownEvents : function() {
            $('.select-dropdown').not('.region').on('click', function(){
                var $this = $(this);
                var id = $(this).next().attr('id');

                nret.helpers.showDropdown(id);
                nret.helpers.changeDropdownTabValue($this);
            });

            $('.select-wrapper select, .state-select-wrapper select, .contact__topic-wrapper select').not('#acquisitionFormRegion').unbind('change').on('change', function(){
                var $this = $(this).prev();
                var val = $(this).val();

                $this.html(val + '<span class="icon icon_carrot-down"></span>');
            });
        },
        changeDropdownTabValue : function(el) {
            $this = el;
            $this.next().unbind('change').on('change', function(){
                val = $this.next().val();
                $this.html(val + '<span class="icon icon_carrot-down"></span>');
                // $this.next().removeClass('show');
            });
        },
        showDropdown : function(id) {
            var dropdown = document.getElementById(id);
            var event;
            // $(dropdown).addClass('show');
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('mousedown', true, true, window);
            dropdown.dispatchEvent(event);
        },
        openMobileAmenitiesList : function ($this) {
            var list = $this.next();
            if (list.hasClass('grow')) {
                list.removeClass('grow');
            } else {
                list.addClass('grow');
            }
        },
        openMobileAmenitiesListEvent : function() {
            $('.amenities-block').find('header').on('click', function() {
                $this = $(this);
                nret.helpers.openMobileAmenitiesList($this);
                $this.find('.icon').toggleClass('open');
            });
        },
        adjustMarginTopForElementBelowHomeHero : function () {
            if ( $(window).innerHeight() > 0) {
                if ( nret.helpers.els.body.hasClass('desktop') && $('.hero-el').length > 0 ) {
                    var h = $('.hero-el').innerHeight() - 40;
                    $('.hero-el__below').css('marginTop', h);
                }
            }
            // if (nret.helpers.els.body.hasClass('mobile') && nret.helpers.els.body.hasClass('home-page') ) {
            // 	var h = $('.hero-el').innerHeight() - 40;
            // 	$('.hero-el__below').css('marginTop', h);
            // }
        },
        adjustMarginTopOnResize : function () {
            $(window).on('resize',function() {
                nret.helpers.adjustMarginTopForElementBelowHomeHero();
            });
        },
        openCalOnLabelClick : function() {
            $('.cal').find('.input-label').on('click', function() {
                $('.cal').find('.input-container').removeClass('show');
                $(this).siblings('.input-container').toggleClass('show');
                $('.growMeMore, .growMe').removeClass('show');
            });
        },
        init: function() {
            nret.helpers.els = {
                body : $('body'),
                win : $(window)
            }
            nret.helpers.noLink();
            nret.helpers.isIe();
            nret.helpers.openCalOnLabelClick();
            nret.helpers.whatTypeOfDevice();
            nret.helpers.lazyLoad();
            nret.helpers.sortDestinationNamesAlphabeticallyByState();
            nret.helpers.openMoreOnActivitiesMapListEvent();
            nret.helpers.revealHidden();
            nret.helpers.revealHiddenOnScroll();
            nret.helpers.dropdownEvents();
            nret.helpers.disableScrolling();
            nret.helpers.closeElementOnDocumentClick();
            nret.helpers.phoneHelperEvent();
            nret.helpers.phoneHelperCloseAfterTime();
            nret.helpers.animateIdlePhone();
            nret.helpers.validateEmailEvent();
            nret.helpers.openMobileAmenitiesListEvent();
            nret.helpers.countrySelectEvent();
            nret.helpers.awfulFixToMobileSearchBarNotFocusing();
            nret.helpers.triggerClickOnFooterNewsletterLink();
            nret.helpers.adjustMarginTopForElementBelowHomeHero();
            nret.helpers.adjustMarginTopOnResize();
        }
    };


    jQuery(document).ready(function() {
        nret.helpers.init();
    });
})(jQuery);
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 2: Acquisition*/
var nret = nret || {};
(function($, window){
    var timer;
    $('#acquisitionForm').submit(function(event) {
        event.preventDefault();
        var data = $(this).serializeArray();
        var originalSubmitValue = $('#acquisitionForm input[type=submit]').val();
        var $thankYou = $('.acquisition__thankyou');
        $('#acquisitionForm input[type=submit]').val('Sending...');
        // $.ajax({
        // 	type: 'POST',
        // 	url: $(this).attr('action'),
        // 	data: data,
        // 	success: function() {
        $.ajax({
            dataType: "json",
            type: 'POST',
            url: '/themes/nretreats/templates/acquisition-form.php',
            data: data,
            success: function(response) {
                if(response.success) {
                    $('#acquisitionForm input[type=submit]').val('Sent');
                    $thankYou.addClass('show');
                } else {
                    $('#acquisitionForm input[type=submit]').val('Error, Try Again');
                }
                window.clearTimeout(timer);
                timer = setTimeout(function() {
                    $('#acquisitionForm input[type=submit]').val(originalSubmitValue);
                    $thankYou.removeClass('show');
                }, 5000);
            }
        });
        // 	}
        // });
    });
    $('#acquisitionFormRegion').on('change', function(e) {
        var $select = $(this);
        var value = $select.val();
        $select.parent().find('span.value').html(value);
        $select.find('option.remove').remove();
        if(value === 'US' || value === 'Other') {
            $('.change-city-placeholder').attr('placeholder','City');
            if($('.uk-county-field')[0]) {
                $('.uk-county-field').replaceWith('<div class="us-state state-select-wrapper"><div class="select-dropdown">State<span class="icon icon_carrot-down"></span></div><select name="USER_STATE" id="acquisitionFormState"><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District Of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select></div>');
            }
            $('.zip-to-post').attr('placeholder','Zip Code');
            $('.hidden-for-uk').show();
            $('.hidden-for-uk .required').attr('required','');
        } else if(value == 'UK/Europe') {
            $('.change-city-placeholder').attr('placeholder','Town');
            if($('.us-state.state-select-wrapper')[0]) {
                $('.us-state.state-select-wrapper').replaceWith('<input class="uk-county-field" type="text" name="USER_STATE" placeholder="County" required>');
            }
            $('.zip-to-post').attr('placeholder','Postcode');
            $('.hidden-for-uk').hide();
            $('.hidden-for-uk *[required]').addClass('required').removeAttr('required');
        }
        $('#main-acquisition-form-content').removeClass('hidden');
    });
}(jQuery, window));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 3: bazaar*/
var nret = nret || {};
(function($){

    nret.bazaar = {


        submitGeneric : function() {
            $BV.ui('rr', 'submit_generic', {});
        },

        initGenericFormEvent: function(){
            $('#initReviewsGeneric').on('click', function() {
                nret.bazaar.submitGeneric();
            });
        },

        init : function() {
            // nret.bazaar.adjustDropdownOnHover();
            nret.bazaar.initGenericFormEvent();
            // nret.bazaar.displayFeaturedReviews();
        }
    };

    jQuery(document).ready(function() {
        nret.bazaar.init();

    });

}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 4: Booking*/
var nret = nret || {};
(function ($, ga) {
    nret.booking = {
        init: function () {
            nret.booking.trackGuestDetails();
            nret.booking.bookingSubmitDisable();
        },
        bookingSubmitDisable: function(){
            //braintree does not provide a hook while loading payment responses, so this function disables the button while it is loading to prevent clicking multiple times while awaiting response.
            $('.retreat_guest_form_submit').on('click', function(e){
                var isValid = true;
                $('.email-validation, .phone-validation, .zip-validation, .creditcard-select').each(function(){
                    var inputEl = $(this);
                    if (inputEl.val() == ""){
                        isValid = false
                    } else {
                        return
                    }
                })
                if(isValid){
                    $('.retreat_guest_form_submit').addClass('disabled')
                }
            })
        },
        sendToBVOnSuccess: function (bvOrderId, bvTax, bvTotal, bvEndDate, bvSku, bvEmail) {
            var shippingDate = moment(bvEndDate).format('YYYY-MM-DD');
            $BV.SI.trackTransactionPageView({
                "orderId": bvOrderId,
                "tax": bvTax,
                "total": bvTotal,
                "shippingDate": shippingDate,
                "items": [{"sku": bvSku}],
                "email": bvEmail
            });
        },
        trackBooking: function (id, revenue, tax, retreatName, retreatId, destinationName) {
            ga('require', 'ecommerce');
            ga('ecommerce:addTransaction', {
                'id': id,
                'affiliation': 'Natural Retreats',
                'revenue': revenue,
                'tax': tax
            });
            ga('ecommerce:addItem', {
                'id': id,
                'name': retreatName,
                'sku': retreatId,
                'category': destinationName
            });
            ga('ecommerce:send');
        },
        trackGuestDetails: function () {
            var guest_details = $('.guestInfo__form .step1');
            var guest_details_inputs = guest_details.find('input');
            var timer;
            var guest_details_complete;
            var guest_details_data = {
                Title: 'sir',
                ReceiveOffers: 0,
                Country: 'na'
            };
            guest_details_inputs.on('keypress', function () {
                guest_details_complete = true;
                if (timer) clearTimeout(timer);
                timer = setTimeout(function () {
                    _.each(guest_details_inputs, function (input) {
                        var $input = $(input);
                        guest_details_data[$input.attr('name')] = $input.val();
                        if ($input.val() === '') guest_details_complete = false;
                    });
                    if (guest_details_complete) {$.post('/api/v1/createguest', guest_details_data);}
                }, 3000);
            });
        },
        submitPromoCodeFromBookingWidget: function () {
            $('#applyBookingPromo').on('click', function () {
                if (nret.booking.formIsValidForPromoApply()) {
                    var numOfAdults = $('#bookingAdultCount').val();
                    var numOfChildren;
                    if ($('#bookingChildrenCount').val() == "") {
                        numOfChildren = 0;
                    } else {
                        numOfChildren = $('#bookingChildrenCount').val();
                    }
                    var numOfGuests = parseInt(numOfAdults) + parseInt(numOfChildren);
                    var currency = {'3':'&#36;', '2':'&#8364;', '1':'&#163;'};
                    var bookingDestinationId = $('#bookingDestinationId').val();
                    var promoCode = $('.input__promo').val();
                    var retreatId = $('#bookingRetreatId').val();
                    var regionId = $('#bookingRegionId').val();
                    var nights = $('#booking-nights').val();
                    var date = $('#check-in').datepicker('getDate');
                    var m_names = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');
                    var curr_date = date.getDate();
                    var curr_month = date.getMonth();
                    var curr_year = date.getFullYear();
                    var date = curr_date + '-' + m_names[curr_month] + '-' + curr_year;
                    var url = '/api/v1/checkdiscountcode/' + bookingDestinationId + '/' + retreatId + '/' + regionId + '/' + promoCode + '/' + date + '/' + nights + '/' + numOfGuests;
                    $('#bookingGuestsCount').val(numOfGuests);
                    $.ajax({
                        url: url,
                        success: function (result) {
                            if (result.data && result.data.NewPrice) {
                                var newPrice = result.data.NewPrice;
                                $('#newBookingWidgetPromoPrice').html('The total price for your stay is '+ currency[regionId] + newPrice);
                                Cookies.set('promo_code', promoCode);
                            } else {
                                $('.input__promo, .booking-widget__promo-field__submit').addClass('promo-error');
                                $('.booking-widget__promo-error').addClass('show');
                            }
                        },
                        error: function (error) {
                            $('.input__promo, .booking-widget__promo-field__submit').addClass('promo-error');
                            $('.booking-widget__promo-error').addClass('show');
                        }
                    });
                }
            });
        },
        formIsValidForPromoApply: function () {
            var valid = true;
            var $checkin = $("#bookingCheckIn");
            var $checkout = $("#bookingCheckOut");
            var $promoFieldInput = $(".booking-widget__promo-field input");
            var $adults = $("#bookingAdultCount");
            //var $children = $("#bookingChildrenCount");
            var $promo = $(".input__promo");
            if ($checkin.datepicker('getDate') === null) {
                valid = false;
            }
            if ($checkout.datepicker('getDate') === null) {
                valid = false;
            }
            if (!$promoFieldInput.val()) {
                valid = false;
            }
            if (!$adults.val()) {
                valid = false;
            }
            /*if (!$children.val()) {
             valid = false;
             }*/
            if (!$promo.val()) {
                valid = false;
            }
            return valid;
        },
        setPromoCodeIfExists: function () {
            var promoCode = Cookies.get('promo_code');
            var promoCodeInput = $('#promoCode');
            if (promoCode !== undefined) {
                promoCodeInput.val(promoCode);
                promoCodeInput.prop('disabled', true);
                $('#bookingPromoApply').remove();
            }
        },
        resubmitWithNewPromoCode: function (promo) {
            var form = $('#promoCodeResubmit');
            var promoCode = promo;
            var field = $('<input>');
            field.attr('type', 'hidden');
            field.attr('name', 'DiscountCode');
            field.attr('value', promoCode);
            Cookies.set('promo_code', promoCode);
            nret.booking.setPromoCodeIfExists();
            form.append(field);
            form.submit();
        },
        resubmitPromoCodeEvent: function () {
            $('#bookingPromoApply').on('click', function () {
                var promo = $('#promoCode').val();
                if (promo !== '') {
                    nret.booking.resubmitWithNewPromoCode(promo);
                }
            });
        }
    };
    jQuery(document).ready(function () {
        nret.booking.submitPromoCodeFromBookingWidget();
        nret.booking.setPromoCodeIfExists();
        nret.booking.resubmitPromoCodeEvent();
    });
}(jQuery, ga));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 5*/
var nret = nret || {};
(function($) {
    var currencySymbols = {
            '3': '&#36;',
            '2': '&#8364;',
            '1': '&#163;'
        },
        regionId = $('#bookingRegionId').val(),
        currencySymbol = currencySymbols[regionId];

    nret.braintree = {
        init: function(config) {
            var creditcardFee = {
                    MSCD: 0.02,
                    VISA: 0.02,
                    JCB: 0.03
                },
                startAmount = false;
            $('.creditcard-select').on('change', function() {
                var amountInput = $('input[name="Amount"]'),
                    amount = amountInput.attr('value'),
                    creditCardSelected = $(this).val(),
                    region = $(this).data('region');
                if (!startAmount) startAmount = amount;
                $('#braintree-form').removeClass('hidden');
                $('.grandtotal-table').find('.creditcard-fee').remove();
                if ((region == 1 || region == 2) && creditcardFee[creditCardSelected]) {
                    var fee = startAmount * creditcardFee[creditCardSelected];
                    fee = fee.toFixed(2);
                    $('.grandtotal-table').append('<tr class="creditcard-fee"><td>credit card fee</td><td>' + currencySymbol + fee + '</td></tr>');
                }
            });
            nret.braintree.form = config.form;
            braintree.setup(config.braintreeToken, 'dropin', {
                container: config.container,
                onPaymentMethodReceived: function(paymentRecievedObj) {
                    nret.braintree.paymentMethodReceived(paymentRecievedObj);
                }
            });
        },
        paymentMethodReceived: function(paymentRecievedObj) {
            //post form
            nret.braintree.form.append('<input type="hidden" value="' + paymentRecievedObj.nonce + '" name="Nonce">').submit();
        }
    };
}(jQuery));
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
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 7*/
var nret = nret || {};
(function($, window){
    var timer;
    $('#contact-form').submit(function(event) {
        event.preventDefault();
        var data = $(this).serializeArray();
        var originalSubmitValue = $('#contact-form input[type=submit]').val();
        $('#contact-form input[type=submit]').val('Sending...');
        $.ajax({
            type: 'POST',
            url: '/themes/nretreats/templates/contact-form.php',
            data: data,
            success: function(response) {
                var data = JSON.parse(response);
                if (data.success) {
                    $('#contact-form input[type=submit]').val('Sent');
                } else {
                    $('#contact-form input[type=submit]').val('Error, Try Again');
                }
                window.clearTimeout(timer);
                timer = setTimeout(function() {
                    $('#contact-form input[type=submit]').val(originalSubmitValue);
                }, 5000);
            }
        });
    });
}(jQuery, window));


/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 8*/
var nret = nret || {};
(function($){

    // journal_list[type]           for the type filter and assign it the value
    // *  journal_list[locations]      for the location filter and assign it the value
    // *  journal_list[environment]    for the environment filter and assign it the value
    // *  journal_list[experiences]    for the experiences filter and assign it the value


    nret.cookies = {

        setupJournalCookies : function(journal_list_type,journal_list_location,journal_list_environment,journal_list_experiences) {

            Cookies.set('journal_list_type', journal_list_type);
            Cookies.set('journal_list_location', journal_list_location);
            Cookies.set('journal_list_environment', journal_list_environment);
            Cookies.set('journal_list_experiences', journal_list_experiences);

        },


        setLocationCookiesFromHome : function() {
            $('a[data-home-location]').on('click', function() {
                var location = $(this).attr('data-home-location');
                Cookies.set('destination_location',location);
                $('a[data-home-location]').not($(this)).removeClass('filter-selected');
                $(this).addClass('filter-selected');
                $('#initHomeSearch').attr('href','/node/'+location);
                $('.destination.home__search__choice').html($(this).html());
                $('.global-nav__destinations.home__search__dropdown').removeClass('show');
                nret.home.changeStartBtnColorOnSelection();
            });

        },

        setCountryCookies : function() {
            $('a[data-country-selection]').on('click', function() {
                var country = $(this).attr('data-country-selection');

                Cookies.set('country_selection', country);
            });
        },

        setFirstTimeCookie : function() {
            if (Cookies.get('first_session')) {
                nret.home.closeNavBanner();
            } else {
                Cookies.set('first_session', false);
            }
        },

        init : function() {
            nret.cookies.setCountryCookies();
            nret.cookies.setLocationCookiesFromHome();
            nret.cookies.setFirstTimeCookie();
        }
    };

    jQuery(document).ready(function() {
        nret.cookies.init();
    });

}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 9*/
var nret = nret || {};
(function($){
    var dragPos = 0,
        dragBarW;
    nret.drag = {
        initDraggable : function() {
            $('.scroll-el').draggable(
                { axis: "x" },
                { containment: '.scroll-el-wrapper', scroll: false },
                { drag: function( event, ui ) {
                    dragPos = ui.position.left;
                    nret.drag.slideElements($(this));
                }
                });
            dragBarW = $('.scroll-el-wrapper').innerWidth() - 25;
        },

        resizeScreen : function () {
            window.onresize = function() {
                nret.drag.initDraggable();
            }
        },

        initSlide :function () {
            if($(window).innerWidth() > 767 && $('body').hasClass('desktop')  ){
                window.requestAnimationFrame(nret.drag.slideElements);
            }
        },

        slideElements : function(el) {
            var scrollEl = el.parents('.scroll-drag').prev();
            var dragScrollToPercent = (dragPos / dragBarW) * 100,
                pixelsToSlide = scrollEl[0].scrollWidth - scrollEl[0].clientWidth;
            scrollEl[0].scrollLeft = (pixelsToSlide * (dragScrollToPercent * .01));
        },

        init : function() {
            nret.drag.initDraggable();
        }
    };

    jQuery(document).ready(function() {
        if ( $('.scroll-drag').length > 0 ) {
            nret.drag.init();
            nret.drag.resizeScreen();
        }
    });
}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 10*/
var nret = nret || {};
(function($) {
    var monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        monthsToShow = window.innerWidth < 769 ? 1 : 2;

    nret.enquiry = {
        createCalendar : function() {
            $('#retreatEnquiryCheckIn').on('click', function(){
                setTimeout(function(){
                    nret.enquiry.els.enquiryCheckIn.datepicker('refresh');
                }, 10);
            })

            nret.enquiry.els.enquiryCheckIn.prop('disabled', false).datepicker({
                minDate: new Date(),
                numberOfMonths: monthsToShow,
                dateFormat: 'M dd yy',
                beforeShow: function(){
                    if (window.innerWidth < 769 && !$.contains('.enquiry-check-in', '#ui-datepicker-div')) {
                        var detachedDatepicker = $('#ui-datepicker-div').detach();
                        detachedDatepicker.appendTo('.enquiry-check-in');
                    }
                },
                onSelect: function() {
                    var date = nret.enquiry.els.enquiryCheckIn.datepicker('getDate');
                    var minDate = date;
                    // var cookieDateString = date.getDate().toString() + '-' + monthNames[date.getMonth()] + '-' + date.getFullYear().toString();
                    $("#retreatEnquiryCheckOut").datepicker('option','minDate',minDate).datepicker('setDate', date);
                    setTimeout(function() {
                        $("#retreatEnquiryCheckOut").prop('disabled', false).datepicker("show");
                    }, 100);
                }
            });
            nret.enquiry.els.enquiryCheckOut.prop('disabled', false).datepicker({
                minDate: new Date(),
                numberOfMonths: monthsToShow,
                dateFormat: 'M dd yy',
                beforeShow: function() {
                    // var date = nret.enquiry.els.enquiryCheckIn.datepicker('getDate');
                    if (window.innerWidth < 769 && !$.contains('.enquiry-check-out', '#ui-datepicker-div')) {
                        var detachedDatepicker = $('#ui-datepicker-div').detach();
                        detachedDatepicker.appendTo('.enquiry-check-out');
                    }
                }
            });
        },
        collectAndSendForm : function() {
            var timer;
            $('#retreatEnquiryForm').submit(function(event) {
                event.preventDefault();
                var data = $(this).serializeArray();
                var originalSubmitValue = $('#retreatEnquiryForm input[type=submit]').val();
                var $thankYou = $('.acquisition__thankyou');
                $('#retreatEnquiryForm input[type=submit]').val('Sending...');
                $.ajax({
                    type: 'POST',
                    url: '/themes/nretreats/templates/retreat-enquiry.php',
                    data: data,
                    success: function(response) {
                        if (response == '{"success": true}') {
                            $('#retreatEnquiryForm input[type=submit]').val('Sent');
                            $thankYou.addClass('show');
                        } else {
                            $('#retreatEnquiryForm input[type=submit]').val('Error, Try Again');
                        }
                        window.clearTimeout(timer);
                        timer = setTimeout(function() {
                            $('#retreatEnquiryForm input[type=submit]').val(originalSubmitValue);
                            nret.enquiry.els.retreatWindow.removeClass('show');
                            nret.enquiry.els.retreatWindow.scrollRelease();
                        }, 1500);
                    }
                });
            });
        },
        enquiryInteractions: function() {
            $('.enquiry__close').on('click', function() {
                nret.enquiry.els.retreatWindow.removeClass('show');
                nret.enquiry.els.retreatWindow.scrollRelease();
            });
            $('#initEnquiry').on('click', function(event) {
                event.preventDefault();
                nret.enquiry.launchEnquiry();
            });
        },
        launchEnquiry: function() {
            var checkInDate = $('#check-in').datepicker('getDate'),
                checkOutDate = $('#check-out').datepicker('getDate');
            if(!$('#retreat-search').length > 0) {
                nret.enquiry.els.enquiryCheckIn.datepicker('setDate', checkInDate);
                nret.enquiry.els.enquiryCheckOut.datepicker('setDate', checkOutDate);
            }
            nret.enquiry.els.retreatWindow.addClass('show');
            nret.enquiry.els.retreatWindow.scrollLock();
        },
        init: function() {
            nret.enquiry.els = {
                retreatWindow : $('.retreat-detail__enquiry-window'),
                enquiryCheckIn : $('#retreatEnquiryCheckIn'),
                enquiryCheckOut : $('#retreatEnquiryCheckOut')
            };
            nret.enquiry.createCalendar();
            nret.enquiry.collectAndSendForm();
            nret.enquiry.enquiryInteractions();
        }
    };

    $(document).ready(function() {
        nret.enquiry.init();
    });
}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 11*/
var nret = nret || {};
(function($){


    nret.explorer = {

        openExplorerModal : function(explorerId) {
            var modalId = explorerId;
            $('.about__explorer-modal-' + modalId).eq(0).velocity({
                opacity:1
            },{
                display:'flex'
            });
            $('content-start').addClass('quickview-blur');
            $('.about__explorer-modal').scrollLock();
            $('.about__explorer-modal').addClass('open');

        },

        closeExplorerModal : function() {
            $('.about__explorer-modal').velocity({
                opacity:0
            },{
                display:'none'
            });
            $('.content-start').removeClass('quickview-blur');
            $('.about__explorer-modal').scrollRelease();
            $('.about__explorer-modal').removeClass('open');
        },

        explorerModalEvents : function() {

            $('.openExplorerModal').on('click', function(e){
                var explorerId = $(this).attr('data-explorer-modal');
                nret.explorer.openExplorerModal(explorerId);
            });

            $('.about__explorer-modal__close').on('click', function() {
                nret.explorer.closeExplorerModal();
            });

        },

        init : function() {
            nret.explorer.explorerModalEvents();
        }
    };

    jQuery(document).ready(function() {
        nret.explorer.init();
    });

}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 12*/
var nret = nret || {};
(function($){
    nret.filters = {
        filterElementsEvent : function() {
            var filterItems = $('.filter-me');
            $('.filter-choice-init').on('click', function() {
                if ( $(this).hasClass('fresh') ) {
                    filterItems.addClass('hide');
                    $('.filter-choice-init').removeClass('fresh');
                }
                nret.filters.filterElements();
                nret.destinationListing.setResultsNum();
            });
        },
        filterElements : function() {
            var guestClass = null;
            var regions = [];

            if ($('.guest-list .filter-selected')[0]) {
                guestClass = $('.guest-list .filter-selected').attr('data-filter-choice');
            }

            $('.region-list .filter-selected').each(function() {
                regions.push($(this).attr('data-filter-choice'));
            });

            $('.filter-me').each(function() {
                var $block = $(this);
                var inRegion = false;
                var holdsGuests = false;

                if (!guestClass || $block.hasClass(guestClass)) {
                    holdsGuests = true;
                }

                if (regions.length === 0) {
                    inRegion = true;
                } else {
                    regions.forEach(function(region) {
                        if ($block.hasClass(region)) {
                            inRegion = true;
                        }
                    });
                }

                if (inRegion && holdsGuests) {
                    $block.removeClass('hide');
                } else {
                    $block.addClass('hide');
                }
            });
        },
        clearMoreFilters : function() {
            $('#clearMoreFilters').on('click', function() {
                $('.filter__more__block').find('input[type="checkbox"]').each(function() {
                    $(this).prop('checked', false);
                });
                $('.filter__more__block').find('input[type="radio"]').each(function() {
                    $(this).prop('checked', false);
                });
                $('#more-label').text('More Filters');
                Cookies.remove('retreat_list[bedrooms]');
                Cookies.remove('retreat_list[beds]');
                Cookies.remove('retreat_list[bathrooms]');
                $('input[data-more-filter-amenities]').each(function(i,el) {
                    Cookies.remove('retreat_list[amenities][' + i + ']');
                });
                $('a[data-more-filter-area]').each(function(i,el) {
                    Cookies.remove('retreat_list[subarea][' + i + ']');
                });
            });
        },
        init : function() {
            nret.filters.filterElementsEvent();
            nret.filters.clearMoreFilters();
        }
    };

    jQuery(document).ready(function() {
        nret.filters.init();
    });
}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 13*/
var nret = nret || {};
(function($) {

    nret.footer = {

        openNewsletter : function() {
            $('footer').find('#openNewsletter').on('click', function(){
                $('.footer__newsletter-signup').velocity({
                    maxHeight: 600
                }, {duration:500});
                $('.footer__newsletter-signup').find('.wrapper').velocity({
                    opacity:1
                }, {duration:800}, 'linear')
            });
        },

        closeNewsletter : function() {
            $('.footer__newsletter-signup__close').on('click', function() {
                $('.footer__newsletter-signup').velocity({
                    maxHeight: 0
                }, {duration:500});
                $('.footer__newsletter-signup').find('.wrapper').velocity({
                    opacity:0
                })
            });
        },

        phoneFix: function() {
            if(!$('body').hasClass('device-phone')) {
                var $link = $('.footer-nav__tel');
                var number = $link.html();
                $link.replaceWith('<span class="footer-nav__tel">' + number + '</span>');
            }
        },

        init : function() {
            nret.footer.phoneFix();
            nret.footer.openNewsletter();
            nret.footer.closeNewsletter();
        }

    };

    jQuery(document).ready(function() {
        nret.footer.init();
    });

})(jQuery);
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
                    // navLeftLIs.css({opacity:0});
                    // navLeftLIs.css({opacity:0});
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

                /*Subash Maharjan*/
                $('.mbl-search-menu .select-box.loc').on('click', function(){
                    var $this = $(this);
                    $('.mbl-search-menu .select-box.loc').removeClass('active');
                    $this.addClass('active');
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
            var navEl = $('#main-left-menu').find('a[href="/destination"]');
            //$('#main-menu').find('a[href="/destination"]');
            navEl.addClass('doNotClose');
            navEl.on('click', function(event) {
                //if ($('body').hasClass('desktop') && window.innerWidth > 768) {
                    event.preventDefault();
                    $('nav.global-nav').find('.global-nav__destinations').toggleClass('show');
                //}
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
                $('#main-left-menu li.first').addClass('active');
                //$('#main-menu li.first').addClass('active');
            }
        },
        showMobileDestinationSubnav: function() {
            $('.mobile-destination_subnav').addClass('show');
        },
        hideMobileDestinationSubnav: function() {
            $('.mobile-destination_subnav').removeClass('show');
            // $('.global-nav__right #main-menu li').velocity("transition.slideLeftIn", {stagger:50, duration:70, delay:150});
            $('.global-nav__right #main-left-menu li').velocity("transition.slideLeftIn", {stagger:50, duration:70, delay:150});
            $('.global-nav__right #main-right-menu li').velocity("transition.slideLeftIn", {stagger:50, duration:70, delay:150});
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

                /*Subash Maharjan*/
                // $('.checkin-label').text("Check In");
                // $('.checkout-label').text("Check Out");


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
                    console.log(retreatIdArray);
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
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 16*/
// Pease refer to Google Maps Javascript API Documentation
// If maps are showing up as blank, check to see if a height and width are set before this runs.
var nret = nret || {};
(function($){
    nret.maps = {
        mapController : function(){
            var mapMarkers = [],
                activeMarker,
                pinColor = "505866",
                inactiveMarker =  new google.maps.MarkerImage("/themes/nretreats/images/pin_alt.png");
            return {
                updateMarker: function(marker){
                    if(activeMarker){
                        activeMarker.setIcon(inactiveMarker);
                    }
                    activeMarker = marker;
                    marker.setIcon();
                },
                push:function(marker){
                    mapMarkers.push(marker);
                },
                setHightlightContainer:function(container){
                    for(var markerItem=0; markerItem < mapMarkers.length; markerItem++){
                        mapMarkers[markerItem].setIcon(inactiveMarker);
                        (function(position){
                            mapMarkers[markerItem].addListener('click', function() {
                                $($('.'+container).children()[position]).find('h4').trigger('click');
                            });
                        })(markerItem);
                    }
                    $('.'+container).children().on('click',function(obj){
                        this.updateMarker(mapMarkers[$(obj.currentTarget).index()])
                    }.bind(this));
                    $(function(){
                        $($('.'+container).children()[0]).find('h4').trigger('click');
                    });
                },
                setBounds:function(map){
                    var bounds = new google.maps.LatLngBounds();
                    for(var markerItem=0; markerItem < mapMarkers.length; markerItem++){
                        bounds.extend(mapMarkers[markerItem].getPosition());
                    }

                    map.fitBounds(bounds);

                    zoomChangeBoundsListener =
                        google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
                            if (this.getZoom()){
                                this.setZoom(this.getZoom() - 2);
                            }
                        });
                    setTimeout(function(){google.maps.event.removeListener(zoomChangeBoundsListener)}, 2000);
                }
            }
        },
        initMap : function(lat, lng, el, markersArray, highlightOnClickContainer,zoom) {
            var zoom = zoom;
            var latLng;
            var destinationId = null;
            var region = null;
            var allMarkers = [];
            var regionArr = [];

            if (zoom === undefined) {
                zoom = 8;
            }
            // Specify features and elements to define styles.
            var styleArray = [
                {
                    featureType: "all",
                    stylers: [
                        { saturation: -80 }
                    ]
                },{
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [
                        { hue: "#e4e4e4" },
                        { saturation: 50 }
                    ]
                },{
                    featureType: "poi.business",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                }
            ];

            var map = new google.maps.Map(el, {
                    center: {lat: lat, lng: lng},
                    scrollwheel: false,
                    styles: styleArray,
                    disableDefaultUI: false,
                    zoom: zoom
                }),
                mapController = new this.mapController();
            if (markersArray.length > 0) {
                var mapCardContainer = $('.map-card__container');
                var c = 0;
                markersArray.forEach(function(index){
                    latLng = {lat: parseFloat(index[0]), lng: parseFloat(index[1])};
                    if (index[2]) {
                        destinationId = index[2];
                    }
                    if (index[3]) {
                        region = String(index[3]);
                    }
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        id : destinationId,
                        region: region,
                        animation: google.maps.Animation.DROP
                    }); // end market obj
                    mapController.push(marker);
                    allMarkers.push(marker);
                    google.maps.event.addListener(marker, 'click', function () {
                        mapCardContainer.removeClass('show');
                        mapCardContainer.each(function() {
                            if ($(this).data('destinationcard') == marker.id) {
                                $(this).addClass('show');
                            }
                        });
                    });
                    c++;
                }) // end for each

                $('.region-list').find('.filter-choice-init').on('click', function() {

                    var r = $(this).data('filter-choice');
                    if(jQuery.inArray(r, regionArr) !== -1) {
                        for (var i=regionArr.length-1; i>=0; i--) {
                            if (regionArr[i] === r) {
                                regionArr.splice(i, 1);
                            }
                        }
                    } else {
                        regionArr.push(r);
                    }

                    for(i=0; i < allMarkers.length; i++) {
                        var region = allMarkers[i].region;
                        allMarkers[i].setMap(null);
                        for (t=0;t<regionArr.length;t++) {
                            if (region === regionArr[t]) {
                                allMarkers[i].setMap(map);
                            }
                        }
                    }

                    // Wait for class to be added from page_destinationListing.js
                    window.setTimeout(function() {
                        // If none are selected, show all markers
                        if ( $('.region-list').find('.filter-selected').length === 0 ) {
                            showAllMarkers();
                        }
                    }, 100);
                });

                // Shares handler with class filter__clear
                $('.destination-listing__filter-clear').on('click', function() {
                    showAllMarkers();
                });

                function showAllMarkers() {
                    for(i=0; i < allMarkers.length; i++) {
                        allMarkers[i].setMap(map);
                    }
                }

                if(highlightOnClickContainer){
                    mapController.setHightlightContainer(highlightOnClickContainer);
                    mapController.setBounds(map);
                }
            } //end if

        },

        getMapElements : function(mapSelector) {
            var maps = mapSelector || $('.map');
            maps.each(function(){
                var zoom = undefined;
                var $this = $(this),
                    el = this,
                    spliceNum,
                    lat = $this.attr('data-lat'),
                    latNum = Number(lat),
                    lng = $this.attr('data-lng'),
                    lngNum = Number(lng),
                    markersArray = [],
                    highlightOnClickContainer = $this.data('highlightonclickcontainer');
                if ($this.attr('data-zoom')) {
                    zoom = parseInt($this.attr('data-zoom'));
                }
                if($this.attr('id') === 'destinationListMap') {
                    spliceNum = 4;
                } else {
                    spliceNum = 2;
                }

                if ( $this.data('markers') ) {
                    var dataArray = $(this).data('markers');
                    if($this.attr('id') === 'destinationListMap') {
                        dataArray = dataArray.replace('[', '').replace(']', '').split(',');
                    }
                    for (var i = 0; i < dataArray.length; i++) {
                        var items = dataArray.splice(0,spliceNum);
                        if (dataArray.length == spliceNum) {
                            markersArray.push(dataArray);
                        }
                        markersArray.push(items);
                    }
                }
                nret.maps.initMap(latNum, lngNum, el, markersArray, highlightOnClickContainer, zoom);
            });
        },

        runMapInOrder : function() {
            nret.maps.getMapElements();
        }
    };


}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 17*/
var nret = nret || {};
(function($){
    nret.newsletter = {

        submitNewsletterForm : function() {
            $('.newsletter-email').on('submit', function(e) {
                e.preventDefault();

                var form = $(this),
                    data = form.serialize();
                $.ajax({
                    url: '/api/v1/newsletter',
                    type: 'POST',
                    data: data,
                    success : function(result) {


                        form.velocity({opacity:0});
                        if(	form.siblings('.newsletter-error').hasClass('show') ) {
                            form.siblings('.newsletter-error').removeClass('show');
                        }
                        form.siblings('.newsletter-thankyou').addClass('show');
                    },
                    error : function(result) {

                        form.siblings('.newsletter-error').addClass('show');
                    }
                })
            });
        },


        init : function() {
            nret.newsletter.submitNewsletterForm();
        }
    };

    jQuery(document).ready(function() {
        nret.newsletter.init();
    });

}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 18*/
var nret = nret || {};
(function($){

    var storeVideo = false,
        currentQuickView;

    nret.quickView = {

        openQuickView : function($this) {
            var quickviewId = $this.data('quickview-id'),
                el = $($('#quickview-modal-'+ quickviewId).html()),
                map = $(el.find('.quickview-map'));

            this.renderQuickView(el, map);

            //Hide video if playing in background
            if($('.video__bg').length){
                storeVideo = $('.video__bg');
                storeVideo.hide();
            }

            el.velocity({
                opacity:1
            },{
                display:'flex'
            });
            $('.content-start').addClass('quickview-blur');
            el.addClass('open');

        },
        renderQuickView: function(view, map){
            if(currentQuickView){
                currentQuickView.remove();
            }
            currentQuickView = view;
            $('body').append(view);
            nret.imageGallery.initImageGallery();
            nret.imageGallery.imageGalleryControls();
            nret.maps.getMapElements(map);
            $('.quickview-modal__close').on('click', function() {
                nret.quickView.closeQuickView();
            });
        },
        closeQuickView : function() {
            if(storeVideo){
                storeVideo.show();
            }
            $('.quickview-modal').velocity({
                opacity:0
            },{
                display:'none'
            });
            $('.content-start').removeClass('quickview-blur');
            $('.quickview-modal').removeClass('open');
        },

        quickViewEvents : function() {

            $('.quickview').on('click', function(e){
                var $this = $(this);
                nret.quickView.openQuickView($this);
            });

        },

        init : function() {
            nret.quickView.quickViewEvents();
        }
    };



}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 21*/
var nret = nret || {};
(function($){


    nret.retreatSearchWidget = {

        changeLabelOnSelect : function() {
            $('.global-nav__destinations__destination-list-wrapper').find('.custom-check-input').on('change', function() {
                var destinationString = ' Destinations';
                var count = $(this).parents('.global-nav__destinations__destination-list-wrapper').find('.custom-check-input:checked').length;
                if (count === 1){ destinationString = ' Destination'; }
                if (count === 0){ count = ""; }
                $('.destination.home__search__choice').text(count + destinationString);
            });
        },

        init : function() {
            nret.retreatSearchWidget.changeLabelOnSelect();
        }
    };

    jQuery(document).ready(function() {
        nret.retreatSearchWidget.init();
    });

}(jQuery));
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
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 23*/
var nret = nret || {};
(function($){


    nret.search = {
        onSearchKeyUp : function() {
            nret.search.els.globalSearchInput.bind("keyup change", function(e) {
                nret.search.els.searchQuickLinks.removeClass('show');
            })
        },

        goToSearchPage : function(e) {
            $('#globalSearch, #globalSearchMbl').on('submit', function(e) {
                e.preventDefault();
                var inputVal = $(this).find('input').val();
                window.location.href = '/search/results/' + inputVal;
            });
        },

        openSearchInNav : function() {
            setTimeout(function(){
                nret.search.els.globalSearchInput.focus();
            },500);
            nret.search.els.globalNavSearchWrapper.velocity(
                {opacity:1}, {display:'flex'}, {
                    complete: function() {
                        nret.search.els.globalSearchInput.focus();
                    }
                }
            );
            nret.search.els.globalNavSearchWrapper.find('input').focus();
            nret.search.els.searchQuickLinks.addClass('show');
        },

        closeSearchInNav : function() {
            nret.search.els.globalNavSearchWrapper.velocity(
                {opacity:0}, {display:'none'}
            );
            nret.search.els.searchQuickLinks.removeClass('show');
        },

        searchInNavInitEvent : function() {
            $('#closeSearchInNav').on('click', function() {
                nret.search.closeSearchInNav();
            });

            $('#openSearchInNav').on('click', function() {
                nret.search.openSearchInNav();
            });
        },

        init : function() {
            nret.search.els = {
                globalSearchInput : $('#globalSearchInput'),
                globalNavSearchWrapper : $('.global-nav__search-wrapper'),
                searchQuickLinks : $('.search__quick-links')
            }
            nret.search.searchInNavInitEvent();
            nret.search.goToSearchPage();
            nret.search.onSearchKeyUp();
            nret.search.els.globalSearchInput.autocomplete({
                appendTo:'.page-body',
                forceFixPosition:true,
                serviceUrl: '/search/autocomplete',
                dataType:'JSON',
                transformResult:function(response, term){
                    return{
                        suggestions: function(){
                            var suggestionsFormat = [];
                            _.each(response, function(type) {
                                var suggestion =
                                    _.map(type, function(keyvalue) {
                                        return {
                                            value: keyvalue.Title,
                                            data: keyvalue.url
                                        }
                                    });
                                suggestionsFormat.push(suggestion)
                            });
                            return _.flatten(suggestionsFormat);
                        }(),
                        'query':term
                    }
                },
                onSelect: function (suggestion) {
                    var value = suggestion.value;
                    window.location.href = '/search/results/' + encodeURIComponent(value);
                }
            });
        }
    };

    jQuery(document).ready(function() {
        nret.search.init();
    });

}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 24*/
var nret = nret || {};
(function($){
    nret.styles = {
        growAnimationFiltersClass : function() {
            $('.initGrow').on('click', function(event) {
                var $element = $(this),
                    $elementParent = $element.parent().hasClass('input-container') ? $element.parent().parent() : $element.parent();
                $growMeElement = $('.growMe', $elementParent);
                $elementParent.toggleClass('open');
                $('.filter__options-wrapper__filter-option').not($elementParent).removeClass('open');
                $('.growMe').not($growMeElement).removeClass('show');
                $('.growMeMore').removeClass('show');
                $growMeElement.toggleClass('show');
                $('.cal').find('.input-container').removeClass('show');
                event.stopPropagation();
            });

            $('.initGrowMore').on('click', function(event) {
                var el = $('.growMeMore');
                var elParent = $(this).parent();
                elParent.toggleClass('open');
                $('.filter__options-wrapper__filter-option').not(elParent).removeClass('open');
                $('.growMe').removeClass('show');
                el.toggleClass('show');
                $('.cal').find('.input-container').removeClass('show');
                event.stopPropagation();
            });
        },
        moveMoreFilterLeft: function() {
            var w = $('.filter__more__block').eq(0).innerWidth();
            $('#moreFiltersWrapper').velocity({
                translateX: '-='+w
            });
        },
        moveMoreFilterLeftEvent: function() {
            $('#moreOptionsScrollLeft').on('click', function() {
                nret.styles.moveMoreFilterLeft()
            });
        },
        moveMoreFilterRight : function() {
            var w = $('.filter__more__block').eq(0).innerWidth();
            $('#moreFiltersWrapper').velocity({
                translateX: '+=' + w
            });
        },
        moveMoreFilterRightEvent: function() {
            $('#moreOptionsScrollRight').on('click', function() {
                nret.styles.moveMoreFilterRight();
            });
        },
        animateNumberCount : function(id, start, end, duration) {
            var range = end - start;
            var current = start;
            var increment = end > start? 1 : -1;
            var stepTime = Math.abs(Math.floor(duration / range));
            var obj = document.getElementById(id);
            var timer = setInterval(function() {
                current += increment;
                obj.innerHTML = current;
                if (current == end) {
                    clearInterval(timer);
                }
            }, stepTime);
        },
        init : function() {
            nret.styles.growAnimationFiltersClass();
            nret.styles.moveMoreFilterRightEvent();
            nret.styles.moveMoreFilterLeftEvent();
        }
    };

    jQuery(document).ready(function() {
        nret.styles.init();
    });
}(jQuery));
/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 25*/
(function($) {
    var player;
    var videoId;
    var iframe;
    var open = true;
    var flip = false;
    var pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28";
    var play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26";
    var $animation = $('#animation');

    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    $('#initVideoPlayer').on('click', function(){
        $('.video__player').addClass('open');
        $('.video__player').velocity(
            {opacity:1 }, {display:'block'}
        );
        videoId = $(this).attr('data-videoId');
        onYouTubeIframeAPIReady(videoId);
        $('.page-body').addClass('quickview-blur');
        $('.video__player').scrollLock();
    });

    function onYouTubeIframeAPIReady(videoId) {
        player = new YT.Player('ytVideo', {
            width: 600,
            height: 400,
            videoId: videoId,
            playerVars: {
                'controls': 0,
                'modestbranding' :0,
                'autoplay' : 1,
                'showinfo' : 0
            },
            events: {
                onReady: initialize,
                'onStateChange' : function(event) {
                    if (event.data == YT.PlayerState.PLAYING) {
                        animatePlayPauseBtn();
                    } else if (event.data == YT.PlayerState.PAUSED){
                        animatePlayPauseBtn();
                    }

                }
            }
        });
    }

    function initialize(){
        var time_update_interval;

        // Update the controls on load
        // Work in Progress
        updateProgressBar();

        // Clear any old interval.
        clearInterval(time_update_interval);

        // Start interval to update elapsed time display and
        // the elapsed part of the progress bar every second.
        time_update_interval = setInterval(function () {
            updateProgressBar();
        }, 1000)
    }

    // Scroll and scrub
    $('#progressBar').on('click touchend', function (e) {
        var totalWidth = $('#progressBar').width();
        // innerWidth = $('')

        // Calculate the new time for the video.
        // new time in seconds = total duration in seconds * ( value of range input / 100 )
        var newTime = player.getDuration() * (e.clientX / 100)

        // Skip video to new time.
        player.seekTo(newTime);

    });

    // Open Sharing module
    $('.video__control__share').on('click', function() {
        var share = $(this).find('.video__control__share__list');
        open = !open;

        if ( open === true ) {
            share.velocity({
                height: 0
            }, {duration:200});
        } else {
            share.velocity({
                height:80
            }, {duration:200});

        }
    });

    // Fullscreen video
    $('.video__control__fullscreen').on('click', function() {
        iframe = document.getElementById('ytVideo');
        playFullscreen(iframe);
    });

    // Close and Destroy Video element
    $('.video__control__close').on('click', function() {
        destroyVideo();
        $('.page-body').removeClass('quickview-blur');
        $('.video__player').scrollRelease();
    });

    $(".ytp-play-button").on('click', function() {
        if (flip === false) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
    });

    function escapeClose() {
        $(document).keyup(function(e) {
            if (e.keyCode == 27) { // escape key maps to keycode `27`
                if ( $('.video__player').hasClass('open') ) {
                    destroyVideo();
                }
            }
        });
    };

    function playFullscreen (){
        var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
        if (requestFullScreen) {
            requestFullScreen.bind(iframe)();
        }
    }

    function updateProgressBar(){
        // Update the value of our progress bar accordingly.
        var duration = (player.getCurrentTime() / player.getDuration()) * 100;
        var durationToPercent = duration + '%';
        $('#progressBar').find('div').velocity({
            width: durationToPercent
        });
    }

    function destroyVideo() {
        $('.video__player').velocity(
            {opacity:0 }, {display:'none'}
        );
        player.destroy();
        $('.video__player').removeClass('open');
    }

    function animatePlayPauseBtn() {
        flip = !flip;
        $animation.attr({
            "from": flip ? pause : play,
            "to": flip ? play : pause
        }).get(0).beginElement();
    };

}(jQuery));