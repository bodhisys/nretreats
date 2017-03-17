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