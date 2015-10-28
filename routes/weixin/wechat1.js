/**
 * user shuai
 * time 2015/10/28
 */
var wechat = require('wechat');
var WechatAPI = require('wechat-api');
var OAuth  = require('wechat-oauth');

var config  = require('./config.js');

// 创建wechat api
var api = new WechatAPI(config.weixinConfig.appid, config.weixinConfig.appsecret);
// 创建wechat oauth client
var client = new OAuth(config.weixinConfig.appid, config.weixinConfig.appsecret);

// 微信验证
exports.wechat = wechat(config.weixinConfig, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    var msgType = req.weixin.MsgType;
    var fromUserName = req.weixin.FromUserName;
    switch (msgType){
        case "event":{
            // 用户关注成功，保存用户信息
            if (req.weixin.Event == 'subscribe') {
                api.getUser(fromUserName, function (err, data, res) {
                    var openid     = data.openid;
                    var nickname   = data.nickname;
                });
                res.reply([
                            {
                                title: '欢迎关注我们的微信',
                                description: '我们为您做的更好!',
                                picurl: 'http://210.31.104.110/images/weixin/点名时间.jpg',
                                url: 'http://netwechat.tyust.edu.cn/sign/2fo66bn3neuhm2t9'
                            }
                          ]);
                break;
            }
            // 用户取消关注，删除用户信息
            if (req.weixin.Event == 'unsubscribe') {
                res.reply();
                User.get(fromUserName,function (err,user){
                    if(err){
                        console.log('微信取消关注用户信息保存失败,失败描述: ' + err.description);
                    }
                    if(user){
                        console.log('用户取消关注，删除用户信息');
                    }
                });
                break;
            }
            res.reply();
            break;
        }
        case "text":{
            var Content = message.Content;
            switch(Content){
                            case '点名':
                            case 'dianming':
                                res.reply([{
                                    title:'点击进入注册页面',
                                    description:'开始你的名片的第一步',
                                    picurl:'http://shake.wisewechat.com/img/module8.jpg',
                                    url:'http://shake.wisewechat.com/home'
                                }]);
                                break;
            }
            break;
        }
        case "image":
        //break;
        case "voice":
        //break;
        case "video":
        //break;
        case "location":
        //break;
        case "link":
        //break;
        default:{
            res.reply([
                {
                    title: '感谢您关注我们微信',
                    description: '您可以访问我们的微网站获取更多的信息。',
                    picurl: 'http://aibiken-wifi.avosapps.com/i/太原科技大学.jpg',
                    url: 'http://aibiken-wifi.avosapps.com/wap'
                }
            ]);
            break;
        }
    }
    next;
});

// 微信网页认证
exports.oauth = function(req, res){
    var state = req.params.state;
    var url = req.url;
    if (state) {
        appurl = url.slice(6);
    } else {
        appurl = "/";
    }
    // 授权通过后的回调地址
    state = appurl;
    if(req.session.wxuser) {
        res.redirect(appurl);
    } else {
        var url = client.getAuthorizeURL('http://cardwechat.tyust.edu.cn/user/cardinfo', state, 'snsapi_userinfo'); //无关注也可以授权，有明显授权页面
        res.end(url);
        res.redirect(url);
    }
};

// 用户绑定
exports.bind = function (req, res) {
    api.getFollowers(function(err, result) {
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    var wxuser = req.session.wxuser;
    // 倘若当前用户没有经过oauth授权，则没有openid，无法获取用户以保存的数据，所以，转向到静默授权页面（仅对关注用户有效）授权
    if(wxuser)
    {
        res.render('bind', {
            openid: wxuser.openid
        });
    } else {
        res.redirect('/oauth/bind');
    }
};
//绑定post
exports.bindp = function (req, res) {
    var telephone = req.body.telephone;
    var name      = req.body.name;
    var openid    = req.body.openid;
    var bind_user = {
        telephone:  telephone,
        name:       name,
        openid:     openid
    }
    var newBind_user = new Bind_user(bind_user);
    newBind_user.get(telephone, name,function (err,bind_user){
        if(err){
            console.log("bindp error: " + err);
            //res.render('404', {message: error});
        }
        if(bind_user){
            console.log("您的这个邮箱已经与别的微信号绑定了！");
        }else{
            User.update(telephone, name, openid, function (err){
                if(err){
                    console.log("wechat err of bindp: err" + err);
                }else{
                    newBind_user.save(function (err,bind_user){
                        if(err){
                            console.log("bindp error: "+ err);
                        }
                        if(bind_user){
                            console.log('Bind Ok!');
                            return res.redirect('/');
                        }
                    });
                }
            });
        }
    });
};


//创建菜单
exports.createMenu =  wechat(config.weixinConfig, function (req, res, next) {
    console.log('menu');
    var menu  = {
        "button": [
            {
                "name": "主页",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "微网站",
                        "url": "http://shake.wisewechat.com/home"
                    }
                ]
            },
            {
                "type": "view",
                "name": "点名",
                "url": "http://shake.wisewechat.com/sign/0"
            },
            {
                "type": "view",
                "name": "关于我们",
                "url": "http://shake.wisewechat.com/sign/0"
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


//移除菜单
exports.removeMenu = function(req, res) {
    console.log('remove menu');
    api.removeMenu(function(err, menus){
        console.log('================remove menu========================');
        if (err) {
            console.log(err);
        }
        console.log(menus);
    });
    res.end('Menu coming gone!')
};

//获取菜单
exports.getMenu = wechat(config.weixinConfig,function(req, res, next) {
    console.log('get menu');
    api.getMenu(function(err, menus){
        console.log('================get menu========================');
        if (err) {
            console.log(err);
        }
        console.log(menus);
    });
    res.end('Menu coming gone!')
});

exports.client = client;

// 获取签到微信用户的信息
exports.getuserinfo_signin = function(req, res){
    getopenid(req,res,function (openid,state,appurl){
        var meetingid = state.slice(8);
        Signin.getSigner(meetingid,openid,function (err,signer){
            if(err){
                console.log('getsignerinfo1: ' + err.description);
            }
            if(!signer){
                client.getUser(openid, function (err, result) {
                    if(err){
                        console.log('use weixin api get user: '+ err)
                    }
                    var oauth_user = result;
                    var newSigner = {
                        openid:      oauth_user.openid,
                        nickname:    oauth_user.nickname,
                        headimgurl:  oauth_user.headimgurl,
                    };
                    var newsigner = new Signer(newSigner);
                    req.session.wxuser = newsigner;
                    req.session.stateOfSigner = "new";
                    return res.redirect(appurl);
                });
            }else{
                req.session.wxuser = signer;
                req.session.stateOfSigner = "old";
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
        req.session.openid = data.openid;
        var openid = result.data.openid;
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