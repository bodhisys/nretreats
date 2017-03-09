/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 40*/
var nret = nret || {};
(function($) {
    nret.page_retreatSearch = {
        openDestinationList: function() {
            var $el = $('.global-nav__destinations__destination-list-wrapper');
            $('#destination-label').on('click', function() {
                $('.growMeMore, .growMe').not($el).removeClass('show');
                $el.toggleClass('show');
            });
        },

        viewMore: function() {
            $('.retreat-view-more').on('click', function(e){
                e.preventDefault();
                var $el = $('.retreats-search-results .retreat-listing__block-small.hide');
                for(var i = 0; i < 30; i++){
                    if($($el[i]).length > 0){
                        $($el[i]).removeClass('hide').addClass('show');
                    } else {
                        $('.retreat-view-more').fadeOut();
                    }
                }
            })
        },

        initResults: function(){
            var $el = $('.retreats-search-results .retreat-listing__block-small');
            for(var i = 0; i < 30; i++){
                if($($el[i])){
                    $($el[i]).removeClass('hide').addClass('show');
                }
            }
            if($el.length < 20){
                $('.too-many-results').hide();
            }
            if($el.length <= 30){
                $('.retreat-view-more').hide();
            }
        },

        init: function() {
            nret.page_retreatSearch.openDestinationList();
            nret.page_retreatSearch.initResults();
            nret.page_retreatSearch.viewMore();
        }
    };
}(jQuery));