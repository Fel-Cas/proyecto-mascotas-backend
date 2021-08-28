const {Empleado}=require('../config/mysql');
const ServiceEmpleado=require('../services/empleado.services');
const service=new ServiceEmpleado(Empleado);
const credential=require('../services/credential');
const {User}=require('../config/mysql');
const {validationResult}=require('express-validator');

exports.createEmpleado= async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
    let {id,email}=req.body;
    try{
        let user=await service.obtenerEmpleado(id);
        if(user){
            return res.status(409).send({message:'Ya existe un registro con ese id.'});
        }
        user= await service.obtenerEmpleadoByEmail(email);
        if(user){
            return res.status(409).send({message:'Ya existe un registro con ese correo.'});
        }
        let empleado=await service.createEmpleado(req.body);
        credential.createCredential(empleado,User);
    }catch(e){
        return res.status(500).send({message:'Hubo un error.'})
    }   
    res.status(201).send({empleado});
}

exports.obtenerEmpleados=async(req,res)=>{
    try{
        var empleados=await service.obtenerEmpleados();
    }catch(e){
        return res.status(500).send({message:'Ocurrio un error'})
    }
    if(empleados.length<=0){
        return res.status(404).send({message:'No hay empleado registrados'});
    }
    res.status(200).send({empleados});
}

exports.obtenerEmpleado= async(req,res)=>{
    let id=req.params.id;
    try{
        var empleado=await service.obtenerEmpleado(id);
    }catch(e){
        return res.status(500).send({message:'Ocurrio un error'})
    }
    if(empleado)return res.status(200).send({empleado});
    return res.status(404).send({message: 'El usuario no existe.'});
}

exports.borrarEmpleado=async(req,res)=>{
    let id=req.params.id;
    try{
        var empleado=await service.obtenerEmpleado(id);
    }catch(e){
        return res.status(500).send({message:'Ocurrio un error'})
    }
    if(!empleado)return res.status(404).send({message: 'El usuario no existe.'});
    await service.borrarEmpleado(id);
    return res.status(200).send({message: 'El usuario se eliminó'});
}

exports.actualizarEmpleado=async(req,res)=>{
    let id=req.params.id;
    let datos=req.body;
    try{
        var empleado=await service.obtenerEmpleado(id);
        if(!empleado)return res.status(404).send({message: 'El usuario no existe.'});
        await service.actualizarEmpleado(id,datos);
    }catch(e){
        return res.status(500).send({message:'Ocurrio un error'})
    }
    return res.status(200).send({message: 'El usuario se actualizó'});
}

