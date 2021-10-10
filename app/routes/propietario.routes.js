const express=require('express');
const router=express.Router();
const{check,validationResult}=require('express-validator');
const controllerPropietario=require('../controllers/propietario.controller');
const errorMessages=require('../config/errors');
const authorization=require('../middleware/verifyToken');

router.get('/propietarios',[authorization.verifytoken,authorization.autorizacionMascotas],controllerPropietario.obtenerPropietarios);
router.post('/propietarios',[authorization.verifytoken,authorization.autorizacionMascotas],[
    check('id',errorMessages.errorIdObligatorio).not().isEmpty(),
    check('firstName',errorMessages.errorFirstNameObligatorio).not().isEmpty(),
    check('firstlastName',errorMessages.errorFirstLastNameObligatorio).not().isEmpty(),
    check('email',errorMessages.errorEmail).isEmail(),
    check('homeAdress','La dirección es obligatoria').not().isEmpty(),
    check('userCreate','El id del empleado que creo el propietario es obligatorio').not().isEmpty()
],controllerPropietario.createPorpietario);
router.get('/propietarios/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerPropietario.obtenerPropietario);
router.put('/propietarios/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerPropietario.actualizarPropietario);
router.delete('/propietarios/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerPropietario.eliminarPropietario);

module.exports=router;