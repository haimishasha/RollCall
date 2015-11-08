/**
 * Created by 11747 on 2015/10/30.
 */
var mongodb = require('../db');

var AddCourses = function (addCourses){
    this.number = addCourses.number;//教师职工号
    this.courseName = addCourses.courseName;//课程名 老师上课的所有课程 
    this.courseTime = addCourses.courseTime;//课程时间 老师上课的时间
    this.courseClass1 = addCourses.courseClass1;//班级  老师带的所有班级
    this.courseClass2 = addCourses.courseClass2;
    this.courseClass3 = addCourses.courseClass3;
    this.courseClass4 = addCourses.courseClass4;
    this.courseClass5 = addCourses.courseClass5;
    this.courseClass6 = addCourses.courseClass6;
    this.usernum = addCourses.usernum;//录入人数
    this.classRoom = addCourses.classRoom;//教室
    this.remark = addCourses.remark
};
module.exports = AddCourses;

//存储添加菜单
AddCourses.prototype.save = function(callback){
    var date = new Date();
    var time = date.getFullYear()+ '-'+ date.getMonth()+ '-' +date.getDate()+ ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    var addCoursess = {
        number:this.number,
        courseName: this.courseName,
        courseTime: this.courseTime,
        courseClass1:this.courseClass1,
        courseClass2: this.courseClass2,
        courseClass3: this.courseClass3,
        courseClass4: this.courseClass4,
        courseClass5: this.courseClass5,
        courseClass6: this.courseClass6,
        usernum: this.usernum,
        classRoom: this.classRoom,
        remark:this.remark,
        time: time
    };
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取addCoursess集合
        db.collection('addCoursess',function(err,addCourses){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //将添加的菜单信息插入到addCoursess集合
            addCourses.insert(addCoursess,{
                safe:true
            },function(err,addCourses){
                mongodb.close();
                if(err){
                    return callback(err);//错误，返回err信息
                }
                callback(null,addCourses);////返回 err 为 null
            });
        });
    });
};
AddCourses.getAll = function(query,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('addCoursess',function(err,addCourses){
            if(err){
                mongodb.close();
                return callback(err);
            }
            addCourses.find(query).toArray(function(err,docs){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,docs);
            });
        });
    });
};
AddCourses.get = function(query,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('addCoursess',function(err,addCourses){
            if(err){
                mongodb.close();
                return callback(err);
            }
            addCourses.insert(query,function(err,doc){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,doc);
            });
        });
    });
};

AddCourses.update = function(query,data,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err)
        }
        db.collection('addCoursess',function(err,addCourses){
            if(err){
                mongodb.close();
                return callback(err);
            }
            addCourses.update(query,{$set:data},function(err,result){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,result);
            });
        });
    });
}

AddCourses.remove = function(query,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('addCoursess',function(err,addCourses){
            if(err){
                mongodb.close();
                return callback(err);
            }
            addCourses.remove({_id:_id},{w:1},function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            });
        });
    });
}