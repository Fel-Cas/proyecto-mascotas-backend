const {Empleado}=require('../config/mysql');
const ServiceEmpleado=require('../services/empleado.services');
const service=new ServiceEmpleado(Empleado);

exports.createEmpleado= async (req,res)=>{
    let empleado=await service.createEmpleado(req.body);
    res.status(201).send({empleado});
}

exports.obtenerEmpleados=async(req,res)=>{
    let empleados=await service.obtenerEmpleados();
    res.status(200).send({empleados});
}

exports.obtenerEmpleado= async(req,res)=>{
    let username=req.params.username
    let empleado=await service.obtenerEmpleado(username);
    res.status(200).send({empleado});
}