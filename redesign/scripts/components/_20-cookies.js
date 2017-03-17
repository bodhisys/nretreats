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