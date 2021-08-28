const {User}=require('../config/mysql');
const ServiceUser=require('../services/user.services');
const service=new ServiceUser(User);

exports.createUser= async (req,res)=>{
    let user=await service.createUser(req.body);
    res.status(201).send({user});
}

exports.obtenerUsers=async(req,res)=>{
    let users=await service.obtenerUsers();
    res.status(200).send({users});
}

exports.obtenerUser= async(req,res)=>{
    let id=req.params.id;
    let user=await service.obtenerUser(id);
    if(user)return res.status(200).send({user});
    return res.status(404).send({message: 'El usuario no existe.'});
}

exports.borrarUser=async(req,res)=>{
    let id=req.params.id;
    let user=await service.obtenerUser(id);
    if(!user)return res.status(404).send({message: 'El usuario no existe.'});
    await service.borrarUser(id);
    return res.status(200).send({message: 'El usuario se eliminó'});
}

exports.actualizarUser=async(req,res)=>{
    let id=req.params.id;
    let datos=req.body;
    let user=await service.obtenerUser(id);
    if(!user)return res.status(404).send({message: 'El usuario no existe.'});
    await service.actualizarUser(id,datos);
    return res.status(200).send({message: 'El usuario se actualizó'});
}

