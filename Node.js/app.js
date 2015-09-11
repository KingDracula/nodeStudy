//var http=require('http');
//http.createServer(function(req ,res){
//	res.writeHead(200,{'Content-Type':'text/html'});
//	res.write('<h1>Node.js</h1>');
//	res.end('<p>Hello World</p>');
//	}).listen(3000);
////console.log("HTTP server is listening at port 3000.");
//var os = require("os");
//
//var result = os.platform(); //查看操作系统平台
////os.release(); 查看操作系统版本
////os.type();  查看操作系统名称
////os.arch();  查看操作系统CPU架构
//
//console.log(result);
//process.cwd();

process.stdout.on('data',function(data){
    console.log(data);
});
//process.stdin.on('readable', function() {
//    var chunk = process.stdin.read();
//
//    if (chunk !== null) {
//        console.log(11);
//        process.stdout.write('data: ' + chunk);
//    }else{        console.log(22);
//
//        process.stdout.write(1111);
//    }
//});