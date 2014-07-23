
function checkIfLogged(callback){
	$.ajax({
	    'url': 'isLogged.php',
	    'success': function(resp) {
		console.log(resp);
		if(resp != 0) {
			console.log('LOGGED');
			$("#messageLoggin").text("Bienvenido "+resp+"!");
			$("#bLogIn").hide();
			$("#bLogOut").show();
			$(".divFiles").show();
		}else{
			console.log('UNLOGGED');
			$("#messageLoggin").text("Log in to save your work");
			$("#bLogOut").hide();
			$("#bLogIn").show();
			$(".divFiles").hide();
			$(".divFiles .dropdown-menu").empty();
			$(".divFiles input").val('');
			
		}
		username = resp;
		if(typeof callback === "function") {
			callback();
		};
	    },
	    'fail': function(resp) {
		console.log('FAIL');
	    }
	});
};

function logOut(){
	console.log('LOGGING OUT');
	$.ajax({
	    'url': 'logOut.php',
	    'success': function(resp) {
		console.log(resp);
		if(resp) {
			console.log('LOG OUT SUCCESS');
			checkIfLogged(loadSavedFilesToDropdown);
		}else{
			console.log('LOG OUT FAILED');
		}
	    }
	});
	checkIfLogged();
}


$("#bLogOut").click(logOut);
$(".bRegister, .bLogin").click(function(e){
var name = ($(event.target).attr('id') == 'register') ? 'Registration' : 'Login';
var form = ($(event.target).attr('id') == 'register') ? '#registerForm' : '#loginForm';
var cId  = $(event.target).attr('id');
var cData = $(form).serialize() +'&action='+  cId;
var locMes = form+' .message';

$.post('service.php', cData, function(data) {
	console.log(data);
    var code = $(data)[0].nodeName.toLowerCase();
    $(locMes).removeClass('error');
    $(locMes).removeClass('success');
    $(locMes).addClass(code);
    if(code == 'success') {
      	$(locMes).html(name + ' was successful.');
	$('#loginModal').modal('hide');
	checkIfLogged(loadSavedFilesToDropdown);
    }
    else if(code == 'error') {
      var id = parseInt($(data).attr('id'));
      switch(id) {
        case 0:
          $(locMes).html('This user name has already been taken.');
        break;
      case 1:
        $(locMes).html('The e-mail entered is invalid.');
        break;
      case 2:
        $(locMes).html('The user name or password you entered was invalid.');
        break;
      default:
        $(locMes).html('An error occurred, please try again.');
      }
    }
    $(locMes).slideDown('fast');
  });
  return e.preventDefault();
	
});

$(function () {

    // Calling Register Form
    $("#newUser").click(function () {
        $("#socialDiv").toggle();
        $("#loginDiv").toggle();
        $("#registerDiv").toggle();
        $(".headerTitle").text('Register');
        return false;
    });

    // Going back to Social Forms
    $("#backLogin").click(function () {
        $("#socialDiv").toggle();
        $("#loginDiv").toggle();
        $("#registerDiv").toggle();
        $(".header_title").text('Login');
        return false;
    });

})
//$("#modal_trigger").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });

