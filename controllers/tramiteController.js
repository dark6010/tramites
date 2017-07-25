var tramiteModel = require('../models/tramiteModel.js');
var configModel= require('../models/configModel.js')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const salt=10
var certificado_de_estudios="495fa9acc315cf0cd4ac982a"
var formulario_de_admision_especial="59662b0ae333d90eb87455dd"
var formulario_de_reincorporacion="59662b0ae333d90eb87455df"
var formulario_de_estudio_simultaneo="59662b0ae333d90eb87455de"
var formulario_de_traspaso_a_otra_universidad_del_pais="59662b0ae333d90eb87455e0"
var formulario_para_examen_de_gracia="59662b0ae333d90eb87455e1"
var formulario_de_solicitud_de_convalidacion_de_materias_internas="59662b0ae333d90eb87455e2"
var formulario_de_solicitud_de_convalidacion_de_materias_externas="59662b0ae333d90eb87455e3"
var adm="595a4cdc02e1cf0e1c336d19"

module.exports = {
    /**
     * tramiteController.list()
     */
    list: function (req, res) {
        tramiteModel.find(function (err, tramites) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tramite.',
                    error: err
                });
            }
            return res.json(tramites);
        });
    },

    /**
     * tramiteController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        tramiteModel.findOne({_id: id}, function (err, tramite) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tramite.',
                    error: err
                });
            }
            if (!tramite) {
                return res.status(404).json({
                    message: 'No such tramite'
                });
            }
            return res.json(tramite);
        });
    },

    /**
     * tramiteController.create()
     */
    create: function (req, res) {
        var tramite = new tramiteModel({
			fecha : req.body.fecha,
			nombre : req.body.nombre,
			carrera : req.body.carrera,
			ci : req.body.ci,
			pasaporte : req.body.pasaporte,
			codigoSis : req.body.codigoSis,
			periodo : req.body.periodo,
			nacionalidad : req.body.nacionalidad,
			acarrera : req.body.acarrera,
			materia : req.body.materia,
			ciudadOrigen : req.body.ciudadOrigen,
			estudiante : req.body.estudiante,
			materiasAprobadas : req.body.materiasAprobadas,
			universidad : req.body.universidad,
			examen : req.body.examen,
			tipocon : req.body.tipocon
    });

        tramite.save(function (err, tramite) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating tramite',
                    error: err
                });
            }
            return res.status(201).json(tramite);
        });
    },

    /**
     * tramiteController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        tramiteModel.findOne({_id: id}, function (err, tramite) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tramite',
                    error: err
                });
            }
            if (!tramite) {
                return res.status(404).json({
                    message: 'No such tramite'
                });
            }

            tramite.fecha = req.body.fecha ? req.body.fecha : tramite.fecha;
			tramite.nombre = req.body.nombre ? req.body.nombre : tramite.nombre;
			tramite.carrera = req.body.carrera ? req.body.carrera : tramite.carrera;
			tramite.ci = req.body.ci ? req.body.ci : tramite.ci;
			tramite.pasaporte = req.body.pasaporte ? req.body.pasaporte : tramite.pasaporte;
			tramite.codigoSis = req.body.codigoSis ? req.body.codigoSis : tramite.codigoSis;
			tramite.periodo = req.body.periodo ? req.body.periodo : tramite.periodo;
			tramite.nacionalidad = req.body.nacionalidad ? req.body.nacionalidad : tramite.nacionalidad;
			tramite.acarrera = req.body.acarrera ? req.body.acarrera : tramite.acarrera;
			tramite.materia = req.body.materia ? req.body.materia : tramite.materia;
			tramite.ciudadOrigen = req.body.ciudadOrigen ? req.body.ciudadOrigen : tramite.ciudadOrigen;
			tramite.estudiante = req.body.estudiante ? req.body.estudiante : tramite.estudiante;
			tramite.materiasAprobadas = req.body.materiasAprobadas ? req.body.materiasAprobadas : tramite.materiasAprobadas;
			tramite.universidad = req.body.universidad ? req.body.universidad : tramite.universidad;
			tramite.examen = req.body.examen ? req.body.examen : tramite.examen;
			tramite.tipocon = req.body.tipocon ? req.body.tipocon : tramite.tipocon;
			
            tramite.save(function (err, tramite) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating tramite.',
                        error: err
                    });
                }

                return res.json(tramite);
            });
        });
    },

    /**
     * tramiteController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        tramiteModel.findByIdAndRemove(id, function (err, tramite) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the tramite.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
   
    certificado_de_estudios: function(req, res){
      configModel.findOne({_id: certificado_de_estudios}, function (err, config) {
            if (!err) {
                if (config) {
                  //============
                    if(req.user){
                        bcrypt.hash(""+config.serial, salt).then(function(hash) {
                          var user={user: req.user}
                          user.user.serial= hash
                          res.render('certificado_estudios', user)
                        });
                    }else res.render('login')
                  //============
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento certificado de estudios"})
            }
        });
    },
    post_certificado_de_estudios: function(req, res){
      if(req.user){
        configModel.findOne({_id: certificado_de_estudios}, function (err, config){
            if (!err) {
                if (config) {
                  //============
                    if(req.body.serial && bcrypt.compareSync(""+config.serial, req.body.serial)){
                        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) && req.body.codigoSis && req.body.nacionalidad && req.body.periodo && req.body.sexo){
                            var date= new Date()
                            req.body.day= date.getDate()
                            req.body.month= date.getMonth()
                            req.body.year= date.getFullYear()
                            var user={user: req.user, body: (req.body)}
                            var formulario = new tramiteModel({
                              fecha: date
                            });
                            if (req.body.ci){
                              formulario.ci= req.body.ci
                              if(req.body.pasaporte){
                                formulario.pasaporte= req.body.pasaporte
                              }
                            }else{
                              formulario.pasaporte= req.body.pasaporte
                            }
                            formulario.nombre= req.body.nombre
                            formulario.carrera= req.body.carrera
                            formulario.ttramite= "certificado_de_estudios"
                            formulario.usuario= new mongoose.Types.ObjectId(req.user._id)
                            formulario.iporigen= getIp(req)
                            //llenar datos tramite, ademas generar el serial de cada doc
                            imprimir_certificado_de_estudios(function(err, retorno){
                              if(!err){
                                formulario.serial=retorno
                                user.body.serial=retorno
                                formulario.save(function (err, formulario) {
                                  if (!err) {
                                    actualizar_fecha(function(err){
                                      if(err) console.log("existe algun tipo de error al generar el calendario de fechas")
                                      else res.render('imprimir_certificado_de_estudios', user)
                                    }, config)
                                  }else{
                                    res.render('error', {error: "existe algun error al guardar el documento certificado de estudio"})
                                  }
                                });
                              }else{
                                res.render('error', {error: "existe algun error al serializar los documentos de certificados de estudio"})
                              }
                            })
                          }else{
                            res.render('certificado_estudios', user)
                          }
                    }else res.render('error', {error: "ese documento ya fue enviado"})
                  //============
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento certificado de estudios"})
            }
        })
      }
      else
        res.render('login')
    },
    formulario_de_admision_especial: function(req,res){
        configModel.findOne({_id: formulario_de_admision_especial}, function (err, config) {
            if (!err) {
                if (config) {
                  //============
                    if(req.user){
                        bcrypt.hash(""+config.serial, salt).then(function(hash) {
                          var user={user: req.user}
                          user.user.serial= hash
                          res.render('formulario_de_admision_especial', user)
                        })
                    }
                    else
                        res.render('login')
                  //============
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento formulario de admision especial"})
            }
        });
    },
    post_formulario_de_admision_especial: function(req,res){
      if(req.user){
        configModel.findOne({_id: formulario_de_admision_especial}, function (err, config){
            if (!err) {
                if (config) {
                  //============
                    if(req.body.serial && bcrypt.compareSync(""+config.serial, req.body.serial)){
                        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) && req.body.sexo){
                          var date= new Date()
                          req.body.day= date.getDate()
                          req.body.month= date.getMonth()
                          req.body.year= date.getFullYear()
                          var user={user: req.user, body: (req.body)}
                          //=================
                          var formulario = new tramiteModel({
                            fecha: date
                          });
                          if (req.body.ci){
                            formulario.ci= req.body.ci
                            if(req.body.pasaporte){
                                formulario.pasaporte= req.body.pasaporte
                              }
                          }else{
                            formulario.pasaporte= req.body.pasaporte
                          }
                          formulario.nombre= req.body.nombre
                          formulario.carrera= req.body.carrera
                          formulario.ttramite= "formulario_de_admision_especial"
                          formulario.usuario= new mongoose.Types.ObjectId(req.user._id)
                          formulario.iporigen= getIp(req)
                          //llenar datos tramite, ademas generar el serial de cada doc
                          imprimir_formulario_de_admision_especial(function(err, retorno){
                            if(!err){
                              formulario.serial=retorno
                              user.body.serial=retorno
                              formulario.save(function (err, formulario) {
                                if (!err) {
                                  actualizar_fecha(function(err){
                                      if(err) console.log("existe algun tipo de error al generar el calendario de fechas")
                                      else res.render('imprimir_formulario_de_admision_especial', user)
                                    }, config)
                                }else{
                                  res.render('error', {error: "existe algun error al guardar el documento de admision especial"})
                                }
                              });
                            }else{
                              res.render('error', {error: "existe algun error al serializar los documentos de admision especial"})
                            }
                          })
                        }else{
                          res.render('formulario_de_admision_especial', user)
                        }
                    }else res.render('error', {error: "ese documento ya fue enviado"})
                  //============
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de admision especial"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento de admision especial"})
            }
        })
      }
      else
        res.render('login')
    },
    formulario_de_reincorporacion: function(req,res){
      configModel.findOne({_id: formulario_de_reincorporacion}, function (err, config){
          if (!err){
              if (config) {
                  if(req.user){
                    bcrypt.hash(""+config.serial, salt).then(function(hash) {
                          var user={user: req.user}
                          user.user.serial= hash
                          res.render('formulario_de_reincorporacion', user)
                    })
                  }
                  else
                    res.render('login')
              }else{
                  res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
              }
          }else{
              res.render('error', {error: "existe algun error al comparar la serializacion del documento formulario de reincorporacion"})
          }
      });
    },
    post_formulario_de_reincorporacion: function(req,res){
      if(req.user){
        configModel.findOne({_id: formulario_de_reincorporacion}, function (err, config){
            if (!err) {
                if (config) {
                    if(req.body.serial && bcrypt.compareSync(""+config.serial, req.body.serial)){
                                  //============
                        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) && req.body.sexo && req.body.periodo){
                            var date= new Date()
                            req.body.day= date.getDate()
                            req.body.month= date.getMonth()
                            req.body.year= date.getFullYear()
                            var user={user: req.user, body: (req.body)}
                            //=========
                            var formulario = new tramiteModel({
                              fecha: date
                            });
                            if (req.body.ci){
                              formulario.ci= req.body.ci
                              if(req.body.pasaporte){
                                formulario.pasaporte= req.body.pasaporte
                              }
                            }else{
                              formulario.pasaporte= req.body.pasaporte
                            }
                            formulario.nombre= req.body.nombre
                            formulario.carrera= req.body.carrera
                            formulario.ttramite= "formulario_de_reincorporacion"
                            formulario.usuario= new mongoose.Types.ObjectId(req.user._id)
                            formulario.iporigen= getIp(req)
                            //llenar datos tramite, ademas generar el serial de cada doc
                            imprimir_formulario_de_reincorporacion(function(err, retorno){
                              if(!err){
                                formulario.serial=retorno
                                user.body.serial=retorno
                                formulario.save(function (err, formulario) {
                                  if (!err) {
                                    actualizar_fecha(function(err){
                                      if(err) console.log("existe algun tipo de error al generar el calendario de fechas")
                                      else res.render('imprimir_formulario_de_reincorporacion', user)
                                    }, config)
                                  }else{
                                    res.render('error', {error: "existe algun error al guardar el documento formulario de reincorporacion"})
                                  }
                                });
                              }else{
                                res.render('error', {error: "existe algun error al serializar los documentos formularios de reincorporacion"})
                              }
                            })
                          }else{
                            res.render('formulario_de_reincorporacion', user)
                          }
                                  //============
                    }else res.render('error', {error: "ese documento ya fue enviado"})
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento certificado de estudios"})
            }
        })
      }
      else
        res.render('login')
    },
    suspencion_temporal: function(req,res){
      if(req.user){
        var user={user: req.user, body: (req.body)}
        res.render('formulario_de_suspencion_temporal', user)
      }
      else
        res.render('login')
    },
    post_suspencion_temporal: function(req,res){
      if(req.user){
        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) ){
          var date= new Date()
          req.body.day= date.getDate()
          req.body.month= date.getMonth()
          req.body.year= date.getFullYear()
          var user={user: req.user, body: (req.body)}
          //=========
          res.render('imprimir_formulario_de_suspencion_temporal', user)
        }else{
          res.render('formulario_de_suspencion_temporal', user)
        }
      }
      else
        res.render('login')
    },
    estudio_simultaneo: function(req,res){
      configModel.findOne({_id: formulario_de_estudio_simultaneo}, function (err, config) {
            if (!err) {
                if (config) {
                  //============
                    if(req.user){
                      bcrypt.hash(""+config.serial, salt).then(function(hash) {
                          var user={user: req.user}
                          user.user.serial= hash
                          res.render('formulario_de_estudio_simultaneo', user)
                      })
                    }
                    else
                      res.render('login')
                  //============
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento formulario de estudio simultaneo"})
            }
        });
    },
    post_estudio_simultaneo: function(req,res){
      if(req.user){
      configModel.findOne({_id: formulario_de_estudio_simultaneo}, function (err, config){
            if (!err) {
                if (config) {
                    if(req.body.serial && bcrypt.compareSync(""+config.serial, req.body.serial)){
                                  //============
                        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) && req.body.acarrera && req.body.sexo){
                          var date= new Date()
                          req.body.day= date.getDate()
                          req.body.month= date.getMonth()
                          req.body.year= date.getFullYear()
                          var user={user: req.user, body: (req.body)}
                          //====
                          var formulario = new tramiteModel({
                            fecha: date
                          });
                          if (req.body.ci){
                            formulario.ci= req.body.ci
                            if(req.body.pasaporte){
                                formulario.pasaporte= req.body.pasaporte
                            }
                          }else{
                            formulario.pasaporte= req.body.pasaporte
                          }
                          formulario.nombre= req.body.nombre
                          formulario.carrera= req.body.carrera
                          formulario.ttramite= "formulario_de_estudio_simultaneo"
                          formulario.usuario= new mongoose.Types.ObjectId(req.user._id)
                          formulario.iporigen= getIp(req)
                          //llenar datos tramite, ademas generar el serial de cada doc
                          imprimir_formulario_de_estudio_simultaneo(function(err, retorno){
                            if(!err){
                              formulario.serial=retorno
                              user.body.serial=retorno
                              formulario.save(function (err, formulario) {
                                if (!err) {
                                  actualizar_fecha(function(err){
                                      if(err) console.log("existe algun tipo de error al generar el calendario de fechas")
                                      else res.render('imprimir_formulario_de_estudio_simultaneo', user)
                                    }, config)
                                }else{
                                  res.render('error', {error: "existe algun error al guardar el documento formulario de estudios simultaneos"})
                                }
                              });
                            }else{
                              res.render('error', {error: "existe algun error al serializar los documentos de estudios simultaneos"})
                            }
                          })
                        }else{
                          res.render('formulario_de_estudio_simultaneo', user)
                        }
                                  //============
                    }else res.render('error', {error: "ese documento ya fue enviado"})
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento formulario de estudios simultaneos"})
            }
        })
      }
      else
        res.render('login')
    },
    cambio_de_carrera: function(req,res){
      if(req.user){
        var user={user: req.user, body: (req.body)}
        res.render('formulario_de_cambio_de_carrera', user)
      }
      else
        res.render('login')
    },
    post_cambio_de_carrera: function(req,res){
      if(req.user){
        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) ){
          var date= new Date()
          req.body.day= date.getDate()
          req.body.month= date.getMonth()
          req.body.year= date.getFullYear()
          var user={user: req.user, body: (req.body)}
          res.render('imprimir_formulario_de_cambio_de_carrera', user)
        }else{
          res.render('formulario_de_cambio_de_carrera', user)
        }
      }
      else
        res.render('login')
    },
    traspaso_a_otra_universidad_del_pais: function(req,res){
      configModel.findOne({_id: formulario_de_traspaso_a_otra_universidad_del_pais}, function (err, config) {
            if (!err) {
                if (config) {
                  //============
                    if(req.user){
                      bcrypt.hash(""+config.serial, salt).then(function(hash) {
                          var user={user: req.user}
                          user.user.serial= hash
                          res.render('formulario_de_traspaso_a_otra_universidad_del_pais', user)
                      })
                    }
                    else
                      res.render('login')
                  //============
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento formulario de  traspaso a otra universidad del pais"})
            }
        });
    },
    post_traspaso_a_otra_universidad_del_pais: function(req,res){
      if(req.user){
        
        configModel.findOne({_id: formulario_de_traspaso_a_otra_universidad_del_pais}, function (err, config){
            if (!err) {
                if (config) {
                    if(req.body.serial && bcrypt.compareSync(""+config.serial, req.body.serial)){
                                  //============
                        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) && req.body.universidad && req.body.acarrera && req.body.ciudado && req.body.estudiante && req.body.sexo && req.body.materiasa && req.body.materiasr ){
                          var date= new Date()
                          req.body.day= date.getDate()
                          req.body.month= date.getMonth()
                          req.body.year= date.getFullYear()
                          var user={user: req.user, body: (req.body)}
                          //======
                          var formulario = new tramiteModel({
                            fecha: date
                          });
                          if (req.body.ci){
                            formulario.ci= req.body.ci
                            if(req.body.pasaporte){
                                formulario.pasaporte= req.body.pasaporte
                            }
                          }else{
                            formulario.pasaporte= req.body.pasaporte
                          }
                          formulario.nombre= req.body.nombre
                          formulario.carrera= req.body.carrera
                          formulario.ttramite= "formulario_de_traspaso_a_otra_universidad_del_pais"
                          formulario.usuario= new mongoose.Types.ObjectId(req.user._id)
                          formulario.iporigen= getIp(req)
                          //llenar datos tramite, ademas generar el serial de cada doc
                          imprimir_formulario_de_traspaso_a_otra_universidad_del_pais(function(err, retorno){
                            if(!err){
                              formulario.serial=retorno
                              user.body.serial=retorno
                              formulario.save(function (err, formulario) {
                                if (!err) {
                                  actualizar_fecha(function(err){
                                      if(err) console.log("existe algun tipo de error al generar el calendario de fechas")
                                      else res.render('imprimir_formulario_de_traspaso_a_otra_universidad_del_pais', user)
                                    }, config)
                                }else{
                                  res.render('error', {error: "existe algun error al guardar el documento formulario de traspaso a otra universidad del pais"})
                                }
                              });
                            }else{
                              res.render('error', {error: "existe algun error al serializar los documentos de traspaso a otra universidad del pais"})
                            }
                          })
                        }else{
                          res.render('formulario_de_traspaso_a_otra_universidad_del_pais', user)
                        }
                                  //============
                    }else res.render('error', {error: "ese documento ya fue enviado"})
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento de traspaso a otra universidad del pais"})
            }
        })
      }
      else
        res.render('login')
    },
    traspaso_de_otra_universidad_del_pais: function(req,res){
      if(req.user){
        var user={user: req.user, body: (req.body)}
        res.render('formulario_de_traspaso_de_otra_universidad_del_pais', user)
      }
      else
        res.render('login')
    },
    post_traspaso_de_otra_universidad_del_pais: function(req,res){
      if(req.user){
        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) ){
          var date= new Date()
          req.body.day= date.getDate()
          req.body.month= date.getMonth()
          req.body.year= date.getFullYear()
          var user={user: req.user, body: (req.body)}
          res.render('imprimir_formulario_de_traspaso_de_otra_universidad_del_pais', user)
        }else{
          res.render('formulario_de_traspaso_de_otra_universidad_del_pais', user)
        }
      }
      else
        res.render('login')
    },
    traspaso_del_exterior: function(req,res){
      if(req.user){
        var user={user: req.user, body: (req.body)}
        res.render('formulario_de_traspaso_del_exterior', user)
      }
      else
        res.render('login')
    },
    post_traspaso_del_exterior: function(req,res){
      if(req.user){
        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) ){
          var date= new Date()
          req.body.day= date.getDate()
          req.body.month= date.getMonth()
          req.body.year= date.getFullYear()
          var user={user: req.user, body: (req.body)}
          res.render('imprimir_formulario_de_traspaso_del_exterior', user)
        }else{
          res.render('formulario_de_traspaso_del_exterior', user)
        }
      }
      else
        res.render('login')
    },
    formulario_para_examen_de_gracia: function(req,res){
      configModel.findOne({_id: formulario_para_examen_de_gracia}, function (err, config) {
            if (!err) {
                if (config) {
                  //============
                    if(req.user){
                      bcrypt.hash(""+config.serial, salt).then(function(hash) {
                          var user={user: req.user}
                          user.user.serial= hash
                          res.render('formulario_para_examen_de_gracia', user)
                      })
                    }
                    else
                      res.render('login')
                  //============
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento formulario de  examen de gracia"})
            }
        });
    },
    post_formulario_para_examen_de_gracia: function(req,res){
      if(req.user){
        configModel.findOne({_id: formulario_para_examen_de_gracia}, function (err, config){
            if (!err) {
                if (config) {
                    if(req.body.serial && bcrypt.compareSync(""+config.serial, req.body.serial)){
                                  //============
                        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) && req.body.sexo && req.body.materia && req.body.tipoe){
                          var date= new Date()
                          req.body.day= date.getDate()
                          req.body.month= date.getMonth()
                          req.body.year= date.getFullYear()
                          var user={user: req.user, body: (req.body)}
                          //============
                          var formulario = new tramiteModel({
                            fecha: date
                          });
                          if (req.body.ci){
                            formulario.ci= req.body.ci
                            if(req.body.pasaporte){
                                formulario.pasaporte= req.body.pasaporte
                            }
                          }else{
                            formulario.pasaporte= req.body.pasaporte
                          }
                          formulario.nombre= req.body.nombre
                          formulario.carrera= req.body.carrera
                          formulario.ttramite= "formulario_para_examen_de_gracia"
                          formulario.usuario= new mongoose.Types.ObjectId(req.user._id)
                          formulario.iporigen= getIp(req)
                          //llenar datos tramite, ademas generar el serial de cada doc
                          imprimir_formulario_para_examen_de_gracia(function(err, retorno){
                            if(!err){
                              formulario.serial=retorno
                              user.body.serial=retorno
                              formulario.save(function (err, formulario) {
                                if (!err) {
                                  actualizar_fecha(function(err){
                                      if(err) console.log("existe algun tipo de error al generar el calendario de fechas")
                                      else res.render('imprimir_formulario_para_examen_de_gracia', user)
                                    }, config)
                                }else{
                                  res.render('error', {error: "existe algun error al guardar el documento formulario para examen de gracia"})
                                }
                              });
                            }else{
                              res.render('error', {error: "existe algun error al serializar los documentos para examen de gracia"})
                            }
                          })
                        }else{
                          res.render('formulario_para_examen_de_gracia', user)
                        }
                                  //============
                    }else res.render('error', {error: "ese documento ya fue enviado"})
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento formulario para examen de gracia"})
            }
        })
      }
      else
        res.render('login')
    },
    solicitud_de_convalidacion_de_materias_internas: function(req,res){
      configModel.findOne({_id: formulario_de_solicitud_de_convalidacion_de_materias_internas}, function (err, config) {
            if (!err) {
                if (config) {
                  //============
                    if(req.user){
                      bcrypt.hash(""+config.serial, salt).then(function(hash) {
                          var user={user: req.user}
                          user.user.serial= hash
                          res.render('formulario_para_convalidacion_de_materias_internas', user)
                      })
                    }
                    else
                      res.render('login')
                  //============
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento formulario de  convalidacion de materias internas"})
            }
        });
    },
    post_solicitud_de_convalidacion_de_materias_internas: function(req,res){
      if(req.user){
        configModel.findOne({_id: formulario_de_solicitud_de_convalidacion_de_materias_internas}, function (err, config){
            if (!err) {
                if (config) {
                    if(req.body.serial && bcrypt.compareSync(""+config.serial, req.body.serial)){
                                  //============
                        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) && req.body.acarrera && req.body.sexo && req.body.ciudado && req.body.tipo && req.body.facultad){
                          var date= new Date()
                          req.body.day= date.getDate()
                          req.body.month= date.getMonth()
                          req.body.year= date.getFullYear()
                          var user={user: req.user, body: (req.body)}
                          //===================
                          var formulario = new tramiteModel({
                            fecha: date
                          });
                          if (req.body.ci){
                            formulario.ci= req.body.ci
                            if(req.body.pasaporte){
                                formulario.pasaporte= req.body.pasaporte
                              }
                          }else{
                            formulario.pasaporte= req.body.pasaporte
                          }
                          formulario.nombre= req.body.nombre
                          formulario.carrera= req.body.carrera
                          formulario.ttramite= "formulario_para_convalidacion_de_materias_internas"
                          formulario.usuario= new mongoose.Types.ObjectId(req.user._id)
                          formulario.iporigen= getIp(req)
                          imprimir_solicitud_de_convalidacion_de_materias_internas(function(err, retorno){
                            if(!err){
                              formulario.serial=retorno
                              user.body.serial=retorno
                              formulario.save(function (err, formulario) {
                                if (!err) {
                                  actualizar_fecha(function(err){
                                      if(err) console.log("existe algun tipo de error al generar el calendario de fechas")
                                      else res.render('imprimir_formulario_para_convalidacion_de_materias_internas', user)
                                    }, config)
                                }else{
                                  res.render('error', {error: "existe algun error al guardar el documento de convalidacion de materias internas"})
                                }
                              });
                            }else{
                              res.render('error', {error: "existe algun error al serializar los documentos de convalidacion de materias internas"})
                            }
                          })
                        }else{
                          res.render('formulario_para_convalidacion_de_materias_internas', user)
                        }
                                  //============
                    }else res.render('error', {error: "ese documento ya fue enviado"})
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento de solicitud de convalidacion de materias internas"})
            }
        })
      }
      else
        res.render('login')
    },
    solicitud_de_convalidacion_de_materias_externas: function(req,res){
      configModel.findOne({_id: formulario_de_solicitud_de_convalidacion_de_materias_externas}, function (err, config) {
            if (!err) {
                if (config) {
                  //============
                    if(req.user){
                      bcrypt.hash(""+config.serial, salt).then(function(hash) {
                          var user={user: req.user}
                          user.user.serial= hash
                          res.render('formulario_para_convalidacion_de_materias_externas', user)
                      })
                    }
                    else
                      res.render('login')
                  //============
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento formulario de  convalidacion de materias externas"})
            }
        });
    },
    post_solicitud_de_convalidacion_de_materias_externas: function(req,res){
      if(req.user){
        configModel.findOne({_id: formulario_de_solicitud_de_convalidacion_de_materias_externas}, function (err, config){
            if (!err) {
                if (config) {
                    if(req.body.serial && bcrypt.compareSync(""+config.serial, req.body.serial)){
                                  //============
                        if(req.body.nombre && req.body.carrera && (req.body.ci || req.body.pasaporte) && req.body.universidad && req.body.acarrera && req.body.facultad && req.body.ciudado && req.body.tipo && req.body.sexo){
                          var date= new Date()
                          req.body.day= date.getDate()
                          req.body.month= date.getMonth()
                          req.body.year= date.getFullYear()
                          var user={user: req.user, body: (req.body)}
                          //===========
                          var formulario = new tramiteModel({
                            fecha: date
                          });
                          if (req.body.ci){
                            formulario.ci= req.body.ci
                            if(req.body.pasaporte){
                                formulario.pasaporte= req.body.pasaporte
                            }
                          }else{
                            formulario.pasaporte= req.body.pasaporte
                          }
                          formulario.nombre= req.body.nombre
                          formulario.carrera= req.body.carrera
                          formulario.ttramite= "formulario_para_convalidacion_de_materias_externas"
                          formulario.usuario= new mongoose.Types.ObjectId(req.user._id)
                          formulario.iporigen= getIp(req)
                          //llenar datos tramite, ademas generar el serial de cada doc
                          imprimir_solicitud_de_convalidacion_de_materias_externas(function(err, retorno){
                            if(!err){
                              formulario.serial=retorno
                              user.body.serial=retorno
                              formulario.save(function (err, formulario) {
                                if (!err) {
                                  actualizar_fecha(function(err){
                                      if(err) console.log("existe algun tipo de error al generar el calendario de fechas")
                                      else res.render('imprimir_formulario_para_convalidacion_de_materias_externas', user)
                                    }, config)
                                }else{
                                  res.render('error', {error: "existe algun error al guardar el documento de convalidacion de materias externas"})
                                }
                              });
                            }else{
                              res.render('error', {error: "existe algun error al serializar los documentos de convalidacion de materias externas"})
                            }
                          })
                        }else{
                          res.render('formulario_para_convalidacion_de_materias_externas', user)
                        }
                                  //============
                    }else res.render('error', {error: "ese documento ya fue enviado"})
                }else{
                    res.render('error', {error: "existe algun error al encontrar los documentos de serializacion"})
                }
            }else{
                res.render('error', {error: "existe algun error al comparar la serializacion del documento de convalidacion de materias externas"})
            }
        })
      }
      else
        res.render('login')
    },
    
};
function getIp(req){
  var ip=""
          if(req.headers){
             ip+="x-client-ip:"+req.headers['x-client-ip']+
                  ", x-forwarded-for:"+req.headers['x-forwarded-for']+
                  ", cf-connecting-ip:"+req.headers['cf-connecting-ip']+
                  ", true-client-ip:"+req.headers['true-client-ip']+
                  ", x-real-ip:"+req.headers['x-real-ip']+
                  ", x-cluster-client-ip:"+req.headers['x-cluster-client-ip']+
                  ", x-forwarded:"+req.headers['x-forwarded']+
                  ", forwarded-for:"+req.headers['forwarded-for']+
                  ", forwarded:"+req.headers.forwarded
             }
          if(req.connection){
            ip+=", remoteAddress:"+req.connection.remoteAddress
            if(req.connection.socket)
              ip+=", remoteAddress"+req.connection.socket.remoteAddress
          }
          if(req.socket){
              ip+=", remoteAddress"+req.socket.remoteAddress
           }
          if(req.info){
              ip+=", remoteAddress"+req.info.remoteAddress
          }
          return ip
}
function imprimir_certificado_de_estudios(cb){
  configModel.findOne({_id: certificado_de_estudios}, function (err, config) {
    if (!err && config){
      config.serial+=1;
      config.save(function (err, config){
        if(!err){
          cb(false, config.serial)
        }else{
          cb(true, null)
        }
      });
    }else{
      cb(true, null)
    }
  })
}
function imprimir_formulario_de_admision_especial(cb){
  configModel.findOne({_id: formulario_de_admision_especial}, function (err, config) {
    if (!err && config){
      config.serial+=1;
      config.save(function (err, config){
        if(!err){
          cb(false, config.serial)
        }else{
          cb(true, null)
        }
      });
    }else{
      cb(true, null)
    }
  })
}
function imprimir_formulario_de_reincorporacion(cb){
  configModel.findOne({_id: formulario_de_reincorporacion}, function (err, config) {
    if (!err && config){
      config.serial+=1;
      config.save(function (err, config){
        if(!err){
          cb(false, config.serial)
        }else{
          cb(true, null)
        }
      });
    }else{
      cb(true, null)
    }
  })
}
function imprimir_formulario_de_estudio_simultaneo(cb){
  configModel.findOne({_id: formulario_de_estudio_simultaneo}, function (err, config) {
    if (!err && config){
      config.serial+=1;
      config.save(function (err, config){
        if(!err){
          cb(false, config.serial)
        }else{
          cb(true, null)
        }
      });
    }else{
      cb(true, null)
    }
  })
}
function imprimir_formulario_de_traspaso_a_otra_universidad_del_pais(cb){
  configModel.findOne({_id: formulario_de_traspaso_a_otra_universidad_del_pais}, function (err, config) {
    if (!err && config){
      config.serial+=1;
      config.save(function (err, config){
        if(!err){
          cb(false, config.serial)
        }else{
          cb(true, null)
        }
      });
    }else{
      cb(true, null)
    }
  })
}
function imprimir_formulario_para_examen_de_gracia(cb){
  configModel.findOne({_id: formulario_para_examen_de_gracia}, function (err, config) {
    if (!err && config){
      config.serial+=1;
      config.save(function (err, config){
        if(!err){
          cb(false, config.serial)
        }else{
          cb(true, null)
        }
      });
    }else{
      cb(true, null)
    }
  })
}
function imprimir_solicitud_de_convalidacion_de_materias_internas(cb){
  configModel.findOne({_id: formulario_de_solicitud_de_convalidacion_de_materias_internas}, function (err, config) {
    if (!err && config){
      config.serial+=1;
      config.save(function (err, config){
        if(!err){
          cb(false, config.serial)
        }else{
          cb(true, null)
        }
      });
    }else{
      cb(true, null)
    }
  })
}
function imprimir_solicitud_de_convalidacion_de_materias_externas(cb){
  configModel.findOne({_id: formulario_de_solicitud_de_convalidacion_de_materias_externas}, function (err, config) {
    if (!err && config){
      config.serial+=1;
      config.save(function (err, config){
        if(!err){
          cb(false, config.serial)
        }else{
          cb(true, null)
        }
      });
    }else{
      cb(true, null)
    }
  })
}
function actualizar_fecha(cb, config){
  var date= new Date()
  var calendar=config.calendar
  if (!config.calendar || !config.calendar.anio){
    calendar={}
    calendar.anio=[{
        'cod': date.getFullYear(),
        'mes': [{
          'cod': date.getMonth(),
          'dia': [date.getDate()]
        }]
      }]
  }else{
    var i =0
    var j =0
    var k =0
    var flag= true
    while(flag && i<=calendar.anio.length){
        if(i == calendar.anio.length){
            calendar.anio.push({mes:[{ dia:[date.getDate()], cod:date.getMonth()}], cod:date.getFullYear()})
        }
        if(calendar.anio[i].cod == date.getFullYear()){
            while(flag && j<=calendar.anio[i].mes.length){
                if(j == calendar.anio[i].mes.length){
                    calendar.anio[i].mes.push({dia:[date.getDate()], cod: date.getMonth()})
                }
                if(calendar.anio[i].mes[j].cod ==date.getMonth()){
                    while(flag && k<=calendar.anio[i].mes[j].dia.length){
                        if(k == calendar.anio[i].mes[j].dia.length){
                            calendar.anio[i].mes[j].dia.push(date.getDate())
                        }
                        if(calendar.anio[i].mes[j].dia[k]==date.getDate()){
                            flag=false;
                        }
                    k++
                    }
                k=0
                }
            j++
            }
        j=0
        }
    i++;
    }
  }
  config.calendar=null
  config.calendar=calendar
  console.log("anio:"+date.getFullYear()+" -- mes:"+date.getMonth()+" -- dia:"+date.getDate())
  config.save(function(err, config){
      if (err){
          cb(err)
      }else{
          cb(false)
      }
  })
}

//        llevava req a un archivo para ser examinado sobre las tomas ip se uso
//          const fs= require('fs')
//          var util= require('util')
//          fs.writeFile("./text.txt", "o"+util.inspect(req), function(err){
//            if(err){
//              console.log("error")
//            }else{
//              console.log("se guardo satisfactoriamente")
//            }
//          })