/**
 * Created by 11747 on 2015/10/30.
 */
//var AddCourses = require('../models/teacher/addCourses.js');

module.exports= function(app){
    console.log('./routes/RollCall/addCourses.js start');
    app.get('/',function(res,req){
        res.send('hello world');
    });
    console.log('./routes/RollCall/addCourses.js finish');
};
