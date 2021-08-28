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
            notNull:true
        },
        username:{
            type:type.STRING(150),
            unique:true,
            notNull:true
        },
        email:{
            type:type.STRING(200),
            unique:true,
            notNull:true,
            validate:{
                isEmail:{
                    msg:'No es una dirección de correo electronico'
                }
            }
        },
        password:{
            type:type.STRING(200),
            notNull:true,
        },
        role:{
            type:type.STRING(200),
            notNull:true
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
            validPassword: (password) => {
             return bcrypt.compareSync(password, this.password);
            }
           }   
    })
}