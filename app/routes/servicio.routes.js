const express=require('express');
const router=express.Router();
const{check,validatorResult}=require('express-validator');
const controllerServicio=require('../controllers/servicio.controller');
const errorMessages=require('../config/errors');
const authorization=require('../middleware/verifyToken')


router.post('/servicios',[authorization.verifytoken,authorization.autorizacionMascotas],[
    check('fecha',errorMessages.errorServiciosFechaObligatoria).not().isEmpty(),
    check('hora',errorMessages.errorServiciosFechaObligatoria).not().isEmpty(),
    check('idPropietario','El id del propietario es obligatorio').not().isEmpty()
],controllerServicio.createServicio);
router.get('/servicios',[authorization.verifytoken,authorization.autorizacionMascotas],controllerServicio.obtenerServicios);
router.get('/servicios/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerServicio.obtenerServicio);
router.put('/servicio/:id',[authorization.verifytoken,authorization.autorizacionMascotas],[
    check('fecha',errorMessages.errorServiciosFechaObligatoria).not().isEmpty(),
    check('hora',errorMessages.errorServiciosFechaObligatoria).not().isEmpty()
],controllerServicio.actualizarServicio);
router.delete('/servicios/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerServicio.eliminarServicio);
router.put('/desactivar-servicio/:id',[authorization.verifytoken,authorization.autorizacionMascotas],controllerServicio.desactivarServicio);




module.exports=router;