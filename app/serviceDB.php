<?php
/*ERROR CODES
-1 : action unknown
0 : email already exists
1 : email invalid
2 : email or password not set
3 : mysql query problem insert new user
4 : invalid login (email or password)
5 : not logged
6 : project name or user id not set
7 : mysql query problem insert new project
8 : mysql query problem insert project already exists
9 : project not found in db
10 : problem inserting object
11 : problem getting id project
12 : problem getting projects list
13 : problem getting objects list
14 : problem deleting project
15 : problem inserting social user
*/
/*SUCCESS CODES
0 : REGISTER OK
1 : LOGIN OK
2 : LOGOUT OK
3 : CHECK LOG OK
4 : PROJECT ADDED
5 : OBJECT SAVED
6 : PROJECT CLEARED
7 : PROJECT DELETED
8 : FACEBOOK USER ALREADY REGISTERED
*/

// Database connection values
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'password');
define('DB_NAME', 'dinero_app');
define('TABLE_USERS', 'users');
define('TABLE_PROJECTS', 'projects');
define('TABLE_OBJECTS', 'objects');
if(isset($_POST['action'])){
	extract($_POST);

	$db = mysql_connect(DB_HOST, DB_USERNAME, DB_PASSWORD);
	if (!$db) die('Could not connect: ' . mysql_error());
	else mysql_select_db(DB_NAME, $db);

//REGISTER
	if($action == 'register'){ 
		if(isset($email,$password)){

	    		// Verify that the email is unique
	    		$query = mysql_query("select count(id) from ".TABLE_USERS." where email='$email' and flag=1");
	    		$result = mysql_fetch_row($query);
			if ( $result[0] > 0 ) die("<error id='0' />");    

			// Validate email
			if( !preg_match("^[a-z0-9,!#\$%&'\*\+/=\?\^_`\{\|}~-]+(\.[a-z0-9,!#\$%&
			'\*\+/=\?\^_`\{\|}~-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.([a-z]{2,})$^", 
			$email)) die("<error id='1' />");
			$query = "insert into ".TABLE_USERS." (flag,firstname, lastname, password, email) 
					VALUES (1,'$firstname','$lastname', MD5('$password'), '$email')";

			if(mysql_query($query)){
				session_start();

	    			// Set user id
				$_SESSION['userid'] = mysql_insert_id();
				$_SESSION['firstname'] = $firstname;
			    	die("<success id='0' userid=".$_SESSION['userid']." firstname=".$_SESSION['firstname']."/>");
			}else{
				echo($query);
				echo('MYSQL INSERT ERROR : '. mysql_error());
				die("<error id='3' />");
			}
			
		}else{
			die("<error id='2' />");
		}

//LOGIN	
	}else if($action == 'login'){ 
		if(isset($email,$password)){
			$query = "select id,firstname,flag from ".TABLE_USERS." where email='$email' and password=md5('$password')";
			$result = mysql_query($query);
	    		$row = mysql_fetch_array($result);
			if($row && $row['flag']==1){
				session_start();
				$_SESSION['userid'] = $row['id'];
				$_SESSION['firstname'] = $row['firstname'];
			    	die("<success id='1' userid=".$_SESSION['userid']." firstname=".$_SESSION['firstname']."/>");
	    		}else die("<error id='4' />");
			
		}else{
			die("<error id='2' />");
		}

//REGISTER SOCIAL
	}else if($action == 'login_social'){ 
		if(isset($id_user,$flag)){
			$query = "select id from ".TABLE_USERS." where id_social='$id_user' and flag=".$flag;
			$result = mysql_query($query);
	    		$row = mysql_fetch_array($result);
			if ( $row ){
				session_start();
				$_SESSION['userid'] = $row['id'];
				$_SESSION['firstname'] = $firstname;
			    	die("<success id='1' userid=".$_SESSION['userid']." firstname=".$_SESSION['firstname']."/>");
			}
			else{
				$query = "insert into ".TABLE_USERS." (id_social,flag,firstname, lastname, email) 
					VALUES ('$id_user','$flag','$firstname','$lastname','$email')";
				if(mysql_query($query)){
					session_start();
		    			// Set user id
					$_SESSION['userid'] = mysql_insert_id();
					$_SESSION['firstname'] = $firstname;
				    	die("<success id='0' userid=".$_SESSION['userid']." firstname=".$_SESSION['firstname']."/>");
				}else{
					//echo($query);
					//echo('MYSQL INSERT ERROR : '. mysql_error());
					die("<error id='15' />");
				}				

			}  	
		}else{
			die("<error id='2' />");
		}

//LOGOUT	
	}else if($action == 'logout'){ 

		session_start();
		session_destroy();
	    	die("<success id='2' />");

//CHECK IF LOGGED	
	}else if($action == 'refresh_session'){ 

		session_start();
		if(isset($_SESSION['userid'])){
			die("<success id='1' userid=".$_SESSION['userid']." firstname=".$_SESSION['firstname']."/>");
		}
		else die("<error id='5' />");

//SAVE PROJECT	
	}else if($action == 'create_project'){ 
		
		if(isset($project_name,$id_user)){
			$query = "insert into ".TABLE_PROJECTS." (id_user, project_name) 
					VALUES ('$id_user','$project_name')";
			if(mysql_query($query)){
			    	die("<success id='4' />");
			}else{
				//echo($query);
				//echo('MYSQL INSERT ERROR : '. mysql_errno());
				if(mysql_errno()==1062)	die("<error id='8' />");
				else die("<error id='7' />");
			}

		}else die("<error id='6' />");

//SAVE OBJECTS	
	}else if($action == 'save_objects'){ 
		
		if(isset($project_name,$id_user)){
			$query = "select id from ".TABLE_PROJECTS." where project_name='".$project_name."' and id_user=".$id_user;
			//echo $query."\n";
			if($result = mysql_query($query)){
				//echo $result."\n";
			    	$row = mysql_fetch_array($result);
				//echo $row['id']."\n";
				if($row){
					$json=json_decode($json);
					foreach ($json as $key => $value){
						$query = "INSERT INTO ".TABLE_OBJECTS."(id,id_project, dynamic_cols) VALUES ('".$key."','".$row['id']."', COLUMN_CREATE(";
						$i=0;
						foreach ($value as $key1 => $value1){
							if($i != 0) $query=$query.",";
							$query=$query."'".$key1."', '".$value1."'"; 
							$i++;
						}
						$query = $query."));";		
						if(!mysql_query($query)){ 
							echo 'MYSQL ERROR : Could not insert: ' . mysql_error();						
							die("<error id='10' />");
						}//else echo "ROW INSERTED - ".$query."\n"; 
	
					}
			    	}else die("<error id='9' />");	
			}else{
				echo $query."\n";
				echo('MYSQL INSERT ERROR : '. mysql_error()."\n");
				die("<error id='11' />");
			}	
		    	die("<success id='5' />");
		}else die("<error id='6' />");

//CLEAR PROJECT	
	}else if($action == 'clear_project'){ 
		
		if(isset($project_name,$id_user)){
			$query = "select id from ".TABLE_PROJECTS." where project_name='".$project_name."' and id_user=".$id_user;
			//echo $query."\n";
			if($result = mysql_query($query)){
				//echo $result."\n";
			    	$row = mysql_fetch_array($result);
				//echo $row['id']."\n";
				if($row){
					$query = "DELETE FROM ".TABLE_OBJECTS." where id_project=".$row['id'];
					if(!mysql_query($query)){ 
						echo 'MYSQL ERROR : Could not delete: ' . mysql_error();						
						die("<error id='10' />");
					}//else echo "ROWS DELETED - ".$query."\n"; 
			    	}else die("<error id='9' />");	
			}else{
				echo $query."\n";
				echo('MYSQL DELETE ERROR : '. mysql_error()."\n");
				die("<error id='11' />");
			}	
		    	die("<success id='5' />");

		}else die("<error id='6' />");

//LOAD PROJECTS LIST
	}else if($action == 'load_projects_list'){ 
		
		if(isset($id_user)){
			$query = "select id,project_name from ".TABLE_PROJECTS." where id_user=".$id_user;
			//echo $query."\n";
			$arr = array();
			if($result = mysql_query($query)){
				while($row = mysql_fetch_array($result)){
					$arr[$row['id']] = $row['project_name']; 
				}
				die(json_encode($arr));
			}else{
				//echo $query."\n";
				//echo('MYSQL SELECT PROJECTS ERROR : '. mysql_error()."\n");
				die("<error id='12' />");
			}	

		}else die("<error id='6' />");

//LOAD OBJECTS
	}else if($action == 'load_objects'){ 
		
		if(isset($project_name,$id_user)){
			if($id_project==-1){
				$query = "select id from ".TABLE_PROJECTS." where id_user=".$id_user." and project_name='".$project_name."'";
				if($result = mysql_query($query)){
					$row = mysql_fetch_array($result);
					if($row){
						$id_project=$row['id'];
					}else die("<error id='9' />");
				}else{
					//echo $query."\n";
					//echo('MYSQL SELECT ID PROJECT ERROR : '. mysql_error()."\n");
					die("<error id='11' />");
				}
			}
			$query = "select COLUMN_JSON(dynamic_cols) FROM ".TABLE_OBJECTS." where id_project=".$id_project;
			//echo $query."\n";
			$arr = array();
			if($result = mysql_query($query)){
				while($row = mysql_fetch_array($result)){
					//echo "ROW"."\n";
					//echo $row['COLUMN_JSON(dynamic_cols)']."\n";
					$arr[] = $row['COLUMN_JSON(dynamic_cols)']; 
				}
				//echo $result."\n";
				die(json_encode($arr));
			}else{
				//echo $query."\n";
				//echo('MYSQL SELECT OBJECTS ERROR : '. mysql_error()."\n");
				die("<error id='13' />");
			}
		

		}else die("<error id='6' />");

//DELETE PROJECT
	}else if($action == 'delete_project'){ 
		
		if(isset($project_name,$id_user)){
			$query = "DELETE FROM ".TABLE_PROJECTS." where id_user=".$id_user." and project_name='".$project_name."'";
			if($result = mysql_query($query)){
		    		die("<success id='6' />");
			}else{
				echo $query."\n";
				echo('MYSQL DELETE PROJECT ERROR : '. mysql_error()."\n");
				die("<error id='14' />");
			}
		

		}else die("<error id='6' />");

	}else die("<error id='-1' />");

}


?>
