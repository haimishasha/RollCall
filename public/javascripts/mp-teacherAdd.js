$(document).ready(function() {
	var ccc = $("#ggg").val();
	mpTeacher(ccc);
});
function mpTeacher(teacherClass) {
	jQuery.ajax({
		url: '/mp-teacherAdd/' + teacherClass,
		type:'GET',
		complete: function(xhr, textStatus) {
	  	console.log('complete');
	  	console.log(xhr);
	  	console.log(textStatus);
	  },
	  success: function(data , textStatus ,xhr){
	  	console.log('success');
	          console.log(data);
	  	console.log(textStatus);
	  	console.log(xhr);
	  	var i = data.length;
	  	$("#stuClass option").remove();
	  	while(i>=0){i--;	  		 
	          if(data[i] != null){
	        
	  		$("#stuClass").append('<option  >'+data[i]+'</option>')	
	  	}
	  	}
	  },
	   error: function(xhr, textStatus, errorThrown) {
	    console.log('error');
	  	console.log(xhr);
	  	console.log(textStatus);
	  	console.log(errorThrown);
	  }

	});
};