const Sequelize=require('sequelize');
const config=require('./config');
const EmpleadoModel=require('../models/empleado');
const UsuarioModel=require('../models/user');

const sequelize=new Sequelize(config.DB_NAME,config.DB_USER,config.DB_PASSWORD,{
    host:config.DB_HOST,
    dialect:'mysql',
    logging: false
});


const Empleado=EmpleadoModel(sequelize,Sequelize);
const Usuario=UsuarioModel(sequelize,Sequelize);

module.exports={
    sequelize,
    Empleado,
    Usuario
}