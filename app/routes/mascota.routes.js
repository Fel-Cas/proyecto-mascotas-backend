const express=require('express');
const router=express.Router();
const{check,validatorResult}=require('express-validator');
const controllerMascota=require('../controllers/mascota.controllers');
const errorMessages=require('../config/errors');

router.get('/mascotas',controllerMascota.obtenerMascotas);
router.post('/mascotas',[
    check('name',errorMessages.errorNombreObligatorio).not().isEmpty(),
    check('breed',errorMessages.errorRazaObligatorio).not().isEmpty(),
    check('size',errorMessages.errorTamañoObligatorio).not().isEmpty(),
    check('birthyear',errorMessages.errorAñoObligatorio).not().isEmpty().isInt(),
    check('planDeVacunacion',errorMessages.errorPlanObligatorio).not().isEmpty(),
    check('cuidados',errorMessages.errorCuidadosObligatorio).not().isEmpty(),
],controllerMascota.createMascota);
router.get('/mascotas/:id',controllerMascota.obtenerMascota);
router.put('/mascotas/:id',controllerMascota.actualizarMascota);
router.delete('/mascotas/:id',controllerMascota.borrarMascota);

module.exports=router;