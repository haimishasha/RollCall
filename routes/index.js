/**
 * ·�ɷ����ļ�
 * user shuai
 * time 2015/10/28
 */

var addCourses = require('../routes/RollCall/addCourses');

module.exports=function(app){

    app.get('/',addCourses);
}
