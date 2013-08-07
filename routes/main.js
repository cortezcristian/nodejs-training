var app = module.parent.exports.app
  , loginForm = require('../forms/login')
  , config = module.parent.exports.config;

app.get('/', function(req, res){
    res.render('index', { title: 'Employee Wiki', section: 'Welcome', user: req.user});
});

// Admin Panel URLs
app.get('/admin', function(req, res){
    if(typeof req.user != "undefined" && typeof req.user.role != "undefined" && req.user.role == "admin"){
        res.redirect('/panel');
    }else{
        res.render('admin/index', { title: 'Admin Panel', section: 'Admin Panel', form : loginForm });
    }
});

app.get('/panel', function(req, res){
    //authorize role
    if(typeof req.user != "undefined" && typeof req.user.role != "undefined" && req.user.role == "admin"){
        res.render('admin/panel', { title: 'Admin Panel', section: 'Admin Panel' });
    }else{
        res.redirect('/admin');
    }
});
