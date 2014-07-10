<?php
setlocale(LC_TIME, "fi_FI"); 
date_default_timezone_set("Europe/Brussels");
$date = strftime("%Y-%m-%d-%A");
$timesaved = strftime("%H:%M:%S");
$file = .$_POST['fileName'];
//$file = "test.json";
$cont = '';  
$cont = $cont.$_POST['jsonObject'];
 

$f = @fopen($file, "x");
if ($f !== false) {
    ftruncate($f, 0);
    fclose($f);
}

$f = fopen ($file, 'c');
ftruncate($f, 0);
fwrite($f, $cont);
fclose($f);

?>
