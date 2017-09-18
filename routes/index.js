var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");
var tramiteController = require('../controllers/tramiteController.js');

// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

//selector de plantilla
router.get('/certificado_de_estudios', tramiteController.certificado_de_estudios);
router.post('/certificado_de_estudios', tramiteController.post_certificado_de_estudios)
router.get('/formulario_de_admision_especial', tramiteController.formulario_de_admision_especial);
router.post('/formulario_de_admision_especial', tramiteController.post_formulario_de_admision_especial)
router.get('/formulario_de_reincorporacion', tramiteController.formulario_de_reincorporacion);
router.post('/formulario_de_reincorporacion', tramiteController.post_formulario_de_reincorporacion)
router.get('/suspencion_temporal', tramiteController.suspencion_temporal)
router.post('/suspencion_temporal', tramiteController.post_suspencion_temporal)
router.get('/estudio_simultaneo', tramiteController.estudio_simultaneo)
router.post('/estudio_simultaneo', tramiteController.post_estudio_simultaneo)
router.get('/cambio_de_carrera', tramiteController.cambio_de_carrera)
router.post('/cambio_de_carrera', tramiteController.post_cambio_de_carrera)
router.get('/traspaso_a_otra_universidad_del_pais', tramiteController.traspaso_a_otra_universidad_del_pais)
router.post('/traspaso_a_otra_universidad_del_pais', tramiteController.post_traspaso_a_otra_universidad_del_pais)
router.get('/traspaso_de_otra_universidad_del_pais', tramiteController.traspaso_de_otra_universidad_del_pais)
router.post('/traspaso_de_otra_universidad_del_pais', tramiteController.post_traspaso_de_otra_universidad_del_pais)
router.get('/traspaso_del_exterior', tramiteController.traspaso_del_exterior)
router.post('/traspaso_del_exterior', tramiteController.post_traspaso_del_exterior)
router.get('/formulario_para_examen_de_gracia', tramiteController.formulario_para_examen_de_gracia)
router.post('/formulario_para_examen_de_gracia', tramiteController.post_formulario_para_examen_de_gracia)
router.get('/solicitud_de_convalidacion_de_materias_internas', tramiteController.solicitud_de_convalidacion_de_materias_internas)
router.post('/solicitud_de_convalidacion_de_materias_internas', tramiteController.post_solicitud_de_convalidacion_de_materias_internas)
router.get('/solicitud_de_convalidacion_de_materias_externas', tramiteController.solicitud_de_convalidacion_de_materias_externas)
router.post('/solicitud_de_convalidacion_de_materias_externas', tramiteController.post_solicitud_de_convalidacion_de_materias_externas)
router.get('/manager', auth.manager)
router.post('/manager/:tam', auth.post_manager)
router.get('/manager/:tam', auth.main_manager)
router.get('/prueba/:tam', function(req, res){
  res.render('prueba4', {data: [
        {name: 'Alice',   phone: '555-1212',  age: 10},
        {name: 'Betto',   phone: '555-1212',  age: 12},
        {name: 'Carl',   phone: '555-1212',  age: 13},
        {name: 'Daniel',   phone: '555-1212',  age: 10},
        {name: 'Esteban',   phone: '555-1212',  age: 10},
        {name: 'Fabiana',   phone: '555-1212',  age: 10},
        {name: 'Guido',   phone: '555-1212',  age: 10},
        {name: 'Henry',   phone: '555-1212',  age: 10},
        {name: 'Isabel',   phone: '555-1212',  age: 10},
        {name: 'John',   phone: '555-1212',  age: 10},
        
        {name: 'Kael',   phone: '555-1212',  age: 10},
        {name: 'Lenny',   phone: '555-1212',  age: 10},
        {name: 'Nancy',   phone: '555-1212',  age: 10},
        {name: 'Mary',   phone: '555-9876',  age: 19},
        {name: 'Mike',   phone: '555-4321',  age: 21},
        {name: 'Wally',   phone: '555-5678',  age: 35},
        {name: 'Laya',   phone: '555-5678',  age: 35},
        {name: 'Morelva',   phone: '555-5678',  age: 35},
        {name: 'Adam',   phone: '555-5678',  age: 35},
        //{name: 'Julie',  phone: '555-8765',  age: 29}
      ],
                         tam: req.params.tam
                        })
})
router.get('/manager/estudiante/:ci', auth.estudiante)


module.exports = router;
