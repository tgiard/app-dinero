<?php
// Database connection values
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'qfcpthuic');
define('DB_NAME', 'dineroDB');

if(isset($_POST['username'], $_POST['password'])) {
  extract($_POST);

  $db = mysql_connect(DB_HOST, DB_USERNAME, DB_PASSWORD);
if (!$db) {
    die('Could not connect: ' . mysql_error());
}else mysql_select_db(DB_NAME, $db);

  if($action == 'register' 
      && isset($_POST['firstname'], $_POST['lastname'], $_POST['email'])) {
    // Verify that the username is unique
    $query = mysql_query("select count(id) 
      from ibm_user_auth where username='$username'");
    $result = mysql_fetch_row($query);
    if ( $result[0] > 0 ) {
      $out = "<error id='0'><suggestions>";
      $out .= "<suggestion>" . $firstname . $lastname . "</suggestion>";
      $out .= "<suggestion>" . $firstname . "_" . $lastname . "</suggestion>";
      $out .= "<suggestion>" . $lastname . $firstname . "</suggestion>";
      $out .= "<suggestion>" . $lastname . "_" . $firstname . "</suggestion>";
      $out .= "</suggestions></result>";
      die($out);
    }

    // Validate email
    if( !preg_match("^[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&
        '\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})$^", 
      $_POST['email']) ) {
      die("<error id='1' />");
    }

    mysql_query("insert into ibm_user_auth 
      (username, password, firstname, lastname, email) 
      VALUES ('$username', MD5('$password'), '$firstname', '$lastname', '$email')");
    die("<success />");
  }
  else if($action == 'login') {
    $query = mysql_query("select count(id) from ibm_user_auth 
        where username='$username' 
        and password=md5('$password')");
    $result = mysql_fetch_row($query);
    if($result[0] == 1) {
      session_start();
      $_SESSION['username'] = $username;
      die("<success />");
    }
    else die("<error id='2' />");
  }
}

?>
