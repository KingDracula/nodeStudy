function readFileCallBack(err,data){
if (err) {
	console.log(err);
}else{
	console.log(data);
}
}
var fs=require('fs');
fs.readFile('wx.txt', 'utf-8',readFileCallBack);
console.log('end.');