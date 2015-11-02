/**
 * Created by 11747 on 2015/10/30.
 */
var mongodb = require('../db');

//AddCourses为数据库名 addCoursess为集合名
var AddCourses = function (addCourses){
    this.number = teacher.number;//职工号
    this.courseName = addCourses.courseName;//课程名 老师上课的所有课程 
    this.courseTime = addCourses.courseTime;//课程时间 老师上课的时间
    this.courseClass = addCourses.courseClass;//班级  老师带的所有班级
    this.classRoom = addCourses.classRoom;//教室   
};
module.exports = AddCourses;

//存储添加菜单
AddCourses.prototype.save = function(callback){
    //添加课程要存入数据库的文档
    var addCourses = {
        number:this.number,
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
        //读取addCoursess集合
        db.collection('addCoursess',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //将添加的菜单信息插入到addCoursess集合
            collection.insert(addCoursess,{
                safe:true
            },function(err){
                mongodb.close();
                if(err){
                    return callback(err);//错误，返回err信息
                }
                callback(null);////返回 err 为 null
            });
        });
    });
};

//读取添加课程的信息
AddCourses.get = function(num,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取addCoursess集合
        db.collection('addCoursess',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            var query = {};
            if (name){
                query.number = number;
            }
            collection.find(query).sort({}).toArray(function(err,docs){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                docs.forEach(function(doc){
                    doc.post = markdown.toHTML(doc.post);
                });
                callback(null,docs);
            });
        });
    });
};


//数据库的更新操作
AddCourses.update = function(num,data,callback){
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