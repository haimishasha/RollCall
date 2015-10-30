/**
 * Created by 11747 on 2015/10/30.
 */
var mongodb = require('../models/db');

//AddCoursesΪ���ݿ��� addCoursesΪ������
//function AddCourses(addCourses){
var AddCourses = function (addCourses){
    this.name = addCourses.name;//��ʦ������
    this.school = addCourses.school;//ѧУ
    this.institute = addCourses.institute;//ѧԺ
    this.num = addCourses.num;//��ʦ��ְ����
    this.courseName = addCourses.courseName;//�γ���
    this.courseTime = addCourses.courseTime;//�γ�ʱ��
    this.courseClass = addCourses.courseClass;//�༶
    this.classRoom = addCourses.classRoom;//����
};
module.exports = AddCourses;

//�洢��Ӳ˵�
AddCourses.prototype.save = function(callback){
    //��ӿγ�Ҫ�������ݿ���ĵ�
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
    //�����ݿ�
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//���󣬷���err��Ϣ
        }
        //��ȡaddCourses����
        db.collection('addCourses',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//���󣬷���err��Ϣ
            }
            //����ӵĲ˵���Ϣ���뵽adds����
            collection.insert(addCourses,{
                safe:true
            },function(err,user){
                mongodb.close();
                if(err){
                    return callbacke(err);//���󣬷���err��Ϣ
                }
                callback(null,addCourses);//�ɹ���errΪnull�������ش洢�����Ӳ˵����û��ĵ�
            });
        });
    });
};

//��ȡ��ӿγ̵���Ϣ
AddCourses.getAll = function(num,callback){
    //�����ݿ�
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//���󣬷���err��Ϣ
        }
        //��ȡaddCourses����
        db.collection('addCourse',function(err,addCourses){
            if(err){
                mongodb.close();
                return callback(err);//���󣬷���err��Ϣ
            }
            //����num��һ���ĵ�
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

//���ݿ�ĸ��²���
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

//����ɾ��
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