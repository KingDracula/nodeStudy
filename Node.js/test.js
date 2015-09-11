/**
 * Created by hx on 2015-08-12.
 */


//    var a = new Array();
//    a[0] = "22222";
//    a[1] = "333333";
//    for (var i = 0;  i < a.length;i++) {
//
//        console.log(a[i]);
//    }

//function factorial(n) {
//    if (n === 1) {
//        return 1;
//    } else {
//        return n * factorial(n - 1);
//    }
//}
//console.log(factorial(10).toString());


var fs = require('fs');
var path=require('path');
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}
travel('../Node.js',function(pathname){
    console.log(pathname);
})