/**
 * Created by 11747 on 2015/10/30.
 */
var mongodb = require('../db');

var AddCourses = function (addCourses) {
    this.number = addCourses.number;//教师职工号
    this.courseName = addCourses.courseName;//课程名 老师上课的所有课程 
    this.courseClass1 = addCourses.courseClass1;//班级  老师带的所有班级
    this.courseClass2 = addCourses.courseClass2;
    this.courseClass3 = addCourses.courseClass3;
    this.courseClass4 = addCourses.courseClass4;
    this.courseClass5 = addCourses.courseClass5;
    this.courseClass6 = addCourses.courseClass6;
    this.usernum = addCourses.usernum;//录入人数
    this.classRoom = addCourses.classRoom;//教室
    this.week1 = addCourses.week1;
    this.week2 = addCourses.week2;
    this.week3 = addCourses.week3;
    this.week4 = addCourses.week4;
    this.week5 = addCourses.week5;
    this.week6 = addCourses.week6;
    this.week7 = addCourses.week7

};
module.exports = AddCourses;

//存储添加菜单
AddCourses.prototype.save = function (callback) {
    var date = new Date();
    var time = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    var week = [
        {
            number: this.number,
            courseName: this.courseName,
            courseClass1: this.courseClass1,
            courseClass2: this.courseClass2,
            courseClass3: this.courseClass3,
            courseClass4: this.courseClass4,
            courseClass5: this.courseClass5,
            courseClass6: this.courseClass6,
            usernum: this.usernum,
            classRoom: this.classRoom,
            week: this.week1,
            time: time,
            day: 1
        },

        {
            number: this.number,
            courseName: this.courseName,
            courseClass1: this.courseClass1,
            courseClass2: this.courseClass2,
            courseClass3: this.courseClass3,
            courseClass4: this.courseClass4,
            courseClass5: this.courseClass5,
            courseClass6: this.courseClass6,
            usernum: this.usernum,
            classRoom: this.classRoom,
            week: this.week2,
            time: time,
            day: 2
        },
        {
            number: this.number,
            courseName: this.courseName,
            courseClass1: this.courseClass1,
            courseClass2: this.courseClass2,
            courseClass3: this.courseClass3,
            courseClass4: this.courseClass4,
            courseClass5: this.courseClass5,
            courseClass6: this.courseClass6,
            usernum: this.usernum,
            classRoom: this.classRoom,
            week: this.week3,
            time: time,
            day: 3
        },
        {
            number: this.number,
            courseName: this.courseName,
            courseClass1: this.courseClass1,
            courseClass2: this.courseClass2,
            courseClass3: this.courseClass3,
            courseClass4: this.courseClass4,
            courseClass5: this.courseClass5,
            courseClass6: this.courseClass6,
            usernum: this.usernum,
            classRoom: this.classRoom,
            week: this.week4,
            time: time,
            day: 4
        },
        {
            number: this.number,
            courseName: this.courseName,
            courseClass1: this.courseClass1,
            courseClass2: this.courseClass2,
            courseClass3: this.courseClass3,
            courseClass4: this.courseClass4,
            courseClass5: this.courseClass5,
            courseClass6: this.courseClass6,
            usernum: this.usernum,
            classRoom: this.classRoom,
            week: this.week5,
            time: time,
            day: 5
        },
        {
            number: this.number,
            courseName: this.courseName,
            courseClass1: this.courseClass1,
            courseClass2: this.courseClass2,
            courseClass3: this.courseClass3,
            courseClass4: this.courseClass4,
            courseClass5: this.courseClass5,
            courseClass6: this.courseClass6,
            usernum: this.usernum,
            classRoom: this.classRoom,
            week: this.week6,
            time: time,
            day: 6
        },
        {
            number: this.number,
            courseName: this.courseName,
            courseClass1: this.courseClass1,
            courseClass2: this.courseClass2,
            courseClass3: this.courseClass3,
            courseClass4: this.courseClass4,
            courseClass5: this.courseClass5,
            courseClass6: this.courseClass6,
            usernum: this.usernum,
            classRoom: this.classRoom,
            week: this.week7,
            time: time,
            day: 7
        }];
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回err信息
        }
        //读取addCoursess集合
        console.log(week);
        db.collection('addCourses', function (err, addCourses) {
            if (err) {
                mongodb.close();
                console.log(1);

                return callback(err);//错误，返回err信息
            }
            //将添加的菜单信息插入到addCoursess集合
            addCourses.insert(week, {
                safe: true
            }, function (err, www) {
                mongodb.close();
                if (err) {
                    console.log(2);

                    return callback(err);//错误，返回err信息
                }
                console.log(www);
                callback(null, www);////返回 err 为 null
            });
        });

    });
};

AddCourses.getAll = function (query, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
            console.log(1);
        }
        db.collection('addCourses', function (err, addCourses) {
            if (err) {
                mongodb.close();
                return callback(err);
                console.log(2);

            }
            addCourses.find(query).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                    console.log(3);

                }
                console.log(docs);

                callback(null, docs);
            });
        });
    });
};
AddCourses.get = function (query, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('addCourses', function (err, addCourses) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            addCourses.insert(query, function (err, doc) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, doc);
            });
        });
    });
};

AddCourses.update = function (query, data, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err)
        }
        db.collection('addCourses', function (err, addCourses) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            addCourses.update(query, {$set: data}, function (err, result) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        });
    });
}

AddCourses.remove = function (query, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('addCourses', function (err, addCourses) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            addCourses.remove({_id: _id}, {w: 1}, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
}
