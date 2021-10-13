const bcrypt=require('bcrypt');
module.exports=(sequelize,type)=>{
    return sequelize.define('servicio',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        estadoServicio:{
            type:type.STRING(50),
            allowNull:false,
            defaultValue: "ASIGNADA"

        },
        novedades:{
            type:type.STRING(150),
            allowNull:true
        },
        fecha:{
            type:type.DATEONLY,
            allowNull:false
        },
        hora:{
            type:type.TIME,
            allowNull:false
        },
        idMascota:{
            type:type.INTEGER,
            allowNull:true
        },
        idPropietario:{
            type:type.STRING(150),
            allowNull:false
        }
    })
}