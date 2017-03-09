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