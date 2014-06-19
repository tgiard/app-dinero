console.log('\'Allo \'Allo!');

$(document).ready(function(){
  $(".btn-danger").click(function(){
   // $("#inputSuccess2").hide(1000);
  });

  $(".btn-success").click(function(){
    //$("#inputSuccess2").show();
  });

$("input").focus(function(){
  $(this).css("background-color","#cccccc");
});

$("#flip").click(function(){
  $("#mainPanel").slideToggle();
if($("#flip").text() == 'Show') {
        $(this).text('Hide');
    } else {
        $(this).text('Show');
    }
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


var getExRate = function(){
//  var flickerAPI = "json_exemple.js";
var flickerAPI = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22EURUSD%22%2C%22GBPUSD%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
  $.getJSON( flickerAPI, {
    tags: "test yahoo",
    tagmode: "any",
    format: "json"
  })
    	.done(function( data ) {
		var items = [];
items.push( "<p id='" + "rate" + "'>" + data.query.results.rate[0].Name + " : " + data.query.results.rate[0].Rate + "</p>" );
	      	//$.each( data, function( key, val ) {
	    	//	items.push( "<li id='" + key + "'>" + key + " : " + val.results.rate[0].Rate + "</li>" );
	  	//});
	 
	  	$( "<div/>", {
	    		"class": "my-new-list",
	    		html: items.join( "" )
	  	}).appendTo( "#mainPanel" );
    	})
  	.fail(function() {
    		console.log( "error" );
  	});
};

getExRate()

});
