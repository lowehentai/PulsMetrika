<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers (Kullanilacak host, benim durumumda yandex ile yaptim)
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'kiriundod@yandex.ru';                 // Наш логин (kendi e postani girecen kardesim)
$mail->Password = 'KirinUndod93SR63GPlog#';                           // Наш пароль от ящика (e postanin sifresini girecen kardesim)
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted (Merak etme sifreni hic kimse alamaz cunku 'ssl' kodlamasi kullaniliyor)
$mail->Port = 465;                                    // TCP port to connect to (genellikle herkesin portu farkli ama hatirladigim kadar '465' portu hem google'da hem de yandex'te ayni)
 
$mail->setFrom('kiriundod@yandex.ru', 'HentaiWebSite');   // От кого письмо 
$mail->addAddress($email);     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Hentai<3';                              //baslik //HTML ile e postaya gelecek yazi iskeletini olusturuyor
$mail->Body    = ' 
		Пользователь оставил данные(Kullanicisi Bilgilerini birakmistir) <br> 
	Имя(Isim): ' . $name . ' <br>
	Номер телефона(Telefon): ' . $phone . '<br>
	E-mail: ' . $email . '<br>
	Bu posta bir web sitesinden gonderilmistir PS:LoveHentai<3';

if(!$mail->send()) {
    return false;
} else {
    return true;
}
//bu script'i calistirma olayi JavaScript icinde, bu sadece mail gonderme olayi. JS ellemen gerek yok kanka orasi static olarak calisiyor baska bir siteye eklemedigin surece
?>
