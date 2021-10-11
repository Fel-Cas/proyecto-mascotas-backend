const Sequelize=require('sequelize');
const config=require('./config');
const MascotaModel=require('../models/mascota');
const RoleModel=require('../models/role');
const EmpleadoModel=require('../models/empleado');
const UserModel=require('../models/user');
const PropietarioModel=require('../models/propietario');
const MascotaPropietarioModel=require('../models/mascota_propietario');
const ServicioModel=require('../models/servicio');

const sequelize=new Sequelize(config.DB_NAME,config.DB_USER,config.DB_PASSWORD,{
    host:config.DB_HOST,
    dialect:'mysql',
    logging: false
});



const Role=RoleModel(sequelize,Sequelize);
const Empleado=EmpleadoModel(sequelize,Sequelize);
const User=UserModel(sequelize,Sequelize);
const Mascota=MascotaModel(sequelize,Sequelize);
const Propietario=PropietarioModel(sequelize,Sequelize);
const MascotaPropietario=MascotaPropietarioModel(sequelize,Sequelize);
const Servicio=ServicioModel(sequelize,Sequelize);

module.exports={
    sequelize,
    Empleado,
    User,
    Mascota,
    Role,
    Propietario,
    MascotaPropietario,
    Servicio
}