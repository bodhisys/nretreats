/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 7*/
var nret = nret || {};
(function($, window){
    var timer;
    $('#contact-form').submit(function(event) {
        event.preventDefault();
        var data = $(this).serializeArray();
        var originalSubmitValue = $('#contact-form input[type=submit]').val();
        $('#contact-form input[type=submit]').val('Sending...');
        $.ajax({
            type: 'POST',
            url: '/themes/nretreats/templates/contact-form.php',
            data: data,
            success: function(response) {
                var data = JSON.parse(response);
                if (data.success) {
                    $('#contact-form input[type=submit]').val('Sent');
                } else {
                    $('#contact-form input[type=submit]').val('Error, Try Again');
                }
                window.clearTimeout(timer);
                timer = setTimeout(function() {
                    $('#contact-form input[type=submit]').val(originalSubmitValue);
                }, 5000);
            }
        });
    });
}(jQuery, window));

