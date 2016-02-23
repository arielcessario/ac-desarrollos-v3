<?php
/**
 * Created by PhpStorm.
 * User: emaneff
 * Date: 28/04/2015
 * Time: 01:33 PM
 * Send a email with a new password
 */

require 'PHPMailerAutoload.php';

$data = file_get_contents("php://input");

// Decode data from js
$decoded = json_decode($data);

if ($decoded != null) {
    if ($decoded->function == 'sendMailForChat') {
        sendMailForChat($decoded->email, $decoded->nombre);
    }elseif($decoded->function == 'sendCotizacion') {
        sendCotizacion($decoded->email, $decoded->nombre, $decoded->message);
    }
}
//sendMail($decoded->email, $decoded->nombre, $decoded->mensaje, $decoded->asunto);


function sendMailForChat($email, $nombre)
{
    $mail = new PHPMailer;
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'gator4184.hostgator.com';              // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'ventas@ac-desarrollos.com';                 // SMTP username
    $mail->Password = 'ventas';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;

    $mail->From = $email;
    $mail->FromName = $nombre;
    $mail->addAddress('arielcessario@gmail.com');         // Add a recipient
    $mail->addAddress('juan.dilello@gmail.com');          // Name is optional
    $mail->addAddress('diegoyankelevich@gmail.com');      // Name is optional
    $mail->addAddress('mmaneff@gmail.com');      // Name is optional
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Nuevo chat de cliente';
    $mail->Body    = 'http://192.185.67.199/~arielces/ac-desarrollos-chat/';
    $mail->AltBody = 'http://192.185.67.199/~arielces/ac-desarrollos-chat/';

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
}

function sendCotizacion($email, $nombre, $message)
{
    $mail = new PHPMailer;
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'gator4184.hostgator.com';              // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'ventas@ac-desarrollos.com';                 // SMTP username
    $mail->Password = 'ventas';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;

    $mail->From = $email;
    $mail->FromName = $nombre;
    $mail->addAddress('arielcessario@gmail.com');         // Add a recipient
    $mail->addAddress('juan.dilello@gmail.com');          // Name is optional
    $mail->addAddress('diegoyankelevich@gmail.com');      // Name is optional
    $mail->addAddress('mmaneff@gmail.com');      // Name is optional
    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Nueva cotizaci�n';
    $mail->Body    = $message;
    $mail->AltBody = $message;

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
}


