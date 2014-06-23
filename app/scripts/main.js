
$(document).ready(function(){


var rates = {};
var nbPost = 1;
var amountArr = [];
var objects = ["Avion", "Cupe Viajero", "Cupo Internet", "Cupo Tarjeta Credito"];
var types = ["Oficial", "Sicad", "Sicad II", "Paralelo"];
var cur = ["BsF", "Euro", "USD"];

var focusInput = function(){
  $(this).css("background-color","#cccccc");
};

var blurInput = function(){
  $(this).css("background-color","#ffffff");
};

var changeInput = function(ob){
console.log('ok');
	var cAmount = $(ob).val();
	var cId = $(ob).attr('id');
	if($.isNumeric(cAmount)){
		var cFromCur = $(".fromCur[target="+cId+"]").val();
		var cToCur = $(".toCur[target="+cId+"]").val();
		var cRate = rates[cFromCur+cToCur];
		var cOutput = cAmount*cRate;
		$(".outputAmount[target="+cId+"]").text(cOutput.toFixed(2));
	}else{		
		$(".outputAmount[target="+cId+"]").text('');
	};
};

function removeRow(){
	var par = $(this).parent().parent(); //tr
	par.remove();
	console.log('ok');	
};

var addRow = function(){
	nbPost++;
	var idStr = nbPost;
	$("#inputTable tbody tr:first").clone().appendTo("#inputTable");
	$("#inputTable tbody tr:last").find(".inputAmount").val('');
	$("#inputTable tbody tr:last").find(".outputAmount").text('');
	$("#inputTable tbody tr:last").find(".inputAmount").attr('id',nbPost);
	$("#inputTable tbody tr:last").find(".outputAmount").attr('target',nbPost);
	$("#inputTable tbody tr:last").find(".fromCur").attr('target',nbPost);
	$("#inputTable tbody tr:last").find(".toCur").attr('target',nbPost);

	$("#inputTable tbody tr:last").append("<td><button type='button' class='btn btn-xs btn-danger bRemoveRow' id='test'><span class='glyphicon glyphicon-trash'></span></button></td>")

//$("#test").unbind("click");
//$("#test").bind("click",removeRow(this));

	$(".inputAmount").unbind();
	$(".inputAmount").bind("focus", focusInput);
	$(".inputAmount").bind("blur", blurInput);
	$(".inputAmount").on('input',function(){	
		changeInput(this);	
	});
//	$(".inputCur",".outputCur").bind("change",changeInput);
	
	$(".bRemoveRow").unbind();
	$(".bRemoveRow").bind("click",removeRow);

	$(".curChoice").unbind();
$(".curChoice").change(function(){	
	var cId = $(this).attr('target');
	$(".inputAmount[id="+cId+"]").trigger("input");	
});
};

$(".inputAmount").bind("focus", focusInput);
$(".inputAmount").bind("blur", blurInput);
$(".inputAmount").on('input',function(){	
	changeInput(this);	
});
$(".curChoice").change(function(){	
	var cId = $(this).attr('target');
	$(".inputAmount[id="+cId+"]").trigger("input");	
});

$(".bRemoveRow").bind("click",removeRow);

$("#bAddRow").click(addRow);


$("#inputSuccess2").on('input',function(){	
	var iId = 1;
	var strId = "#rate" + iId;
	var cRate = $("#rate1").text();
	var cAmount = $("#inputSuccess2").val();
	amountConv = cAmount*cRate;
	amountConv = amountConv.toFixed(2);
	$("#amountConv").text(amountConv);	
});



var displayArr = function(arr,loc){
		var items = [];
		var iId = 1;
		var strId = "rate" + iId;
		var strKeyId = "rateKey" + iId;
		items.push(" --- ");
		$.each(arr, function(key,val){
			items.push( "<label id='" + strKeyId + "'>" + key + "</label> : <label id='" + strId + "'>" + val + "</label> --- " );
			iId = iId+1;
			strId = "rate" + iId;
		});
	 
	  	$( "<div/>", {
	    		"class": "my-new-list",
	    		html: items.join( "" )
	  	}).prependTo( loc );
};

var getExRate = function(arrayCur){
	//String Currency Construction
	var stringCur = "";
	var nbCur = arrayCur.length;
	$.each(arrayCur, function(key,value){
		stringCur = stringCur + "%22" + value + "%22";
		if(key+1 != nbCur){
			stringCur = stringCur + "%2C";
		}
	});

	//Call to Yahoo Finances
	var flickerAPI = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20("+stringCur+")&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
	console.log("getting rates...");
	  $.getJSON( flickerAPI, {
	    tags: "test yahoo",
	    tagmode: "any",
	    format: "json"
	  })
	    	.done(function( data ) {
			$.each(data.query.results.rate, function(i,val){
				rates[val.id] = val.Rate
			});			
			displayArr(rates,"#mainPanel");
	    	})
	  	.fail(function() {
	    		console.log( "error" );
			return false;
	  	});
	console.log("rates ok!");
};

getExRate(["EURUSD","USDVEF","USDCOP","VEFVEF"]);



//$.ajax({  
//  url: 'http://bolivarcucuta.com/',
//  type: 'GET',
//  dataType: 'html',
//  data: null,
//  success: 	function(html) {alert("success");
//		}
//});

});
