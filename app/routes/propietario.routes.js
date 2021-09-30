const express=require('express');
const router=express.Router();
const{check,validatorResult}=require('express-validator');
const controllerPropietario=require('../controllers/propietario.controller');
const errorMessages=require('../config/errors');
const authorization=require('../middleware/verifyToken');

router.get('/propietarios',controllerPropietario.obtenerPropietarios);
router.post('/propietarios',controllerPropietario.createPorpietario);
router.get('/propietarios/:id',controllerPropietario.obtenerPropietario);
router.put('/propietarios/:id',controllerPropietario.actualizarPropietario);
router.delete('/propietarios/:id',controllerPropietario.eliminarPropietario);

module.exports=router;