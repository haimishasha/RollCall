/**
 * 路由分配文件
 * user shuai
 * time 2015/10/28
 */
var teacher =require('./RollCall/teacher');
var student =require('./RollCall/student');
var express = require('express');
var router = express.Router();

/* GET home page. */

var addCourses = require('./RollCall/addCourses');

module.exports=function(app){
    teacher(app);
    student(app);
    console.log('/routes/index.js start');
    //app.get('/',addCourses.add);
    addCourses(app);
    console.log('/routes/index.js finish');

};
