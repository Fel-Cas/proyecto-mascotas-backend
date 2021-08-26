const express=require('express');
const router=express.Router();
const controllerEmpleado=require('../controllers/empleado.controllers')

router.get('/empleados',controllerEmpleado.obtenerUsuarios);
router.post('/empleados',controllerEmpleado.createEmpleado);
router.get('/empleados/:username');
router.put('/empleados/:username');
router.delete('/empleados/:username');

module.exports=router;
