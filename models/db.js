/**
 * user shuai
 * time 2015/10/28.
 */
var settings = require('../settings');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
module.exports = new Db(
                        settings.db,
                        new Server(settings.host,settings.port),
                        {safe:true}
                        );


