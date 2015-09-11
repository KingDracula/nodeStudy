Object.defineProperties(module.exports, {
    default: {
        value: 'test'
    },
    development: {
        value: {
            'test': {
                'host': 'localhost',
                'port': '3306',
                'connectionLimit ': '20',
                'database': 'world',
                'user': 'root',
                'password': '1234',
                'exportSql': true
            }

        }
    },
    //当前连接数据库信息
    dataInfo: {
        get: function () {
            var evn = process.env.NODE_ENV || "development";
            return this[evn][this.default];
        }
    },
    exportSql: {
        get: function () {
            var evn = process.env.NODE_ENV || "development";
            return this[evn][this.default].exportSql;
        }
    }

});