/**
 * Created by Subash Maharjan on 3/16/2017.
 */
(function ($) {
    $contactForm = $('#real-estate-contact-form');
    if (!$contactForm) return;

    $('input[type=radio][name=real-estate-topic]', $contactForm).on('change', function () {
        var topic = this.value === 'marketing' ? 'developing' : this.value;
        $('.real-estate-contact-form__follow-up', $contactForm).hide();
        $('.real-estate-contact-form__follow-up--' + topic, $contactForm).show();
    });

    $contactForm.submit(function(event) {
        event.preventDefault();
        var timer;
        var data = $(this).serializeArray();
        var originalSubmitValue = $('#real-estate-contact-form button[type=submit]').text();
        $('#real-estate-contact-form button[type=submit]').text('Sending...');
        $.ajax({
            type: 'POST',
            url: '/api/v1/realstatecontact',
            data: data,
            success: function(response) {
                if (response.error) {
                    $('#real-estate-contact-form button[type=submit]').text('Error, Try Again');
                } else {
                    $('#real-estate-contact-form button[type=submit]').text('Sent');
                }
                window.clearTimeout(timer);
                timer = setTimeout(function() {
                    $('#real-estate-contact-form button[type=submit]').text(originalSubmitValue);
                }, 5000);
            }
        });
    });
}(jQuery));