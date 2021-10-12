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
        fechainicio:{
            type:type.DATE,
            allowNull:false
        },
        fechafinal:{
            type:type.DATE,
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