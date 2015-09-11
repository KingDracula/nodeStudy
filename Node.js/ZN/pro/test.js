/**
 * Created by hx on 2015-07-23.
 */
var client=require("./tool/mysqlClient").init();


client.query("select * from city",null,function(err,datas){
    console.log(datas);
})