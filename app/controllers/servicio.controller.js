const {Servicio,Mascota}=require('../config/mysql');
const ServiceMascota=require('../services/mascota.services');
const service1=new ServiceMascota(Mascota);
const ServiceServicio=require('../services/servicio.service');
const service2=new ServiceServicio(Servicio);
const {validationResult}=require('express-validator');
const errorMessages=require('../config/errors');


exports.createServicio= async (req,res)=>{

    let id=req.body.idMascota;
    let fechainicial=req.params.fechainicio;
    let fechafinal=req.params.fechafinal;

    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try{

        /*let servicios=await service2.validarServicio(fechainicial,fechafinal);
        if(servicios.length<0){
            return res.status(404).send({message:'Ya existe una cita asignada en este espacio'});
        }*/
        console.log('dfdfd')
        let mascotas=await service1.obtenerMascota(id);
        if(mascotas.length< 0){
            return res.status(404).send({message:'la Mascota no esta registradas'});
        }

        console.log('flksflksfdn')
        var servicio=await service2.createServicio(req.body);
        res.status(201).send({servicio});
    }catch(e)
    {
        return res.status(500).send({message:errorMessages.error})
    }
}

exports.obtenerServicios=async(req,res)=>{
    let fecha=req.params.fecha;
    try {
        let mascotas=await service2.obtenerServiciosbyFecha(fecha);

        res.status(200).send({mascotas});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    }
}



exports.eliminarServicio=async(req,res)=>{
    try {
        let id=req.params.id;
        let servicio=await service2.obtenerServicioById(id);
        if(!servicio)return res.status(404).send({message: 'Servicio no identificado.'});
        service2.borrarServicio(id);        
        return res.status(200).send({message: 'Servicio liberado'});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    }
    
}

exports.actualizarServicio=async(req,res)=>{
    try {
        let id=req.params.id;
        
        let mascota=await service2.obtenerServicioById(id);
        if(!mascota)return res.status(404).send({message: 'Servicio no Encontrado'});
        await service2.actualizarServicio(id,datos);
        return res.status(200).send({message: 'Servicio Actualizado'});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    } 
}


