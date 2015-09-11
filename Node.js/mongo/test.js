///**
// * Created by hx on 2015-09-10.
// */
//var mongodb = require('mongodb');
//
//var server = new mongodb.Server("127.0.0.1",27017,{});//本地27017端口
//
//new mongodb.Db('etcomm',server,{}).open(function(error,client){//数据库：mongotest
//    if(error) console.log(error);
//    console.log(11);
//    var collection = new mongodb.Collection(client,UserData);//表：user
//    console.log(222);
//    collection.find(function(error,cursor){
//        cursor.each(function(error,doc){
//            if(doc){
//                console.log(doc);
//            }
//        });
//    });
//});


var http = require("http"),
    mongo = require("mongodb"),
    url = require("url"),
    querystring = require("querystring");

http.createServer(function (req, res) {
    var db = new mongo.Db("etcomm", new mongo.Server('127.0.0.1', 27017, {auto_reconnect:true}), {safe: true});
    db.open(function () {
        db.collection("UserData", function (err, collection) {

            /* 获取GET请求从参数 加入user表
             collection.insert({'name':querystring.parse(url.parse(req.url).query)['name'],'pwd':querystring.parse(url.parse(req.url).query)['pwd']},function(err,result){
             res.writeHead(200);
             res.end(JSON.stringify(result));
             });*/


            //批量插入
//            var temp1 = { name: "11", pwd: "11" };
//            var temp2 = { name: "22", pwd: "22" };
//            collection.insert([temp1, temp2], { safe: true }, function (err,result) {});

            //按条件查询
            //collection.find({ 'name': querystring.parse(url.parse(req.url).query)['name'] }).toArray(function (err, items) {});

            //获取所有数据
            collection.find().toArray(function (err, items) {
                if (items.length > 0) {
                    console.log(items);
                    res.writeHead(200);
                    res.end(JSON.stringify(items));
                } else {
                    res.writeHead(200);
                    var obj = { value: "error" };
                    res.end(JSON.stringify(obj));
                }
            });
        });
    });
}).listen(8888);