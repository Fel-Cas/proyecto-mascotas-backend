const express=require('express');
const router=express.Router();
const{check,validatorResult}=require('express-validator');
const controllerServicio=require('../controllers/servicio.controller');
const errorMessages=require('../config/errors');
const authorization=require('../middleware/verifyToken')


router.post('/servicios',[authorization.verifytoken,authorization.autorizacionMascotas],[
    check('fechainicio',errorMessages.errorServiciosFechaObligatoria).not().isEmpty(),
    check('fechafinal',errorMessages.errorServiciosFechaObligatoria).not().isEmpty()
],controllerServicio.createServicio);
router.get('/servicios',[authorization.verifytoken,authorization.autorizacionMascotas],[
    check('fecha',errorMessages.errorServiciosFechaObligatoria).not().isEmpty()],controllerServicio.obtenerServicios);
router.put('/servicio/:id',[authorization.verifytoken,authorization.autorizacionMascotas],[
    check('fechainicio',errorMessages.errorServiciosFechaObligatoria).not().isEmpty(),
    check('fechafinal',errorMessages.errorServiciosFechaObligatoria).not().isEmpty()
],controllerServicio.actualizarServicio);
router.delete('/servicios/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerServicio.eliminarServicio);





module.exports=router;