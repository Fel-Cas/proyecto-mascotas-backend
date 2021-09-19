module.exports= class User{
    constructor(User){
        this.UserModel=User;
    }
    createUser(datos){
        const user=this.UserModel.create(datos);
        return user;
    }
    obtenerUsers(){
        const users=this.UserModel.findAll();
        return users;
    }
    obtenerUserByUsername(username){
        const user=this.UserModel.findOne({
            where:{
                username:username
            }
        });
        return user;
    }

    obtenerUserByEmpleadoId(empleadoId){
        const user=this.UserModel.findOne({
            where:{
                empleadoId:empleadoId
            }
        });
        return user;
    }

    obtenerUserById(id){
        const user=this.UserModel.findOne({
            where:{
                id:id
            }
        });
        return user;
    }


    borrarUser(id){
        const user=this.UserModel.destroy({
            where:{
                id:id
            }
        });
    }

    actualizarUser(id, datos){
        const user=this.UserModel.update(datos, {
            where:{
                id:id
            }
        });
        return user;
    }
}