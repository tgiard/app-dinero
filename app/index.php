

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
	<div class="panel panel-default divPost blockPost">
	  	<div class="panel-heading">
					<p><label>QUE HAGO ?</label>
					<select class="in inputAction action" style='width:50%;float:right' id="inAc">
					</select>
					</p>
					<p><label>QUE ?</label>
					<select class="in inputObject object" style='width:50%;float:right'  id="inOb">
					</select>
					</p>
					<p><label>AL CAMBIO</label>
					<select class="in rateType" id='type1' style='width:50%;float:right' id="raTy">
					</select>
					</p>
		</div>
		<div class="table-responsive" contenteditable="true">
	  		<table class="table" contenteditable="false">
				<thead>
					<tr contenteditable="false">
					</tr>
				</thead>
				<tbody>
					<tr>
		  				<td class="inputLabel">INPUT</td>
					  	<td>
							<input type='text' class="in inputAmount Amount pos" id="inAm"></input>
						</td>

						<td>
							<select class="in curChoice fromCur pos" id="inCu">
							</select>
						</td>
					</tr>
					<tr>
		  				<td class="outputLabel">OUTPUT</td> 
					  	<td>
							<input type='text' class="outputAmount Amount neg" id="ouAm"  readonly>
							</input>
						</td>
						<td>
							<select class="in curChoice toCur neg" id="toCu">
							</select>
						</td>
					</tr>
					<tr>
						<td>
							<button type='button' class="btn btn-xs btn-default bDuplicate" style="visibility:visible"><span class='glyphicon glyphicon-plus'></span>
							</button>
						</td>
						<td>
							<button type='button' class="btn btn-xs btn-danger bRemoveRow" style="visibility:hidden"><span class='glyphicon glyphicon-trash'></span>
							</button>
						</td>
					</tr>
				</tbody>
	  		</table>

		</div>
	</div>


	<div style="margin-bottom:1cm" class="blockPost" align='center'>
		<button type="button" class="btn btn-default" id="bAddPost">
			<span class="glyphicon glyphicon-plus"></span>
		</button>
	</div> 

</div> 

	<div class="panel panel-default blockTotal">
		<table class="table" contenteditable="false">
		</table>			
	</div> 
	<div class="footer" style='margin-top:0cm'>			
		<button type="button" class="btn btn-default update">Update Rates</button>
		<button type="button" class="btn btn-default test">test</button>
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
        <script src="scripts/main.js"></script>
        <!-- endbuild -->
</body>
</html>
