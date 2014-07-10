<?php
setlocale(LC_TIME, "fi_FI"); 
date_default_timezone_set("Europe/Brussels");
$date = strftime("%Y-%m-%d-%A");
$timesaved = strftime("%H:%M:%S");
$file = "rates.json";
rename( $file , "old_rates/".$date.' : '.$timesaved.'.json' );
$cont = ''; 
//TODO remove the first line before import
//$cont = 'saved time: '.$date.' : '.$timesaved."\n"; 
$cont = $cont.$_POST['jsonObject'];
 
$f = fopen ($file, 'a+');
fwrite($f, $cont);
fclose($f);

?>
