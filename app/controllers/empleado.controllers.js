const {Empleado,User,Role}=require('../config/mysql');
const ServiceUser=require('../services/user.services');
const ServiceEmpleado=require('../services/empleado.services');
const service=new ServiceEmpleado(Empleado);
const serviceUser=new ServiceUser(User);
const credential=require('../services/credential');
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
        for(i=0; i<empleados.length;i++){
            let role=await Role.findOne({
                where:{
                    id:empleados[i].role
                }
            });
            empleados[i].role=role.role;
        }
        res.status(200).send({empleados});
    }catch(e){
        return res.status(500).send({message:errorMessages.error})
    }
    if(empleados.length<=0){
        return res.status(404).send({message:errorMessages.errorEmpleadosInexistentes});
    }
    
}

exports.obtenerEmpleado= async(req,res)=>{
    let id=req.params.id;
    try{
        var empleado=await service.obtenerEmpleado(id);
        let role=await Role.findOne({
            where:{
                id:empleado.role
            }
        });
        empleado.role=role.role;
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
        if(!empleado)return res.status(404).send({message:errorMessages.errorEmpleadoInexistente});
        await service.borrarEmpleado(id);
        await  serviceUser.borrarUserByEmpleadoId(id);
        return res.status(200).send({message: 'El usuario se eliminó'});
    }catch(e){
        return res.status(500).send({message:errorMessages.error})
    }
   
}

exports.actualizarEmpleado=async(req,res)=>{
    let id=req.params.id;
    var datos=req.body;
    try{
        let role=await Role.findOne({
            where:{
                role:req.body.role
            }
        })
         if(!role) return res.status(404).send({message:errorMessages.errorRolInexistente});
        req.body.role=role.id;
        var datos=req.body;
        var empleado=await service.obtenerEmpleado(id);
        if(!empleado)return res.status(404).send({message:errorMessages.errorEmpleadoInexistente});
        await service.actualizarEmpleado(id,datos);
    }catch(e){
        return res.status(500).send({message:errorMessages.error})
    }
    return res.status(200).send({message: 'El usuario se actualizó'});
}

