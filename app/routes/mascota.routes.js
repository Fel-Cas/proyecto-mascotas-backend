const express=require('express');
const router=express.Router();
const{check,validatorResult}=require('express-validator');
const controllerMascota=require('../controllers/mascota.controllers')

router.get('/mascotas',controllerMascota.obtenerMascotas);
router.post('/mascotas',[
    check('name',errorMessages.errorFirstNameObligatorio).not().isEmpty(),
    check('breed',errorMessages.errorFirstLastNameObligatorio).not().isEmpty(),
    check('size',errorMessages.errorEmail).not().isEmpty(),
    check('birthyear',errorMessages.errorBirthdayObligatorio).not().isEmpty().isInt(),
    check('planDeVacunacion',errorMessages.errorPhoneObligatorio).not().isEmpty(),
    check('cuidados',errorMessages.errorSalary).not().isEmpty(),
],controllerMascota.createMascota);
router.get('/mascotas/:id',controllerMascota.obtenerMascota);
router.put('/mascotas/:id',controllerMascota.actualizarMascota);
router.delete('/mascotas/:id',controllerMascota.borrarMascota);

module.exports=router;