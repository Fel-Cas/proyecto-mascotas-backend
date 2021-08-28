const emailer=require('../services/correo.service');

exports.createCredential=async(empleado,userModel)=>{
    var user=[];
    user.password=Math.random().toString(36).slice(-8);
    do{
        let random=Math.floor(Math.random()*10000);
       var username=`${empleado.firstName}.${empleado.firstlastName}${random}`;
       username=username.toLowerCase();
       var usuario=await userModel.findOne({
           where:{
               username:username
           }
       })
    }while(usuario);
    user.username=username;
    user.email=empleado.email;
    let datos={
        empleadoId:empleado.id,
        username:user.username,
        password:user.password
    };
    await userModel.create(datos);
    emailer.sendMail(user.email,user.username,user.password); 
}

