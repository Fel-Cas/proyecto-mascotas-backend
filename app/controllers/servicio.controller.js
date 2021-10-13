const {Servicio,Mascota,Propietario,MascotaPropietario}=require('../config/mysql');
const ServiceMascota=require('../services/mascota.services');
const service1=new ServiceMascota(Mascota);
const ServiceServicio=require('../services/servicio.service');
const service2=new ServiceServicio(Servicio);
const ServicePropietario=require('../services/propietario.service');
const service3=new ServicePropietario(Propietario);
const ServiceMascotaPropietario=require('../services/mascota_propietario.services');
const service4=new ServiceMascotaPropietario(MascotaPropietario);
const {validationResult}=require('express-validator');
const errorMessages=require('../config/errors');
const jwt=require('jsonwebtoken');
const emailer=require('../services/correo.service');
const config=require('../config/config');


exports.createServicio= async (req,res)=>{

    let id=req.body.idMascota;
    let fechainicial=req.body.fechainicio;
    let fechafinal=req.body.fechafinal;
    let idPropietario=req.body.idPropietario;
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try{
        
        let fechas=await service2.validarServicio(req.body.fecha);
        if(fechas){
            for(let i=0;i<fechas.length;i++){
                if(fechas[i].hora==req.body.hora) return res.status(405).send({message: 'La hora de la cita no está disponible'});
            }
        }
        let mascotas=await service1.obtenerMascota(id);
        if(!mascotas){
            return res.status(404).send({message:'la Mascota no esta registradas'});
        }
        let mascotaPropietario=await service4.obtenerMascotaPropietario(id,idPropietario) 
        if(!mascotaPropietario) return res.status(404).send({message:'El id del propietario no es un dueño de la mascota'});     
        var servicio=await service2.createServicio(req.body);
        let propietario=await service3.obtenerPropietario(idPropietario); 
        let token=jwt.sign({idCita:servicio.id},config.SECRET_TOKEN,{expiresIn:'8h'});
        await emailer.EmailCita(propietario.email,servicio.fecha,servicio.hora,token);
        res.status(201).send({servicio});
    }catch(e)
    {
        return res.status(500).send({message:errorMessages.error})
    }
}

exports.obtenerServicios=async(req,res)=>{
    
    try {
        let servicios=await service2.obtenerServicios();
        if(!servicios) return res.status(404).send({message:'No hay citas registradas'});
        let hoy=new Date(Date.now());
        let fechaHoy=String(`${hoy.getFullYear()}-${hoy.getMonth()+1}-${hoy.getDate()}`);
        
        let finalServices=[]       
        for(let i=0;i<servicios.length;i++){
            if(servicios[i].dataValues.fecha>fechaHoy&&servicios[i].dataValues.isActive!=0)  finalServices.push(servicios[i].dataValues);
        }
        if(finalServices.length==0) return res.status(404).send({message:'No hay citas registradas'});
        return res.status(200).send({finalServices});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    }
}
exports.obtenerServicio=async(req,res)=>{
    try{
        let id=req.params.id;
        let servicio=await service2.obtenerServicioById(id);
        if(!servicio) return res.status(404).send({message:'La cita no está dispobible'});
        let hoy=new Date(Date.now());
        let fechaHoy=String(`${hoy.getFullYear()}-${hoy.getMonth()+1}-${hoy.getDate()}`);
        if(servicio.fecha>fechaHoy&&servicio.dataValues.isActive==0) return res.status(405).send({message:'La fecha de la cita ya caducó.'})
        return res.status(200).send({servicio});
    }catch(err){
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
        
        let servicio=await service2.obtenerServicioById(id);
        if(!servicio)return res.status(404).send({message: 'Servicio no Encontrado'});
        await service2.actualizarServicio(id,req.body);
        return res.status(200).send({message: 'Servicio Actualizado'});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    } 
}

exports.desactivarServicio=async(req,res)=>{
    try {
        let id=req.params.id;    
        let servicio=await service2.obtenerServicioById(id);
        if(!servicio)return res.status(404).send({message: 'Servicio no Encontrado'});
        servicio.dataValues.isActive=0
        await service2.desactivarServicio(id,servicio.dataValues);
        return res.status(200).send({message: 'Servicio Actualizado'});
    } catch (error) {
        return res.status(500).send({message:errorMessages.error})
    } 
}


