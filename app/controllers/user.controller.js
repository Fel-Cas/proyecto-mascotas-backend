const {User}=require('../config/mysql');
const ServiceUser=require('../services/user.services');
const service=new ServiceUser(User);
const errorMessages=require('../config/errors');

exports.createUser= async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let {id,empleadoId,username}=req.body;
    try{
        let user1=await service.obtenerUserById(id);
        if(user1){
            return res.status(409).send({message:errorMessages.errorIdExistente});
        }
        user1= await service.obtenerUserByEmpleadoId(empleadoId);
        if(user1){
            return res.status(409).send({message:errorMessages.errorIdEmpleadoExistente});
        }
        user1= await service.obtenerUserByUsername(username);
        if(user1){
            return res.status(409).send({message:errorMessages.errorUsuarioExistente});
        }
        var user=await service.createUser(req.body);
        res.status(201).send({user});
    }catch(e){
        return res.status(500).send({message:errorMessages.error});
    }  
    
}

exports.obtenerUsers=async(req,res)=>{
    try{
        var users=await service.obtenerUsers();
    }catch(e){
        return res.status(500).send({message:errorMessages.error})
    }
    res.status(200).send({users});
}

exports.obtenerUser= async(req,res)=>{
    let username=req.params.username;
    try{
        var user=await service.obtenerUserByUsername(username);
        if(user)return res.status(200).send({user});
        return res.status(404).send({message:errorMessages.errorUsuarioInexistente});
    }catch(e){
        return res.status(500).send({message:errorMessages.error})
    }
    
}

exports.borrarUser=async(req,res)=>{
    let id=req.params.id;
    try{
        var user=await service.obtenerUserById(id);
        if(!user)return res.status(404).send({message:errorMessages.errorUsuarioInexistente});
        await service.borrarUser(id);
        
        return res.status(200).send({message: 'El usuario se eliminó'});
    }catch(e){
        return res.status(500).send({message:errorMessages.error})
    }
    
}

exports.actualizarUser=async(req,res)=>{
    let id=req.params.id;
    let datos=req.body;
    try{
        var user=await service.obtenerUserById(id);
        if(!user)return res.status(404).send({message:errorMessages.errorUsuarioInexistente});
        await service.actualizarUser(id,datos);
        return res.status(200).send({message: 'El usuario se actualizó'});
    }catch(e){
        return res.status(500).send({message:errorMessages.error})
    }
    
}

