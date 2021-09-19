const Sequelize=require('sequelize');
const config=require('./config');
const EmpleadoModel=require('../models/empleado');
const UserModel=require('../models/user');
const RoleModel=require('../models/role');

const sequelize=new Sequelize(config.DB_NAME,config.DB_USER,config.DB_PASSWORD,{
    host:config.DB_HOST,
    dialect:'mysql',
    logging: false
});

const Role=RoleModel(sequelize,Sequelize);
const Empleado=EmpleadoModel(sequelize,Sequelize);
const User=UserModel(sequelize,Sequelize);

module.exports={
    sequelize,
    Empleado,
    User,
    Role
}