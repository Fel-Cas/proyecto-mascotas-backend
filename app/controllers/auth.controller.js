const config=require('../config/config');
const {User}=require('../config/mysql');
const jwt=require('jsonwebtoken');
const ServiceUser=require('../services/user.services');
const service=new ServiceUser(User);
const bcrypt=require('bcrypt');

exports.login=async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    try{
        if(!(username && password)){
            return res.status(400).send({message:'El username y el password son requeridos'});
        }
        let user=await service.obtenerUser(username);
        
        if(!user){
            return res.status(400).send({message:'Username o password incorrecto.'});
        }
        if(user.isActive!=1){
            return res.status(403).send({message:'No tiene permisos de acceso a la aplicación'});
        } 
        if(!await bcrypt.compareSync(password,user.password)){
            return res.status(400).send({message:'Username o password incorrecto.'});
        }
        const token=jwt.sign({id:user.empleadoId},config.SECRET_TOKEN,{expiresIn:'1h'});
        res.status(200).send({message:'Ok',toke:token,userId:user.empleadoId});
    }catch(err){
        return res.status(500).send({message:'Hubo un error.'});
    }
    
}