const express=require('express');
const router=express.Router();
const controllerEmpleado=require('../controllers/empleado.controllers');
const{check,validatorResult}=require('express-validator');

router.get('/empleados',controllerEmpleado.obtenerEmpleados);
router.post('/empleados',[
    check('id','El id es obligatorio').not().isEmpty(),
    check('firstName','El primer nombre es obligatorio').not().isEmpty(),
    check('firstlastName','El primer apellido es obligatorio').not().isEmpty(),
    check('secondlastName','El segundo apellido es obligatorio').not().isEmpty(),
    check('email','Debes ingresar un correo valido').isEmail(),
    check('birthday','La fecha debe ser obligatorio').not().isEmpty().isDate(),
    check('phoneNumber','El numero telefonico  debe ser obligatorio').not().isEmpty(),
    check('salary','El salario es obligatorio y mayor a 0').not().isEmpty().isFloat({min:1}),
    check('role','El role del empleado es obligatorio').not().isEmpty()
],controllerEmpleado.createEmpleado);
router.get('/empleados/:id',controllerEmpleado.obtenerEmpleado);
router.put('/empleados/:id',controllerEmpleado.actualizarEmpleado);
router.delete('/empleados/:id',controllerEmpleado.borrarEmpleado);

module.exports=router;
