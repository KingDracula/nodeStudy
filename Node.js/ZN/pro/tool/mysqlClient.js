/**
 * Created by KK on 2015/3/18.
 */
var mysql = require('mysql');
var dbConfig = require('./mysql');

var sqlclient = module.exports;

var _pool = null;

var NND = {};

var createMysqlPool = function(){
    return mysql.createPool(dbConfig.dataInfo);
}

NND.init = function(){
    if(!_pool) _pool = createMysqlPool();
}
/**
 * Excute sql statement
 * [@param](/user/param) {String} sql Statement The sql need to excute.
 * [@param](/user/param) {Object} args The args for the sql.
 * [@param](/user/param) {fuction} callback Callback function.
 *
 */
NND.query = function(sql, args, callback){
    _pool.getConnection(function(err, client) {
        if (!!err) {
            console.error('[sqlQueryErr] '+err.stack);
            return;
        }o0
        client.query(sql, args, function(err, res) {
            _pool.releaseConnection(client);
            callback.apply(null, [err, res]);
        });
    });
}

/**
 * Close connection pool.
 */
NND.shutdown = function(){
    _pool.end();
}

/**
 * init database
 */
sqlclient.init = function() {
    if (!!_pool){
        return sqlclient;
    } else {
        NND.init();
        sqlclient.query = NND.query;
        return sqlclient;
    }
}

/**
 * shutdown database
 */
sqlclient.shutdown = function() {
    NND.shutdown();
}

/**
 * exportSql
 */
sqlclient.exportSql = dbConfig.exportSql;