const {Mascota}=require('../config/mysql');
const ServiceMascota=require('../services/mascota.services');
const service=new ServiceMascota(Mascota);

exports.createMascota= async (req,res)=>{
    let mascota=await service.createMascota(req.body);
    res.status(201).send({mascota});
}

exports.obtenerMascotas=async(req,res)=>{
    let mascotas=await service.obtenerMascotas();
    res.status(200).send({mascotas});
}

exports.obtenerMascota= async(req,res)=>{
    let id=req.params.id;
    let mascota=await service.obtenerMascota(id);
    if(mascota)return res.status(200).send({mascota});
    return res.status(404).send({message: 'Mascota no identificada.'});
}

exports.borrarMascota=async(req,res)=>{
    let id=req.params.id;
    let mascota=await service.obtenerMascota(id);
    if(!mascota)return res.status(404).send({message: 'Mascota no identificada.'});
    await service.borrarMascota(id);
    return res.status(200).send({message: 'Mascota depurada'});
}

exports.actualizarMascota=async(req,res)=>{
    let id=req.params.id;
    let datos=req.body;
    let mascota=await service.obtenerMascota(id);
    if(!mascota)return res.status(404).send({message: 'Mascota no identificada.'});
    await service.actualizarMascota(id,datos);
    return res.status(200).send({message: 'Datos de Mascota actualizada'});
}

