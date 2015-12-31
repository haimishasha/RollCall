var mongodb = require('../db');

var Qiandao = function(qiandao){
this.stuSchool = qiandao.stuSchool;
this.stuInstitute = qiandao.stuInstitute;
this.stuClass = qiandao.stuClass;
this.stuName = qiandao.stuName;
this.stuNo = qiandao.stuNo;
this.stuCourse=qiandao.stuCourse;
};
module.exports = Qiandao;

Qiandao.prototype.save = function (callback) {
    var date = new Date();
    var time = date.getFullYear() + '-'
        + date.getMonth() + '- ' + date.getDate() + ' '
        + date.getHours() + ':' + date.getMinutes() + ':'
        + date.getSeconds();
   var id = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + Math.random().toString(36).substr(2,16);

    var qiandaos = {
        _id:id,
        stuSchool: this.stuSchool,
        stuInstitute: this.stuInstitute,
        stuClass: this.stuClass,
        stuName: this.stuName,
        stuNo: this.stuNo,
        stuCourse:this.stuCourse,
        time: time
    };
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('qiandaos', function (err, qiandao) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            qiandao.insert(qiandaos, {
                safe: true
            }, function (err, qiandao) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null,qiandao );
            });
        });
    });

};

//获取所有
Qiandao.getAll = function (query, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('qiandaos', function (err, qiandao) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            qiandao.find(query).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs);
            });
        });
    });
};
Qiandao.get = function (query, callback) {
    mongodb.open(function (err, db) {
        console.log(1);
        if (err) {
            return callback(err);
        }
        db.collection('qiandaos', function (err, qiandao) {
            console.log(2);
            if (err) {
                mongodb.close();
                return callback(err);
            }
            qiandao.find(query).toArray(function (err, docs) {
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
Qiandao.getOne = function (query, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('qiandaos', function (err, qiandao) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            qiandao.findOne(query, function (err, doc) {
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
Qiandao.update = function (query, data, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('qiandaos', function (err, qiandao) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            qiandao.update(query, {$set: data}, {multi: true},
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
Qiandao.remove = function(query,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('qiandaos',function(err,qiandao){
            if(err){
                mongodb.close();
                return callback(err);
            }
            qiandao.remove(query,function(err,result){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,result);
            });
        });
    });
};
