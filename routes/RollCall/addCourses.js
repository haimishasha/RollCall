/**
 * Created by 11747 on 2015/10/30.
 */
var AddCourses = require('../../models/teacher/addCourses.js');

module.exports= function(app){
    app.get('/addCourses', function (req, res) {
        res.render('./dianming/addcourses',{title:'手动添加课程'});
    });
    app.post('/addCourses', function (req, res) {
        var newAddCourses = new AddCourses({
            number:req.body.number,
            courseName:req.body.courseName,
            courseTime:req.body.courseTime,
            courseClass:req.body.courseClass,
            classRoom:req.body.classRoom
        });
        newAddCourses.save(function(err){
            if(err){
                return res.redirect('/course');
            }
            res.redirect('/course');
        });
    });
    app.get('/course', function (req, res) {
        res.render('./dianming/Course',{title:'课程'});
    });
};
