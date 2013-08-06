
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , expressValidator = require('express-validator')
  , flash = require('connect-flash')
  , passport = require('passport')
  , i18n = require('i18n')
  , LocalStrategy = require('passport-local').Strategy
  , path = require('path')
  , utils = require('./utils')
  , config = require('./config/config');

var dbConex = exports.dbConex = utils.dbConnection(config.db.domain,config.db.name,config.db.user,config.db.pass,config.db.dialect);
var app = exports.app = express();

/**
* Localization
*/
i18n.configure({
    locales:['en'],
});

app.locals({
  __i: i18n.__,
  __n: i18n.__n
});

// all environments
app.set('port', process.env.PORT || config.app.port || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(config.session.secret));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
* Passport Auth Strategy
*/
require('./authpassport');

/**
* Routes
*/
require('./routes/main');

/**
* Passport Auth
*/
require('./routes/auth');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
