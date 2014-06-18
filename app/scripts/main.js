console.log('\'Allo \'Allo!');

$(document).ready(function(){
  $(".btn-danger").click(function(){
    $("#inputSuccess2").hide(1000);
  });

  $(".btn-success").click(function(){
    $("#inputSuccess2").show();
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
});
