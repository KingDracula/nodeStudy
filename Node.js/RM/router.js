function route(handle,pathname,respose,postData) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname]==='function') {
		handle[pathname](respose,postData);
	}else{
		console.log("No request handler found for "+pathname);
		respose.writeHead(404,{"Content-Type":"text/plain"});
		respose.write("404 Not found");
		respose.end();
	}
}
exports.route = route;