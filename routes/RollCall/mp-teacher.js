var AddCourses = require('../../models/teacher/addCourses.js');
var Teacher = require('../../models/teacher/teacher.js');
var Student = require('../../models/student/student.js');
var Kaoqin = require('../../models/student/kaoqin.js');
var Qiandao = require('../../models/student/qiandao.js');
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
        var query = {
            number: req.session.teacher.number,
            day: day,
            week:{$ne: null}
        };
        console.log(query);
        AddCourses.getAll(query, function (err, teacher) {
            console.log('teacher');
            console.log(teacher);
            if (err) {
                console.log(err);
            }
             res.render('dianming/mp-teacherDetail',{
                title: "签到详情",
                    teacher: teacher,
                    course:[teacher[0].courseClass1,teacher[0].courseClass2,teacher[0].courseClass3,
                    teacher[0].courseClass4,teacher[0].courseClass5,teacher[0].courseClass6],
                    todayDay: day,
                    
            });
        });
    });
app.get("/mp-teacher/:teacherClass",function (req,res){
      var teacherClass = req.params.teacherClass;
      var query = {
        stuCourse : teacherClass,
      };
      console.log('teacherClass');
      console.log(teacherClass);
      Qiandao.getAll(query , function(err,student){
        if(err){
            console.log(err);
        }
        console.log('student');
        console.log(student);
        res.send(student);
      });
});
app.get("/mp-teacherAdd", function (req, res) {
     var date = new Date();
        var day = date.getDay();
        var time = date.getHours();
        var query1={
            number: req.session.teacher.number,
        }
        var query = {
            number: req.session.teacher.number,
            day: day,
            week:{$ne: null}
        };
        console.log(query);

        Teacher.getAll(query1,function(err,tea){
             if (err) {
                console.log(err);
            }
            console.log(tea);
            AddCourses.getAll(query, function (err, teacher) {
            console.log('teacher');
            console.log(teacher);
            if (err) {
                console.log(err);
            }
             res.render('dianming/mp-teacherAdd', {
                    title: "补签",
                    tea:tea,
                    teacher: teacher,
                    course:[teacher[0].courseClass1,teacher[0].courseClass2,teacher[0].courseClass3,
                    teacher[0].courseClass4,teacher[0].courseClass5,teacher[0].courseClass6],
                    todayDay: day,                
            });
        });

        });

        
    });

app.get("/mp-teacherAdd/:teacherClass", function (req, res) {
     var date = new Date();
        var day = date.getDay();
        var time = date.getHours();
        var teacherClass = req.params.teacherClass;
        var query = {
            number: req.session.teacher.number,
            day: day,
            week:{$ne: null},
            courseName:teacherClass,
        };
        console.log(query);
        AddCourses.getAll(query, function (err, teacher) {
            console.log('teacher');
            console.log(teacher);
            if (err) {
                console.log(err);
            }
            var course = [teacher[0].courseClass1,teacher[0].courseClass2,teacher[0].courseClass3,
                    teacher[0].courseClass4,teacher[0].courseClass5,teacher[0].courseClass6];
            res.send(course);
        });
    });

app.post('/mp-teacherAdd',function(req,res){
    var stuNo          = req.body.stuNo;
    var stuName        = req.body.stuName;
    var stuClass       = req.body.stuClass;
    var stuSchool      = req.body.stuSchool;
    var stuInstitute   = req.body.stuInstitute;
    var stuCourse = req.body.stuCourse;
    query = {
      stuNo:         stuNo,
      stuName:       stuName,
      stuClass:      stuClass,
      stuSchool:     stuSchool,
      stuInstitute:  stuInstitute,
      stuCourse : stuCourse,
    }
    var newQiandao = new Qiandao({
         stuNo : req.body.stuNo,
         stuName : req.body.stuName,
         stuClass  :req.body.stuClass,
         stuSchool  : req.body.stuSchool,
         stuInstitute : req.body.stuInstitute,
         stuCourse :req.body.stuCourse,
    });
    Qiandao.get(query,function(err,qiandao){
        if(err){
            console.log(err);
            return res.redirect('/mp-teacherAdd');
        }
        if(qiandao){
            console.log('已存在');
            return res.redirect('/mp-teacher');
        }
        newQiandao.save(function(err,qiandao){
            if(err){
                console.log(err);
                return res.redirect('/mp-teacherAdd')
            }
            console.log(qiandao);
            req.session.qiandao = qiandao;
            res.redirect('/mp-teacher');
        })
    });
   
})


    
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