const Sequelize=require('sequelize');
const config=require('./config');
const EmpleadoModel=require('../models/empleado');
const UserModel=require('../models/user');
<<<<<<< HEAD
const MascotaModel=require('../models/mascota');
=======
const RoleModel=require('../models/role');
>>>>>>> ff70461102762384cfc59e0c5a8d0fefdd4ebc72

const sequelize=new Sequelize(config.DB_NAME,config.DB_USER,config.DB_PASSWORD,{
    host:config.DB_HOST,
    dialect:'mysql',
    logging: false
});

const Role=RoleModel(sequelize,Sequelize);
const Empleado=EmpleadoModel(sequelize,Sequelize);
const User=UserModel(sequelize,Sequelize);
const Mascota=MascotaModel(sequelize,Sequelize);

module.exports={
    sequelize,
    Empleado,
    User,
<<<<<<< HEAD
    Mascota
=======
    Role
>>>>>>> ff70461102762384cfc59e0c5a8d0fefdd4ebc72
}