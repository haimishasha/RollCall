/**
 * Created by 11747 on 2015/10/30.
 */
//var AddCourses = require('../models/teacher/addCourses.js');

module.exports = function(app){
    app.get('/1',function(req,res){
        res.send('hell world');
    });
}
