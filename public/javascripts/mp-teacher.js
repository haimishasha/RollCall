$(document).ready(function () {
	var t = $("#mpclass").val();
	mpTeacher(t);
	var dianmingCourse = $('#dianmingCourse').val();
	var url = '/mp-teacher/creat/'+dianmingCourse;
	$('#buttonDianming').attr("href",url);
});
function mpTeacher(course,teacherClass) {
	console.log('teacherClass'+teacherClass);
	// var tea = $("#mpclass").val();
	// console.log('tea'+tea);
	jQuery.ajax({
		url: '/mp-teacher/' +course+'/'+ teacherClass,
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
	  	alert(data.length);
	  	var i = data.length;
	  	$("#TeacherCourse div").remove();
	  		$("#TeacherCourse").append('<div class="am-panel am-panel-success">'+
			        '<div class="am-panel-hd">'+
			            '<h3 class="am-panel-title">签到总人数</h3>'+
			        '</div>'+

			        '<table class="am-table am-table-bordered am-table-radius am-table-striped">'+
			            '<thead>'+
			            '<tr>'+
			            '<th>学生班级</th>'+
			                '<th>学生学号</th>'+
			                '<th>学生姓名</th>'+
			                '<th>签到时间</th>'+
			            '</tr>'+
			            '</thead>'+
			            '<tbody  id="allstudent">'+         
			            '</tbody>'+
			        '</table>'+
			    '</div>')
	  		 if( i ){
	                             while(i>0){i--;
	                             	$("#allstudent").append(
			            ' <tr><td>'+data[i].stuClass+'</td><td>'+data[i].stuNo+'</td><td>'+data[i].stuName+'</td><td>'+data[i].time+'</td></tr>')
			          } }
			           else{
			           	$("#allstudent").append(
			               '<div><p>还没有学生签到</p></div>')

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

