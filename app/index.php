

<!doctype html>

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
        <!-- endbuild -->	
    </head>
    <body>

        <!--[if lt IE 10]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->


<div class="container">
	<div class="header">
	</div>

<div class="mainPanel" style="margin-top:0.5cm">

	<div class="panel panel-default blockTotal">
		<table class="table" contenteditable="false">
		</table>			
	</div> 

	<div class="divPost blockPost">
	  	<div class="panel-heading">
			<form class="form-inline" role="form">
			<button type='button' class="btn btn-xs btn-default bDuplicate" style="visibility:visible">
				<span class='glyphicon glyphicon-plus'></span>
			</button>
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


	<div style="margin-bottom:1cm" class="blockPost" align='center'>
		<button type="button" class="btn btn-default" id="bAddPost" style="width:100%">
			<span class="glyphicon glyphicon-plus"></span>
		</button>
	</div> 

</div> 
	<div class="footer" style='margin-top:0cm'>			
		<button type="button" class="btn btn-default update">
			<span class="glyphicon glyphicon-refresh"></span>
		</button>
		<button type="button" class="btn btn-default bPrint">
			<span class="glyphicon glyphicon-print"></span>
		</button>
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
	<script src="scripts/rates.js"></script>
	<script src="jquery-cookie/jquery.cookie.js"></script>
	<script src="printThis-master/printThis.js"></script>
        <script src="scripts/main.js"></script>
        <!-- endbuild -->
</body>
</html>
