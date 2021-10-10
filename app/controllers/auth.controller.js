const config=require('../config/config');
const {User,Role,Empleado}=require('../config/mysql');
const jwt=require('jsonwebtoken');
const ServiceEmpleado=require('../services/empleado.services');
const service1=new ServiceEmpleado(Empleado);
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
        let empleado= await service1.obtenerEmpleado(user.empleadoId);
        let role=await Role.findOne({
            where:{
                id:empleado.role
            }
        });
        const token=jwt.sign({id:user.empleadoId},config.SECRET_TOKEN,{expiresIn:'1h'});
        res.status(200).send({message:'Ok',token:token,userId:user.empleadoId,role:role.role});
    }catch(err){
        return res.status(500).send({message:errorMessages.error});
    }
    
}