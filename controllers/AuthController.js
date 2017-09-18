var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var config= require("../models/configModel")
var Tramite = require('../models/tramiteModel.js')

var adm="596f785f7f36e212340887f1"
var userController = {};
var datostramites

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
        res.render('manager', {users: users, configs: configs, configalldate:configalldate})
      })
    });
  }else{
    res.redirect('/')
  }
}
userController.post_manager = function(req, res){
  if(req.user && req.user._id==adm){
    var parametro= {tramite: req.body.tramite, persona: req.body.persona, anioini:req.body.anioini, mesini:req.body.mesini, diaini:req.body.diaini, aniofin:req.body.aniofin, mesfin:req.body.mesfin, diafin:req.body.diafin}
    //console.log(parametro)
    var date= new Date(req.body.anioini, req.body.mesini, req.body.diaini)
    Tramite.find({fecha: {$gte: new Date(req.body.anioini, req.body.mesini, req.body.diaini),
                          $lte: new Date(req.body.aniofin, req.body.mesfin, req.body.diafin, 23, 59,59)}}).populate({ path: 'usuario', select: 'name'}).exec(
      function(err, tramites){
      if(err){
        res.render('error', {error: "ocurrio algun error al buscar esos tramites"})
      }else{
        //console.log(tramites)
        var arreglo=[]
        tramites.forEach(function(val, index){
          arreglo.push(val)
        })
        datostramites= tramites
        
        res.render('post_manager', {data: tramites, tam: req.params.tam})
      }
    })
  }else{
    res.redirect('/')
  }
}
userController.main_manager = function(req, res){
  if(req.user && req.user._id==adm){
    res.render('post_manager', {data: datostramites, tam: req.params.tam})
  }else{
    res.redirect('/')
  }
}

userController.estudiante = function(req, res){
  if(req.user && req.user._id==adm){
    Tramite.find({ci: req.params.ci}, function (err, tramites) {
      console.log(tramites)
    });
  }else{
    res.redirect('/')
  }
}
function collapse(configs){
  fecha={anio:[]}
  configs.forEach(function(data, indexdata){
    if(data.calendar && data.calendar.anio){
        data.calendar.anio.forEach(function(anio, indexanio){
            var flag1=true
            var pos1
            fecha.anio.forEach(function(aniomain, indexaniomain){
                if(aniomain.cod == anio.cod){
                    flag1=false
                    pos1=indexaniomain
                }
            })
            if(flag1){
                fecha.anio.push({cod:anio.cod,mes:[]})
                fecha.anio.forEach(function(v1, indexv1){
                    if(v1.cod==anio.cod)
                      pos1=indexv1
                })
            }
            anio.mes.forEach(function(mes, indexmes){
                var flag2=true
                var pos2
                fecha.anio[pos1].mes.forEach(function(mesmain, indexmesmain){
                    if(mesmain.cod == mes.cod){
                      flag2=false
                      pos2=indexmesmain
                    }
                })
                if(flag2){
                    fecha.anio[pos1].mes.push({cod: mes.cod, dia:[]})
                    fecha.anio[pos1].mes.forEach(function(v2, indexv2){
                        if(v2.cod== mes.cod)
                          pos2=indexv2
                    })
                }
                mes.dia.forEach(function(dia, indexdia){
                    var flag3=true
                    var pos3
                    fecha.anio[pos1].mes[pos2].dia.forEach(function(diamain, indexdiamain){
                        if(diamain == dia){
                          flag3=false
                          pos3=indexdiamain
                        }
                    })
                    if(flag3){
                      fecha.anio[pos1].mes[pos2].dia.push(dia)
                      pos3=fecha.anio[pos1].mes[pos2].dia.indexOf(dia)
                    }
                })
            })
        })
    }
  })
  fecha.anio.sort(function(a,b){
      return a.cod - b.cod
  })
  for(var i = 0; i < fecha.anio.length; i++){
      fecha.anio[i].mes.sort(function(a,b){
          return a.cod - b.cod
      })
      for(var j=0; j<fecha.anio[i].mes.length; j++){
          fecha.anio[i].mes[j].dia.sort(function(a,b){
              return a-b
          })
      }
  }
  return fecha
}

module.exports = userController;
