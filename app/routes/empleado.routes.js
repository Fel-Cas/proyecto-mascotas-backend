const express=require('express');
const router=express.Router();
const controllerEmpleado=require('../controllers/empleado.controllers');
const{check,validatorResult}=require('express-validator');
const authorization=require('../middleware/verifyToken');
const errorMessages=require('../config/errors');

router.get('/empleados',[authorization.verifytoken,authorization.autorizacionEmpleados],controllerEmpleado.obtenerEmpleados);
router.post('/empleados',[authorization.verifytoken,authorization.autorizacionEmpleados],[
    check('id',errorMessages.errorIdObligatorio).not().isEmpty(),
    check('firstName',errorMessages.errorFirstNameObligatorio).not().isEmpty(),
    check('firstlastName',errorMessages.errorFirstLastNameObligatorio).not().isEmpty(),
    check('email',errorMessages.errorEmail).isEmail(),
    check('birthday',errorMessages.errorBirthdayObligatorio).not().isEmpty().isDate(),
    check('phoneNumber',errorMessages.errorPhoneObligatorio).not().isEmpty(),
    check('salary',errorMessages.errorSalary).not().isEmpty().isFloat({min:1}),
    check('role',errorMessages.errorRolObligatorio).not().isEmpty() 
],controllerEmpleado.createEmpleado);
router.get('/empleados/:id',[authorization.verifytoken,authorization.autorizacionEmpleados],controllerEmpleado.obtenerEmpleado);
router.put('/empleados/:id',[authorization.verifytoken,authorization.autorizacionEmpleados],controllerEmpleado.actualizarEmpleado);
router.delete('/empleados/:id',[authorization.verifytoken,authorization.autorizacionEmpleados],controllerEmpleado.borrarEmpleado);

module.exports=router;
