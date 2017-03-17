/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 32*/
var nret = nret || {};
(function($) {
    nret.page_promotion = {
        triggerClickOnSelect : function() {
            $('.select__wrapper').on('click', function() {
                $(this).find('select').trigger('click');
            });
        },

        changeDropdownValue : function() {
            var select = $('.select__wrapper').find('select');
            select.on('change', function() {
                val = $(this).val();
                $(this).parent('.select__wrapper').find('.select-text').text(val);
            });
        },

        validateFormFields : function () {
            var valid = true;
            var emailVal = $('.validate-email').val();
            var arr = [];
            if(nret.helpers.validateEmail(emailVal) === false) {
                valid = false;
                $('.validate-email').addClass('error');
            }

            $('.validate-text').each(function() {
                if ($(this).val() === '') {
                    valid = false;
                    $(this).addClass('error');
                }
            });

            $('.validate-select').each(function() {
                if ($(this).val() === null) {
                    valid = false;
                    $(this).parent().addClass('error');
                }
            });

            if( !$('#toc').is(':checked')) {
                valid = false;
                $('.toc-error').addClass('error');
            }

            if ( valid === true ) {
                $('input:checked[name="Answer2[]"]').each(function(){
                    arr.push($(this).val());
                    $(this).attr('disabled', true);
                });
                $('#answer2_array').val(arr.join(';'));
                nret.page_promotion.sendFormToNRES();
            }
        },

        sendFormToNRESEvent : function() {
            $('#airbnbCompFormSubmit').on('click', function (e) {
                nret.page_promotion.validateFormFields();
            });
        },

        sendFormToNRES : function(){
            var form = $('form#airbnbCompForm'),
                data = form.serialize();
            $.ajax({
                url: '/api/v1/newsletter',
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (response) {
                    $('.success-remove').fadeOut(function() {
                        $(this).remove();
                        $('.promo__form-wrapper').find('.container').addClass('success');
                        $('.copy__thank-you').fadeIn();
                        $('.promotion').addClass('success');
                        $('.promo__form-wrapper').addClass('success');
                        $('.legal').remove();
                    });
                }
            });
        },

        openTCModal : function() {
            $('.initToc').on('click', function() {
                nret.page_promotion.els.promotionTerms.addClass('show');
            });
        },

        closeTCModal : function() {
            nret.page_promotion.els.promotionTerms.on('click', function(e) {
                if (e.target !== this) {
                    return;
                }
                nret.page_promotion.els.promotionTerms.removeClass('show');
            });
        },

        init: function() {
            nret.page_promotion.els = {
                promotionTerms : $('.promotion__terms-service')
            }
            nret.page_promotion.sendFormToNRESEvent();
            nret.page_promotion.changeDropdownValue();
            nret.page_promotion.openTCModal();
            nret.page_promotion.closeTCModal();
        }
    };
}(jQuery));