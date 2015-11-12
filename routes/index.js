/**
 * 路由分配文件
 * user shuai
 * time 2015/10/28
 */
var teacher =require('./RollCall/teacher');
var student =require('./RollCall/student');
var mp_teacher =require('./RollCall/mp-teacher');

var express = require('express');


var addCourses = require('./RollCall/addCourses');

module.exports=function(app){
    teacher(app);
    student(app);
    addCourses(app);
    mp_teacher(app);

};
