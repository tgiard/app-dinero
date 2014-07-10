
rates = {};
var divKey = "divisas";
var otroKey = "otro";
var actionTypeArr = {"buydiv":divKey, "selldiv":divKey, "buyany":otroKey};
var actionArr = {"Compro Divisas":"buydiv", "Vendo Divisas":"selldiv", "Compro ...":"buyany"};
var objectArr = {};
objectArr[divKey] = ["Viajero", "Internet", "Tarjeta de credito","Efectivo"];
objectArr[otroKey] = ["Avion","Maleta","Otro"];
var rateTypeArr = ["Oficial","Sicad I","Sicad II","Paralelo"];
var curArr = ["VEF","USD","EUR"];
var arrInputs = {};
var curTot = curArr[0];

// GETTING RATES FROM FILE BEFORE LOADING DOCUMENT
$.holdReady( true );
getRates($.holdReady,false);

// READY 
$(document).ready(function(){
	console.log(rates);
	displayRates();
	createTotalTable();
	
	/*BUTTONS BINDING*/
	$('.update').click(updateRates);
	$('#bAddPost').click(addPost);
	$('.bPrint').click(printReport);
	$(".inputAction").change(changeAction);
	$('.bRemoveRow').click(removePost);
	$('.bDuplicate').click(clonePost);
	
	/*LOADING DROPDOWNS*/
	loadChoicesAllDropdown();

	/*BINDING INPUTS*/
	bindInput();
	
	/*GETTING OLD INPUTS*/
	arrInputs = $.cookie("arrInput");
	curTot = $.cookie("curTot");
	console.log(arrInputs);	
	refreshInput();
});

$(window).unload(function() {
	$.cookie("arrInput",{});
	var arr = inputsToJson();
	$.cookie("arrInput",JSON.stringify(arr));
	$.cookie("curTot",$(".curTotal").text());
	//TODO: le cur select de total table
});

/*POST MANAGEMENT*/
function addPost(){
	// console.log("\n---------- ADD POST ----------");
	var firstPost = $(".mainPanel .divPost:first");
	// console.log("*** First Post ***")
	// console.log(firstPost);
	var cClone = firstPost.clone(true);
	cClone.removeData();
	// console.log("*** Clone Post ***")
	// console.log(cClone);
	var bRemove = $(cClone).find(".bRemoveRow");
	$(bRemove).css('visibility','visible');
	// console.log("*** Appending To Main Panel ***");
	$(".mainPanel .divPost:last").after(cClone);
	// console.log("*** Default Inputs ***");
	$(".mainPanel .divPost:last .amount").val('');
	$(".mainPanel .divPost:last .postTitle").val('');
	$.each($(".mainPanel .divPost:last .dropdown-menu"),function(i,v){
		$(v).find("li:first").trigger('click');
	});
	
	// console.log("---------- END ADD POST ----------\n");
};

function removePost(){
	//console.log("\n---------- REMOVE POST ----------");
	$(this).parents(".divPost").remove();	
	updateTotalTable();
	//console.log("---------- END REMOVE POST ----------\n");
};

function clonePost(){
	console.log("\n---------- CLONE POST ----------");
	var cPost = $(this).parents(".divPost");
	console.log("*** Target Post ***")
	console.log(cPost);
	var cClone = cPost.clone(true);
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
	console.log("---------- END CLONE POST ----------\n");
};
/*END POST MANAGEMENT*/

/* DROPDOWN MANAGEMENT*/
function loadChoicesAllDropdown(){
	loadChoicesDropdown(actionArr,$(".divAction .dropdown-menu"),0);
	loadChoicesDropdown(objectArr[divKey],$(".divObject .dropdown-menu"));
	loadChoicesDropdown(rateTypeArr,$(".divType .dropdown-menu"));
	loadChoicesDropdown(curArr,$(".divInput .dropdown-menu"));
	loadChoicesDropdown(curArr,$(".divOutput .dropdown-menu"));
	loadChoicesDropdown(curArr,$(".blockTotal .dropdown-menu"));
};

function loadChoicesDropdown(arr,loc,display){
/*
display = 2 : show the value on the option and set the value as the value 
display = 1 : show the value on the option and set the index as the value 
display = 0 : show the index on the option and set the value as the value
*/

/*	console.log("\n---------- LOADING CHOICES ----------");
	console.log("LOCATION : ");
	console.log(loc);
	console.log("ARRAY : ");
	console.log(arr);
*/
	var val = '';
	var option = '';	
	var obj = null;
	//console.log("*** EMPTYING LOCATION ***");
	loc.empty();
	//console.log("OPTIONS : ");
	$.each(arr,function(i,v){
	//console.log(i);
	//console.log(v);
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
		//console.log("option : "+option+" --- value : "+val);
		obj = 	"<li value="+val+">"+option+"</li>";	
		$(obj).appendTo(loc);
	});
	$(loc).find("li").click(function(){
		//console.log(this);
		var cInput = $(this).parent().parent().parent().find(".targetDropdown");
		var cTag = cInput.prop('tagName');
		//console.log(cTag);
		//console.log(cInput);
		if(cTag == 'INPUT')	$(cInput).val($(this).text());
		else if(cTag == 'SPAN')	$(cInput).text($(this).text());
		if($(this).parents(".divAction").length==1){
		      	$(cInput).attr('name',actionArr[$(this).text()]);
		}
		$(cInput).trigger('change');
	});
	
	//Trigger click if current value is not in new dropdown list
	var cVal = null;
	var cInput = $(loc).find("li").parent().parent().parent().find(".targetDropdown");
	var cTag = cInput.prop('tagName');
	if(cTag == 'INPUT') cVal = $(cInput).val();
	else if(cTag == 'SPAN')	cVal = $(cInput).text();
	var array =loc.find("li").map(function(){
               					return $(this).text();
           				}).get();
	if($.inArray(cVal,array)==-1)	$(loc).find("li:first").trigger('click');
	// console.log("---------- END LOADING CHOICES ----------\n");
};

function changeAction(){
	// console.log("\n---------- ACTION CHANGED ----------");
	// console.log(this);
	var cAction = $(this).attr('name');
	// console.log(cAction);
	var cKey = actionTypeArr[cAction];

	// console.log("*** OBJECTS ***");
	var cArr = objectArr[cKey];
	var cPar = $(this).parents(".divPost");
	var cLoc = cPar.find(".divObject .dropdown-menu");
	// console.log("type of action : " + cKey);
	// console.log("LOCATION : ");
	// console.log(cLoc);
	// console.log("ARRAY : ");
	// console.log(cArr);
	loadChoicesDropdown(cArr,cLoc);

	// console.log("*** RATE TYPE NEEDED ? ***");	
	var cLoc = cPar.find(".divType");
	// console.log("LOCATION : ");
	// console.log(cLoc);
	// console.log(cKey);
	// console.log(divKey);
	if(cKey==divKey){
		cLoc.css('visibility', 'visible');
	}else{
		cLoc.css('visibility', 'hidden');
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


	//console.log("*** SELECT CUR  ***");	
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
	var cLoc = cPar.find(".divOutput");
	// console.log(cLoc);
	if(cKey==divKey){
		cLoc.css('visibility', 'visible');
	}else{
		cLoc.css('visibility', 'hidden');
	};	
	var cLoc = cPar.find(".outputAmount");
	// console.log(cLoc);
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

/*END DROPDOWN MANAGEMENT*/

/*TOTAL TABLE MANAGEMENT*/
function createTotalTable(){
	// console.log("\n---------- CREATING TOTAL TABLE ----------");
	var cDiv = $(".blockTotal table");
	var html = [];
	// console.log("table : ");
	// console.log(cDiv);
	html.push('<thead><th>MONEDA</th><th>+</th><th>-</th><th>TOTAL</th></thead><tbody>');
	$.each(curArr,function(i,v){
		html.push('<tr><td class="totCur '+v+'">'+v+'</td><td class="pos '+v+'">---</td><td class="neg '+v+'">---</td><th class="tot '+v+'">---</th></tr>');
	});
	html.push('</tbody>');
	html.push('<tfoot><td>');
	html.push('<div class="input-group-btn">\
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" align="left">\
			<span class="targetDropdown curTotal curChoice in" id="inCuIn"></span>\
			<span class="caret"></span>\
		    </button>\
		    <ul class="dropdown-menu">\
		    </ul>\
		  </div>');
	html.push('</td><th class="pos total">---</th><th class="neg total">---</th><th class="tot total">---</th></tfoot>');
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
		//console.log(cLoc);
		$.each($("input."+pn),function(i,v){
			//console.log(ic + "-" + i);
			//console.log(v);	
			cPar = $(v).parents(".divPost");	
			cCur = cPar.find(".curChoice."+pn).text();
			if(cCur==vc){
				//console.log("Current Cur : "+cCur);
				cVal = $(v).val();
				if($.isNumeric(cVal)){	
					cVal = parseFloat(cVal);
					//console.log("current "+pn+" : "+cVal);
					total = total + cVal;
				};
			};
		});
		cLoc.text(total.toFixed(2));
	});
};


function updateRowTot(pn){		
		var cDiv = $(".blockTotal table");
		var t = 0;
		var cVal = null; 
		var targetCur = $(".blockTotal table .curTotal").text(); 
		var cCur = null;
		var cType = 'Paralelo';
		var cRate = -1;
		//console.log("TOT CUR : "+targetCur);

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
/*END TOTAL TABLE MANAGEMENT*/

/*HOLDING INPUTS MANAGEMENT*/
function inputsToJson(){	
	var arr = {};
	var cVal = '';
	var cId = -1;
	var cTag = null;
	$.each($(".divPost"),function(i,post){
		console.log(post);
		arr[i]={};
		$.each($(post).find(".in"),function(j,col){
			console.log("COL");
			console.log($(col));
			cTag = $(col).prop('tagName');
			//console.log(cTag);
			if(cTag == 'INPUT')	cVal = $(col).val();
			else if(cTag == 'SPAN')	cVal = $(col).text();
			console.log("VALUE");
			console.log(cVal);
			console.log("ID");
			cId = $(col).attr('id')
			console.log(cId);
			arr[i][cId]=cVal;
		});
	});
	return arr;
}

function refreshInput(){
	$('.curTotal').text(curTot);
	var arrInput = JSON.parse($.cookie("arrInput"));
	var cPost = null;
	var cEl = null;
	var cTag = null;
	 //console.log("ARRAY INPUT");
	 //console.log(arrInput);
	$.each(arrInput,function(i,p){
		if(i>0) addPost();
		//console.log("REFRESH CURRENT POST");
		cPost = $(".divPost:last");
		//console.log(cPost);		
		//console.log(i);		
		//console.log(p);
		$.each(p,function(ie,v){
			cEl = cPost.find("#"+ie);
			//console.log(cEl);
			if($(cEl).hasClass("inputAction")){ 	
				cEl.attr('name',actionArr[v]);
			}
			cTag = cEl.prop('tagName');	
			if(cTag == 'INPUT')	cEl.val(v);
			else if(cTag == 'SPAN')	cEl.text(v);
			//console.log(ie);		
			//console.log(v);
		});
;	});
	$.each($(".divPost .inputAmount"),function(i,val){
		//console.log(val);
		$(val).trigger("input");
	});
	$.each($(".divPost .inputAction"),function(i,val){
		//console.log(val);
		$(val).trigger("change");
	});
}

/*END HOLDING INPUTS MANAGEMENT*/

/*PRINTING MANAGEMENT*/
function makeArrayInputs(){
	var cTag = null;
	var items = [];
	items.push( "<table class='table'>" );
	items.push( "<tbody>" );
	$.each($(".divPost"),function(i,post){
		items.push( "<tr>" );
		$.each($(post).find(".in"),function(j,col){
			cTag = $(col).prop('tagName');	
			if(cTag == 'INPUT')	cVal=$(col).val();
			else if(cTag == 'SPAN')	cVal=$(col).text();
			items.push( "<td>" );
			if($(col).hasClass('amount')){
				if($(col).hasClass('neg')){
					cVal = "-"+cVal;
				}else if($(col).hasClass('pos')){
					cVal = "+"+cVal;
				}else{
					cVal = "---";
				}
			}else if($(col).hasClass('curChoice')&&!$(col).hasClass('neg')&&!$(col).hasClass('pos')){
					cVal = "---";
			}
			items.push(cVal);
			items.push( "</td>" );
		});
		items.push( "</tr>" );
	});
	items.push( "</tbody>" );
	items.push( "</table>" );
	return items
};

function makeArrayTotal(){
	var cTag = null;
	var items = [];
	items.push( "<table class='table'>" );
	items.push( "<tbody>" );
	$.each($(".blockTotal tr"),function(i,post){
		items.push( "<tr>" );
		$.each($(post).find("td,th"),function(j,col){
			if($(col).find(".curTotal").length==1){
				//console.log("dropdown");
				cVal = $(col).find(".curTotal").text();
			}else{
				//console.log("other");
				cVal = $(col).text();
			}
			items.push( "<td>" );
			items.push(cVal);
			items.push( "</td>" );
		});
		items.push( "</tr>" );
	});
	items.push( "</tbody>" );
	items.push( "</table>" );
	return items
};

function printReport(){
	console.log("-----PRINT-----");
	var arrI = makeArrayInputs().join("");
	var arrT = makeArrayTotal().join("");
	var html = "<div class=toPrint>"+arrI+arrT+"</div>";
	$(html).printThis({pageTitle:"TEST",debug:false,printContainer:false,header: null,formValues:true});
	console.log("-----END PRINT-----");
};
/*END PRINTING MANAGEMENT*/

/*INPUT MANAGEMENT*/
function changeInput(e){
	var cAmount = $(e).val();
	var cPar = $(e).parents(".divPost");
	//console.log(cPar);
	if($.isNumeric(cAmount)){
		var cFromCur = cPar.find(".fromCur").text();
		console.log("from cur : " + cFromCur);
		var cToCur = cPar.find(".toCur").text();
		console.log("to cur : " + cToCur);
		var cType = cPar.find(".inputType").val();
		console.log("type : " + cType);
		var cRate = rates[cType][cFromCur][cToCur];
		console.log(cRate);
		var cOutput = cAmount*cRate;
		console.log(cAmount);
		console.log(cOutput);
		cPar.find(".outputAmount").val(cOutput.toFixed(2));
		$(".blockTotal #totalInput").text(cAmount);
	}else{		
		cPar.find(".outputAmount").val('');
		$(".blockTotal #totalInput").text('');
	};
	updateTotalTable();
};

function bindInput(){	
	$(".inputAmount").on('input',function(){	
		changeInput(this);	
	});	
	$(".curChoice").change(function(){
		changeInput($(this).parents(".divPost").find(".inputAmount"));	
	});
	$(".inputType").change(function(){	
		changeInput($(this).parents(".divPost").find(".inputAmount"));	
	});
};
/*END INPUT MANAGEMENT*/
