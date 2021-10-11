const express=require('express');
const router=express.Router();
const{check,validatorResult}=require('express-validator');
const controllerServicio=require('../controllers/servicio.controllers');
const errorMessages=require('../config/errors');
const authorization=require('../middleware/verifyToken')


router.post('/servicios',[authorization.verifytoken,authorization.autorizacionMascotas],[
    check('fechainicial',errorMessages.errorServiciosFechaObligatoria).not().isEmpty(),
    check('fechafinal',errorMessages.errorServiciosFechaObligatoria).not().isEmpty()
],controllerServicio.createServicio);
router.get('/servicios',[authorization.verifytoken,authorization.autorizacionMascotas],[
    check('fecha',errorMessages.errorServiciosFechaObligatoria).not().isEmpty()],controllerServicio.obtenerServicios);
router.put('/servicio/:id',[authorization.verifytoken,authorization.autorizacionMascotas],[
    check('fechainicial',errorMessages.errorServiciosFechaObligatoria).not().isEmpty(),
    check('fechafinal',errorMessages.errorServiciosFechaObligatoria).not().isEmpty()
],controllerMascota.createMascota,controllerMascota.actualizarServicio);
router.delete('/servicios/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerMascota.eliminarServicio);





module.exports=router;