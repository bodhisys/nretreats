/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 10*/
var nret = nret || {};
(function($) {
    var monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        monthsToShow = window.innerWidth < 769 ? 1 : 2;

    nret.enquiry = {
        createCalendar : function() {
            $('#retreatEnquiryCheckIn').on('click', function(){
                setTimeout(function(){
                    nret.enquiry.els.enquiryCheckIn.datepicker('refresh');
                }, 10);
            })

            nret.enquiry.els.enquiryCheckIn.prop('disabled', false).datepicker({
                minDate: new Date(),
                numberOfMonths: monthsToShow,
                dateFormat: 'M dd yy',
                beforeShow: function(){
                    if (window.innerWidth < 769 && !$.contains('.enquiry-check-in', '#ui-datepicker-div')) {
                        var detachedDatepicker = $('#ui-datepicker-div').detach();
                        detachedDatepicker.appendTo('.enquiry-check-in');
                    }
                },
                onSelect: function() {
                    var date = nret.enquiry.els.enquiryCheckIn.datepicker('getDate');
                    var minDate = date;
                    // var cookieDateString = date.getDate().toString() + '-' + monthNames[date.getMonth()] + '-' + date.getFullYear().toString();
                    $("#retreatEnquiryCheckOut").datepicker('option','minDate',minDate).datepicker('setDate', date);
                    setTimeout(function() {
                        $("#retreatEnquiryCheckOut").prop('disabled', false).datepicker("show");
                    }, 100);
                }
            });
            nret.enquiry.els.enquiryCheckOut.prop('disabled', false).datepicker({
                minDate: new Date(),
                numberOfMonths: monthsToShow,
                dateFormat: 'M dd yy',
                beforeShow: function() {
                    // var date = nret.enquiry.els.enquiryCheckIn.datepicker('getDate');
                    if (window.innerWidth < 769 && !$.contains('.enquiry-check-out', '#ui-datepicker-div')) {
                        var detachedDatepicker = $('#ui-datepicker-div').detach();
                        detachedDatepicker.appendTo('.enquiry-check-out');
                    }
                }
            });
        },
        collectAndSendForm : function() {
            var timer;
            $('#retreatEnquiryForm').submit(function(event) {
                event.preventDefault();
                var data = $(this).serializeArray();
                var originalSubmitValue = $('#retreatEnquiryForm input[type=submit]').val();
                var $thankYou = $('.acquisition__thankyou');
                $('#retreatEnquiryForm input[type=submit]').val('Sending...');
                $.ajax({
                    type: 'POST',
                    url: '/themes/nretreats/templates/retreat-enquiry.php',
                    data: data,
                    success: function(response) {
                        if (response == '{"success": true}') {
                            $('#retreatEnquiryForm input[type=submit]').val('Sent');
                            $thankYou.addClass('show');
                        } else {
                            $('#retreatEnquiryForm input[type=submit]').val('Error, Try Again');
                        }
                        window.clearTimeout(timer);
                        timer = setTimeout(function() {
                            $('#retreatEnquiryForm input[type=submit]').val(originalSubmitValue);
                            nret.enquiry.els.retreatWindow.removeClass('show');
                            nret.enquiry.els.retreatWindow.scrollRelease();
                        }, 1500);
                    }
                });
            });
        },
        enquiryInteractions: function() {
            $('.enquiry__close').on('click', function() {
                nret.enquiry.els.retreatWindow.removeClass('show');
                nret.enquiry.els.retreatWindow.scrollRelease();
            });
            $('#initEnquiry').on('click', function(event) {
                event.preventDefault();
                nret.enquiry.launchEnquiry();
            });
        },
        launchEnquiry: function() {
            var checkInDate = $('#check-in').datepicker('getDate'),
                checkOutDate = $('#check-out').datepicker('getDate');
            if(!$('#retreat-search').length > 0) {
                nret.enquiry.els.enquiryCheckIn.datepicker('setDate', checkInDate);
                nret.enquiry.els.enquiryCheckOut.datepicker('setDate', checkOutDate);
            }
            nret.enquiry.els.retreatWindow.addClass('show');
            nret.enquiry.els.retreatWindow.scrollLock();
        },
        init: function() {
            nret.enquiry.els = {
                retreatWindow : $('.retreat-detail__enquiry-window'),
                enquiryCheckIn : $('#retreatEnquiryCheckIn'),
                enquiryCheckOut : $('#retreatEnquiryCheckOut')
            };
            nret.enquiry.createCalendar();
            nret.enquiry.collectAndSendForm();
            nret.enquiry.enquiryInteractions();
        }
    };

    $(document).ready(function() {
        nret.enquiry.init();
    });
}(jQuery));