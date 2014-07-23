

<!doctype html>

<script type="text/javascript" src="http://code.jquery.com/jquery.js"></script>
<script type="text/javascript">
</script>

<html class="no-js">
    <head>
        <meta charset="utf-8">
        <title>app dinero</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="shortcut icon" href="/favicon.ico">
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <!-- build:css styles/vendor.css -->
        <!-- bower:css -->
        <link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.css">
        <!-- endbower -->
        <!-- endbuild -->
        <!-- build:css(.tmp) styles/main.css -->
        <link rel="stylesheet" href="styles/main.css">
        <link rel="stylesheet" href="jquery-ui-1.11.0.custom/jquery-ui.css">
        <!-- endbuild -->	
    </head>
    <body>

        <!--[if lt IE 10]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->


<div class="container">
	<div class="header">

	  	<!--<div id="message"></div>
		  <form method="post" id="mainform">
		    <label for="username">Username</label>
		    <input type="text" name="username" id="username" value="" />

		    <label for="password">Password</label>
		    <input type="password" name="password" value="" />

		    <input type="submit" name="action" id="login" value="Log in" />

		    <p>Extra options (registration only)</p>

		    <label for="firstname">First name</label>
		    <input type="text" name="firstname" value="" />

		    <label for="lastname">Last name</label>
		    <input type="text" name="lastname" value="" />

		    <label for="email">Email</label>
		    <input type="text" name="email" value="" />

		    <input type="submit" name="action" id="register" value="Register" />
		  </form>-->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title headerTitle" id="myModalLabel">Login</h4>
      </div>
      <div class="modal-body">
		<div id="socialDiv">
			<div><button type="button" class="btn btn-default">Connect with Facebook</button></div>
			<div><button type="button" class="btn btn-default">Connect with Google</button></div>
		</div>

		<div id="loginDiv">
			<form id="loginForm">
				<div class="message"></div>
				<label>Username</label> <input type="text" name="username"><br>
				<label>Password</label> <input type="password" name="password"><br>
			</form>	

			<div class="action_btns">
				<div><button type="button" class="btn btn_red bLogin"  id="login">Login</button></div>
				<div><a type="button" class="btn btn_red"  id="newUser">New User</a></div>
			</div>
	    	</div>
		<div id="registerDiv">
			<form id="registerForm">
				<div class="message"></div>
				<label>Username</label> <input type="text" name="username"><br>
				<label>Email Address</label> <input type="email" name="email"><br>
				<label>Password</label> <input type="password" name="password"><br>
				<label>Confirm Password</label> <input type="password" name="confirmPassword"><br>
			</form>

			<div class="action_btns">
				<div><button type="button" class="btn btn_red bRegister"  id="register">Register</button></div>
				<div><a type="button" class="btn btn_red"  id="backLogin">Back</a></div>
			</div>
	    	</div>
      </div>
    </div>
  </div>
</div>


<div id="loginModal_temp" class="popupContainer" style="display:none;">
    <header class="popupHeader">
        <span class="header_title">Login</span>
        <span class="modal_close"><i class="fa fa-times"><span class="glyphicon glyphicon-remove-circle"></span></i></span>
    </header>
 
    <section class="popupBody">
<div class="social_login">
    <div class="clearfix">
        <a class="social_box fb" href="#">
			<span class="icon_title">Connect with Facebook</span>
	</a> 
	<a class="social_box google" href="#">
		<span class="icon_title">Connect with Google</span>
	</a>
    </div>

    <div class="centeredText">
        <span>Or use your Email address</span>
    </div>

    <div class="action_btns">
        <div class="one_half">
            <a class="btn" href="#" id="login_form" name="login_form">Login</a>
        </div>

        <div class="one_half last">
            <a class="btn" href="#" id="register_form" name=
            "register_form">Sign up</a>
        </div>
    </div>
</div>
    <! -- Here Goes all the Login and signup Forms -->
<div class="user_login">
    <form id="loginForm">
	<div class="message"></div>
        <label>Username</label> <input type="text" name="username"><br>
        <label>Password</label> <input type="password" name="password"><br>

        <div class="checkbox">
            <input id="remember" type="checkbox"> <label for=
            "remember">Remember me on this computer</label>
        </div>

        <div class="action_btns">
            <div class="one_half">
                <a class="btn back_btn" href="#">Back</a>
            </div>

            <div class="one_half last">
                <a class="btn btn_red bLogin"  id="login" href="#">Login</a>
            </div>
        </div>
    </form>
    
    <a class="forgot_password" href="#">Forgot password?</a>
</div>

<div class="user_register">
    <form id="registerForm">
	<div class="message"></div>
        <label>Username</label> <input type="text" name="username"><br>
        <label>Email Address</label> <input type="email" name="email"><br>
        <label>Password</label> <input type="password" name="password"><br>

        <div class="checkbox">
            <input id="send_updates" type="checkbox"> <label for=
            "send_updates">Send me occasional email updates</label>
        </div>

        <div class="action_btns">
            <div class="one_half">
                <a class="btn back_btn" href="#">Back</a>
            </div>

            <div class="one_half last">
                <a class="btn btn_red bRegister" id="register" href="#">Register</a>
            </div>
        </div>
    </form>
</div>

    </section>
</div>

<!-- Modal -->
<div class="modal fade" id="overwriteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">Este proyecto ya existe!</h4>
      </div>
      <div class="modal-body">
        Esta seguro que quiere overwite?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
        <button type="button" class="btn btn-primary bOverwrite">Sí</button>
      </div>
    </div>
  </div>
</div>
	</div>

<div class="mainPanel" style="margin-top:0.5cm">


<div id='messageLoggin'></div>
<!--	<div style="margin-bottom:1cm" class="blockPost" align='center'>-->
<div id="buttonsDiv">
		<button type="button" class="btn btn-default" id="bAddPost">
			<span class="glyphicon glyphicon-plus"></span>
		</button>
	<!--</div> -->
		<button type="button" class="btn btn-default bPrint">
			<span class="glyphicon glyphicon-print"></span>
		</button>
		<button type="button" class="btn btn-default bSave">
			<span class="glyphicon glyphicon-save"></span>
		</button>

		<button type="button" class="btn btn-default bLog" id="bLogIn">
			<span class="glyphicon glyphicon-log-in"></span>
		</button>

		<button type="button" class="btn btn-default bLog" id="bLogOut">
			<span class="glyphicon glyphicon-log-out"></span>
		</button>

		<div class="input-group divFiles" id="projectTitle">
		  <!--<span class="input-group-addon inLabel">Accion</span>-->
		  <input type="text" class="form-control  inputFile targetDropdown in inputProjectTitle" placeholder="Proyecto" id="inFi">
		<!--dropdown button-->
		  <div class="input-group-btn">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
		      <span class="caret"></span>
		    </button>
		    <ul class="dropdown-menu">
		    </ul>
		  </div>
		</div>
</div>
	<div class="panel panel-default blockTotal">
		<table class="table" contenteditable="false">
		</table>			
	</div> 

	<div class="divPost blockPost">
	  	<div class="panel-heading">
			<form class="form-inline" role="form">
			<!--<button type='button' class="btn btn-xs btn-default bDuplicate" style="visibility:visible">
				<span class='glyphicon glyphicon-plus'></span>
			</button>-->
			<button type='button' class="btn btn-xs btn-default bRemoveRow" style="visibility:hidden">
				<span class='glyphicon glyphicon-trash'></span>
			</button>
		  	<input type="text" class="form-control postTitle in" placeholder="titulo" id="inTi">
			</form>
		</div>
		<div class="panel-body">

		<div class="input-group divAction withoutInput">
		  <span class="input-group-addon inLabel">Accion</span>
		  <input type="text" class="form-control  inputAction targetDropdown in" placeholder="action" readonly id="inAc">
		<!--dropdown button-->
		  <div class="input-group-btn">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
		      <span class="caret"></span>
		    </button>
		    <ul class="dropdown-menu">
		    </ul>
		  </div>
		</div>

		<div class="input-group divObject withoutInput">
		  <span class="input-group-addon inLabel">Objecto</span>
		  <input type="text" class="form-control inputObject targetDropdown in" placeholder="object" readonly id="inOb">
		<!--dropdown button-->
		  <div class="input-group-btn">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
		      <span class="caret"></span>
		    </button>
		    <ul class="dropdown-menu">
		    </ul>
		  </div>
		</div>

		<div class="input-group divType withoutInput">
		  <span class="input-group-addon inLabel">Cambio</span>
		  <input type="text" class="form-control inputType targetDropdown in" placeholder="type" readonly id="inTy">
		<!--dropdown button-->
		  <div class="input-group-btn">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
		      <span class="caret"></span>
		    </button>
		    <ul class="dropdown-menu">
		    </ul>
		  </div>
		</div>

		<div class="input-group divInput withInput">
		  <span class="input-group-addon inputLabel inLabel">INPUT</span>
		  <input type="text" class="form-control inputAmount in amount" placeholder="0" id="inIn">
		<!--dropdown button-->
		  <div class="input-group-btn">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
			<span class="targetDropdown fromCur curChoice in" id="inCuIn"></span>
			<span class="caret"></span>
		    </button>
		    <ul class="dropdown-menu">
		    </ul>
		  </div>
		</div>

		<div class="input-group divOutput withoutInput">
		  <span class="input-group-addon outputLabel inLabel">OUTPUT</span>
		  <input type="text" class="form-control outputAmount in amount" placeholder="0" readonly id="inOu">
		<!--dropdown button-->
		  <div class="input-group-btn">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
			<span class="targetDropdown toCur curChoice in" id="inCuOu"></span>
			<span class="caret"></span>
		    </button>
		    <ul class="dropdown-menu">
		    </ul>
		  </div>
		</div>


		</div>
	</div>




</div> 
	<div class="footer" style='margin-top:0cm'>			
		<button type="button" class="btn btn-default update">
			<span class="glyphicon glyphicon-refresh"></span>
		</button>
<!--<a id="modal_trigger" href="#modal" class="btn"><span class="glyphicon glyphicon-save"></span></a>-->
	</div>

</div>




        <!-- build:js scripts/vendor.js -->
        <!-- bower:js -->
        <script src="../bower_components/jquery/dist/jquery.js"></script>
        <!-- endbower -->
        <!-- endbuild -->

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X');ga('send','pageview');
        </script>

        <!-- build:js scripts/plugins.js -->
        <script src="../bower_components/bootstrap/js/affix.js"></script>
        <script src="../bower_components/bootstrap/js/alert.js"></script>
        <script src="../bower_components/bootstrap/js/dropdown.js"></script>
        <script src="../bower_components/bootstrap/js/tooltip.js"></script>
        <script src="../bower_components/bootstrap/js/modal.js"></script>
        <script src="../bower_components/bootstrap/js/transition.js"></script>
        <script src="../bower_components/bootstrap/js/button.js"></script>
        <script src="../bower_components/bootstrap/js/popover.js"></script>
        <script src="../bower_components/bootstrap/js/carousel.js"></script>
        <script src="../bower_components/bootstrap/js/scrollspy.js"></script>
        <script src="../bower_components/bootstrap/js/collapse.js"></script>
        <script src="../bower_components/bootstrap/js/tab.js"></script>
        <!-- endbuild -->

        <!-- build:js({app,.tmp}) scripts/main.js -->
	<script type="text/javascript" src="jquery-ui-1.11.0.custom/jquery-ui.js"></script>
	<script type="text/javascript" src="jquery.leanModal.min.js"></script>
	<script src="scripts/rates.js"></script>
	<script src="scripts/login.js"></script>
	<script src="jquery-cookie/jquery.cookie.js"></script>
	<script src="printThis-master/printThis.js"></script>
        <script src="scripts/main.js"></script>
        <!-- endbuild -->
</body>
</html>
