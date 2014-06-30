

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
<button type="button" class="btn btn-default btn-success update">Update Rates</button>
<button type="button" class="btn btn-default btn-success totalInput">Total</button>
            </div>



<div id="mainPanel">
<div class="table-responsive" contenteditable="false">
  <table class="table" id="totalTable" contenteditable="false">
	<thead>
		<tr>
			<th></th>
			<th>VEF</th>
			<th>EUR</th>
			<th>USD</th>
		</tr>
	</thead>
	<tbody>
		<tr id="rowTotalInput">
			<td>INPUT</td>
			<td class='VEF'>0</td>
			<td class='EUR'>0</td>
			<td class='USD'>0</td>
		</tr>
		<tr id="rowTotalOutput">
			<td>OUTPUT</td>
			<td class='VEF'>0</td>
			<td class='EUR'>0</td>
			<td class='USD'>0</td>
		</tr>
		<tr id="rowTotalCur">
			<td>TOTAL CUR</td>
			<td class='VEF'>0</td>
			<td class='EUR'>0</td>
			<td class='USD'>0</td>
		</tr>
		<tr id="rowTotal">
			<td>TOTAL</td>
			<td class='VEF'>0</td>
			<td class='EUR'>0</td>
			<td class='USD'>0</td>
		</tr>
	</tbody>
</table>
</div>

<div class="table-responsive" contenteditable="true">
  <table class="table" id="inputTable" contenteditable="false">
<thead>
	<tr contenteditable="false">
	  <th>OBJECT</th>
	  <th>+</th>
	  <th>INPUT</th>
	  <th>CUR</th>
	  <th>OUTPUT</th> 
	  <th>CUR</th>
	  <th>TYPE</th>
	  <!--<th>COMMENT</th>-->
	  <th>DELETE</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>
			<select class="in inputObject" id='object1'>
				<option value='flight'>Avion</option>
				<option value='travel'>Cupo Viajero</option>
				<option value='internet'>Cupo Internet</option>
				<option value='creditcard'>Cupo Tarjeta Credito</option>
				<option value='other' contenteditable="true">Otro</option>
			</select>
		</td>
	  	<td class="input">
			<input type="checkbox" name="ingress" value="+" class="in isIngress curChoice" id='ingress1' checked><br>
		</td>
	  	<td class="input">
			<input type='text' class="in inputAmount Amount" id='input1' ></input>
		</td>
		<td>
			<select class="in curChoice fromCur" id='fc1'>
				<option value='VEF'>VEF</option>
				<option value='EUR'>EUR</option>
				<option value='USD'>USD</option>
			</select>
		</td>
	  	<td contenteditable="false"><p class="outputAmount Amount"></p></td>
		<td>
			<select class="in curChoice toCur" id='tc1'>
				<option value='VEF'>VEF</option>
				<option value='EUR'>EUR</option>
				<option value='USD'>USD</option>
			</select>
		</td>
		<td>
			<select class="in changeType curChoice" id='type1'>
				<option value='oficial'>Oficial</option>
				<option value='sicad'>Sicad</option>
				<option value='sicad2'>Sicad II</option>
				<option value='paralelo'>Paralelo</option>
			</select>
		</td>	
	<!--  	<td><input type='text' class="in comment" id='com1' ></input></td>-->

	</tr>
</tbody>
  </table>

<center>
	<button type="button" class="btn btn-default btn-success" id="bAddRow">
		<span class="glyphicon glyphicon-plus"></span>
	</button>
</center>
</div>

            </div>


            <div class="footer">
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
