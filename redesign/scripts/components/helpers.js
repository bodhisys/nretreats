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