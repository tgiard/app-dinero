
$(document).ready(function(){


var ratesYahoo = {};
var nbPost = 1;
var amountArr = [];
var objects = [];
var types = [];
var cur = [];
var rates = {};
var rssXMLCucuta = "http://feeds.feedburner.com/Bolivarcucuta?format=xml";
var rssXMLSicad2 = "http://feeds.feedburner.com/Dolarsicad?format=xml";
var rateCOPBOLCu = -1;
var rateUSDVEFSicad2 = -1;
var rateUSDVEFSicad1 = 10.60;


function testRSS(){
	var url = rssXMLCucuta;
	var str = '';
	$.ajax({
		type: "GET",
		url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
		dataType: 'json',
		error: function(){
			alert('Unable to load feed, Incorrect path or invalid feed');
		},
		success: function(xml){
			values = xml.responseData.feed.entries;
			$.each(values,function(key,val){
				str = val['title'];
				var n = str.search("Precio del Bolívar");	
				if(n>=0){
					var strTest = "Compra: ";
					n = str.search(strTest);	
					console.log(str);	
					var start = n+strTest.length;
					rateCOPBOLCu = str.substring(start,start+5);
					console.log(rateCOPBOLCu);
					return false;
				};	
			});
		}
	});
	url = rssXMLSicad2;
	str = '';
	$.ajax({
		type: "GET",
		url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
		dataType: 'json',
		error: function(){
			alert('Unable to load feed, Incorrect path or invalid feed');
		},
		success: function(xml){
			values = xml.responseData.feed.entries;
			$.each(values,function(key,val){
				str = val['title'];	
				var n = str.search("Tasa Sicad 2 cerró");	
				if(n>=0){
					var strTest = "BsF. ";
					n = str.search(strTest);	
					console.log(str);	
					var start = n+strTest.length;
					rateUSDVEFSicad2 = (str.substring(start,start+5).replace(',', '.'));
					console.log(rateUSDVEFSicad2);
					return false;
				};	
			});
		}
	});
};
testRSS();

function fillTables(){
	console.log("filling tables");
	var cCur = '';
	var cType = '';
	$.each($("#inputObject option"),function(key,val){
		objects[key]=$(val).val();
	});
	$.each($(".changeType option"),function(key,val){
		cType=$(val).val();	
		types[key]=cType;
		rates[cType]={};
	});
	$.each($(".fromCur option"),function(key,val){
		cCur=$(val).val()
		cur[key]=cCur;
		$.each(rates,function(key,val){
			rates[key][cCur]={};
		});
	});
	rates['oficial']['EUR']['USD']=ratesYahoo['EURUSD'];
	rates['oficial']['USD']['EUR']=1/ratesYahoo['EURUSD'];
	rates['oficial']['USD']['VEF']=ratesYahoo['USDVEF'];
	rates['oficial']['VEF']['USD']=1/ratesYahoo['USDVEF'];
	rates['oficial']['EUR']['VEF']=ratesYahoo['EURUSD']*ratesYahoo['USDVEF'];
	rates['oficial']['VEF']['EUR']=1/(ratesYahoo['EURUSD']*ratesYahoo['USDVEF']);
	rates['oficial']['VEF']['VEF']=1;
	rates['oficial']['EUR']['EUR']=1;
	rates['oficial']['USD']['USD']=1;
	$.each(rates['oficial'],function(key,val){
		$.each(val,function(key1,val1){
			rates['paralelo'][key][key1]=val1;		
			rates['sicad'][key][key1]=val1;
			rates['sicad2'][key][key1]=val1;				
		});	
	});
	rates['paralelo']['USD']['VEF']=ratesYahoo['USDCOP']*1.05/rateCOPBOLCu;
	rates['paralelo']['VEF']['USD']=1/rates['paralelo']['USD']['VEF'];
	rates['paralelo']['EUR']['VEF']=rates['paralelo']['USD']['VEF']*rates['oficial']['EUR']['USD'];
	rates['paralelo']['VEF']['EUR']=1/rates['paralelo']['EUR']['VEF'];

	rates['sicad']['USD']['VEF']=rateUSDVEFSicad1;
	rates['sicad']['VEF']['USD']=1/rates['sicad']['USD']['VEF'];
	rates['sicad']['EUR']['VEF']=rateUSDVEFSicad1*ratesYahoo['EURUSD'];
	rates['sicad']['VEF']['EUR']=1/rates['sicad']['EUR']['VEF'];


	rates['sicad2']['USD']['VEF']=rateUSDVEFSicad2;
	rates['sicad2']['VEF']['USD']=1/rates['sicad2']['USD']['VEF'];
	rates['sicad2']['EUR']['VEF']=rateUSDVEFSicad2*ratesYahoo['EURUSD'];
	rates['sicad2']['VEF']['EUR']=1/rates['sicad2']['EUR']['VEF'];
//$.each(rates,function(key0,val0){
//	$.each(val0,function(key,val){
//		$.each(val,function(key1,val1){
//			console.log(key0+"-"+key+"-"+key1+" : "+val1);		
//		});	
//	});
//});
};

var focusInput = function(){
  $(this).css("background-color","#cccccc");
};

var blurInput = function(){
  $(this).css("background-color","#ffffff");
};

var changeInput = function(ob){
	var cAmount = $(ob).val();
	var cId = $(ob).attr('id');
	if($.isNumeric(cAmount)){
		var cFromCur = $(".fromCur[target="+cId+"]").val();
		var cToCur = $(".toCur[target="+cId+"]").val();
		var cType = $(".changeType[target="+cId+"]").val();
		var cRate = rates[cType][cFromCur][cToCur];
		var cOutput = cAmount*cRate;
		$(".outputAmount[target="+cId+"]").text(cOutput.toFixed(2));
	}else{		
		$(".outputAmount[target="+cId+"]").text('');
	};
};

function removeRow(){
	var par = $(this).parent().parent(); //tr
	par.remove();	
};

function newRowBind(){
	$(".inputAmount").unbind();
	$(".inputAmount").bind("focus", focusInput);
	$(".inputAmount").bind("blur", blurInput);
	$(".inputAmount").on('input',function(){	
		changeInput(this);	
	});
	
	$(".bRemoveRow").unbind();
	$(".bRemoveRow").bind("click",removeRow);

	$(".curChoice").unbind();
	$(".curChoice").change(function(){	
		var cId = $(this).attr('target');
		$(".inputAmount[id="+cId+"]").trigger("input");	
	});
}

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
	$("#inputTable tbody tr:last").find(".changeType").attr('target',nbPost);

	$("#inputTable tbody tr:last").append("<td><button type='button' class='btn btn-xs btn-danger bRemoveRow' id='test'><span class='glyphicon glyphicon-trash'></span></button></td>")

	newRowBind();
};
addRow();
addRow();
addRow();

newRowBind();
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

function displayRates(loc){
	var items = [];
	items.push("$ Paralelo : " + rates['paralelo']['USD']['VEF'].toFixed(2	));	 
	  	$( "<div/>", {
	    		"class": "my-new-list",
	    		html: items.join( "" )
	  	}).prependTo( loc );
};

var getExRate = function(arrayCur){
	//String Currency Construction
	var r = $.Deferred();
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
	console.log("getting ratesYahoo...");
	  $.getJSON( flickerAPI, {
	    tags: "test yahoo",
	    tagmode: "any",
	    format: "json"
	  })
	    	.done(function( data ) {
			$.each(data.query.results.rate, function(i,val){
				ratesYahoo[val.id] = val.Rate
			});			
			displayArr(ratesYahoo,"#mainPanel");
			fillTables();
			displayRates("#mainPanel");
	    	})
	  	.fail(function() {
	    		console.log( "error" );
			return false;
	  	});
	console.log("ratesYahoo ok!");
	     if (typeof(callback) == 'function') {
		callback();
	     }
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
