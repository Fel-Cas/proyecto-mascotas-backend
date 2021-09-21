const {Mascota}=require('../config/mysql');
const ServiceMascota=require('../services/mascota.services');
const service=new ServiceMascota(Mascota);
const {validationResult}=require('express-validator');
const errorMessages=require('../config/errors');


exports.createMascota= async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try{
        var mascota=await service.createMascota(req.body);
        res.status(201).send({mascota});
    }catch(e)
    {
        return res.status(500).send({message:errorMessages.error})
    }
}

exports.obtenerMascotas=async(req,res)=>{
    try {
        let mascotas=await service.obtenerMascotas();
        res.status(200).send({mascotas});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    }
}

exports.obtenerMascota= async(req,res)=>{
    try {
        let id=req.params.id;
        let mascota=await service.obtenerMascota(id);
        if(mascota)return res.status(200).send({mascota});
        return res.status(404).send({message: 'Mascota no identificada.'});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    }
}

exports.borrarMascota=async(req,res)=>{
    try {
        let id=req.params.id;
        let mascota=await service.obtenerMascota(id);
        if(!mascota)return res.status(404).send({message: 'Mascota no identificada.'});
        await service.borrarMascota(id);
        return res.status(200).send({message: 'Mascota depurada'});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    }
    
}

exports.actualizarMascota=async(req,res)=>{
    try {
        let id=req.params.id;
        let datos=req.body;
        let mascota=await service.obtenerMascota(id);
        if(!mascota)return res.status(404).send({message: 'Mascota no identificada.'});
        await service.actualizarMascota(id,datos);
        return res.status(200).send({message: 'Datos de Mascota actualizada'});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    } 
}

