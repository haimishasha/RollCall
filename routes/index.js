/**
 * 路由分配文件
 * user shuai
 * time 2015/10/28
 */
var addCourses = require('./RollCall/addCourses');

module.exports=function(app){
    console.log('/routes/index.js start');
    //app.get('/',addCourses.add);
    addCourses(app);
    console.log('/routes/index.js finish');
}
