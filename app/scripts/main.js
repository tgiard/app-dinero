
$(document).ready(function(){

var divKey = "divisas";
var otroKey = "otro";
var actionTypeArr = {"buydiv":divKey, "selldiv":divKey, "buyany":otroKey};
var actionArr = {"Compro Divisas":"buydiv", "Vendo Divisas":"selldiv", "Compro ...":"buyany"};
var objectArr = {};
objectArr[divKey] = ["Viajero", "Internet", "Tarjeta de creidto","Efectivo"];
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


$(window).unload(function() {
	var arr = {};
	var cVal = '';
	$.cookie("arrInput",{});
	$.each($(".divPost"),function(i,post){
		// console.log(i);
		arr[i]={};
		$.each($(post).find(".in"),function(j,col){
			cVal = $(col).val();
			arr[i][$(col).attr('id')]=cVal;
		});
	});
	$.cookie("arrInput",JSON.stringify(arr));
});

window.onload = function() {
	getRates(initPage,refreshInput);	
};

function refreshInput(){
	var arrInput = JSON.parse($.cookie("arrInput"));
	var cPost = null;
	var cEl = null;
	 console.log("ARRAY INPUT");
	 console.log(arrInput);
	$.each(arrInput,function(i,p){
		if(i>0) addPost();
		console.log("REFRESH CURRENT POST");
		cPost = $(".divPost:last");
		console.log(cPost);		
		console.log(i);		
		console.log(p);
		$.each(p,function(ie,v){
			cEl = cPost.find("#"+ie);
			console.log(cEl);
			cEl.val(v);	
			console.log(ie);		
			console.log(v);
		});
;	});
	$.each($(".divPost .inputAmount"),function(i,val){
		console.log(val);
		$(val).trigger("input");
	});
	$.each($(".divPost .inputAction"),function(i,val){
		console.log(val);
		$(val).trigger("change");
	});
}

function initPage(callback){	
	console.log("\n---------- INIT ----------");
	createTotalTable();
	bindElements();
	loadChoices(actionArr,$(".inputAction"),0);
	loadChoices(rateTypeArr,$(".rateType"));
	loadChoices(curArr,$(".curChoice"));
//TODO : il lance deux fois changeAction...
	$(".inputAction").trigger('change');
	$('.update').click(updateRates);
	$('#bAddPost').click(addPost);


	//$('.test').click();

	if(typeof callback === "function") {
		callback();
	};
};

function unbindElements(){
	$(".inputAction").unbind();
	$(".inputAmount").unbind();
	$(".curChoice").unbind();
	$(".rateType").unbind();
	$(".bRemoveRow").unbind();
	$('.bDuplicate').unbind();	
};

function bindElements(){
	unbindElements()
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
	$('.bRemoveRow').click(removePost);
	$('.bDuplicate').click(clonePost);
};

function createTotalTable(){
	// console.log("\n---------- CREATING TOTAL TABLE ----------");
	var cDiv = $(".blockTotal table");
	var html = [];
	// console.log("table : ");
	// console.log(cDiv);
	html.push('<thead><th>CUR</th><th>+</th><th>-</th><th>TOT</th></thead><tbody>');
	$.each(curArr,function(i,v){
		html.push('<tr><td class="totCur '+v+'">'+v+'</td><td class="pos '+v+'">---</td><td class="neg '+v+'">---</td><th class="tot '+v+'">---</th></tr>');
	});
	html.push('</tbody>');
	html.push('<tfoot><th>');
	html.push('<select class="curChoice curTotal"></select>');
	html.push('</th><th class="pos total">---</th><th class="neg total">---</th><th class="tot total">---</th></tfoot>');
	cDiv.append(html.join(''));
	// console.log("\n---------- END CREATING TOTAL TABLE ----------");
};

function updateTotalTable(){
	// console.log("\n---------- UPDATING TOTAL TABLE ----------");
	// console.log("\n*** UPDATING COL IO***");
		updateColTotIO("pos");
		updateColTotIO("neg");
	// console.log("\n*** UPDATING ROW TOT***"); 
		updateRowTot("pos");
		updateRowTot("neg");
	// console.log("\n*** UPDATING COL TOT***"); 
		updateColTot();
	// console.log("\n---------- END UPDATING TOTAL TABLE ----------");
};


function updateRowTot(pn){		
		var cDiv = $(".blockTotal table");
		var t = 0;
		var cVal = null; 
		var targetCur = $(".blockTotal table .curTotal").val(); 
		var cCur = null;
		var cType = 'Paralelo';
		var cRate = -1;
		// console.log("TOT CUR : "+targetCur);

		$.each($(".blockTotal table ."+pn+":not(.total)"),function(i,v){				
			cVal = $(v).text();
			// console.log(cVal);
			cCur = $(v).parent().find(".totCur").text();
			// console.log("Current CUR : "+cCur);
// console.log(rates);
			cRate = rates[cType][cCur][targetCur];
			// console.log("Current Rate : "+cRate);
			if($.isNumeric(cVal)){	
				cVal = parseFloat(cVal)*cRate;
				t = t + cVal;
			};	
		});
		$(".blockTotal table ."+pn+".total").text(t.toFixed(2));
}


function updateColTot(){		
		var cDiv = $(".blockTotal table");
		var t = 0;
		var cValPos = 0; 
		var cValNeg = 0; 
	$.each(curArr,function(ic,vc){
		cValPos = parseFloat($(".blockTotal table .pos."+vc).text());
		cValNeg = parseFloat($(".blockTotal table .neg."+vc).text());
		t=cValPos-cValNeg;
		$(".blockTotal table .tot."+vc).text(t.toFixed(2));
	});
	vc='total';
	cValPos = parseFloat($(".blockTotal table .pos."+vc).text());
	cValNeg = parseFloat($(".blockTotal table .neg."+vc).text());
	t=cValPos-cValNeg;
	$(".blockTotal table .tot."+vc).text(t.toFixed(2));
}

function updateColTotIO(pn){
	var cDiv = $(".blockTotal table");
	var total = 0;	
	var cLoc = null;
	var cVal = '';
	var cPar = null;
	var cCur = null;
	$.each(curArr,function(ic,vc){
		total = 0;
		cLoc = cDiv.find("."+pn+"."+vc);
		// console.log(cLoc);
		$.each($("input."+pn),function(i,v){	
			cPar = $(v).parents(".divPost");	
			cCur = cPar.find(".curChoice."+pn).val();
			if(cCur==vc){
				// console.log("Current Cur : "+cCur);
				cVal = $(v).val();
				if($.isNumeric(cVal)){	
					cVal = parseFloat(cVal);
					// console.log("current "+pn+" : "+cVal);
					total = total + cVal;
				};
			};
		});
		cLoc.text(total.toFixed(2));
	});
};

function loadChoices(arr,loc,display){
/*
display = 2 : show the value on the option and set the value as the value 
display = 1 : show the value on the option and set the index as the value 
display = 0 : show the index on the option and set the value as the value
*/

	// console.log("\n---------- LOADING CHOICES ----------");
	// console.log("LOCATION : ");
	// console.log(loc);
	// console.log("ARRAY : ");
	// console.log(arr);
	var val = '';
	var option = '';	
	var obj = null;
	// console.log("*** EMPTYING LOCATION ***");
	loc.empty();
	// console.log("OPTIONS : ");
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
		// console.log("option : "+option+" --- value : "+val);
		obj = 	$( "<option/>", {
				value : val,
	    			html: option
	  		})
		obj.appendTo( loc );
	});
	// console.log("---------- END LOADING CHOICES ----------\n");
};

function changeAction(){
	// console.log("\n---------- ACTION CHANGED ----------");
	var cAction = $(this).val();
	var cKey = actionTypeArr[cAction];

	// console.log("*** OBJECTS ***");
	var cArr = objectArr[cKey];
	var cPar = $(this).parents(".divPost");
	var cLoc = cPar.find(".inputObject");
	// console.log("type of action : " + cKey);
	// console.log("LOCATION : ");
	// console.log(cLoc);
	// console.log("ARRAY : ");
	// console.log(cArr);
	loadChoices(cArr,cLoc);

	// console.log("*** RATE TYPE NEEDED ? ***");	
	var cLoc = cPar.find(".rateType");
	// console.log("LOCATION : ");
	// console.log(cLoc);
	if(cKey==divKey){
		cLoc.prop('disabled', false);
		cLoc.parent().children("label").css("color", "#000000");
	}else{
		cLoc.prop('disabled', true);
		cLoc.parent().find("label").css("color", "#ababab");
		cLoc.val("Oficial");
	};


	// console.log("*** LABELS  ***");	
	var cLoc = cPar.find(".inputLabel");
	var text = '';
	// console.log("LOCATION : ");
	// console.log(cLoc);
	if(cAction=="buydiv"){
		text="Compro";
	}else if(cAction=="selldiv"){
		text="Vendo";
	}else if(cAction=="buyany"){
		text="Precio";
	};
	cLoc.text(text);

	var cLoc = cPar.find(".outputLabel");
	// console.log("LOCATION : ");
	// console.log(cLoc);
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


	// console.log("*** SELECT CUR  ***");	
	var cLoc = cPar.find(".toCur");
	if(cKey==divKey){
		cLoc.css('visibility', 'visible');
	}else{
		cLoc.css('visibility', 'hidden');
	};

	if(cAction=="buydiv"){
		cLoc.removeClass("pos");
		cLoc.addClass("neg");
	}else if(cAction=="selldiv"){
		cLoc.removeClass("neg");
		cLoc.addClass("pos");
	}else if(cAction=="buyany"){
		cLoc.removeClass("neg");
		cLoc.removeClass("pos");
	};
	
	var cLoc = cPar.find(".fromCur");
	if(cAction=="buydiv"){
		cLoc.removeClass("neg");
		cLoc.addClass("pos");
	}else if(cAction=="selldiv"){
		cLoc.removeClass("pos");
		cLoc.addClass("neg");
	}else if(cAction=="buyany"){
		cLoc.removeClass("pos");
		cLoc.addClass("neg");
	};

	// console.log("*** AMOUNTS  ***");	
	var cLoc = cPar.find(".outputAmount");
	if(cKey==divKey){
		cLoc.css('visibility', 'visible');
	}else{
		cLoc.css('visibility', 'hidden');
	};
	if(cAction=="buydiv"){
		cLoc.removeClass("pos");
		cLoc.addClass("neg");
	}else if(cAction=="selldiv"){
		cLoc.removeClass("neg");
		cLoc.addClass("pos");
	}else if(cAction=="buyany"){
		cLoc.removeClass("neg");
		cLoc.removeClass("pos");
	};
	
	var cLoc = cPar.find(".inputAmount");
	if(cAction=="buydiv"){
		cLoc.removeClass("neg");
		cLoc.addClass("pos");
	}else if(cAction=="selldiv"){
		cLoc.removeClass("pos");
		cLoc.addClass("neg");
	}else if(cAction=="buyany"){
		cLoc.removeClass("pos");
		cLoc.addClass("neg");
	};


	updateTotalTable();
	// console.log("---------- END ACTION CHANGED ----------\n");
};

function changeInput(e){
	//// console.log($(par));
	var cAmount = $(e).val();
	var cPar = $(e).parents(".divPost");
	if($.isNumeric(cAmount)){
		var cFromCur = cPar.find(".fromCur").val();
		// console.log("from cur : " + cFromCur);
		var cToCur = cPar.find(".toCur").val();
		// console.log("to cur : " + cToCur);
		var cType = cPar.find(".rateType").val();
		// console.log("type : " + cType);
		var cRate = rates[cType][cFromCur][cToCur];
		// console.log(cRate);
		var cOutput = cAmount*cRate;
		// console.log(cOutput);
		cPar.find(".outputAmount").val(cOutput.toFixed(2));
		$(".blockTotal #totalInput").text(cAmount);
	}else{		
		cPar.find(".outputAmount").val('');
		$(".blockTotal #totalInput").text('');
	};
	updateTotalTable();
};

function addPost(){
	// console.log("\n---------- ADD POST ----------");
	var firstPost = $(".mainPanel .divPost:first");
	// console.log("*** First Post ***")
	// console.log(firstPost);
	var cClone = firstPost.clone();
	// console.log("*** Clone Post ***")
	// console.log(cClone);
	var bRemove = $(cClone).find(".bRemoveRow");
	$(bRemove).css('visibility','visible');
	// console.log("*** Appending To Main Panel ***");
	cClone.find(".Amount").val('');
	$(".mainPanel .divPost:last").after(cClone);
	// console.log("*** Binding Elements ***")
	bindElements();
 console.log($(".mainPanel .divPost:last.inputAction"))
	$(".mainPanel .divPost:last .inputAction").trigger("change");
	// console.log("---------- END ADD POST ----------\n");
};

function removePost(){
	// console.log("\n---------- REMOVE POST ----------");
	$(this).parents(".divPost").remove();	
	updateTotalTable();
	// console.log("---------- END REMOVE POST ----------\n");
};

function clonePost(){
	console.log("\n---------- CLONE POST ----------");
	var cPost = $(this).parents(".divPost");
	console.log("*** Target Post ***")
	console.log(cPost);
	var cClone = cPost.clone();
	console.log("*** Clone Post ***")
	console.log(cClone);
	var cId = -1;
	var cVal = null;
	$.each(cClone.find("select"),function(i,v){
		cId = $(v).attr('id');
		cVal = cPost.find("select#"+cId).val();
		$(v).val(cVal);
	})
	var bRemove = $(cClone).find(".bRemoveRow");
	$(bRemove).css('visibility','visible');
	$(".mainPanel .divPost:last").after(cClone);
	console.log("*** Binding Elements ***")
	bindElements();
	console.log("---------- END CLONE POST ----------\n");
};





function getRates(callback,cb2){
	console.log("\n---------- RATES ----------");
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

		    if(typeof callback === "function") {
			callback(cb2);
		    };
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
	// console.log("filling tables");
	rates={};
	var cCur = '';
	var cType = '';
	$.each($(".rateType option"),function(key,val){
		cType=$(val).val()
// console.log(cType)
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
//			// console.log(key0+"neg"+key+"neg"+key1+" : "+val1);		
//		});	
//	});
//});

    if(typeof callback === "function") {
        callback();
    };
};

function saveRatesToFile(){
	// console.log("saving to file");
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
	// console.log("getting ratesYahoo...");
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
	    		// console.log( "error" );
			return false;
	  	});
	// console.log("ratesYahoo ok!");
};

function getRSS(callback,opt){
	// console.log('RSS');
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
					// console.log(str);	
					var start = n+strTest.length;
					rateCOPBOLCu = parseFloat(str.substring(start,start+5));
					// console.log(rateCOPBOLCu);
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
					// console.log(str);	
					var start = n+strTest.length;
					rateUSDVEFSicad2 = parseFloat((str.substring(start,start+5).replace(',', '.')));
					// console.log(rateUSDVEFSicad2);
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
