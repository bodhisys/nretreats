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