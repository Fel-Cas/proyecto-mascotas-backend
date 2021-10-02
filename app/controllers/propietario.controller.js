const {Propietario}=require('../config/mysql');
const ServicePropietario=require('../services/propietario.service');
const service=new ServicePropietario(Propietario);
const errorMessages=require('../config/errors');
const{check,validationResult}=require('express-validator');

exports.createPorpietario=async(req,res)=>{
    
    try{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let datos=req.body;
        let id=datos.id;
        let email=datos.email;
        let propietario=await service.obtenerPropietario(id);
        if(propietario) return res.status(409).send({message:'Ya existe un propietario registrado con ese id'});
        propietario=await service.obtenerPropietarioByEmail(email);
        if(propietario) return  res.status(409).send({message:'Ya existe un propietario registrado con ese email'});
        propietario=await service.createPropietario(datos);
        return res.status(201).send({propietario});
    }catch(error){
        return res.status(500).send({message:errorMessages.error});
    }
}

exports.obtenerPropietarios=async(req,res)=>{
    try {
        let propietarios= await service.obtenerPropietarios();
        if(propietarios.length<=0){
            return res.status(404).send({message:errorMessages.errorPropietariosInexistentes});
        }
        return res.status(200).send({propietarios});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error});
    }
}

exports.obtenerPropietario=async(req,res)=>{
    try {
        let id=req.params.id
        let propietario=await service.obtenerPropietario(id);
        if (propietario) return res.status(200).send({propietario});
        return res.status(404).send({message:'Propietario no registrado'});        
    } catch (error) {
        return res.status(500).send({message:errorMessages.error});
    }
}

exports.actualizarPropietario=async(req,res)=>{
    try {
        let id=req.params.id;
        let datos=req.body;
        let propietario=await service.obtenerPropietario(id);
        if(!propietario) return res.status(404).send({message:'No hay un propietario registrado con ese id'});
        await service.actualizarPropietario(id,datos);
        return res.status(200).send({message:'Propietario actualizado correctamente'});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error});
    }
}

exports.eliminarPropietario=async(req,res)=>{
     try {
        let id=req.params.id;
        let propietario=await service.obtenerPropietario(id);
        if(!propietario) return res.status(404).send({message:'No hay un propietario registrado con ese id'});
        await service.borrarPropietario(id);
        return res.status(200).send({message:'Empleado borrado con exito '})
    } catch (error) {
        return res.status(500).send({message:errorMessages.error});
    }
}