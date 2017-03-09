<?php
class Mailer 
{
	private $errors = array();
	
	private $__body = null;
	
	private $__toemail = null;
	
	private $__subject = null;
	
	private $__fromemail = null;
	
	private $__fromname = null;
	
	private $__sendStatus = false;
	
	const TO_EMAIL = '"Natural Retreats Concierge" <concierge@naturalretreats.com>';
	
	public function setError($key,$message)
	{
	    $this->errors[$key] = $message;
	}
	
	public function setToEmail($toEmail,$useDefault = true)
	{
		if (empty($toEmail) && !$useDefault)
		{
		    $this->setError('toemail','empty');
		}
	    if (!filter_var($toEmail, FILTER_VALIDATE_EMAIL) && !$useDefault)
	    {
	        $this->setError('toemail','invalid');
	    }
	    if($this->isOk())
	    {
	        $this->__toemail = $toEmail;
	    }
	    if(!$this->isOk() && $useDefault)
	    {
	        $this->__toemail = self::TO_EMAIL;
	    }
	    return $this;
	}
	
	public function setFromEmail($fromEmail)
	{
		if (empty($fromEmail))
		{
		    $this->setError('email','empty');
		}
	    if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL))
	    {
	        $this->setError('email','invalid');
	    }else{
	        $this->__fromemail = $fromEmail;
	    }
	    return $this;
	}
	
	public function setFromName($fromName)
	{
	    if (empty($fromName))
	    {
	        $this->setError('name','empty');
	    }else{
	        $this->__fromname = $fromName;
	    }
	    return $this;
	}
	
	public function setSubject($subject)
	{
	    if (empty($subject))
	    {
	        $this->setError('contact__topic','empty');
	    }else{
	        $this->__subject = $subject;
	    }
	    return $this;
	}
	
	public function setBody($body)
	{
	    if (empty($body))
	    {
	        $this->setError('contact__question','empty');
	    }else{
	        $this->__body = $body;
	    }
	    return $this;
	}
	
	public function run() 
	{
		if ($this->sendMail()->isOk())
		{
			$this->onSuccess();
		} else {
			$this->onError();
		}
	}

	private function isOk() 
	{
		return count($this->errors) === 0;
	}

	private function sendMail() {
	    if($this->isOk())
	    {    	
    		if (!mail($this->__toemail, $this->__subject, $this->__body, $this->makeHeaders()))
    		{
    		    $this->setError('sendMail','failed');
    		}
	    }
		return $this;
	}
	
	private function makeHeaders()
	{
	    $headers = 'From: "' . $this->__fromname . '" <web@naturalretreats.com>' . "\r\n" .
	        'Reply-To: "' . $this->__fromname . '" <' . $this->__fromemail . ">\r\n" .
	        "Content-Type: text/html; charset=ISO-8859-1\r\n" .
	        'X-Mailer: PHP/' . phpversion();
	    return $headers;
	}
	
	private function onSuccess() {
		echo '{"success": true}';
	}
	
	private function onError() {
		$response = '{"success": false, "errors": [';
		foreach ($this->errors as $key => $value) {
			$response .= "{ \"field\": \"$key\", \"error\": \"$value\"},";
		}
		if (count($this->errors) > 0) $response = substr($response, 0, -1);
		$response .= ']}';
		echo $response;
	}
}