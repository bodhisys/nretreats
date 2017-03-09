/**
 * Created by Subash Maharjan on 3/9/2017.
 */
/*File 2: Acquisition*/
var nret = nret || {};
(function($, window){
    var timer;
    $('#acquisitionForm').submit(function(event) {
        event.preventDefault();
        var data = $(this).serializeArray();
        var originalSubmitValue = $('#acquisitionForm input[type=submit]').val();
        var $thankYou = $('.acquisition__thankyou');
        $('#acquisitionForm input[type=submit]').val('Sending...');
        // $.ajax({
        // 	type: 'POST',
        // 	url: $(this).attr('action'),
        // 	data: data,
        // 	success: function() {
        $.ajax({
            dataType: "json",
            type: 'POST',
            url: '/themes/nretreats/templates/acquisition-form.php',
            data: data,
            success: function(response) {
                if(response.success) {
                    $('#acquisitionForm input[type=submit]').val('Sent');
                    $thankYou.addClass('show');
                } else {
                    $('#acquisitionForm input[type=submit]').val('Error, Try Again');
                }
                window.clearTimeout(timer);
                timer = setTimeout(function() {
                    $('#acquisitionForm input[type=submit]').val(originalSubmitValue);
                    $thankYou.removeClass('show');
                }, 5000);
            }
        });
        // 	}
        // });
    });
    $('#acquisitionFormRegion').on('change', function(e) {
        var $select = $(this);
        var value = $select.val();
        $select.parent().find('span.value').html(value);
        $select.find('option.remove').remove();
        if(value === 'US' || value === 'Other') {
            $('.change-city-placeholder').attr('placeholder','City');
            if($('.uk-county-field')[0]) {
                $('.uk-county-field').replaceWith('<div class="us-state state-select-wrapper"><div class="select-dropdown">State<span class="icon icon_carrot-down"></span></div><select name="USER_STATE" id="acquisitionFormState"><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District Of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select></div>');
            }
            $('.zip-to-post').attr('placeholder','Zip Code');
            $('.hidden-for-uk').show();
            $('.hidden-for-uk .required').attr('required','');
        } else if(value == 'UK/Europe') {
            $('.change-city-placeholder').attr('placeholder','Town');
            if($('.us-state.state-select-wrapper')[0]) {
                $('.us-state.state-select-wrapper').replaceWith('<input class="uk-county-field" type="text" name="USER_STATE" placeholder="County" required>');
            }
            $('.zip-to-post').attr('placeholder','Postcode');
            $('.hidden-for-uk').hide();
            $('.hidden-for-uk *[required]').addClass('required').removeAttr('required');
        }
        $('#main-acquisition-form-content').removeClass('hidden');
    });
}(jQuery, window));