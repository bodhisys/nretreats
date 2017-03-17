/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 5*/
var nret = nret || {};
(function($) {
    var currencySymbols = {
            '3': '&#36;',
            '2': '&#8364;',
            '1': '&#163;'
        },
        regionId = $('#bookingRegionId').val(),
        currencySymbol = currencySymbols[regionId];

    nret.braintree = {
        init: function(config) {
            var creditcardFee = {
                    MSCD: 0.02,
                    VISA: 0.02,
                    JCB: 0.03
                },
                startAmount = false;
            $('.creditcard-select').on('change', function() {
                var amountInput = $('input[name="Amount"]'),
                    amount = amountInput.attr('value'),
                    creditCardSelected = $(this).val(),
                    region = $(this).data('region');
                if (!startAmount) startAmount = amount;
                $('#braintree-form').removeClass('hidden');
                $('.grandtotal-table').find('.creditcard-fee').remove();
                if ((region == 1 || region == 2) && creditcardFee[creditCardSelected]) {
                    var fee = startAmount * creditcardFee[creditCardSelected];
                    fee = fee.toFixed(2);
                    $('.grandtotal-table').append('<tr class="creditcard-fee"><td>credit card fee</td><td>' + currencySymbol + fee + '</td></tr>');
                }
            });
            nret.braintree.form = config.form;
            braintree.setup(config.braintreeToken, 'dropin', {
                container: config.container,
                onPaymentMethodReceived: function(paymentRecievedObj) {
                    nret.braintree.paymentMethodReceived(paymentRecievedObj);
                }
            });
        },
        paymentMethodReceived: function(paymentRecievedObj) {
            //post form
            nret.braintree.form.append('<input type="hidden" value="' + paymentRecievedObj.nonce + '" name="Nonce">').submit();
        }
    };
}(jQuery));