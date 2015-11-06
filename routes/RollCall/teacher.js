var crypto = require('crypto');
var Teacher = require('../../models/teacher/teacher.js');
module.exports = function (app) {
    app.get('/', checkLogin);
    app.get('/', function (req, res) {
       var query ={
           number:req.session.teacher.number
       };
        Teacher.get(query,function(err,teacher){
            if(!teacher){
                console.log(err);
            }
            res.render('dianming/index', {
                title: '教师',
                number: teacher.number,
                trueName: teacher.trueName,
                school: teacher.school,
                institute: teacher.institute,
                education:teacher.education,
                jobPosition:teacher.jobPosition,
                nativePlace:teacher.nativePlace,
                homePosition:teacher.homePosition,
                wechat:teacher.wechat,
                telNumber:teacher.telNumber,
                QQ:teacher.QQ,
                email:teacher.email,
                writeTime:teacher.writeTime,
                remark:teacher.remark
            });
        });

    });
    app.post('/', function (req, res) {
        var query={
            number:req.session.teacher.number
        };
        var data = req.body;
        console.log(data);
        Teacher.update(query,data,function(err,result){
            if(err){
                console.log(err);
            }
            console.log(result);
            res.redirect('/');
        });
    });

    app.get('/logout', function (req, res) {
        req.session.teacher = null;
        console.log(req.session.teacher);
        res.redirect('/login');
    });
    app.get('/login', function (req, res) {
        res.render('dianming/login', {
            title: '登陆'
        });
    });
    app.post('/login', function (req, res) {
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
            res.redirect('/');
        });

    });
    app.get('/reg', function (req, res) {
        res.render('dianming/reg', {
            title: '注册'


        });
    });
    app.post('/reg', function (req, res) {
        var trueName = req.body.trueName,
            number = req.body.number,
            school = req.body.school,
            password = req.body.password,
            password_re = req.body['password-repeat'],
            institute = req.body.institute;
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        var newTeacher = new Teacher({
            trueName: req.body.trueName,
            number: req.body.number,
            school: req.body.school,
            password: req.body.password,
            institute: req.body.institute
        });
        Teacher.get({number: newTeacher.number}, function (err, teacher) {
            if (err) {
                req.flash('error', err);
                console.log(err);
                return res.redirect('/reg');
            }
            if (teacher) {
                req.flash('error', '用户存在');
                return res.redirect('/reg');
            }
            newTeacher.save(function (err, teacher) {
                if (err) {
                    req.flash('error', err);
                    console.log(err);
                    return res.redirect('/reg');
                }
                console.log(teacher);
                req.session.teacher = teacher;
                req.flash('success', '注册成功');
                res.redirect('/login');
            });
        });
    });
    function checkLogin(req, res, next) {
        if (req.session.teacher == null) {
            res.redirect('/login');
        }
        next();
    }

    function checkNotLogin(req, res, next) {
        if (req.session.teacher) {
            res.redirect('back');
        }
        next();
    }
};