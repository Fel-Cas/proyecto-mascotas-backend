const {Mascota,Propietario,MascotaPropietario}=require('../config/mysql');
const ServiceMascota=require('../services/mascota.services');
const service1=new ServiceMascota(Mascota);
const ServicePropietario=require('../services/propietario.service');
const service2=new ServicePropietario(Propietario);
const ServiceMascotaPropietario=require('../services/mascota_propietario.services');
const service3=new ServiceMascotaPropietario(MascotaPropietario);
const {validationResult}=require('express-validator');
const errorMessages=require('../config/errors');


exports.createMascota= async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try{
        var mascota=await service1.createMascota(req.body);
        var propietario=await service2.obtenerPropietario(req.body.idPropietario);
        if(!propietario) return res.status(404).send({message:errorMessages.errorPropietariosInexistentes});
        await service3.createMascotaPropietario(req.body.id,req.body.idPropietario);
        res.status(201).send({mascota});
    }catch(e)
    {
        return res.status(500).send({message:errorMessages.error})
    }
}

exports.obtenerMascotas=async(req,res)=>{
    try {
        let mascotas=await service1.obtenerMascotas();
        if(mascotas.length<=0){
            return res.status(404).send({message:'No hay mascotas registradas'});
        }
        res.status(200).send({mascotas});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    }
}

exports.obtenerMascota= async(req,res)=>{
    try {
        let id=req.params.id;
        let mascota=await service1.obtenerMascota(id);
        if(mascota)return res.status(200).send({mascota});
        return res.status(404).send({message: 'Mascota no identificada.'});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    }
}

exports.borrarMascota=async(req,res)=>{
    try {
        let id=req.params.id;
        let mascota=await service1.obtenerMascota(id);
        if(!mascota)return res.status(404).send({message: 'Mascota no identificada.'});
        await service1.borrarMascota(id);
        return res.status(200).send({message: 'Mascota depurada'});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    }
    
}

exports.actualizarMascota=async(req,res)=>{
    try {
        let id=req.params.id;
        let datos=req.body;
        
        let mascota=await service1.obtenerMascota(id);
        if(!mascota)return res.status(404).send({message: 'Mascota no identificada.'});
        await service1.actualizarMascota(id,datos);
        return res.status(200).send({message: 'Datos de Mascota actualizados'});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    } 
}

