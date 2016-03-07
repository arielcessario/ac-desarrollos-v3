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
        sendCotizacion($decoded->cliente, $decoded->nuestros_servicios, $decoded->nueva_web, $decoded->pagina_web,
            $decoded->comentario, $decoded->website_referencia, $decoded->dominio_info, $decoded->registro_dominio,
            $decoded->dominio_deseado, $decoded->graficos, $decoded->otro_disenio_grafico, $decoded->reunion,
            $decoded->hosting);
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

function sendCotizacion($cliente, $nuestros_servicios, $nueva_web, $pagina_web, $comentario,
                        $website_referencia, $dominio_info, $registro_dominio, $dominio_deseado,
                        $graficos, $otro_disenio_grafico, $reunion, $hosting)
{

    $serviciosList = json_decode($nuestros_servicios);
    $disenioList = json_decode($pagina_web);
    $dominiosList = json_decode($registro_dominio);
    $graficosList = json_decode($graficos);

    $contacto = json_decode($cliente);
    $hosting_info = json_decode($hosting);
    $reunion_info = json_decode($reunion);

    $servicios = '';
    $disenios = '';
    $registros = '';
    $graficos_2 = '';

    $subtotal_1 = 0;
    $subtotal_2 = 0;
    $subtotal_3 = 0;
    $subtotal_4 = 0;

    if(count($serviciosList) > 1) {
        foreach ($serviciosList as $item) {
            $subtotal_1 = $subtotal_1 + $item->precio;
            $precio_1 = number_format((float)$item->precio, 2, '.', '');
            $servicios = $servicios . '<tr><td style="text-align:left;">' . $item->nombre . '</td><td style="text-align:right">' . $precio_1 . '</td></tr>';
        }
        $servicios = $servicios . '<tr><td style="text-align:left;font-weight: bold;">SubTotal: </td><td style="text-align:right;font-weight: bold;">' . number_format((float)$subtotal_1, 2, '.', '') . '</td></tr>';
    }

    if(count($disenioList) > 1) {
        foreach ($disenioList as $item) {
            $subtotal_2 = $subtotal_2 + $item->precio;
            $precio_2 = number_format((float)$item->precio, 2, '.', '');
            $disenios = $disenios . '<tr><td style="text-align:left;font-weight: bold;">' . $item->nombre . '</td><td style="text-align:right">' . $precio_2 . '</td></tr>';
        }
        $disenios = $disenios . '<tr><td style="text-align:left;font-weight: bold;">SubTotal: </td><td style="text-align:right;font-weight: bold;">' . number_format((float)$subtotal_2, 2, '.', '') . '</td></tr>';
    }

    if(count($dominiosList) > 1) {
        foreach ($dominiosList as $item) {
            $subtotal_3 = $subtotal_3 + $item->precio;
            $precio_3 = number_format((float)$item->precio, 2, '.', '');
            $registros = $registros . '<tr><td style="text-align:left">' . $item->nombre . '</td><td style="text-align:right">' . $precio_3 . '</td></tr>';
        }
        $registros = $registros . '<tr><td style="text-align:left;font-weight: bold;">SubTotal: </td><td style="text-align:right;font-weight: bold;">' . number_format((float)$subtotal_3, 2, '.', '') . '</td></tr>';
    }

    if(count($graficosList) > 1) {
        foreach ($graficosList as $item) {
            $subtotal_4 = $subtotal_4 + $item->precio;
            $precio_4 = number_format((float)$item->precio, 2, '.', '');
            $graficos_2 = $graficos_2 . '<tr><td style="text-align:left">' . $item->nombre . '</td><td style="text-align:right">' . $precio_4 . '</td></tr>';
        }
        $graficos_2 = $graficos_2 . '<tr><td style="text-align:left;font-weight: bold;">SubTotal: </td><td style="text-align:right;font-weight: bold;">' . number_format((float)$subtotal_4, 2, '.', '') . '</td></tr>';
    }

    $total = $subtotal_1 + $subtotal_2 + $subtotal_3 + $subtotal_4;

    $message = '<html><body><div style="font-family:Arial,sans-serif;font-size:15px;margin:0 auto; width:635px;">';
    $message .= '<div style="left:-14px; top:-7px; width:635px;">';
    $message .= '<div style="text-align: center; margin-top: 10px;"><img src="http://192.185.67.199/~arielces/ac-desarrollos-v3/images/logo.png" width="150px"></div>';
    $message .= '<div style="color:#000;background:#FFFFFF; background:rgba(255,255,255,1); border-style:Solid; border-color:#000000; border-color:rgba(0,0,0,1); border-width:1px; margin: 10px 10px 0 10px; border-radius:12px; -moz-border-radius: 12px; -webkit-border-radius: 12px;padding-bottom: 35px;">';
    $message .= '<div style="font-weight:bold;text-align:center;font-size:1.5em; margin-top:10px;">Pedido de Cotización</div>';
    $message .= '<div style="margin-top:20px;text-align:center;">El cliente '. $contacto->nombre .' solicitó la siguiente cotización</div>';
    $message .= '<div style="margin:20px 0 0 15px;"><label style="font-weight:bold">Empresa: </label>' . $contacto->empresa . '</div>';
    $message .= '<div style="margin:10px 0 0 15px;"><label style="font-weight:bold">E-mail: </label>' . $contacto->email . '</div>';
    $message .= '<div style="margin:10px 0 0 15px;"><label style="font-weight:bold">Teléfono: </label>' . $contacto->telefono . '</div>';
    $message .= '<div style="margin:10px 0 0 15px;"><label style="font-weight:bold">Comentario: </label>' . $contacto->message . '</div>';
    $message .= '<h3 style="margin:20px 0 0 15px;color:#f548a2;font-size:24px">Servicios Solicitados</h3>';
    $message .= '<div style="background: #eee; margin:0 auto; padding:10px; border-radius:12px; -moz-border-radius:12px; -webkit-border-radius:12px; min-height: 150px; margin-left: 5px;margin-right: 5px;">';
    $message .= '<table style="font-size:12px;color:#000;width:100%"><tr><th style="font-size:16px;text-align:left;color:lightseagreen;">Servicio</th><th style="font-size:16px;text-align:right;color:lightseagreen;">Precio</th></tr>';
    $message .= ''. $servicios .'';
    $message .= '</table></div>';
    $message .= '<h3 style="margin:20px 0 0 15px;color:#f548a2;font-size:24px">Diseño de Página Web</h3>';
    $message .= '<p style="margin:10px 0 5px 15px;">' . $nueva_web . '</p>';
    $message .= '<div style="margin:5px 0 5px 15px;"><label style="font-weight:bold">Su proyecto: </label>' . $comentario . '</div>';
    $message .= '<div style="margin:20px 0 0 15px;"><label style="font-weight:bold">Website de referencia: </label>' . $website_referencia . '</div>';
    $message .= '<div style="background: #eee; margin:0 auto; padding:10px; border-radius:12px; -moz-border-radius:12px; -webkit-border-radius:12px; min-height: 200px; margin-left: 5px;margin-right: 5px;">';
    $message .= '<table style="font-size:12px;color:#000;width:100%"><tr><th style="font-size:16px;text-align:left;color:lightseagreen;">A desarrollar</th><th style="font-size:16px;text-align:right;color:lightseagreen;">Precio</th></tr>';
    $message .= ''. $disenios .'';
    $message .= '</table></div>';
    $message .= '<h3 style="margin:20px 0 0 15px;color:#f548a2;font-size:24px">Servicio de Hosting y Correos</h3>';
    $message .= '<div style="margin:5px 0 5px 15px;"><label style="font-weight:bold">Solicitar: </label>' . $hosting_info->solicitar_hosting . '</div>';
    $message .= '<div style="background: #eee; margin:0 auto; padding:10px; border-radius:12px; -moz-border-radius:12px; -webkit-border-radius:12px; min-height: 60px; margin-left: 5px;margin-right: 5px;">';
    $message .= '<div style="margin:5px 0 5px 15px;"><label style="font-weight:bold">Plan del Hosting: </label>' . $hosting_info->plan . '</div>';
    $message .= '<div style="margin:5px 0 5px 15px;"><label style="font-weight:bold">Hosting (Precio/mes): </label>' . number_format((float)$hosting_info->precio, 2, '.', '') . '</div>';
    $message .= '</div>';
    $message .= '<h3 style="margin:20px 0 0 15px;color:#f548a2;font-size:24px">Registro de Dominios</h3>';
    $message .= '<p style="margin:10px 0 5px 15px;">' . $dominio_info . '</p>';
    $message .= '<div style="margin:5px 0 5px 15px;"><label style="font-weight:bold">Dominio deseado: </label>' . $dominio_deseado . '</div>';
    $message .= '<div style="background: #eee; margin:0 auto; padding:10px; border-radius:12px; -moz-border-radius:12px; -webkit-border-radius:12px; min-height: 100px; margin-left: 5px;margin-right: 5px;">';
    $message .= '<table style="font-size:12px;color:#000;width:100%"><tr><th style="font-size:16px;text-align:left;color:lightseagreen;">Dominios solicitados</th><th style="font-size:16px;text-align:right;color:lightseagreen;">Precio</th></tr>';
    $message .= ''. $registros .'';
    $message .= '</table></div>';
    $message .= '<h3 style="margin:20px 0 0 15px;color:#f548a2;font-size:24px">Diseño Gráfico</h3>';
    $message .= '<div style="margin:5px 0 5px 15px;"><label style="font-weight:bold">Otro: </label>' . $otro_disenio_grafico . '</div>';
    $message .= '<div style="background: #eee; margin:0 auto; padding:10px; border-radius:12px; -moz-border-radius:12px; -webkit-border-radius:12px; min-height: 100px; margin-left: 5px;margin-right: 5px;">';
    $message .= '<table style="font-size:12px;color:#000;width:100%"><tr><th style="font-size:16px;text-align:left;color:lightseagreen;">Diseño</th><th style="font-size:16px;text-align:right;color:lightseagreen;">Precio</th></tr>';
    $message .= ''. $graficos_2 .'';
    $message .= '</table></div>';
    $message .= '<div style="margin:5px 0 5px 15px;"><label style="font-weight:bold">Total Presupuestado: </label>' . number_format((float)$total, 2, '.', '') . '</div>';
    $message .= '<h3 style="margin:20px 0 0 15px;color:#f548a2;font-size:24px">Información Adicional</h3>';
    $message .= '<div style="margin:5px 0 5px 15px;"><label style="font-weight:bold">¿Cómo nos conoció? </label>' . $reunion_info->como_nos_conocio . '</div>';
    $message .= '<div style="margin:5px 0 5px 15px;"><label style="font-weight:bold">¿Desea una reunión? </label>' . $reunion_info->desea_reunion . '</div>';
    $message .= '<div style="margin:5px 0 5px 15px;"><label style="font-weight:bold">Lugar de la reunión: </label>' . $reunion_info->lugar_reunion . '</div>';
    $message .= '<div style="margin:5px 0 5px 15px;"><label style="font-weight:bold">Fecha y hora de reunión: </label>' . $reunion_info->fecha_reunion . '</div>';
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
    $mail->addAddress('diegoyankelevich@gmail.com');      // Name is optional
    $mail->addAddress('mmaneff@gmail.com');      // Name is optional
    $mail->isHTML(true);                                  // Set email format to HTML
    // Activo condificacción utf-8 para evitar problemas de codificación de caracteres (eñes, tildes…)
    $mail->CharSet = 'UTF-8';

    $mail->Subject = 'Nueva cotización del Cliente ' . $contacto->nombre;
    $mail->Body    = $message;
    //$mail->AltBody = $message;

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
}


