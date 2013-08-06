var sequelize = module.parent.exports.dbConex
  , Sequelize = require('sequelize-sqlite').sequelize
  , crypto = require('crypto');

module.exports = sequelize.define('Administrators', {
	username        : Sequelize.STRING,     
	name            : Sequelize.STRING,
    email           : {
        type : Sequelize.STRING,
        validate: {isEmail: true},
        set  : function(v) {
            return v.toLowerCase();
        }
    },
    hashed_password : {
        type : Sequelize.STRING,
        allowNull : false,
        set : function(v) {
            return crypto.createHash('md5').update(v).digest("hex");
        }
    }
},{
  classMethods: {
  },
  instanceMethods: {
    authenticate: function(password) {
        return (this.hashed_password == crypto.createHash('md5').update(password).digest("hex"));
    }
  }
});
