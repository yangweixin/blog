var settings = require('../settings');
var mysql = require('mysql');

var pool = mysql.createPool({
	host: settings.host,
	user: settings.username,
	password: settings.password,
	port: settings.port,
	database: settings.database
});

function DB(){

}

DB.query = function(sql , callback){
	pool.getConnection(function(err,conn){
		if(err){
			callback(err,null,null);
		}else{
			conn.query(sql , function(qerr,vals,fields){
				conn.release();
				callback(qerr,vals,fields);
			});
		}
	});
};

DB.insert = function(sql , param , callback){
	pool.getConnection(function(err,conn){
		if(err){
			callback(err,null);
		}else{
			conn.query(sql, param , function(err , result){
				conn.release();
				callback(err , result);
			});
		}
	});
};

DB.update = function(sql , param , callback){
	pool.getConnection(function(err,conn){
		if(err){
			callback(err,null);
		}else{
			conn.query(sql, param , function(err , result){
				conn.release();
				callback(err , result);
			});
		}
	});
};

DB.delete = function(sql , param , callback){
	pool.getConnection(function(err,conn){
		if(err){
			callback(err,null);
		}else{
			conn.query(sql, param , function(err , result){
				conn.release();
				callback(err , result);
			});
		}
	});
};

module.exports = DB;