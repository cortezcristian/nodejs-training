var sequelize = module.parent.exports.dbConex
  , Sequelize = require('sequelize-sqlite').sequelize
  , crypto = require('crypto');

module.exports = sequelize.define('Employees', {
    idEmployee        : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre            : Sequelize.STRING,
	apellido          : Sequelize.STRING,
    email           : {
        type : Sequelize.STRING//,
        //validate: {isEmail: true},
        /*set  : function(v) {
            return v.toLowerCase();
        }*/
    },
    hashed_password : {
        type : Sequelize.STRING,
        allowNull : false/*,
        set : function(v) {
            return crypto.createHash('md5').update(v).digest("hex");
        }*/
    }
},{
  timestamps: false,
  classMethods: {
  },
  instanceMethods: {
    authenticate: function(password) {
        return (this.getDataValue('hashed_password') == crypto.createHash('md5').update(password).digest("hex"));
    }
  }
});
