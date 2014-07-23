<?php
setlocale(LC_TIME, "fi_FI"); 
date_default_timezone_set("Europe/Brussels");
$date = strftime("%Y-%m-%d-%A");
$timesaved = strftime("%H:%M:%S");
$file = $_POST['path'];
$cont = ''; 
$cont = $cont.$_POST['jsonObject'];

$f = fopen ($file, 'w');
 
if($f){
	fwrite($f, $cont);
	fclose($f);
	die("1");
}else{
	die("0");
}

?>
