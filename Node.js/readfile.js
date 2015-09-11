var fs=require('fs');

fs.unlink("wx.txt", function(err){
    if(err){
        console.log("删除失败！",err);
    }else{
        console.log("删除成功！");
    }
});
//fs.readFile('wx.txt','utf-8',function (err,data){
//	if(err){
//		console.error(err);
//	}else{
//		console.log(data);
//	}
//	});
//	console.log('end.');