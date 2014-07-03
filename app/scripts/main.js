
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

//BINDING
$(".inputAction").change(changeAction);

initPage();

function initPage(){
	loadChoices(actionArr,$(".inputAction"),0);
	loadChoices(rateTypeArr,$(".rateType"));
	loadChoices(curArr,$(".curChoice"));
//TODO : il lance deux fois changeAction... 
	$(".inputAction").trigger('change');
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
		cLoc.prop('disabled', false);
	}else{
		cLoc.prop('disabled', true);
		cLoc.val("Oficial");
	};
	var cLoc = cPar.find(".toCur");
	if(cKey==divKey){
		cLoc.prop('disabled', false);
	}else{
		cLoc.prop('disabled', true);
		cLoc.val("VEF");
	};

	console.log("---------- END ACTION CHANGED ----------\n");
};


});
