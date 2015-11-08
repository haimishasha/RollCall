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
        AddCourses.getAll(query,function(err,addCourses){
            if(!addCourses){
                console.log(err);
            }
            if(err){
                addCourses = [];
            }
            res.render('dianming/Course', {
                title:'课程',
                addCourses:addCourses,
                length:addCourses.length,
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
            res.render('./dianming/addcourses', {
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
            classRoom:req.body.classRoom
        });
        newAddCourses.save(function(err){
            if(err){
                return res.redirect('/course');
            }
            res.redirect('/course');
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
