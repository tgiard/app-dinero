
$(document).ready(function(){

$('.update').click(function(e){ 
	updateRates();	
});




var ratesYahoo = {};
var nbPost = 1;
var amountArr = [];
var objects = [];
var types = [];
var cur = [];
var rates=[];
var rssXMLCucuta = "http://feeds.feedburner.com/Bolivarcucuta?format=xml";
var rssXMLSicad2 = "http://feeds.feedburner.com/Dolarsicad?format=xml";
var rateCOPBOLCu = -1;
var rateUSDVEFSicad2 = -1;
var rateUSDVEFSicad1 = 10.60;
var initNbRow = 5;

function getRates(){
	$.getJSON("../rates.json", function(data){
		$.each(data, function (index, value) {
			rates[index]={};
		    	$.each(value, function (index1, value1) {
				rates[index][index1]={};
		    		$.each(value1, function (index2, value2) {
					rates[index][index1][index2]=value2;
				})
			})
		});
	}).done(function(){
		displayRates();
	});
};
getRates();

//$(window).unload(function() {
//	$.each($(".in"),function(key,val){
//		cId = $(val).attr('id');
//   		$.cookies.del(cId);
//	});
//});

window.onbeforeunload = function() {
var cId = -1;
var cVal = '';
/*	$.each($(".in"),function(key,val){
		//console.log(val);
		cId = $(val).attr('id');
		cVal = $(val).val();
		console.log($(val).attr('id'));
		console.log($(val).val());
		$.cookie(cId,cVal);
	});*/
	$.cookie("cNbPost",nbPost);	
	$.cookie("notFirstLoad",1);
}

window.onload = function() {
var cId = -1;
var cNbPost=$.cookie("cNbPost");
if($.cookie("notFirstLoad")==1){
	console.log("Not First Load");
	var cId = -1;
	var cVal = '';	
	for(var i = 1; i<=cNbPost-1; i++){
		addRow();
		console.log(i);	
	};
	/*$.each($(".outputAmount"),function(key,val){
		$(this).parent().parent().children(".input").children().trigger("input");
	});*/		
};
}

function getRSS(){
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
getRSS();

var focusInput = function(){
  $(this).css("background-color","#cccccc");
};

var blurInput = function(){
  $(this).css("background-color","#ffffff");
};

var changeInput = function(ob){
console.log('INPUT TRIGGERED');
	var cAmount = $(ob).val();
	var cId = $(ob).attr('id');
	var strId = "input"+cId;
	if($.isNumeric(cAmount)){
		var cFromCur = $(ob).parent().parent().find(".fromCur").val();
console.log("from cur : " + cFromCur);
		var cToCur = $(ob).parent().parent().find(".toCur").val();
console.log("to cur : " + cToCur);
		var cType = $(ob).parent().parent().find(".changeType").val();
console.log("type : " + cType);
		var cRate = rates[cType][cFromCur][cToCur];
		var cOutput = cAmount*cRate;
		$(ob).parent().parent().find(".outputAmount").text(cOutput.toFixed(2));
	}else{		
		$(ob).parent().parent().find(".outputAmount").text('');
	};
};

function removeRow(){
	var par = $(this).parent().parent(); //tr
	console.log($(par).find(".in").attr("id"));
	/*$.each($(par).find(".in"), function(key,val){
		console.log($(val).attr("id"));
		$.cookie($(val).attr("id"),null);
		});*/
	par.remove();
	nbPost--;	
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
		$(this).parent().parent().children(".input").children().trigger("input");
	});
}

var addRow = function(){
//TODO : automatisé l'attribution des ids en fonction des ids des objects de base avec un regex
	nbPost++;
	var idStr = "";
	$("#inputTable tbody tr:first").clone().appendTo("#inputTable");
	$("#inputTable tbody tr:last").find(".inputAmount").val('');
	$("#inputTable tbody tr:last").find(".outputAmount").text('');
	idStr = "input"+nbPost;
	$("#inputTable tbody tr:last").find(".inputAmount").attr('id',idStr);
	idStr = "fc"+nbPost;
	$("#inputTable tbody tr:last").find(".fromCur").attr('id',idStr);
	idStr = "tc"+nbPost;
	$("#inputTable tbody tr:last").find(".toCur").attr('id',idStr);
	idStr = "type"+nbPost;
	$("#inputTable tbody tr:last").find(".changeType").attr('id',idStr);
	idStr = "object"+nbPost;
	$("#inputTable tbody tr:last").find(".inputObject").attr('id',idStr);

	$("#inputTable tbody tr:last").append("<td><button type='button' class='btn btn-xs btn-danger bRemoveRow' id='remove"+nbPost+"'><span class='glyphicon glyphicon-trash'></span></button></td>")

	newRowBind();
};

newRowBind();
$("#bAddRow").click(addRow);

//RATES FROM YAHOO

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

function displayRates(){
	var items = [];
	items.push("$ Paralelo : " + rates['paralelo']['USD']['VEF'].toFixed(2));	 
	  	$( "<div/>", {
	    		"class": "my-new-list",
	    		html: items.join( "" )
	  	}).prependTo( "#mainPanel" );
};

function fillTables(callback){
	console.log("filling tables");
	rates={};
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
	rates['paralelo']['USD']['VEF']=ratesYahoo['USDCOP']*1.04/rateCOPBOLCu;
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

    if(typeof callback === "function") {
        callback();
    };
};

function saveRatesToFile(){
			var dataString = "jsonObject="+JSON.stringify(rates,null,'\t');
 
			$.ajax({
      			type: "POST",
      			url: "save.php",
      			data: dataString,
 
      				success: function() {
						alert("Rates saved in file");
         				}
			});
			return false;
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
			fillTables(saveRatesToFile);
	    	})
	  	.fail(function() {
	    		console.log( "error" );
			return false;
	  	});
	console.log("ratesYahoo ok!");
};

function updateRates(){
	getExRate(["EURUSD","USDVEF","USDCOP","VEFVEF"]); 
};



//$.ajax({  
//  url: 'http://bolivarcucuta.com/',
//  type: 'GET',
//  dataType: 'html',
//  data: null,
//  success: 	function(html) {alert("success");
//		}
//});

});
