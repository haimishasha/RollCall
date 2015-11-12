var AddCourses = require('../../models/teacher/addCourses.js');
var Teacher = require('../../models/teacher/teacher.js');
var Student = require('../../models/student/student.js');
var Kaoqin = require('../../models/student/kaoqin.js');
module.exports = function (app) {
    app.get('/mp-login', function (req, res) {
        res.render('dianming/login', {
            title: '登陆'
        });
    });
    app.post('/mp-login', function (req, res) {
        Teacher.get({number: req.body.number}, function (err, teacher) {
            if (!teacher) {
                req.flash('error', '不存在');
                console.log(err);
                return res.redirect('/login');
            }
            var password = req.body.password;
            if (teacher.password != password) {
                req.flash('error', '密码错误');
                console.log(err);
                return res.redirect('/login');
            }
            req.session.teacher = teacher;
            console.log(req.session.teacher);
            req.flash('success', '登陆成功');
            res.redirect('/mp-teacher');
        });
    });


    app.get("/mp-teacher", function (req, res) {
        var date = new Date();
        var day = date.getDay();
        var time = date.getHours();
        console.log(day);
        console.log(time);
        var query = {
            number: req.session.teacher.number,
            day: day,
            week:{$ne: null}
        };
        console.log(query);
        AddCourses.getAll(query, function (err, teacher) {
            console.log(teacher);
            if (err) {
                conlose.log(err);
            }
           var  query1 = {
               stuClass:teacher.courseClass2

               //{$or:[{courseClass1: teacher.courseClass1},{courseClass2:teacher.courseClass2},
               //    teacher.courseClass3,teacher.courseClass4,teacher.courseClass5,teacher.courseClass6]}
           };
            Student.getSome(query1,function(err,student){
                console.log(query1);
                console.log(student);
                if (err) {
                    conlose.log(err);
                }
                res.render('dianming/mp-teacherDetail', {
                    title: "签到详情",
                    teacher: teacher,
                    courseClass:[teacher.courseClass1,teacher.courseClass2,teacher.courseClass3,
                        teacher.courseClass4,teacher.courseClass5,teacher.courseClass6],
                    todayDay: day,
                    student:student
                });

            });
        });
    });
    app.get("/mp-teacherAdd", function (req, res) {
        res.render('dianming/mp-teacherAdd', {
            title: "补签"
        });
    });
    app.get("/mp-teacherCourse", function (req, res) {
        var date = new Date();
        var day = date.getDay();
        var time = date.getHours();
        console.log(day);
        console.log(time);
        var query = {
            number: req.session.teacher.number,
            day: day,
            week:{$ne: null}

        };
        console.log(query);
        AddCourses.getAll(query, function (err, teacher) {
            console.log(teacher);
            if (err) {
                conlose.log(err);
            }

            res.render('dianming/mp-teacherCourse', {
                title: "签到详情",
                teacher: teacher,
                todayDay: day


            });
        });
    });
};