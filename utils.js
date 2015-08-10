var Sequelize = require('sequelize-sqlite').sequelize;
/**
 * Utils
 */

exports.dbConnection = function(dbname, dbuser, dbpass, dbpath, dialect){

 return new Sequelize('database', '', '', {
       dialect: 'sqlite',
       storage: 'db/database.sqlite'
 });
	
};

exports.dbConnectionString = function(url, dbname, dbuser, dbpassi, dialect){

	var connStr = dialect+'://'; 
	
	if(dbuser != "" || dbpass != "") {
		connStr += dbuser+':'+dbpass+'@'+url+'/'+dbname;
	} else {
		connStr += url+'/'+dbname;
	}

    return connStr;
};
