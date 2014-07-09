

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
	<div class="divPost blockPost">
	  	<div class="panel-heading">
			<button type='button' class="btn btn-xs btn-default bDuplicate" style="visibility:visible">
				<span class='glyphicon glyphicon-plus'></span>
			</button>
			<button type='button' class="btn btn-xs btn-default bRemoveRow" style="visibility:hidden">
				<span class='glyphicon glyphicon-trash'></span>
			</button>
		</div>
		<div class="panel-body">
			<form class="form-horizontal" role="form">

<!--<div class="input-group">
  <span class="input-group-addon">Action</span>
  <input type="text" class="form-control " placeholder="username">
<!--dropdown button--   
  <div class="input-group-btn">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      Dropdown
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li><a href="#">Dropdown link</a></li>
      <li><a href="#">Dropdown link</a></li>
    </ul>
  </div>
</div>-->

<div class="input-group divAction">
  <span class="input-group-addon">Action</span>
  <input type="text" class="form-control  inputAction" placeholder="action" readonly>
<!--dropdown button-->
  <div class="input-group-btn">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
    </ul>
  </div>
</div>

<div class="input-group divObject">
  <span class="input-group-addon">Object</span>
  <input type="text" class="form-control " placeholder="object" readonly>
<!--dropdown button-->
  <div class="input-group-btn">
    <button type="button" class="btn btn-default dropdown-toggle inputObject" data-toggle="dropdown">
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
    </ul>
  </div>
</div>

<div class="input-group divAction">
  <span class="input-group-addon">Cambio</span>
  <input type="text" class="form-control " placeholder="type" readonly>
<!--dropdown button-->
  <div class="input-group-btn">
    <button type="button" class="btn btn-default dropdown-toggle inputType" data-toggle="dropdown">
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
    </ul>
  </div>
</div>
				<!--<div class="form-group">
					<label class="col-sm-2 control-label">Action</label>
    					<div class="col-sm-10">
						<select class="in inputAction action form-control" id="inAc">
						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">Object</label>

    					<div class="col-sm-10">
					<select class="in inputObject object form-control" id="inOb">
					</select>
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 control-label">Cambio</label>
    					<div class="col-sm-10">
					<select class="in rateType form-control" id="raTy">
					</select>
					</div>
				</div>-->
				<div class="form-group">
		  			<label  class="col-sm-2 control-label inputLabel">INPUT</label>
    					<div class="col-sm-10 input-group-btn">
      <div class="input-group-addon"><select class="in curChoice fromCur pos form-control btn btn-default" id="inCu"></select></div>
					
					<input type='text' class="in inputAmount Amount pos form-control" id="inAm"></input>
					</div>
				</div>
				<div class="form-group">
		  			<label  class="col-sm-2 control-label outputLabel">OUTPUT</label>
    					<div class="col-sm-10">
					<select class="in curChoice toCur neg in form-control" id="toCu"></select>
					<input type='text' class="outputAmount Amount neg in form-control" id="ouAm" readonly></input>
					</div>
				</div>


			</form>

		</div>
	</div>


	<div style="margin-bottom:1cm" class="blockPost" align='center'>
		<button type="button" class="btn btn-default" id="bAddPost" style="width:100%">
			<span class="glyphicon glyphicon-plus"></span>
		</button>
	</div> 

</div> 

	<div class="panel panel-default blockTotal">
		<table class="table" contenteditable="false">
		</table>			
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
	<script src="jquery-cookie/jquery.cookie.js"></script>
	<script src="printThis-master/printThis.js"></script>
        <script src="scripts/main.js"></script>
        <!-- endbuild -->
</body>
</html>
