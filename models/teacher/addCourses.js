/**
 * Created by 11747 on 2015/10/30.
 */
var mongodb = require('../models/db');

//AddCourses为数据库名 addCourses为集合名
//function AddCourses(addCourses){
var AddCourses = function (addCourses){
    this.name = addCourses.name;//老师的姓名
    this.school = addCourses.school;//学校
    this.institute = addCourses.institute;//学院
    this.num = addCourses.num;//老师的职工号
    this.courseName = addCourses.courseName;//课程名
    this.courseTime = addCourses.courseTime;//课程时间
    this.courseClass = addCourses.courseClass;//班级
    this.classRoom = addCourses.classRoom;//教室
};
module.exports = AddCourses;

//存储添加菜单
AddCourses.prototype.save = function(callback){
    //添加课程要存入数据库的文档
    var addCourses = {
        name: this.name,
        school: this.school,
        institute: this.institute,
        num: this.num,
        courseName: this.courseName,
        courseTime: this.courseTime,
        courseClass: this.courseClass,
        classRoom: this.classRoom
    };
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取addCourses集合
        db.collection('addCourses',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //将添加的菜单信息插入到adds集合
            collection.insert(addCourses,{
                safe:true
            },function(err,user){
                mongodb.close();
                if(err){
                    return callbacke(err);//错误，返回err信息
                }
                callback(null,addCourses);//成功！err为null，并返回存储后的添加菜单的用户文档
            });
        });
    });
};

//读取添加课程的信息
AddCourses.getAll = function(num,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取addCourses集合
        db.collection('addCourse',function(err,addCourses){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //查找num的一个文档
            addCourses.find(num).toArray(function(err,docs){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,docs);
            });
        });
    });
};
//AddCourses.getOne = function(num,callback){
//    mongodb.open(function(err,db){
//        if(err){
//            return callback(err);
//        }
//        db.collection('addCouse',function(err,addCourses){
//            if(err){
//                mongodb.close();
//                return callback(err);
//            }
//            addCourses.findOne(num,function(err,doc){
//                mongodb.close();
//                if(err){
//                    return callback(err);
//                }
//                callback(null,doc);
//            });
//        });
//    });
//};

//数据库的更新操作
AddCourese.update = function(num,data,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('addCourse',function(err,addCourses){
            if(err){
                mongodb.close();
                return callback(err);
            }
            addCourses.updata(num,{$set:data},function(err,result){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,result);
            });
        });
    });
};

//数据删除
AddCourses.remove = function(num,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('addCourse',function(err,addCourses){
            if(err){
                mongodb.close();
                return callback(err);
            }
            addCourses.remove(num,function(err,result){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,result);
            });
        });
    });
}