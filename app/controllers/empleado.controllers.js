const {Empleado}=require('../config/mysql');
const ServiceEmpleado=require('../services/empleado.services');
const service=new ServiceEmpleado(Empleado);

exports.createEmpleado= async (req,res)=>{
    let empleado=await service.createEmpleado(req.body);
    res.status(201).send({empleado});
}

exports.obtenerUsuarios=async(req,res)=>{
    let empleados=await service.obtenerEmpleados();
    res.status(200).send({empleados});
}