const express=require('express');
const router=express.Router();
const controllerEmpleado=require('../controllers/empleado.controllers');
const{check,validatorResult}=require('express-validator');
const authorization=require('../middleware/verifyToken')

router.get('/empleados',[authorization.verifytoken,authorization.autorizacionEmpleados],controllerEmpleado.obtenerEmpleados);
router.post('/empleados',[authorization.verifytoken,authorization.autorizacionEmpleados],[
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
router.get('/empleados/:id',[authorization.verifytoken,authorization.autorizacionEmpleados],controllerEmpleado.obtenerEmpleado);
router.put('/empleados/:id',[authorization.verifytoken,authorization.autorizacionEmpleados],controllerEmpleado.actualizarEmpleado);
router.delete('/empleados/:id',[authorization.verifytoken,authorization.autorizacionEmpleados],controllerEmpleado.borrarEmpleado);

module.exports=router;
