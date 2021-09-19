const config=require('../config/config');
const {User}=require('../config/mysql');
const jwt=require('jsonwebtoken');
const ServiceUser=require('../services/user.services');
const service=new ServiceUser(User);
const bcrypt=require('bcrypt');
const errorMessages=require('../config/errors');

exports.login=async(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    try{
        if(!(username && password)){
            return res.status(400).send({message:errorMessages.errorNoUsernamePassword});
        }
        let user=await service.obtenerUserByUsername(username);
        
        if(!user){
            return res.status(400).send({message:errorMessages.errorWrongUsernamePassword});
        }
        if(user.isActive!=1){
            return res.status(403).send({message:errorMessages.errorPermiso});
        } 
        if(!await bcrypt.compareSync(password,user.password)){
            return res.status(400).send({message:errorMessages.errorWrongUsernamePassword});
        }
        const token=jwt.sign({id:user.empleadoId},config.SECRET_TOKEN,{expiresIn:'1h'});
        res.status(200).send({message:'Ok',toke:token,userId:user.empleadoId});
    }catch(err){
        return res.status(500).send({message:errorMessages.error});
    }
    
}