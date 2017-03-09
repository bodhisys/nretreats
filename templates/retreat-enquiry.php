<?php
require_once 'Mailer.class.php';
 $toemails = array(
 'us' => '"Natural Retreats Concierge" <concierge@naturalretreats.com>',
 'uk' => '"Natural Retreats Info" <info@naturalretreats.com>',
 'ie' => '"Natural Retreats Info" <info@naturalretreats.com>'
 );

// $toemails = array(
//     'us' => '"Natural Retreats Concierge" <jamal.powell@domanistudios.com>',
//     'uk' => '"Natural Retreats Info" <jamal.powell@domanistudios.com>',
//     'ie' => '"Natural Retreats Info" <jamal.powell@domanistudios.com>'
// );
$mailer = new Mailer();
if(isset($_POST['toemail']) && in_array($_POST['toemail'], array_keys($toemails)))
{
    $toemail = $toemails[$_POST['toemail']];
}else{
    $toemail = $toemails['us'];
}
if(isset($_POST['FIRST_NAME']) && isset($_POST['LAST_NAME']) && isset($_POST['RETREAT_NAME']) && isset($_POST['DESTINATION_NAME']))
{
    $FIRST_NAME = filter_var($_POST['FIRST_NAME'], FILTER_SANITIZE_STRING);
    $LAST_NAME = filter_var($_POST['LAST_NAME'], FILTER_SANITIZE_STRING);
    $EMAIL = filter_var($_POST['EMAIL'], FILTER_SANITIZE_STRING);
    $TEL = filter_var($_POST['TEL'], FILTER_SANITIZE_STRING);
    $CHECK_IN = filter_var($_POST['CHECK_IN'], FILTER_SANITIZE_STRING);
    $CHECK_OUT = filter_var($_POST['CHECK_OUT'], FILTER_SANITIZE_STRING);
    $MESSAGE = filter_var($_POST['MESSAGE'], FILTER_SANITIZE_STRING);
    $DESTINATION_NAME = filter_var($_POST['DESTINATION_NAME'], FILTER_SANITIZE_STRING);
    $RETREAT_NAME = filter_var($_POST['RETREAT_NAME'], FILTER_SANITIZE_STRING);
    $name = $FIRST_NAME . ' ' . $LAST_NAME;
    $message = 'Retreat Inquiry:
	    			First Name: '.$FIRST_NAME.'
	    			Last Name: '.$LAST_NAME.'
	    			Check In: '.$CHECK_IN.'
	    			Check Out: '.$CHECK_OUT.'
	    			Email: '.$EMAIL.'
	    			Telephone: '.$TEL.'
	    			Destination: '.$DESTINATION_NAME.'
	    			Retreat: '.$RETREAT_NAME.'
	    			Message : '.$MESSAGE;


    $mailer->setToEmail($toemail)
    ->setFromName($FIRST_NAME . ' ' . $LAST_NAME)
    ->setFromEmail($EMAIL)
    ->setSubject('Retreat Inquiry for ' . $RETREAT_NAME . ', ' . $DESTINATION_NAME . ' from ' . $FIRST_NAME . ' ' . $LAST_NAME)
    ->setBody($message);
}else{
    $mailer->setError('notPresent','missingvariable');
}
$mailer->run();
exit();
