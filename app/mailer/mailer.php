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
        sendCotizacion($decoded->cliente, $decoded->nuestros_servicios, $decoded->pagina_web,
            $decoded->comentario);
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

function sendCotizacion($cliente, $nuestros_servicios, $pagina_web, $comentario)
{
    $contacto = json_decode($cliente);
    $servicios_elegidos = json_decode($nuestros_servicios);
    $disenio_web_elegidos = json_decode($pagina_web);

    $servicios = '';
    $disenios = '';

    foreach ($servicios_elegidos as $item) {
        $precio_1 = number_format((float)$item->precio, 2, '.', '');
        $servicios = $servicios . '<tr><td style="text-align:left">' . $item->nombre . '</td><td style="text-align:right">' . $precio_1 . '</td></tr>';
    }

    foreach ($disenio_web_elegidos as $item) {
        $precio_2 = number_format((float)$item->precio, 2, '.', '');
        $disenios = $disenios . '<tr><td style="text-align:left">' . $item->nombre . '</td><td style="text-align:right">' . $precio_2 . '</td></tr>';
    }

    $message = '<html><body><div style="font-family:Arial,sans-serif;font-size:15px;margin:0 auto; width:635px;">';
    $message .= '<div style="border-style:Solid; border-color:#000000; border-color:rgba(0, 0, 0, 1); border-width:1px; left:-14px; top:-7px; width:635px;">';
    $message .= '<div style="text-align: center; margin-top: 10px;"><img src="http://192.185.67.199/~arielces/ac-desarrollos-v3/images/logo.png" width="150px"></div>';
    $message .= '<div style="color:#000;background:#FFFFFF; background:rgba(255,255,255,1); border-style:Solid; border-color:#000000; border-color:rgba(0,0,0,1); border-width:1px; margin: 10px 10px 0 10px; border-radius:12px; -moz-border-radius: 12px; -webkit-border-radius: 12px;padding-bottom: 35px;">';
    $message .= '<div style="font-weight:bold;text-align:center;font-size:1.5em; margin-top:10px;">Pedido de Cotización</div>';
    $message .= '<div style="margin-top:20px;text-align:center;">El cliente + '. $contacto->nombre .' + solicitó la siguiente cotización</div>';
    $message .= '<div style="margin:20px 0 0 15px;"><label style="font-weight:bold">E-mail: </label>' . $contacto->email . '</div>';
    $message .= '<div style="margin:20px 0 0 15px;"><label style="font-weight:bold">Teléfono: </label>' . $contacto->telefono . '</div>';
    $message .= '<div style="margin:20px 0 0 15px;"><label style="font-weight:bold">Comentario: </label>' . $contacto->message . '</div>';
    $message .= '<h3 style="margin:20px 0 0 15px;">Servicios Solicitados</h3>';
    $message .= '<div style="background: #f1e767; margin:0 auto; padding:10px; border-radius:12px; -moz-border-radius:12px; -webkit-border-radius:12px; min-height: 200px; margin-left: 5px;margin-right: 5px;">';
    $message .= '<table style="font-size:12px;color:#fff;width:100%"><tr><th style="font-size:14px;text-align:left">Servicio</th><th style="font-size:14px;text-align:right">Precio</th></tr>';
    $message .= ''. $servicios .'';
    $message .= '</table></div>';
    $message .= '<h3 style="margin:20px 0 0 15px;">Diseño de Página Web</h3>';
    $message .= '<div style="background: #f1e767; margin:0 auto; padding:10px; border-radius:12px; -moz-border-radius:12px; -webkit-border-radius:12px; min-height: 200px; margin-left: 5px;margin-right: 5px;">';
    $message .= '<table style="font-size:12px;color:#fff;width:100%"><tr><th style="font-size:14px;text-align:left">Servicio</th><th style="font-size:14px;text-align:right">Precio</th></tr>';
    $message .= ''. $disenios .'';
    $message .= '</table></div>';
    $message .= '<div style="margin:20px 0 0 15px;"><label style="font-weight:bold">Website de referencia: </label>' . $contacto->message . '</div>';
    $message .= '</div></div>';
    $message .= '</table>';
    $message .= '</div></body></html>';


    $mail = new PHPMailer;
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'gator4184.hostgator.com';              // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'ventas@ac-desarrollos.com';                 // SMTP username
    $mail->Password = 'ventas';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;

    $mail->From = $contacto->email;
    $mail->FromName = $contacto->nombre;
    $mail->addAddress('arielcessario@gmail.com');         // Add a recipient
    $mail->addAddress('juan.dilello@gmail.com');          // Name is optional
    $mail->addAddress('diegoyankelevich@gmail.com');      // Name is optional
    $mail->addAddress('mmaneff@gmail.com');      // Name is optional
    $mail->isHTML(true);                                  // Set email format to HTML
    // Activo condificacción utf-8 para evitar problemas de codificación de caracteres (eñes, tildes…)
    $mail->CharSet = 'UTF-8';

    $mail->Subject = 'Nueva cotización del Cliente ' + $contacto->nombre;
    $mail->Body    = $message;
    //$mail->AltBody = $message;

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
}


