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