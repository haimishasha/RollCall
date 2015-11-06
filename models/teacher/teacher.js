

var mongodb = require('../db');
var Teacher = function (teacher) {
    this.trueName = teacher.trueName;
    this.password = teacher.password;
    this.school = teacher.school;
    this.institute = teacher.institute;
    this.number = teacher.number;
};
module.exports = Teacher;
//存储
Teacher.prototype.save = function (callback) {
    var date = new Date();
    var time = date.getFullYear() + '-'
        + date.getMonth() + '- ' + date.getDate() + ' '
        + date.getHours() + ':' + date.getMinutes() + ':'
        + date.getSeconds();
    var teachers = {
        trueName: this.trueName,
        school: this.school,
        institute: this.institute,
        number: this.number,
        password: this.password,
        time: time
    };
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('teachers', function (err, teacher) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            teacher.insert(teachers, {
                safe: true
            }, function (err, teacher) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, teacher);
            });
        });
    });

};

//获取所有
Teacher.getAll = function (query, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('teachers', function (err, teacher) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            teacher.find(query).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs);
            });
        });
    });
};
Teacher.get = function (query, callback) {
    mongodb.open(function (err, db) {
        console.log(1);
        if (err) {
            return callback(err);
        }
        db.collection('teachers', function (err, teacher) {
            console.log(2);
            if (err) {
                mongodb.close();
                return callback(err);
            }
            teacher.find(query).toArray(function (err, docs) {
                console.log(3);
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs[0]);
            });
        });
    });
};
Teacher.getOne = function (query, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('teachers', function (err, teacher) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            teacher.findOne(query, function (err, doc) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, doc);
            });
        });
    });
};
//更新数据
Teacher.update = function (query, data, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('teachers', function (err, teacher) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            teacher.update(query, {$set: data}, {multi: true},
                function (err, result) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, result);
                });
        });
    });
};
//删除
Teacher.remove = function(query,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('teachers',function(err,teacher){
            if(err){
                mongodb.close();
                return callback(err);
            }
            teacher.remove(query,function(err,result){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,result);
            });
        });
    });
};
//删除一条
Teacher.updatePull = function(query,data,callback){
    mongodb.open(function(err,db){
        if(err){
            mongodb.close();
            return callback(err);
        }
        db.collection('teachers',function(err,teacher){
            if(err){
                mongodb.close();
                return callback(err);
            }
            teacher.update(query,{$pull:data},function(err,result){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,result);
            });
        });
    });
};
//增加一条
Teacher.updatePush = function(query,data,callback){
    mongodb.open(function(err,db){
        if(err){
            mongodb.close();
            return callback(err);
        }
        db.collection('teachers',function(err,teacher){
            if(err){
                mongodb.close();
                return callback(err);
            }
            teacher.update(query,{$push:data},function(err,result){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,result);
            });
        });
    });
};