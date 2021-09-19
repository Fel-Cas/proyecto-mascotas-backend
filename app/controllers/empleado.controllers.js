const {Empleado}=require('../config/mysql');
const {Role}=require('../config/mysql');
const ServiceEmpleado=require('../services/empleado.services');
const service=new ServiceEmpleado(Empleado);
const credential=require('../services/credential');
const {User}=require('../config/mysql');
const {validationResult}=require('express-validator');
const errorMessages=require('../config/errors');

exports.createEmpleado= async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    let {id,email}=req.body;
    try{
        let empleado1=await service.obtenerEmpleado(id);
        if(empleado1){
            return res.status(409).send({message:errorMessages.errorIdEmpleadoExistente});
        }
    
        empleado1= await service.obtenerEmpleadoByEmail(email);
        if(empleado1){
            return res.status(409).send({message:errorMessages.errorCorreoExistente});
        }
        let role=await Role.findOne({
            where:{
                role:req.body.role
            }
        })
         if(!role) return res.status(404).send({message:errorMessages.errorRolInexistente});
        req.body.role=role.id;
        var empleado=await service.createEmpleado(req.body);
        credential.createCredential(empleado,User);
    }catch(e){
        return res.status(500).send({message:errorMessages.error});
    }   
    res.status(201).send({empleado});
}

exports.obtenerEmpleados=async(req,res)=>{
    try{
        var empleados=await service.obtenerEmpleados();
    }catch(e){
        return res.status(500).send({message:errorMessages.error})
    }
    if(empleados.length<=0){
        return res.status(404).send({message:errorMessages.errorEmpleadosInexistentes});
    }
    res.status(200).send({empleados});
}

exports.obtenerEmpleado= async(req,res)=>{
    let id=req.params.id;
    try{
        var empleado=await service.obtenerEmpleado(id);
    }catch(e){
        return res.status(500).send({message:errorMessages.error})
    }
    if(empleado)return res.status(200).send({empleado});
    return res.status(404).send({message:errorMessages.errorEmpleadoInexistente});
}

exports.borrarEmpleado=async(req,res)=>{
    let id=req.params.id;
    try{
        var empleado=await service.obtenerEmpleado(id);
    }catch(e){
        return res.status(500).send({message:errorMessages.error})
    }
    if(!empleado)return res.status(404).send({message:errorMessages.errorEmpleadoInexistente});
    await service.borrarEmpleado(id);
    return res.status(200).send({message: 'El usuario se eliminó'});
}

exports.actualizarEmpleado=async(req,res)=>{
    let id=req.params.id;
    let datos=req.body;
    try{
        var empleado=await service.obtenerEmpleado(id);
        if(!empleado)return res.status(404).send({message:errorMessages.errorEmpleadoInexistente});
        await service.actualizarEmpleado(id,datos);
    }catch(e){
        return res.status(500).send({message:errorMessages.error})
    }
    return res.status(200).send({message: 'El usuario se actualizó'});
}

