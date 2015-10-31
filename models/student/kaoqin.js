/*************************************************************************************/
/*                                                                                   */
/*               此部分代码是数据库对考勤所进行的一些相关的操作                  */
/*                                                                                   */
/*************************************************************************************/
var mongodb = require('../db');
function Kaoqin(kaoqin) {
    this.teacherNo     = kaoqin.teacherNo;
    this.courseID      = kaoqin.courseID;
    this.courseTime    = kaoqin.courseTime;
    this.state         = "0";
};
module.exports = Kaoqin;



Kaoqin.prototype.save = function(callback) {
  var kaoqin = {
      teacherNo:   this.teacherNo,
      courseID:    this.courseID,
      courseTime:  this.courseTime,
      state:       this.state, 
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
      kaoqin.insert(kaoqin, {safe: true}, function (err, result) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, result);
      }); 
    });   
  });
};


Kaoqin.remove = function(query, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('kaoqin', function (err, kaoqin) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      kaoqin.remove(query, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
}


Kaoqin.update = function(query,data,callback){
  mongodb.open(function(err,db){
    if(err){
      return callback(err)
    }
    db.collection('kaoqin',function(err,kaoqin){
      if(err){
        mongodb.close();
        return callback(err);
      }
      kaoqin.update(query,{$set:data},function(err,result){
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null,result);
      });
    });
  });
}

Kaoqin.getOne = function(query,callback){
  mongodb.open(function(err,db){
    if(err){
      return callbakc(err);
    }
    db.collection('kaoqin',function(err,kaoqin){
      if(err){
        mongodb.close();
        return callback(err);
      }
      kaoqin.findOne(query,function(err,kaoqin){
        mongodb.close();
        if(err){
        	return callback(err);
        }
        if(kaoqin){
        	callback(null, kaoqin);
        }else{
        	callback(null, null);
        }
      });
    });
  });
}

Kaoqin.getSome = function(query,callback){
  mongodb.open(function(err,db){
    if(err){
      return callback(err);
    }
    db.collection('kaoqin',function(err,kaoqin){
      if(err){
        mongodb.close();
        return callback(err);
      }
      kaoqin.find(query).toArray(function(err,kaoqins){
        mongodb.close();
        if(err){
          return callback(err);
        }
        if(kaoqin){
        	callback(null, kaoqins);
        }else{
        	callback(null, null);
        }
      });
    });
  });
}
