var mySQL = require('mysql');
var pool  = mySQL.createPool({
	host:  '127.0.0.1',//Your Host
	user:'root',//your database username
	password:'',// database password
	database:'test_db'// database name
});
module.exports = pool;