/**
 * Created by KK on 2015/3/18.
 */
var methods = require('methods');
var path = require('path');
var fs = require('fs');

//var config = require('./config');
var filterConfig = require('./filters');

exports.init = function(app) {

    var routerPath = path.join(__dirname, '../routes/');
    var viewPath = path.join(__dirname, '../views/');
    var filterPath = path.join(__dirname, '../filter/');

    var getView = function(self, vp){

        return function(req, res, next){
            res.render(viewPath+ (self.view || vp) + '.' + app.get('view engine'), res.locals);
        }

    }

    var getRouter = function(func, vp, method, pathStr){

        var array = [];
        var self = this;

        for(var key in filterConfig){

            var reg = new RegExp(key);

            var temp = filterConfig[key][method];

            if(temp){

                temp.forEach(function(f){
                    if(reg.test(pathStr)){
                        array.push(require('../filter/'+f));
                    }
                });

            }

        }

        var mainRouter = func.call(this);

        array.push(mainRouter);
        array.push(getView(self, vp));
        return array;

    }

    /**
     * 循环检出路由规则文件结构
     */

    var allDir = [{dir: '', name: ''}]; //添加默认路由规则

    var getDir = function(path, dirName){

        if(!path) return;

        var dir = fs.readdirSync(path);

        if(dir.length <= 0) return false;

        dir.forEach(function(n, i){

            var reg = /\.js/g;
            if(!reg.test(n)){
                if(n.indexOf('svn') == -1){ //出去svn的文件夹
                    var dirNameTo = dirName ? dirName+'/'+n : n;
                    getDir(path+'/'+n, dirNameTo) ? allDir.push({dir: dirNameTo, name: ''}) : null;
                }
            }else{
                allDir.push({dir: dirName || '', name: n});
            }

        });

        return true;

    }

    getDir(routerPath); //获得文件结构

    allDir.sort(function(a, b){return b.dir == ''}); //排序一下

    /**
     * 生成路由规则
     */
    allDir.forEach(function(n){

        var dir = n.dir ? '/'+ n.dir : '',
            name = n.name.replace(/\.js/g, ''),
            routerUrl = dir + '/' + name,
            routerM, isMainPage = false;

        if(n.name){

            routerM = require('../routes/' + n.dir +'/'+ name);

        }else{

            // 设置默认主页
            var mainPagePath = routerPath + n.dir +'/'+ 'index';

            //判断是否存在
            if(fs.existsSync(mainPagePath + '.js')) routerM = require(mainPagePath);
            routerUrl = '/' + n.dir;

            isMainPage = true;

        }

        /**
         * 拼接路由规则
         */
        if(routerM){

            for(var key in routerM){

                var rUrl = routerUrl;
                var mainpage = 'index';

                //拼接URL
                if(key != '/' && routerUrl != '/') rUrl = routerUrl + key;

                if(key != '/' && routerUrl == '/') rUrl = key;

                //获得View路径
                var vp = rUrl;

                //把默认主页的模版加上
                if(isMainPage){
                    if(key == '/') vp += (vp != '/' ? '/' : '') + mainpage;
                }

                //定位默认主页的模版显示到根目录
                vp = vp.replace(mainpage + '/', '')
                    //去除params参数
                    .replace(/:[^\/]+(\/)?/g, '').replace(/\/$/, '');

                //console.info([rUrl].concat(new getRouter(function(){return 'fn'}, vp, 'get', rUrl)));
                //console.info(vp)

                //设置路由规则
                methods.forEach(function(method){

                    if(routerM[key][method]){
                        app[method].apply(app, [rUrl].concat(new getRouter(routerM[key][method], vp, method, rUrl)));
                    }

                });

            }

        }

    });

}