var http = require('http');
var querystring = require('querystring');
var contents = querystring.stringify({
name: 'byvoid',
email: 'byvoid@byvoid.com',
address: 'Zijing 2#, Tsinghua University',
});


// function sss(res){
// 	res.setEncoding('utf8');
// 	res.on('data',function (data){
// console.log(data);
// 	});
// }\
//

http.createServer(function(req,res){
	getCatchData(function(data){
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write('sdfsdfsdf');
		res.end();
	});
}).listen(8888);


function getCatchData(callback){
		var options={
			host:'www.baidu.com',
			path:'',
			method:'GET',
			headers:{
				'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length' : contents.length
			}
		};
		var req=http.request(options,function(res){
			res.on('data',function (data){
				callback(data);
			});
		});
	req.write(contents);
	req.end();
}
