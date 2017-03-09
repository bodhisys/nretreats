<?php

require_once 'Mailer.class.php';
$toemails = array(
    'us' => '"Natural Retreats Concierge" <handpicked@naturalretreats.com>',
    'uk' => '"Natural Retreats Concierge" <handpickeduk@naturalretreats.com>'
);

$toemail = $toemails['us'];
if(isset($_POST['REGION']))
{
    $region = substr(strtolower($_POST['REGION']),0,2);
    if(in_array($region, array_keys($toemails)))
    {
        $toemail = $toemails[$region];
    }
}

$mailer = new Mailer();

$body = 'Contact Information:
Title: '.filter_var($_POST['TITLE'], FILTER_SANITIZE_STRING).'
First Name: '.filter_var($_POST['FIRST_NAME'], FILTER_SANITIZE_STRING).'
Last Name: '.filter_var($_POST['LAST_NAME'], FILTER_SANITIZE_STRING).'
Email: '.filter_var($_POST['EMAIL'], FILTER_SANITIZE_STRING).'
Telephone: '.filter_var($_POST['TEL'], FILTER_SANITIZE_STRING).'
User Address: '.filter_var($_POST['USER_ADDRESS1'], FILTER_SANITIZE_STRING).'
User City: '.filter_var($_POST['USER_CITY'], FILTER_SANITIZE_STRING).'
User State: '.filter_var($_POST['USER_STATE'], FILTER_SANITIZE_STRING).'
User Zip: '.filter_var($_POST['USER_ZIP'], FILTER_SANITIZE_STRING).'
Property Address : '.filter_var($_POST['PROPERTY_ADDRESS1'], FILTER_SANITIZE_STRING).'
Property City : '.filter_var($_POST['PROPERTY_CITY'], FILTER_SANITIZE_STRING).'
Property STATE : '.filter_var($_POST['PROPERTY_STATE'], FILTER_SANITIZE_STRING).'
Property ZIP : '.filter_var($_POST['PROPERTY_ZIP'], FILTER_SANITIZE_STRING).'
Legally Allowed to rent this property? '.filter_var($_POST['PROPERTYLEGAL'], FILTER_SANITIZE_STRING).'
Bedrooms : '.filter_var($_POST['BEDROOMS'], FILTER_SANITIZE_STRING).'
Bathrooms : '.filter_var($_POST['BATHROOMS'], FILTER_SANITIZE_STRING).'
Sleeps how many? '.filter_var($_POST['SLEEPSCOUNT'], FILTER_SANITIZE_STRING).'
Square Feet :  '.filter_var($_POST['SQFEET'], FILTER_SANITIZE_STRING).'
Estimated Value : '.filter_var($_POST['ESTVALUE'], FILTER_SANITIZE_STRING);
if(isset($_POST['FEATURE1']))
{
    $body .= 'Feature Set 1 : '.filter_var(implode(", ",$_POST['FEATURE1']), FILTER_SANITIZE_STRING);
}
if(isset($_POST['FEATURE2']))
{
    $body .= 'Feature Set 2 : '.filter_var(implode(", ",$_POST['FEATURE2']), FILTER_SANITIZE_STRING);
}
if(isset($_POST['VIEWS']))
{
    $body .= 'Views : '.filter_var(implode(", ",$_POST['VIEWS']), FILTER_SANITIZE_STRING);
}
$body .= 'Description Views : '.filter_var($_POST['DESCR'], FILTER_SANITIZE_STRING).'
Description Unique : '.filter_var($_POST['DESCR2'], FILTER_SANITIZE_STRING);

$mailer->setToEmail($toemail)
->setFromName((isset($_POST['FIRST_NAME']) && isset($_POST['LAST_NAME']))?$_POST['FIRST_NAME'] . ' ' . $_POST['LAST_NAME']:'')
->setFromEmail(isset($_POST['EMAIL'])?$_POST['EMAIL']:'')
->setSubject((isset($_POST['FIRST_NAME']) && isset($_POST['LAST_NAME']))?'Acquisition form requestion from ' . $_POST['FIRST_NAME'] . ' ' . $_POST['LAST_NAME']:'')
->setBody($body)
->run();
exit();
