<?php
session_start();
if(isset($_SESSION['username'])){
	die($_SESSION['username']);	
}
else die(0);

?>
