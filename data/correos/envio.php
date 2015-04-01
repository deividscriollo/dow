<?php
require ('sendgrid.php');
require ('email.php');
$sendgrid = new SendGrid("thyrons", "thyrons0910");
$email    = new SendGrid\Email();

$email->addTo("test@sendgrid.com")
      ->setFrom("you@youremail.com")
      ->setSubject("Sending with SendGrid is Fun")
      ->setHtml("and easy to do anywhere, even with PHP");

$sendgrid->send($email);
?>