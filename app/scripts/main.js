
$(document).ready(function(){

var divKey = "divisas";
var otroKey = "otro";
var actionTypeArr = {"buydiv":divKey, "selldiv":divKey, "buyany":otroKey};
var actionArr = {"Compro Divisas":"buydiv", "Vendo Divisas":"selldiv", "Compro ...":"buyany"};
var objectArr = {};
objectArr[divKey] = ["Viajero", "Internet", "Tarjeta de creidto","Paralelo"];
objectArr[otroKey] = ["Avion","Maleta","Otro"];
var rateTypeArr = ["Oficial","Sicad I","Sicad II","Paralelo"];
var curArr = ["VEF","USD","EUR"];
var rates = {};
var ratesYahoo = {};
var rssXMLCucuta = "http://feeds.feedburner.com/Bolivarcucuta?format=xml";
var rssXMLSicad2 = "http://feeds.feedburner.com/DolarSicad?format=xml";
var rateCOPBOLCu = -1;
var rateUSDVEFSicad2 = -1;
var rateUSDVEFSicad1 = 10.60;

//BINDING
$(".inputAction").change(changeAction);
$(".inputAmount").on('input',function(){	
	changeInput(this);	
});
$(".curChoice").change(function(){	
	changeInput($(this).parents(".divPost").find(".inputAmount"));	
});
$(".rateType").change(function(){	
	changeInput($(this).parents(".divPost").find(".inputAmount"));	
});
$('.update').click(updateRates);	
initPage();

function initPage(){
	loadChoices(actionArr,$(".inputAction"),0);
	loadChoices(rateTypeArr,$(".rateType"));
	loadChoices(curArr,$(".curChoice"));
//TODO : il lance deux fois changeAction... 
	$(".inputAction").trigger('change');
	getRates();
};

function loadChoices(arr,loc,display){
/*
display = 2 : show the value on the option and set the value as the value 
display = 1 : show the value on the option and set the index as the value 
display = 0 : show the index on the option and set the value as the value
*/

	console.log("\n---------- LOADING CHOICES ----------");
	console.log("LOCATION : ");
	console.log(loc);
	console.log("ARRAY : ");
	console.log(arr);
	var val = '';
	var option = '';	
	var obj = null;
	console.log("*** EMPTYING LOCATION ***");
	loc.empty();
	console.log("OPTIONS : ");
	$.each(arr,function(i,v){
		switch(display) {
		    case 0:
			val = v;
			option = i;
			break;
		    case 1:
			val = i;
			option = v;
			break;
		    case 2:
			val = v;
			option = v;
			break;
		    default:
			val = v;
			option = v;
		}
		console.log("option : "+option+" --- value : "+val);
		obj = 	$( "<option/>", {
				value : val,
	    			html: option
	  		})
		obj.appendTo( loc );
	});
	console.log("---------- END LOADING CHOICES ----------\n");
};

function changeAction(){
	console.log("\n---------- ACTION CHANGED ----------");
	var cAction = $(this).val();
	var cKey = actionTypeArr[cAction];

	console.log("*** OBJECTS ***");
	var cArr = objectArr[cKey];
	var cPar = $(this).parents(".divPost");
	var cLoc = cPar.find(".inputObject");
	console.log("type of action : " + cKey);
	console.log("LOCATION : ");
	console.log(cLoc);
	console.log("ARRAY : ");
	console.log(cArr);
	loadChoices(cArr,cLoc);

	console.log("*** RATE TYPE NEEDED ? ***");	
	var cLoc = cPar.find(".rateType");
	console.log("LOCATION : ");
	console.log(cLoc);
	if(cKey==divKey){
		cLoc.prop('disabled', false);
		cLoc.parent().children("label").css("color", "#000000");
	}else{
		cLoc.prop('disabled', true);
		cLoc.parent().find("label").css("color", "#ababab");
		cLoc.val("Oficial");
	};


	console.log("*** LABELS  ***");	
	var cLoc = cPar.find(".inputLabel");
	var text = '';
	console.log("LOCATION : ");
	console.log(cLoc);
	if(cAction=="buydiv"){
		text="Compro";
	}else if(cAction=="selldiv"){
		text="Vendo";
	}else if(cAction=="buyany"){
		text="Precio";
	};
	cLoc.text(text);

	var cLoc = cPar.find(".outputLabel");
	console.log("LOCATION : ");
	console.log(cLoc);
	if(cAction=="buydiv"){
		text="A";
	}else if(cAction=="selldiv"){
		text="A";
	}else if(cAction=="buyany"){
		text="";
	};
	cLoc.text(text);
	if(cKey==divKey){
		cLoc.css('visibility', 'visible');
	}else{
		cLoc.css('visibility', 'hidden');
		cLoc.val("Oficial");
	};
	var cLoc = cPar.find(".toCur");
	if(cKey==divKey){
		cLoc.css('visibility', 'visible');
	}else{
		cLoc.css('visibility', 'hidden');
	};
	var cLoc = cPar.find(".outputAmount");
	if(cKey==divKey){
		cLoc.css('visibility', 'visible');
	}else{
		cLoc.css('visibility', 'hidden');
	};

	console.log("---------- END ACTION CHANGED ----------\n");
};

function changeInput(e){
	//console.log($(par));
	var cAmount = $(e).val();
	var cPar = $(e).parents(".divPost");
	if($.isNumeric(cAmount)){
		var cFromCur = cPar.find(".fromCur").val();
		console.log("from cur : " + cFromCur);
		var cToCur = cPar.find(".toCur").val();
		console.log("to cur : " + cToCur);
		var cType = cPar.find(".rateType").val();
		console.log("type : " + cType);
		var cRate = rates[cType][cFromCur][cToCur];
		console.log(cRate);
		var cOutput = cAmount*cRate;
		console.log(cOutput);
		cPar.find(".outputAmount").val(cOutput.toFixed(2));
	}else{		
		cPar.find(".outputAmount").val('');
	};
};

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

function displayRates(){
	var items = [];
	items.push("<center>");
	items.push("$ Paralelo : " + (rates['Paralelo']['USD']['VEF']).toFixed(2)+" ---- ");
	items.push("$ Sicad I: " + (rates['Sicad I']['USD']['VEF']).toFixed(2)+" ---- "); 
	items.push("$ Sicad II : " + (rates['Sicad II']['USD']['VEF']).toFixed(2)+" ---- "); 
	items.push("$ Oficial : " + (rates['Oficial']['USD']['VEF']).toFixed(2)+" ---- ");
	items.push("€/$ : " + (rates['Oficial']['EUR']['USD']).toFixed(2));
	items.push("</center>");
	  	$( "<div/>", {
	    		"class": "my-new-list",
	    		html: items.join( "" )
	  	}).prependTo( ".header" );
};





function fillTables(callback){
	console.log("filling tables");
	rates={};
	var cCur = '';
	var cType = '';
	$.each($(".rateType option"),function(key,val){
		cType=$(val).val()
console.log(cType)
		rates[cType]={};
	});
	$.each($(".fromCur option"),function(key,val){
		cCur=$(val).val()
		$.each(rates,function(key,val){
			rates[key][cCur]={};
		});
	});
	rates['Oficial']['EUR']['USD']=ratesYahoo['EURUSD'];
	rates['Oficial']['USD']['EUR']=1/ratesYahoo['EURUSD'];
	rates['Oficial']['USD']['VEF']=ratesYahoo['USDVEF'];
	rates['Oficial']['VEF']['USD']=1/ratesYahoo['USDVEF'];
	rates['Oficial']['EUR']['VEF']=ratesYahoo['EURUSD']*ratesYahoo['USDVEF'];
	rates['Oficial']['VEF']['EUR']=1/(ratesYahoo['EURUSD']*ratesYahoo['USDVEF']);
	rates['Oficial']['VEF']['VEF']=1;
	rates['Oficial']['EUR']['EUR']=1;
	rates['Oficial']['USD']['USD']=1;
	$.each(rates['Oficial'],function(key,val){
		$.each(val,function(key1,val1){
			rates['Paralelo'][key][key1]=val1;		
			rates['Sicad I'][key][key1]=val1;
			rates['Sicad II'][key][key1]=val1;				
		});	
	});
	rates['Paralelo']['USD']['VEF']=ratesYahoo['USDCOP']*1.04/rateCOPBOLCu;
	rates['Paralelo']['VEF']['USD']=1/rates['Paralelo']['USD']['VEF'];
	rates['Paralelo']['EUR']['VEF']=rates['Paralelo']['USD']['VEF']*rates['Oficial']['EUR']['USD'];
	rates['Paralelo']['VEF']['EUR']=1/rates['Paralelo']['EUR']['VEF'];

	rates['Sicad I']['USD']['VEF']=rateUSDVEFSicad1;
	rates['Sicad I']['VEF']['USD']=1/rates['Sicad I']['USD']['VEF'];
	rates['Sicad I']['EUR']['VEF']=rateUSDVEFSicad1*ratesYahoo['EURUSD'];
	rates['Sicad I']['VEF']['EUR']=1/rates['Sicad I']['EUR']['VEF'];


	rates['Sicad II']['USD']['VEF']=rateUSDVEFSicad2;
	rates['Sicad II']['VEF']['USD']=1/rates['Sicad II']['USD']['VEF'];
	rates['Sicad II']['EUR']['VEF']=rateUSDVEFSicad2*ratesYahoo['EURUSD'];
	rates['Sicad II']['VEF']['EUR']=1/rates['Sicad II']['EUR']['VEF'];
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
	console.log("saving to file");
			var dataString = "jsonObject="+JSON.stringify(rates,null,'\t');
 
			$.ajax({
      			type: "POST",
      			url: "save.php",
      			data: dataString,
 
      				success: function() {
						alert("Rates saved in file");
						location.reload();
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
				ratesYahoo[val.id] = parseFloat(val.Rate);
			});	
			getRSS(fillTables,saveRatesToFile);		
			//fillTables(saveRatesToFile);
	    	})
	  	.fail(function() {
	    		console.log( "error" );
			return false;
	  	});
	console.log("ratesYahoo ok!");
};

function getRSS(callback,opt){
	console.log('RSS');
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
					rateCOPBOLCu = parseFloat(str.substring(start,start+5));
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
					rateUSDVEFSicad2 = parseFloat((str.substring(start,start+5).replace(',', '.')));
					console.log(rateUSDVEFSicad2);
					    if(typeof callback === "function") {
						callback(opt);
					    };
					return false;
				};	
			});
		}
	});
};


function updateRates(){
	getExRate(["EURUSD","USDVEF","USDCOP"]); 
};



});
