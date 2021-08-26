const Sequelize=require('sequelize');
const config=require('./config');
const EmpleadoModel=require('../models/empleado');

const sequelize=new Sequelize(config.DB_NAME,config.DB_USER,config.DB_PASSWORD,{
    host:config.DB_HOST,
    dialect:'mysql'
});

const Empleado=EmpleadoModel(sequelize,Sequelize);

module.exports={
    sequelize,
    Empleado
}