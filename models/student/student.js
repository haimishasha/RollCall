/*************************************************************************************/
/*                                                                                   */
/*               此部分代码是数据库对student所进行的一些相关的操作                  */
/*                                                                                   */
/*************************************************************************************/
var mongodb = require('../db');
var Kaoqin = require('./kaoqin');
function Student(student) {
    this.openid        = student.openid;
    this.nickname      = student.nickname;
    this.stuNo         = student.stuNo;
    this.stuClass      = student.stuClass;
    this.stuName       = student.stuName;
    this.stuSchool     = student.stuSchool;
    this.stuInstitute  = student.stuInstitute;
    this.arrived       = student.arrived;
};
module.exports = Student;


//存储签到者信息到students集合中
Student.prototype.save = function(callback) {
  var student = {
      openid:       this.openid,
      nickname:     this.nickname,
      stuNo:        this.stuNo,
      stuClass:     this.stuClass,
      stuName:      this.stuName,
      stuSchool:    this.stuSchool,
      stuInstitute: this.stuInstitute,
  };
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('students', function (err, students) {
      if (err) {
        mongodb.close();
        return callback(err);
      } 
      students.insert(student, {safe: true}, function (err, result) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, result);
      }); 
    });   
  });
};


//删除students集合中某个学生的信息
Student.remove = function(query, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('students', function (err, students) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      students.remove(query, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
}

//更新students集合中某个学生的信息
Student.update = function(query,data,callback){
  mongodb.open(function(err,db){
    if(err){
      return callback(err)
    }
    db.collection('students',function(err,students){
      if(err){
        mongodb.close();
        return callback(err);
      }
      students.update(query,{$set:data},function(err,result){
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null,result);
      });
    });
  });
}

Student.getOne = function(query,callback){
  mongodb.open(function(err,db){
    if(err){
      return callbakc(err);
    }
    db.collection('students',function(err,students){
      if(err){
        mongodb.close();
        return callback(err);
      }
      students.findOne(query,function(err,student){
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null,student);
      });
    });
  });
}

Student.getSome = function(query,callback){
  mongodb.open(function(err,db){
    if(err){
      return callback(err);
    }
    db.collection('students',function(err,students){
      if(err){
        mongodb.close();
        return callback(err);
      }
      students.find(query).toArray(function(err,students){
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null,students);
      });
    });
  });
}



//存储签到者信息到Kaoqin总集合中
Student.prototype.pushIntoKaoqin = function (query, data, callback) {
  var student = {
      openid:       this.openid,
      nickname:     this.nickname,
      stuNo:        this.stuNo,
      stuClass:     this.stuClass,
      stuName:      this.stuName,
      arrived:      this.arrived,
      stuSchool:    this.stuSchool,
      stuInstitute: this.stuInstitute,
  };
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('kaoqin', function (err, kaoqin) {
      if (err) {
        mongodb.close();
        return callback(err);
      } 
      kaoqin.update(query, {$push: { "students": data}} , function (err,result) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, result);
      }); 
    });   
  });
};


//删除签到者信息从kaoqin总集合中
Student.pullFomKaoqin =  function(query, data, callback) {
  mongodb.open(function (err,db){
    if(err){
      return callback(err);
    }
    db.collection('kaoqin', function (err, kaoqin) {
      if(err){
        mongodb.close();
        return callback(err);
      }
      kaoqin.update(query, {$pull: { "students": data}}, function (err,result) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, result);
      });
    });
  });
};

//更新或者修改某个签到者的的信息到students总集合中
Student.updateInKaoqin =  function(query, student, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      mongodb.close();
      return callback(err);
    }
    db.collection("kaoqin",function (err,kaoqin){
      if (err) {
        mongodb.close();
        return callback(err);
      } 
      kaoqin.update(query,{$set:{"students.$": student}},function(err){
        mongodb.close();
        if(err){
            return callback(err);
        }
        callback(null);
      });
    });
  });
}



Student.getOneClassInKaoqin = function(query, stuClass, callback) {
	var stuClass1 = [];
	var i = 0;
	Kaoqin.getOne(query, function (err, kaoqin){
    if(err){
      console.log("err in getOneInKaoqin: " + err);
    }
    if(kaoqin){
      if(kaoqin.students){
        students = kaoqin.students;
        students.forEach(function (student, index){
	        if(student.stuClass == stuClass){
	            stuClass1[i++] = student;
	        }
        }); 
        callback(null, stuClass1);  
      }else{
        callback(null, null);
      }
    }else{
      callback(null, null);
    }
  });
}


Student.getArrivedStudents = function(query1, stuClass, arrived, callback) {
  var students1 = [];
  var i = 0;
  Student.getOneClassInKaoqin(query1, stuClass, function (err, students){
    if(err){
      console.log("err in getArrivedStudents: " + err);
    }
    if(students){
      students.forEach(function (student, index){
        if(student.arrived == arrived){
            stuClass1[i++] = student;
        }
      }); 
    }else{
      callback(null, null);
    }
  });
}


Student.getOneStudentInKaoqin = function(query, stuNo, callback) {
	Kaoqin.getOne(query, function (err, kaoqin){
    if(err){
      console.log("err in getOneInKaoqin: " + err);
    }
    if(kaoqin){
      if(kaoqin.students){
        students = kaoqin.students;
        students.forEach(function (student, index){
	        if(student.stuNo == stuNo){
	          callback(null, student);  
	        }
        }); 
      }else{
        callback(null, null);
      }
    }else{
      callback(null, null);
    }
  });
}


Student.getOneStudentInKaoqins = function(query, stuNo, callback) {
  var arrivedCount = 0;
  var kaoqinCount  = 0;
  Kaoqin.getSome(query, function (err, kaoqins){
    if(err){
      console.log("err in getOneInKaoqin: " + err);
    }
    if(kaoqins){
      kaoqinCount = kaoqins.length;
      kaoqins.forEach(function (kaoqin, index){
        if(kaoqin.students){
          students = kaoqin.students;
          students.forEach(function (student, index){
            if(student.stuNo == stuNo){
               arrivedCount++;
            }
          }); 
        }
      });  
    }
    //此处是不是容易出错呢？？？？
    callback(null,arrivedCount,kaoqinCount);  
  });
}