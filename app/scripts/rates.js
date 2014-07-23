
var ratesYahoo = {};
var rssXMLCucuta = "http://feeds.feedburner.com/Bolivarcucuta?format=xml";
var rssXMLSicad2 = "http://feeds.feedburner.com/DolarSicad?format=xml";
var rateCOPBOLCu = -1;
var rateUSDVEFSicad2 = -1;
var rateUSDVEFSicad1 = 10.60;





function fillTables(callback){
	console.log("filling tables");
	rates={};
	var cCur = '';
	var cType = '';
	$.each($(".divType li"),function(key,val){
		cType=$(val).text()
		rates[cType]={};
	});
	$.each($(".divInput li"),function(key,val){
		cCur=$(val).text()
		$.each(rates,function(key,val){
			rates[key][cCur]={};
		});
	});
	console.log(rates);
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
			var dataString = JSON.stringify(rates,null,'\t');
			$.post("saveRates.php",{jsonObject:dataString},function() {
						alert("Rates saved in file");
						//location.reload();
         				}
			);
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
			console.log(ratesYahoo);
			getRSSBol(getRSSSic,fillTables,saveRatesToFile);		
			//fillTables(saveRatesToFile);
	    	})
	  	.fail(function() {
	    		// console.log( "error" );
			return false;
	  	});
	// console.log("ratesYahoo ok!");
};

function getRSSBol(callback,opt1,opt2){
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
					    if(typeof callback === "function") {
						callback(opt1,opt2);
					    };
					return false;
				};	
			});
		}
	});
};

function getRSSSic(callback,opt){
	console.log('RSS');
	var url = rssXMLSicad2;
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





function getRates(cb,hold){
	//console.log("\n---------- RATES ----------");
	//console.log(rates);
	rates={};
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
  		cb(hold);
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
