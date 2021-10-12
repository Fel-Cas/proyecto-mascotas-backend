const express=require('express');
const router=express.Router();
const{check,validatorResult}=require('express-validator');
const controllerMascota=require('../controllers/mascota.controllers');
const errorMessages=require('../config/errors');
const authorization=require('../middleware/verifyToken')

router.get('/mascotas',[authorization.verifytoken,authorization.autorizacionMascotas],controllerMascota.obtenerMascotas);
router.post('/mascotas',[authorization.verifytoken,authorization.autorizacionMascotas],[
    check('name',errorMessages.errorNombreObligatorio).not().isEmpty(),
    check('breed',errorMessages.errorRazaObligatorio).not().isEmpty(),
    check('size',errorMessages.errorTamañoObligatorio).not().isEmpty(),
    check('birthyear',errorMessages.errorAñoObligatorio).not().isEmpty().isInt(),
    check('planDeVacunacion',errorMessages.errorPlanObligatorio).not().isEmpty(),
    check('cuidados',errorMessages.errorCuidadosObligatorio).not().isEmpty(),
    check('idPropietario','El id del propietario es obligatorio').not().isEmpty()
],controllerMascota.createMascota);
router.get('/mascotas/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerMascota.obtenerMascota);
router.put('/mascotas/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerMascota.actualizarMascota);
router.delete('/mascotas/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerMascota.borrarMascota);
router.post('/mascota_propietarios/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerMascota.agregarMascotaPropietario);
router.delete('/mascota_propietarios/:id/:idPropietario',[authorization.verifytoken,authorization.autorizacionMascotas],controllerMascota.borrarMascotaPropietario);




module.exports=router;