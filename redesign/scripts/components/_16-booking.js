/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 4: Booking*/
var nret = nret || {};
(function ($, ga) {
    nret.booking = {
        init: function () {
            nret.booking.trackGuestDetails();
            nret.booking.bookingSubmitDisable();
        },
        bookingSubmitDisable: function(){
            //braintree does not provide a hook while loading payment responses, so this function disables the button while it is loading to prevent clicking multiple times while awaiting response.
            $('.retreat_guest_form_submit').on('click', function(e){
                var isValid = true;
                $('.email-validation, .phone-validation, .zip-validation, .creditcard-select').each(function(){
                    var inputEl = $(this);
                    if (inputEl.val() == ""){
                        isValid = false
                    } else {
                        return
                    }
                })
                if(isValid){
                    $('.retreat_guest_form_submit').addClass('disabled')
                }
            })
        },
        sendToBVOnSuccess: function (bvOrderId, bvTax, bvTotal, bvEndDate, bvSku, bvEmail) {
            var shippingDate = moment(bvEndDate).format('YYYY-MM-DD');
            $BV.SI.trackTransactionPageView({
                "orderId": bvOrderId,
                "tax": bvTax,
                "total": bvTotal,
                "shippingDate": shippingDate,
                "items": [{"sku": bvSku}],
                "email": bvEmail
            });
        },
        trackBooking: function (id, revenue, tax, retreatName, retreatId, destinationName) {
            ga('require', 'ecommerce');
            ga('ecommerce:addTransaction', {
                'id': id,
                'affiliation': 'Natural Retreats',
                'revenue': revenue,
                'tax': tax
            });
            ga('ecommerce:addItem', {
                'id': id,
                'name': retreatName,
                'sku': retreatId,
                'category': destinationName
            });
            ga('ecommerce:send');
        },
        trackGuestDetails: function () {
            var guest_details = $('.guestInfo__form .step1');
            var guest_details_inputs = guest_details.find('input');
            var timer;
            var guest_details_complete;
            var guest_details_data = {
                Title: 'sir',
                ReceiveOffers: 0,
                Country: 'na'
            };
            guest_details_inputs.on('keypress', function () {
                guest_details_complete = true;
                if (timer) clearTimeout(timer);
                timer = setTimeout(function () {
                    _.each(guest_details_inputs, function (input) {
                        var $input = $(input);
                        guest_details_data[$input.attr('name')] = $input.val();
                        if ($input.val() === '') guest_details_complete = false;
                    });
                    if (guest_details_complete) {$.post('/api/v1/createguest', guest_details_data);}
                }, 3000);
            });
        },
        submitPromoCodeFromBookingWidget: function () {
            $('#applyBookingPromo').on('click', function () {
                if (nret.booking.formIsValidForPromoApply()) {
                    var numOfAdults = $('#bookingAdultCount').val();
                    var numOfChildren;
                    if ($('#bookingChildrenCount').val() == "") {
                        numOfChildren = 0;
                    } else {
                        numOfChildren = $('#bookingChildrenCount').val();
                    }
                    var numOfGuests = parseInt(numOfAdults) + parseInt(numOfChildren);
                    var currency = {'3':'&#36;', '2':'&#8364;', '1':'&#163;'};
                    var bookingDestinationId = $('#bookingDestinationId').val();
                    var promoCode = $('.input__promo').val();
                    var retreatId = $('#bookingRetreatId').val();
                    var regionId = $('#bookingRegionId').val();
                    var nights = $('#booking-nights').val();
                    var date = $('#check-in').datepicker('getDate');
                    var m_names = new Array('JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC');
                    var curr_date = date.getDate();
                    var curr_month = date.getMonth();
                    var curr_year = date.getFullYear();
                    var date = curr_date + '-' + m_names[curr_month] + '-' + curr_year;
                    var url = '/api/v1/checkdiscountcode/' + bookingDestinationId + '/' + retreatId + '/' + regionId + '/' + promoCode + '/' + date + '/' + nights + '/' + numOfGuests;
                    $('#bookingGuestsCount').val(numOfGuests);
                    $.ajax({
                        url: url,
                        success: function (result) {
                            if (result.data && result.data.NewPrice) {
                                var newPrice = result.data.NewPrice;
                                $('#newBookingWidgetPromoPrice').html('The total price for your stay is '+ currency[regionId] + newPrice);
                                Cookies.set('promo_code', promoCode);
                            } else {
                                $('.input__promo, .booking-widget__promo-field__submit').addClass('promo-error');
                                $('.booking-widget__promo-error').addClass('show');
                            }
                        },
                        error: function (error) {
                            $('.input__promo, .booking-widget__promo-field__submit').addClass('promo-error');
                            $('.booking-widget__promo-error').addClass('show');
                        }
                    });
                }
            });
        },
        formIsValidForPromoApply: function () {
            var valid = true;
            var $checkin = $("#bookingCheckIn");
            var $checkout = $("#bookingCheckOut");
            var $promoFieldInput = $(".booking-widget__promo-field input");
            var $adults = $("#bookingAdultCount");
            //var $children = $("#bookingChildrenCount");
            var $promo = $(".input__promo");
            if ($checkin.datepicker('getDate') === null) {
                valid = false;
            }
            if ($checkout.datepicker('getDate') === null) {
                valid = false;
            }
            if (!$promoFieldInput.val()) {
                valid = false;
            }
            if (!$adults.val()) {
                valid = false;
            }
            /*if (!$children.val()) {
             valid = false;
             }*/
            if (!$promo.val()) {
                valid = false;
            }
            return valid;
        },
        setPromoCodeIfExists: function () {
            var promoCode = Cookies.get('promo_code');
            var promoCodeInput = $('#promoCode');
            if (promoCode !== undefined) {
                promoCodeInput.val(promoCode);
                promoCodeInput.prop('disabled', true);
                $('#bookingPromoApply').remove();
            }
        },
        resubmitWithNewPromoCode: function (promo) {
            var form = $('#promoCodeResubmit');
            var promoCode = promo;
            var field = $('<input>');
            field.attr('type', 'hidden');
            field.attr('name', 'DiscountCode');
            field.attr('value', promoCode);
            Cookies.set('promo_code', promoCode);
            nret.booking.setPromoCodeIfExists();
            form.append(field);
            form.submit();
        },
        resubmitPromoCodeEvent: function () {
            $('#bookingPromoApply').on('click', function () {
                var promo = $('#promoCode').val();
                if (promo !== '') {
                    nret.booking.resubmitWithNewPromoCode(promo);
                }
            });
        }
    };
    jQuery(document).ready(function () {
        nret.booking.submitPromoCodeFromBookingWidget();
        nret.booking.setPromoCodeIfExists();
        nret.booking.resubmitPromoCodeEvent();
    });
}(jQuery, ga));