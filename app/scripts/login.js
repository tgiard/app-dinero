isLogOut = 0;


$("#bLogOut").click(logOut);
$("#bFacebook").click(logWithFacebook);
$("#bGoogle").click(logWithGoogle);


function checkIfLogged(callback){
	console.log('CHECKING IF LOGGED');
	if(userId != -1) {
		console.log('LOGGED');
		$("#messageLoggin").text("Bienvenido "+userFirstname+"!");
		$("#bLogIn").hide();
		$("#bLogOut").show();
		$(".divFiles").show();
		loadProjectsToDropdown();
	}else{
		console.log('UNLOGGED');
		$("#messageLoggin").text("Log in to save your work");
		$("#bLogOut").hide();
		$("#bLogIn").show();
		$(".divFiles").hide();
		$(".divFiles .dropdown-menu").empty();
		$(".divFiles input").val('');
		
	}
};

function refreshSession(callback){
	console.log('REFRESHING SESSION');
	var cData = 'action=refresh_session';
	$.post('serviceDB.php', cData, function(data) {
		console.log(data);
		var code = $(data)[0].nodeName.toLowerCase();
		if(code == 'success') {
		      	userId = parseInt($(data).attr('userid'));
		      	userFirstname = $(data).attr('firstname');
			console.log(userId);	
	    	}else if(code == 'error') {
		      	userId = -1;
		      	userFirstname = '';
		}
		checkIfLogged();
	})
};

function logOut(callback){
	isLogOut = 1;
	console.log('LOGGING OUT');
	console.log($('.isSaved').val())
	if( $('.isSaved').val()==0 ){
		$('#unsavedModal').modal('show');	
		$('#unsavedModal').find('.btn').prop('disabled',false);
	}else{
		userId = -1;
		var cData = 'action=logout';
		$.post('serviceDB.php', cData, function(data) {
			console.log(data);
			var code = $(data)[0].nodeName.toLowerCase();
			if(code == 'success') {
				var cLoc = $(".divProjectsList .dropdown-menu");		
				cLoc.empty();
				changeSaveStatus(0);
				console.log('LOG OUT SUCCESS');
			
				//Log out from facebook if needed
				FB.getLoginStatus(function(response) {
				  if (response.status === 'connected') {
				    	FB.logout(function(response) {
				    });
				  }
				});
				sessionParams = {
					'session_state': null
				};
				gapi.auth.checkSessionState(sessionParams, function(stateMatched){
					if (stateMatched == true) {
						gapi.auth.signOut();
					}
				});

			}else if(code == 'error') {
				console.log('LOG OUT FAILED');
			}
			checkIfLogged();
		});
		isLogOut = 0;
	}	
}



$(".bRegister, .bLogin").click(function(e){

	var name = ($(event.target).attr('id') == 'register') ? 'Registration' : 'Login';
	var form = ($(event.target).attr('id') == 'register') ? '#registerForm' : '#loginForm';
	var cId  = $(event.target).attr('id');
	var cData = $(form).serialize() +'&action='+  cId;
	var locMes = form+' .message center';

	if($("#confirmationPassword").val()!=$("#inputPassword").val()){
		$("#confirmationPassword , #inputPassword").parent().addClass("has-error");
		$(locMes).removeClass('error');
		$(locMes).removeClass('success');
		$(locMes).addClass('error');
		$(locMes).html('Ingrese dos veces la misma contraseña');
	}else{

		$("#registerDiv div").children().removeClass("has-error");
		$.post('serviceDB.php', cData, function(data) {
			console.log(data);
			var code = $(data)[0].nodeName.toLowerCase();
			$(locMes).removeClass('error');
			$(locMes).removeClass('success');
			$(locMes).addClass(code);
			if(code == 'success') {
			      	userId = parseInt($(data).attr('userid'));
			      	userFirstname = $(data).attr('firstname');
		      		$(locMes).html(name + ' was successful.');
				$('#loginModal').modal('hide');			
				checkIfLogged();
		    	}else if(code == 'error') {
			      var id = parseInt($(data).attr('id'));
			      switch(id) {
				case 0:
				  $(locMes).html('This email already exists.');
				break;
			      case 1:
				$(locMes).html('The e-mail entered is invalid.');
				break;
			      case 2:
				$(locMes).html('Please enter an email and a password.');
				break;
			      case 3:
				$(locMes).html('Problem with the Database.');
				console.log('REGISTER NEW USER : MYSQL INSERT PROBLEM');
				break;
			      case 4:
				$(locMes).html('Invalid email and/or password.');
				break;
			      case 5:
				$(locMes).html('haha');
				break;
			      default:
				$(locMes).html('An error occurred, please try again.');
			}
		    }
		    $(locMes).slideDown('fast');
		  });
		  return e.preventDefault();
	}
	
});

function logWithFacebook(){
	var locMes = '#loginForm .message center';

	FB.login(function(response) {
	  if (response.status === 'connected') {
	    console.log("Logged into your app and Facebook.");
		FB.api('/me', function(response) {
			var cUserId = response['id'];
			var cFirstName = response['first_name'];
			var cLastName = response['last_name'];
			var cEmail = response['email'];
			var cFlag = 2;
			var cData = 'action=login_social&id_user='+cUserId+'&firstname='+cFirstName+'&lastname='+cLastName+'&email='+cEmail+'&flag='+cFlag;		
			$.post('serviceDB.php', cData, function(data) {
				console.log(data);
				var code = $(data)[0].nodeName.toLowerCase();
				$(locMes).removeClass('error');
				$(locMes).removeClass('success');
				$(locMes).addClass(code);
				if(code == 'success') {
				      	userId = parseInt($(data).attr('userid'));
				      	userFirstname = $(data).attr('firstname');
					console.log(userFirstname);
			      		$(locMes).html('Facebook login was successful.');
					$('#loginModal').modal('hide');			
					checkIfLogged();
			    	}else if(code == 'error') {
				      var id = parseInt($(data).attr('id'));
				      switch(id) {
					case 0:
					  $(locMes).html('This email already exists.');
					break;
				      case 1:
					$(locMes).html('The e-mail entered is invalid.');
					break;
				      case 2:
					$(locMes).html('Please enter an email and a password.');
					break;
				      case 3:
					$(locMes).html('Problem with the Database.');
					console.log('REGISTER NEW USER : MYSQL INSERT PROBLEM');
					break;
				      case 4:
					$(locMes).html('Invalid email and/or password.');
					break;
				      case 5:
					$(locMes).html('haha');
					break;
				      default:
					$(locMes).html('An error occurred, please try again.');
				}
			    }
			    $(locMes).slideDown('fast');
			});	
			$('#loginModal').modal('hide');
			checkIfLogged();
		});
	  } else if (response.status === 'not_authorized') {
	    console.log("The person is logged into Facebook, but not your app.");
	  } else {
	    console.log("The person is not logged into Facebook, so we're not sure if they are logged into this app or not.");
	  }
	});

}

function logWithGoogle(){
	console.log("----- LOG WITH GOOGLE+ -----");
	   var additionalParams = {
	     'callback': signinCallback
	   };
	gapi.auth.signIn(additionalParams);
}

function signinCallback(authResult) {
	var locMes = '#loginForm .message center';
	if (authResult['status']['signed_in']) {
	
		console.log("Logged with Google");
		gapi.client.load('plus','v1', function(){
			 var request = gapi.client.plus.people.get({
			   'userId': 'me'
			 });
			 request.execute(function(resp) {
				//console.log('Retrieved profile for:' + resp.name.givenName);
				//console.log('Retrieved profile id:' + resp.id);
				//$.each(resp.name,function(i,v){console.log(i+" - "+v)});

				var cUserId = resp.id;
				var cFirstName = resp.name.givenName;
				var cLastName = resp.name.familyName;
				var cEmail = resp.email;
				var cFlag = 3;
				for (var i=0; i < resp.emails.length; i++) {
					if (resp.emails[i].type === 'account') cEmail = resp.emails[i].value; break;
				}
				var cData = 'action=login_social&id_user='+cUserId+'&firstname='+cFirstName+'&lastname='+cLastName+'&email='+cEmail+'&flag='+cFlag;		
				console.log(cData);
				$.post('serviceDB.php', cData, function(data) {
					console.log(data);
					var code = $(data)[0].nodeName.toLowerCase();
					$(locMes).removeClass('error');
					$(locMes).removeClass('success');
					$(locMes).addClass(code);
					if(code == 'success') {
					      	userId = parseInt($(data).attr('userid'));
					      	userFirstname = $(data).attr('firstname');
						console.log(userFirstname);
				      		$(locMes).html('Google login was successful.');
						$('#loginModal').modal('hide');			
						checkIfLogged();
				    	}else if(code == 'error') {
					      var id = parseInt($(data).attr('id'));
						switch(id) {
							case 15:
								$(locMes).html('Problem inserting social user, please try again.');
								break;
							default:
								$(locMes).html('An error occurred, please try again.');
						}
					}
				    	$(locMes).slideDown('fast');
				});	
			});
		});
	} else {
		    // Update the app to reflect a signed out user
		    // Possible error values:
		    //   "user_signed_out" - User is signed-out
		    //   "access_denied" - User denied access to your app
		    //   "immediate_failed" - Could not automatically log in the user
		    console.log('Sign-in state: ' + authResult['error']);
	}
}


$(function () {

    // Calling Register Form
    $("#newUser").click(function () {
        $("#socialDiv").toggle();
        $("#loginDiv").toggle();
        $("#registerDiv").toggle();
        $("#myModalLabel").text('Register');
        return false;
    });

    // Going back to Social Forms
    $("#backLogin").click(function () {
        $("#socialDiv").toggle();
        $("#loginDiv").toggle();
        $("#registerDiv").toggle();
        $("#myModalLabel").text('Login');
        return false;
    });

})

