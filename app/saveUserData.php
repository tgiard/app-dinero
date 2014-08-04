<?php
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'password');
define('DB_NAME', 'dineroDB');
define('COL_NAME', 'dynamic_cols');
define('TABLE_NAME', 'user_data');

setlocale(LC_TIME, "fi_FI"); 
date_default_timezone_set("Europe/Brussels");
$date = strftime("%Y-%m-%d-%A");
$timesaved = strftime("%H:%M:%S");
$file = $_POST['path'];
$cont = ''; 
$cont = $cont.$_POST['jsonObject'];
$user_id = $_POST['user_id'];
$project_name = $_POST['project_name'];

//DB CONNECTION
$db = mysql_connect(DB_HOST, DB_USERNAME, DB_PASSWORD);
mysql_error();
if (!$db) die('Could not connect: ' . mysql_error());
else mysql_select_db(DB_NAME, $db);


//CREATE SQL STATEMENT
$json=json_decode($_POST['jsonObject']);
//die($_POST['jsonObject']);
foreach ($json as $key => $value){
	$query = "INSERT INTO ".TABLE_NAME."(id_user, project_name, id_object, dynamic_cols) VALUES ('".$user_id."','".$project_name."', '".$key."', COLUMN_CREATE(";
	$i=0;
	foreach ($value as $key1 => $value1){
		if($i != 0) $query=$query.",";
		$query=$query."'".$key1."', '".$value1."'"; 
		$i++;
	}
	$query = $query."));";		
	if(mysql_query($query)) echo "ROW INSERTED - ".$query."\n";
	else echo 'MYSQL ERROR : Could not insert: ' . mysql_error();
}

	$query = "select id_user, project_name, id_object, COLUMN_JSON(dynamic_cols) from ".TABLE_NAME;	
	$test=mysql_query($query);
	while($row = mysql_fetch_array($test)) {
		echo $row['id_user'] . " -- " . $row['id_object'] . " -- ".$row['project_name']. " -- " . $row['COLUMN_JSON(dynamic_cols)']."\n";
	}
	die("<success />");

?>
