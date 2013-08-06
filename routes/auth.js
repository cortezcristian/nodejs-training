var app = module.parent.exports.app
  , passport = require('passport')
  , config = module.parent.exports.config;

/*
 * Authentication routes
 */
app.post('/login',
  passport.authenticate('employees', { successRedirect: '/',
                                   failureRedirect: '/'})
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.post('/admin', 
  passport.authenticate('administrators', { successRedirect: '/panel',
                                   failureRedirect: '/admin'})
);

