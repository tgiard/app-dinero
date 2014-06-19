console.log('\'Allo \'Allo!');

$(document).ready(function(){

$("input").focus(function(){
  $(this).css("background-color","#cccccc");
});

$("input").blur(function(){
  $(this).css("background-color","#ffffff");
});


$(".btn-default").click(function(){
$.getJSON( "json_exemple.js", function( data,textStatus ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "#mainPanel" );
alert(textStatus);
});
});

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
		$.each(arr, function(key,val){
			items.push( "<p><label id='" + strKeyId + "'>" + key + "</label> : <label id='" + strId + "'>" + val + "</label></p>" );
			iId = iId+1;
			strId = "rate" + iId;
		});
	 
	  	$( "<div/>", {
	    		"class": "my-new-list",
	    		html: items.join( "" )
	  	}).appendTo( loc );
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
	  $.getJSON( flickerAPI, {
	    tags: "test yahoo",
	    tagmode: "any",
	    format: "json"
	  })
	    	.done(function( data ) {
			var rates = {};
			$.each(data.query.results.rate, function(i,val){
				rates[val.id] = val.Rate
			});
			displayArr(rates,"#mainPanel");
	    	})
	  	.fail(function() {
	    		console.log( "error" );
			return false;
	  	});
};

getExRate(["EURUSD","VEFUSD","USDCOP","VEFCOP","USDVEF"]);
$.ajax({  
  url: 'http://bolivarcucuta.com/',
  type: 'GET',
  dataType: 'html',
  data: null,
  success: 	function(html) {alert("success");
		}
});

});
