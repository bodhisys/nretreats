<?php
require_once 'Mailer.class.php';
$toemails = array(
	    'us' => '"Natural Retreats Concierge" <concierge@naturalretreats.com>',
	    'uk' => '"Natural Retreats Info" <info@naturalretreats.com>'
	);

if(isset($_POST['toemail']) && in_array($_POST['toemail'], array_keys($toemails)))
{
    $toemail = $toemails[$_POST['toemail']];
}
$mailer = new Mailer();
$body = isset($_POST['contact__question'])?$_POST['contact__question']:'';
if(!empty($body))
{
    $body .= '<br>Name: '.$_POST['name'].'<br>Email: '.$_POST['email'];
}

$mailer->setToEmail($toemail)
       ->setFromName(isset($_POST['name'])?$_POST['name']:'')
       ->setFromEmail(isset($_POST['email'])?$_POST['email']:'')
       ->setSubject(isset($_POST['contact__topic'])?$_POST['contact__topic'] . ' Question from Contact Form':'')
			 ->setBody($body)
       ->run();
exit();
