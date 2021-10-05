const bcrypt=require('bcrypt');
module.exports=(sequelize,type)=>{
    return sequelize.define('mascota_propietario',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        idPropietario:{
            type:type.INTEGER,
            allowNull:false
        },
        idMascota:{
            type:type.INTEGER,
            allowNull:true
        }
    })
}