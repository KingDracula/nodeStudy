/* GET home page. */
//router.get('/', function (req, res, next) {
//    console.log(1111);
//    res.render('index', { title: 'Express111111' });
//});
//router.get('/hello', function (req, res, next) {
//    res.send('The time is ' + new Date().toString());
//});
//module.exports.hello = function (req, res) {
//    res.send('The time is ' + new Date().toString());
//
//}
module.exports = {
    '/': {
        get: function () {
            return function (req, res, next) {
                res.locals.title ='all';
                next();
            }
        }
    }
};
