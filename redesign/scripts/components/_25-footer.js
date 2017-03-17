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