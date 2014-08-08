var hasToLoad = 0;


//SAVE
$('.bSave').click(saveProject);
$('.bOverwrite').click(overwriteProject);

function overwriteProject(){
	console.log($('#unsavedModal'));
	var projectName = $(".inputProjectTitle").val();
	clearProject(projectName,saveObjects,$(this));
	$('#overwriteModal').modal('hide');
}

function saveProject(){
	console.log('CREATE PROJECT DB');
	cEl = $(this);
	if(userId != -1){
		//$(".bSave").prop('disabled', true);
		if(cEl.hasClass('bSaveBeforeLoad')){
			$('#unsavedModal').find('.btn').prop('disabled', true);
		}
		var projectName = $(".inputProjectTitle").val();
		console.log("Project Name : ");
		console.log(projectName);
		if(projectName=='') alert("Please enter a title for your project before saving.");
		else{
			var cData = 'action=create_project&project_name='+projectName+'&id_user='+userId;
			$.post('serviceDB.php', cData, function(data) {
				console.log(data);
				var code = $(data)[0].nodeName.toLowerCase();
				if(code == 'success') {
					saveObjects(projectName,cEl);
			    	}else if(code == 'error') {
					var id = parseInt($(data).attr('id'));
					switch(id) {
					case 7:
						console.log("Problem creating new project");
						break;
					case 8:
						console.log("Project already exists");	
						if($('#unsavedModal').hasClass('in')){
							$('#unsavedModal').modal('hide');
							hasToLoad = 1;
						}					
						$('#overwriteModal').modal('show');
						break;
					default:
						console.log("Problem creating new project");
						break;
					}			
				}
			});
		}	
	}else{
		console.log("MUST BE LOGGED TO SAVE PROJECT");	
		alert("MUST BE LOGGED TO SAVE PROJECT");
	}
}

function saveObjects(projectName,o){
	console.log('SAVE OBJECTS DB');			
	var arr = inputsToJson();
	var dataString = JSON.stringify(arr,null,'\t');
	var cData = 'action=save_objects&id_user='+userId+'&project_name='+projectName+'&json='+dataString;
	$.post('serviceDB.php', cData, function(data) {
		console.log(data);
		var code = $(data)[0].nodeName.toLowerCase();
		if(code == 'success') {
			console.log('SAVE OBJECTS OK');
			changeSaveStatus(1);
			if(o.hasClass('bSaveBeforeLoad') || hasToLoad || isLogOut){
				loadObjectsFromModal();
			}
			loadProjectsToDropdown();
		}else if(code == 'error') {
			console.log('SAVE OBJECTS FAILED');
		}
	});
}

function clearProject(projectName,callback,o){
	console.log('CLEAR PROJECT DB');
	var cData = 'action=clear_project&id_user='+userId+'&project_name='+projectName;	
	$.post('serviceDB.php', cData, function(data) {
		console.log(data);
		var code = $(data)[0].nodeName.toLowerCase();
		if(code == 'success') {
			console.log('CLEAR PROJECT SUCCESS');
			if(typeof callback === "function") {
				callback(projectName,o);
			};
		}else if(code == 'error') {
			console.log('CLEAR PROJECT FAILED');
		}
	});
}


function changeSaveStatus(s){
	var cEl = $(".bSave");
	//console.log(cEl);	
	if(s==0){
		cEl.find("span").removeClass('glyphicon-saved');
		cEl.find("span").addClass('glyphicon-save');
		$(".bSave").prop('disabled', false);
	}else{
		cEl.find("span").removeClass('glyphicon-save');
		cEl.find("span").addClass('glyphicon-saved');
		$(".bSave").prop('disabled', true);
	}
	$('.isSaved').val(s);
}


//LOAD
$('.bLoadAnyway').click(loadObjectsFromModal);

function loadProjectsToDropdown(){
	console.log("----- LOADING PROJETS TO DROPDOWN -----");
	if(userId != -1){
		var cData = 'action=load_projects_list&id_user='+userId;		
		$.post('serviceDB.php', cData, function(data) {	
			try{	
				var response=jQuery.parseJSON(data);
				$.each(response,function(i,v){
				//	console.log(i+" : "+v);
				});
				var cLoc = $(".divProjectsList .dropdown-menu");
				loadChoicesDropdown(response,cLoc,1,1);	
				console.log('LOAD PROJECTS SUCCESS');
			}catch(e){
				var code = $(data)[0].nodeName.toLowerCase();
				if(code == 'error') console.log('LOAD PROJECTS FAILED');
			}
		});
	
	}else{
		console.log("not logged");	
	}
}

function loadObjects(idProject){
	console.log("----- LOADING OBJECTS -----");
	if(userId != -1){
		var projectName = $('.inputProjectTitle').val();
		//console.log(projectName);
		idProject = idProject || -1;
		var cData = 'action=load_objects&id_user='+userId+'&project_name='+projectName+'&id_project='+idProject;		
		$.post('serviceDB.php', cData, function(data) {
			//console.log(data);				
			try{
				var response=jQuery.parseJSON(data);
				//console.log(response);	
				$.each(response,function(i,v){
				//	console.log(i+" : "+v);
					response[i]=jQuery.parseJSON(v);
				//	console.log(response[i]);
				});
				refreshInputs(response);
				changeSaveStatus(1);
				console.log('LOAD OBJECTS SUCCESS');
			}catch(e){
				console.log("--- Error ---");	
				var code = $(data)[0].nodeName.toLowerCase();
				if(code == 'error'){ 
					console.log('LOAD OBJECTS FAILED');					
					var id = parseInt($(data).attr('id'));
					switch(id) {
					case 9:
						console.log("Project not found");
						break;
					default:
						console.log("Problem loading objects");
						break;
					}
				}
			}
		});
	
	}else{
		console.log("not logged");	
	}
}

function loadObjectsFromModal(){
	changeSaveStatus(1);
	console.log(isLogOut);
	$('#unsavedModal').modal('hide');
	cEl = $('#unsavedModal').data('currentLi');
	if(cEl){
		//console.log(cEl);
		cEl.trigger('click');
	}else if(isLogOut){
		console.log("reset + log out");
		resetInputs();
		logOut();
	}
	$('#unsavedModal').removeData();
	hasToLoad = 0;
}

//DELETE
$('.bRemoveProject').click(deleteProject);
$('.bAskRemoveProject').click(askDeleteProject);


function deleteProject(){
	console.log("----- DELETE PROJECTS -----");
	if(userId != -1){
		var projectName = $('.inputProjectTitle').val();
		var cData = 'action=delete_project&id_user='+userId+'&project_name='+projectName;		
		$.post('serviceDB.php', cData, function(data) {	
			console.log(data);
			var code = $(data)[0].nodeName.toLowerCase();
			if(code == 'success') {
				console.log('DELETE PROJECT SUCCESS');
				loadProjectsToDropdown();
				resetInputs();
			}else if(code == 'error') {
				console.log('DELETE PROJECT FAILED');					
				var id = parseInt($(data).attr('id'));
				switch(id) {
				case 6:
					console.log("Project name or user id not set");
					break;
				case 14:
					console.log("Problem MySQL while deleting project from the DB.");
					break;
				default:
					console.log("Problem loading objects");
					break;
				}
			}
		});
	
	}else{
		console.log("not logged");
		resetInputs();	
	}
	$('#deleteModal').modal("hide");
}

function resetInputs(){
	var originalPost = $(".mainPanel .divPost:first").clone(true);
	$(".divPost").remove();
	addPost(originalPost);
	$('.inputProjectTitle').val('');
	changeSaveStatus(1);
}

function askDeleteProject(){
	$('#deleteModal').modal("show");
}

