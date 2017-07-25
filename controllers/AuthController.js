var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var config= require("../models/configModel")
var adm="595a4cdc02e1cf0e1c336d19"
var userController = {};


// Restrict access to root page

userController.home = function(req, res) {
  res.render('index', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  if(req.user && req.user._id==adm)
    res.render('register');
  else
    res.redirect('/')
};

// Post registration
userController.doRegister = function(req, res) {
  if(req.user && req.user._id==adm){
    if(req.user)
      User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
        if (err) {
          return res.render('register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
      });
  }else{
    res.redirect('/')
  }
};

// Go to login page
userController.login = function(req, res) {
  res.render('login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
userController.manager = function(req, res){
  if(req.user && req.user._id==adm){
    User.find(function (err, users) {
      config.find(function(err, configs){
        var configalldate= collapse(configs)
        res.render('manager', {users:users })
      })
    });
  }else{
    res.redirect('/')
  }
}

function collapse(configs){
//  fecha={}
//  configs.forEach(function(data, indexdata){
//    if(data.calendar && data.calendar.anio){
//        data.calendar.anio.forEach(function(anio, indexanio){
//            anio.mes.forEach(function(mes, indexmes){
//                mes.dia.forEach(function(dia, indexdia){
//                    
//                })
//            })
//        })
//    }
//  })
//  console.log(anio)
  return null;
}

module.exports = userController;
