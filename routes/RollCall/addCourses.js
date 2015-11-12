/**
 * Created by 11747 on 2015/10/30.
 */
var crypto = require('crypto');
var AddCourses = require('../../models/teacher/addCourses.js');
var Teacher = require('../../models/teacher/teacher.js');
module.exports= function(app){
    //app.get('/Course', checkLogin);
    app.get('/Course', function (req, res) {
        var query ={
            number:req.session.teacher.number
        };
        console.log(query);
        AddCourses.getAll(query,function(err,addCourses){
            if(!addCourses){
                console.log(err);
            }
            if(err){
                console.log(1010);
                addCourses = [];
            }
            console.log(addCourses);
            res.render('dianming/Course', {
                title:'课程',
                addCourses:addCourses,
                length:addCourses.length,
                courseName:addCourses.courseName
            });
        });
    });
    app.post('/Course', function (req, res) {
        AddCourses.remove(function(err){
            if(err){
                return res.redirect('/Course');
            }
            res.redirect('/Course');
        });
    });
    //////////////////////////////////////////////////////////////
    app.get('/addCourses', function (req, res) {
        var query ={
            number:req.session.teacher.number
        };
        Teacher.get(query,function(err,teacher){
            if(!teacher){
                console.log(err);
            }
            res.render('dianming/addCourses', {
                title: '手动添加课程',
                number: teacher.number,
            });
        });
    });
    app.post('/addCourses', function (req, res) {
        var newAddCourses = new AddCourses({
            number:req.body.number,
            courseName:req.body.courseName,
            courseTime:req.body.courseTime,
            courseClass1:req.body.courseClass1,
            courseClass2:req.body.courseClass2,
            courseClass3:req.body.courseClass3,
            courseClass4:req.body.courseClass4,
            courseClass5:req.body.courseClass5,
            courseClass6:req.body.courseClass6,
            usernum:req.body.usernum,
            week1:req.body.week1,
            week2:req.body.week2,
            week3:req.body.week3,
            week4:req.body.week4,
            week5:req.body.week5,
            week6:req.body.week6,
            week7:req.body.week7,
            classRoom:req.body.classRoom
        });
        newAddCourses.save(function(err){
            if(err){
                return res.redirect('/Course');
            }
            console.log(7777);
            res.redirect('/Course');
        });
    });
};

//    function checkLogin(req, res, next) {
//        if (req.session.teacher == null) {
//            res.redirect('/login');
//        }
//        next();
//    }
//
//    function checkNotLogin(req, res, next) {
//        if (req.session.teacher) {
//            res.redirect('back');
//        }
//        next();
//    }
//};
