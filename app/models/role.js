module.exports=(sequelize,type)=>{
    return sequelize.define('role',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        role:{
            type:type.STRING(150),
            allowNull:false
        }
    })
}