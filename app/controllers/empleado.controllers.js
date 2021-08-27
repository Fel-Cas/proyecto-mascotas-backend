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
    let id=req.params.id;
    let empleado=await service.obtenerEmpleado(id);
    if(empleado)return res.status(200).send({empleado});
    return res.status(404).send({message: 'El usuario no existe.'});
}

exports.borrarEmpleado=async(req,res)=>{
    let id=req.params.id;
    let empleado=await service.obtenerEmpleado(id);
    if(!empleado)return res.status(404).send({message: 'El usuario no existe.'});
    await service.borrarEmpleado(id);
    return res.status(200).send({message: 'El usuario se eliminó'});
}

exports.actualizarEmpleado=async(req,res)=>{
    let id=req.params.id;
    let datos=req.body;
    let empleado=await service.obtenerEmpleado(id);
    if(!empleado)return res.status(404).send({message: 'El usuario no existe.'});
    await service.actualizarEmpleado(id,datos);
    return res.status(200).send({message: 'El usuario se actualizó'});
}

