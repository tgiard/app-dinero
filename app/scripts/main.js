console.log('\'Allo \'Allo!');

$(document).ready(function(){

var rates = {};
var nbPost = 0;
var amountArr = [];

$("input").focus(function(){
  $(this).css("background-color","#cccccc");
});

$("input").blur(function(){
  $(this).css("background-color","#ffffff");
});


$("#bAddObject").click(function(){

var items = [];
items.push("<p>");
items.push("<select id='fromCur'>\
  <option value='eur'>Avion</option>\
  <option value='vef'>Cupo Viajero</option>\
  <option value='usd'>Cupo Internet</option>\
  <option value='usd'>Tarjeta de credito</option>\
</select>");
items.push("<select id='fromCur'>\
  <option value='eur'>Oficial</option>\
  <option value='vef'>Paralelo</option>\
  <option value='usd'>Sicad</option>\
  <option value='usd'>Sicad II</option>\
</select>");
items.push("</p>");
items.push("<p>");
items.push("<select id='fromCur'>\
  <option value='eur'>Euro</option>\
  <option value='vef'>BsF</option>\
  <option value='usd'>Dolar</option>\
</select>");
items.push("<input type='text' id='1'></input>");
items.push("</p>");
items.push("<p>");
items.push("<select id='toCur'>\
  <option value='eur'>Euro</option>\
  <option value='vef'>BsF</option>\
  <option value='usd'>Dolar</option>\
</select>");
items.push("<input class='inputCur' type='text'></input>");
items.push("<hr size='3' width='45'>");

amountArr.push(0);

		nbPost = nbPost + 1;
		var strId = "post" + nbPost;
	console.log(strId);
	  	$( "<div/>", {
			id : strId,
			html : items.join("")
	  	}).appendTo("#testPanel");
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

$(".inputCur").on(".inputCur",function(){
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
};

getExRate(["EURUSD","USDVEF","USDCOP"]);



//$.ajax({  
//  url: 'http://bolivarcucuta.com/',
//  type: 'GET',
//  dataType: 'html',
//  data: null,
//  success: 	function(html) {alert("success");
//		}
//});

});
