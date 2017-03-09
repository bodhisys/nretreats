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