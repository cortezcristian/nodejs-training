var passport = require('passport')   
  , LocalStrategy = require('passport-local').Strategy
  , config = module.parent.exports.config
  , dbConex  = exports.dbConex = module.parent.exports.dbConex
  , Administrator = require('./models/administrators.js');
  
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('administrators', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    Administrator.find({ where : { email: username }}).success(function(user) {
      /*
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      */
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
