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