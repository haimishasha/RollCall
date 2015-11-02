/**
 * Created by 11747 on 2015/10/30.
 */
var AddCourses = require('../../models/teacher/addCourses.js');

module.exports= function(app){
        app.get('/addCourese', function (req, res) {
        res.render('dianming/addcourses',{title:'手动添加课程'});
    });

    app.post('/addCourses', function (req, res) {

    });
};
