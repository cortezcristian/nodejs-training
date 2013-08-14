var app = module.parent.exports.app
  , dbConex  = exports.dbConex = module.parent.exports.dbConex
  , loginForm = require('../forms/login')
  , creteEmployeeForm = require('../forms/creteEmployee')
  , tableEmployees = require('../models/employees')
  , config = module.parent.exports.config
  , adminAuth;

adminAuth = function(req, res, next){
    //authorize role
    if(typeof req.user != "undefined" && typeof req.user.role != "undefined" && req.user.role == "admin"){
        next();
    }else{
        //Not authorized go to the login form
        res.redirect('/admin');
    }
}

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

app.get('/panel', adminAuth, function(req, res){
    res.render('admin/panel', { title: 'Admin Panel', section: 'Admin Panel', user: req.user });
});

app.get('/panel/employees', function(req, res){
    tableEmployees.findAll().success(function(empList) {
      res.render('admin/employees', { title: 'Admin Panel', section: 'Admin Panel', user: req.user, empList:empList });
    }); 
});

app.get('/panel/employees/new', adminAuth, function(req, res){
    var formRes = req.flash('creteEmployeeForm'),
        form = ( formRes.length > 0) ? formRes : creteEmployeeForm.toHTML();
    res.render('admin/employees-new', { title: 'Admin Panel', section: 'Admin Panel', user: req.user, form : form });
});

app.post('/panel/employees/new', adminAuth, function(req, res){
   creteEmployeeForm.handle(req, {
        success: function (form) {
          tableEmployees.create({
             nombre: req.param('nombre'),
             apellido: req.param('apellido'),
             email: req.param('email'),
             hashed_password: req.param('password')
          }).success(function(emp) {
                res.redirect('panel/employees');
          }).error(function(err) { console.log(err); });
        },
        error: function (form) {
            req.flash('creteEmployeeForm', form.toHTML());
            res.redirect('panel/employees/new');
        },
        empty: function (form) {
            req.flash('creteEmployeeForm', form.toHTML());
            res.redirect('panel/employees/new');
        }
    }); 
});
