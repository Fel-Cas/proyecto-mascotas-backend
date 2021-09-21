const bcrypt=require('bcrypt');
module.exports=(sequelize,type)=>{
    return sequelize.define('mascota',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        name:{
            type:type.STRING(350),
            allowNull:false
        },
        breed:{
            type:type.STRING(300),
            allowNull:true
        },
        size:{
            type:type.STRING(300),
            allowNull:false
        },
        birthyear:{
            type:type.INTEGER,
            allowNull:false
        },
        planDeVacunacion:{
            type:type.STRING,
            allowNull:false
        },
        cuidados:{
            type:type.STRING(2000),
            allowNull:false
        }
    })
}