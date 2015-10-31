/*************************************************************************************/
/*                                                                                   */
/*                                 微信的功能                                        */
/*                                                                                   */
/*************************************************************************************/

var wechat     = require('wechat');
var WechatAPI  = require('wechat-api');
var OAuth      = require('wechat-oauth');
var config     = require('./config.js');
var Student   = require('../../models/student/student.js');   
var Kaoqin    = require('../../models/student/kaoqin.js'); 
var express = require('express');
var app = express();
// 创建wechat api
var api    = new WechatAPI(config.weixinConfig.appid, config.weixinConfig.appsecret);
// 创建wechat oauth client
var client = new OAuth(config.weixinConfig.appid, config.weixinConfig.appsecret);

//创建菜单
exports.createMenu =  wechat(config.weixinConfig, function (req, res, next) {
    console.log('menu');
    var menu  = {
        "button": [
            {
                "type": "view", 
                "name": "关于我们", 
                "url": "http://shake.wisewechat.com/home"
            },
            {
                "type": "view", 
                "name": "签到", 
                "url": "http://shake.wisewechat.com/sign/0"
            }, 
            {
                "name": "名片", 
                "sub_button": [
                    {
                        "type": "view", 
                        "name": "注册", 
                        "url": "http://shake.wisewechat.com/home"
                    }, 
                    {
                        "type": "view", 
                        "name": "设计", 
                        "url": "http://shake.wisewechat.com/home"
                    }, 
                    {
                        "type": "view", 
                        "name": "注销", 
                        "url": "http://shake.wisewechat.com/home"
                    }
                ]
            }
        ]
    }
    api.createMenu(menu, function (err, menus){});
    console.log('================create menu========================');
    if (err) {
      console.log(err);
    }
    console.log(menus);
   res.end('Menu coming soon!')
});

exports.client = client;




// 获取签到微信用户的信息
exports.getStudentInfo_signin = function(req, res){
    getopenid(req,res,function (openid,state,appurl){
        query = {
            openid : openid
        };
        Student.getOne (query, function (err,student){
            if(err){
                console.log('getsignerinfo1: ' + err.description);  
            }
            if(!student){ 
                client.getUser(openid, function (err, result) {
                    if(err){
                      console.log('use weixin api get user: '+ err)  
                    }
                    var oauth_user = result;
                    var newstudent = {
                        openid:      oauth_user.openid,
                        nickname:    oauth_user.nickname,
                    };
                    var newstudent = new Student(newstudent);
                    req.session.wxuser = newstudent;
                    req.session.stateOfstudent = "new";
                    return res.redirect(appurl); 
                });
            }else{  
                req.session.wxuser = student;
                req.session.stateOfstudent = "old";
                return res.redirect(appurl); 
            }
        });
    });
};


// 获取签到微信用户的Openid
function getopenid(req,res,callback){
    var code = req.query.code;
    var state = req.query.state;
    var appurl = "/";
    if (state) {
        appurl = state;
    }
    client.getAccessToken(code, function (err, result) {
        var data = result.data;
        //req.session.openid = data.openid;  
        var openid = result.data.openid;
        req.session.openid = openid;  
        callback(openid,state,appurl);
    });
}
// 获取签到微信用户的详细信息
function getuserinfo(openid,callback){
    client.getUser(openid, function (err, result) {
        if(err){
          console.log('use weixin api get user: '+ err)  
        }
        callback(result);
    });
}