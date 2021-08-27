const express=require('express');
const router=express.Router();
const controllerEmpleado=require('../controllers/empleado.controllers')

router.get('/empleados',controllerEmpleado.obtenerEmpleados);
router.post('/empleados',controllerEmpleado.createEmpleado);
router.get('/empleados/:id',controllerEmpleado.obtenerEmpleado);
router.put('/empleados/:id',controllerEmpleado.actualizarEmpleado);
router.delete('/empleados/:id',controllerEmpleado.borrarEmpleado);

module.exports=router;
