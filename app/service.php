<?php
// Database connection values
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'password');
define('DB_NAME', 'dineroDB');
define('DATA_DIR', 'user_data');
if(isset($_POST['username'], $_POST['password'])) {
  extract($_POST);

//$db = mysql_connect(DB_HOST, DB_USERNAME, DB_PASSWORD);
//die('ok');
mysql_error();
if (!$db) die('Could not connect: ' . mysql_error());
else mysql_select_db(DB_NAME, $db);


  if($action == 'register' && isset($_POST['email'])) {

    // Verify that the username is unique
    $query = mysql_query("select count(id) 
      from user_auth where username='$username'");
    $result = mysql_fetch_row($query);
    if ( $result[0] > 0 ) {
      die("<error id='0' />");
    }

    // Validate email
    if( !preg_match("^[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&
        '\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})$^", 
      $_POST['email']) ) {
      die("<error id='1' />");
    }

    if(mysql_query("insert into user_auth 
      (username, password, email) 
      VALUES ('$username', MD5('$password'), '$email')")){
		session_start();
		$_SESSION['username'] = $username;
		mkdir(DATA_DIR."/".$username);
    		die("<success />");
	}
	else
		echo('MYSQL QUERY ERROR : ');
		die('Could not connect: ' . mysql_error());
  }
  else if($action == 'login') {
    $query = mysql_query("select count(id) from user_auth 
        where username='$username' 
        and password=md5('$password')");
    $result = mysql_fetch_row($query);
    if($result[0] == 1) {
      session_start();
      $_SESSION['username'] = $username;
      die("<success />");
    }
    else{ 
		die("<error id='2' />");}
  	}
  else{	
	echo "Ni register and email Ni login";
  }
}

?>
