const bcrypt=require('bcrypt');
module.exports=(sequelize,type)=>{
    return sequelize.define('usuario',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        empleadoId:{
            type:type.STRING,
            unique:true,
            allowNull:false
        },
        username:{
            type:type.STRING(150),
            unique:true,
            allowNull:false
        },
        password:{
            type:type.STRING(200),
            allowNull:false
        },isActive:{
            type:type.INTEGER,
            allowNull:false,
            defaultValue:1
        }
    },{    
        hooks:{
            beforeCreate:async (usuario) => {
                if (usuario.password) {
                 const salt = await bcrypt.genSaltSync(10, null);
                 usuario.password = bcrypt.hashSync(usuario.password, salt);
                }
               }
             }
    },{
        instanceMethods: {
            validPassword:async (password) => {
             return await bcrypt.compareSync(password, this.password);
            }
           }   
    });
}