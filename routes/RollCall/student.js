/*************************************************************************************/
/*                                                                                   */
/*                                 学生签到功能的实现                                    */
/*                                                                                   */
/*************************************************************************************/

var Student   = require('../../models/student/student.js');   
var Kaoqin    = require('../../models/student/kaoqin.js');  
var wechat    = require("../weixin/wechat");
var Config    = require('../weixin/config');
var url       = Config.url


module.exports = function(app) {
  app.get('/user/getStudentInfo/:state?', wechat.getStudentInfo_signin);
  app.get('/stuBind/:teacherSchool/:teacherNo/:courseID/:courseTime', function (req,res){
    var teacherSchool = req.params.teacherSchool;
    var teacherNo     = req.params.teacherNo;
    var courseID      = req.params.courseID;
    var courseTime    = req.params.courseTime;
    var url_stuSign   = '/stuSign/'+ teacherSchool + "/" + teacherNo + "/" + courseID + "/" + courseTime;
    sign_wxuser(req, res, function (wxuser,stateOfSigner){
      req.session.wxuser = wxuser;  
      if(stateOfSigner == 'old'){
        console.log('您已经绑定成功');
        res.redirect(url_stuSign);
      }else{   
        res.render('dianming/stuBind',{
          teacherSchool:teacherSchool,
        });
      }
    });  
  });


  app.post('/stuBind/:teacherSchool/:teacherNo/:courseID/:courseTime',  function (req,res){
    var teacherSchool    = req.params.teacherSchool;
    var teacherNo        = req.params.teacherNo;
    var courseID         = req.params.courseID;
    var courseTime       = req.params.courseTime;
    var url_stuSign      = '/stuSign/' + teacherSchool + "/" + teacherNo + "/" + courseID + "/" + courseTime;
    var wxuser           = req.session.wxuser;
    wxuser.stuNo         = req.body.stuNo;
    wxuser.stuName       = req.body.stuName;
    wxuser.stuClass      = req.body.stuClass;
    wxuser.stuSchool     = req.body.stuSchool;
    wxuser.stuInstitute  = req.body.stuInstitute;
    var newStudent    = new Student(wxuser);
    newStudent.save(function (err, result){
      if(err){
        console.log("stuBind err: " + err);
      }
      if(result){
        console.log("绑定成功");
        req.session.wxuser = newStudent;
        req.session.stateOfStudent = 'old';
        res.redirect(url_stuSign);
      }
    }); 
  });


  app.get('/stuSign/:teacherSchool/:teacherNo/:courseID/:courseTime', function (req,res){
    var teacherSchool = req.params.teacherSchool;
    var teacherNo     = req.params.teacherNo;
    var courseID      = req.params.courseID;
    var courseTime    = req.params.courseTime;
    var url_stuBind   = '/stuBind/' + teacherSchool + "/" + teacherNo + "/" + courseID + "/" + courseTime;
    var url_stuDetail  = '/stuDetail/'+ teacherSchool + "/" + teacherNo + "/" + courseID + "/" + courseTime;
    var student       = req.session.wxuser;
    console.log("student ");
    console.log(student);
    query = {
      teacherSchool: teacherSchool,
      teacherNo:     teacherNo,
      courseID:      courseID,
      courseTime:    courseTime,
    }
    if(student){
      stuNo = student.stuNo,
      Student.getOneStudentInKaoqin (query, stuNo, function (err,student_inkaoqin){
        //console.log(student_inkaoqin);
        if(err){
          console.log("stuSign getOneStudentInKaoqin err: " + err);
        }else if(student_inkaoqin){
          if(student_inkaoqin.arrived == "1"){
            console.log("您已经签到成功");
            res.redirect(url_stuDetail); 
          }else{
            res.render("dianming/stuSign",{
              student:student,
            });
          }
        }else{
          //console.log(99999);
          sign_wxuser(req, res, function (wxuser,stateOfSigner){
            student = wxuser;  
            //console.log('wxuser');
            //console.log(wxuser);
            console.log(stateOfSigner);
            if(stateOfSigner == 'old'){
              res.render("dianming/stuSign",{
                student: student,
              });
            }else{
              console.log("签到前请先绑定您的信息");   
              res.redirect(url_stuBind);
            }
          });  
        }
      });
    }else{
      sign_wxuser(req, res, function (wxuser,stateOfSigner){
        student = wxuser;  
        if(stateOfSigner == 'old'){
          res.render("dianming/stuSign",{
            student: student,
          });
        }else{
          console.log("签到前请先绑定您的信息");   
          res.redirect(url_stuBind);
        }
      });  
    }
  });

  
  app.post('/stuSign/:teacherSchool/:teacherNo/:courseID/:courseTime', function (req,res){
    var teacherSchool  = req.params.teacherSchool;
    var teacherNo      = req.params.teacherNo;
    var courseID       = req.params.courseID;
    var courseTime     = req.params.courseTime;
    var stuNo          = req.body.stuNo;
    var stuName        = req.body.stuName;
    var stuClass       = req.body.stuClass;
    var stuSchool      = req.body.stuSchool;
    var stuInstitute   = req.body.stuInstitute;
    var url_stuSuccess = '/stuSuccess/' + teacherSchool + "/" + teacherNo + "/" + courseID + "/" + courseTime;
    var url_stuDetail  = '/stuDetail/'+ teacherSchool + "/" + teacherNo + "/" + courseID + "/" + courseTime;
    var student        = req.session.wxuser;
    //console.log("student");
    //console.log(student);
    query = {
      teacherSchool: teacherSchool,
      teacherNo:     teacherNo,
      courseID:      courseID,
      courseTime:    courseTime,
    }
    data = {
      stuNo:         stuNo,
      stuName:       stuName,
      stuClass:      stuClass,
      stuSchool:     stuSchool,
      stuInstitute:  stuInstitute,
    }
    //下面两行为捏造的数据
    var kaoqin = new Kaoqin(query);
    kaoqin.save(function (err, result) {
      if(err){
        console.log("err" + err);
      }
      //console.log(result);
      Student.getOneStudentInKaoqin (query, stuNo, function (err,student_inkaoqin){
        //console.log(student_inkaoqin);
        if(err){
          console.log("stuSign getOneStudentInKaoqin err: " + err);
        }else if(student_inkaoqin){
          if(student_inkaoqin.arrived == "1"){
            console.log("您已经签到成功");
            res.redirect(url_stuDetail);  
          }else{
            student_inkaoqin.arrived = "1";
            Student.updateInKaoqin (query, student_inkaoqin, function (err){
              if(err){
                console.log("stuSign updateInKaoqin err: " + err);
              }else{
                res.redirect(url_stuSuccess);
              }
            });
          }
        }else{
          signin(student,query,data,function (result){
            res.redirect(url_stuSuccess);
          });
        }
      });
    });
    // Student.getOneStudentInKaoqin (query, stuNo, function (err,student){
    //   if(err){
    //     console.log("stuSign getOneStudentInKaoqin err: " + err);
    //   }else if(student){
    //     if(student.arrived == "1"){
    //       console.log("您已经签到成功");
    //       res.redirect(url_stuDetail);  
    //     }else{
    //       student.arrived = "1";
    //       Student.updateInKaoqin (query, student, function (err){
    //         if(err){
    //           console.log("stuSign updateInKaoqin err: " + err);
    //         }else{
    //           res.redirect(url_stuSuccess);
    //         }
    //       });
    //     }
    //   }else{
    //     signin(student,query,data,function (result){
    //       res.redirect(url_stuSuccess);
    //     });
    //   }
    // });
  });





  app.get('/stuSuccess/:teacherSchool/:teacherNo/:courseID/:courseTime', function (req,res){
    var teacherSchool = req.params.teacherSchool;
    var teacherNo     = req.params.teacherNo;
    var courseID      = req.params.courseID;
    var courseTime    = req.params.courseTime;
    var url_stuSign   = '/stuSign/' + teacherSchool + "/" + teacherNo + "/" + courseID + "/" + courseTime;
    var url_stuDetail = '/stuDetail/' + teacherSchool + "/" + teacherNo + "/" + courseID + "/" + courseTime;
    var student       = req.session.wxuser;
    if(student){
      res.render("dianming/stuSuccess",{
        url_stuDetail:url_stuDetail
      });
    }else{
      sign_wxuser(req, res, function (wxuser,stateOfSigner){
        student = wxuser;  
        if(stateOfSigner == 'old'){
          res.redirect(url_stuSign);
        }else{
          console.log("签到前请先绑定您的信息");   
          res.redirect(url_stuBind);
        }
      });  
    }
  });

  app.get('/stuDetail/:teacherSchool/:teacherNo/:courseID/:courseTime', function (req,res){
    var teacherSchool = req.params.teacherSchool;
    var teacherNo     = req.params.teacherNo;
    var courseID      = req.params.courseID;
    var courseTime    = req.params.courseTime;
    var student       = req.session.wxuser;
    var stuNo         = student.stuNo;
    var url_stuSign   = '/stuSign/' + teacherSchool + "/" + teacherNo + "/" + courseID + "/" + courseTime;
    var url_stuBind   = '/stuBind/' + teacherSchool + "/" + teacherNo + "/" + courseID + "/" + courseTime;
    query = {
      teacherSchool: teacherSchool,
      teacherNo:     teacherNo,
      courseID:      courseID,
      //courseTime:    courseTime,
    }
    if(student){
      Student.getOneStudentInKaoqins(query, stuNo, function (err, arrivedCount, kaoqinCount){
        if(err){
        console.log("stuDetail getOneStudentInKaoqins err: " + err);
        }else{
          res.render("dianming/stuDetail",{
            arrivedCount:  arrivedCount,
            kaoqinCount:   kaoqinCount,
          });
        }
      });
    }else{
      sign_wxuser(req, res, function (wxuser,stateOfSigner){
        student = wxuser;  
        if(stateOfSigner == 'old'){
          res.redirect(url_stuSign);
        }else{
          console.log("签到前请先绑定您的信息");   
          res.redirect(url_stuBind);
        }
      });  
    }
  });
}

function signin(student,query,data,callback){
  student.arrived  = "1";
  var condition = student.stuNo == data.stuNo && student.stuName == data.stuName && student.stuClass == data.stuClass && student.stuSchool == data.stuSchool && student.stuInstitute == data.stuInstitute;
  if(condition){
    var newStudent = new Student(student);
    newStudent.pushIntoKaoqin(query, newStudent,function (err, result){
      if(err){
        console.log("stuSign pushIntoKaoqin err: " + err);
      }else{
        console.log("签到成功");
        callback("yes");
      }
    });
  }else{
    student.stuNo        = data.stuNo;
    student.stuName      = data.stuName;
    student.stuClass     = data.stuClass;
    student.stuSchool    = data.stuSchool;
    student.stuInstitute = data.stuInstitute;
    query_updatae = {
      openid:student.openid
    }
    Student.update(query_updatae, student, function (err,result){
      if(err){
        console.log("stuSign update err: " + err);
      }else{
        console.log("信息更新成功");
        Student.pushIntoKaoqin(query, data,function (err, result){
          if(err){
            console.log("stuSign pushIntoKaoqin err: " + err);
          }else{
            console.log("签到成功");
            callback("yes");
          }
        });
      }
    })
  }
}
//获得用户的微信信息（openid或者是更加详细的信息）
function sign_wxuser(req,res,callback){
  var wxuser    = {};
  var openid    = "1";
  var state     = req.url;
  var stateOfStudent = req.session.stateOfStudent;
  if(req.session.wxuser) {
    wxuser       = req.session.wxuser;
    if(wxuser.ops){
      wxuser     = wxuser.ops[0];
    }
    openid       = wxuser.openid;
  } else {
      var client = wechat.client;
      var url_weixin    = client.getAuthorizeURL(url.url+'user/getStudentInfo', state,"snsapi_userinfo"); //无关注也可以授权，有明显授权页面
      //console.log("url_weixin");
      //console.log(url_weixin);
      return res.redirect(url_weixin);  
  }
  callback(wxuser,stateOfStudent);
}

