const bcrypt=require('bcrypt');
module.exports=(sequelize,type)=>{
    return sequelize.define('empleado',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
        },
        user:{
            type:type.STRING(100),
            unique:true,
            notNull:true
        },
        names:{
            type:type.STRING(150),
            notNull:true
        },
        lastnames:{
            type:type.STRING(150),
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
        birthday:{
            type:type.DATE,
            notNull:true
        },
        cellphoneNumber:{
            type:type.INTEGER,
            notNull:true
        },
        salary:{
            type:type.INTEGER,
            notNull:true
        },
        isActive:{
            type:type.INTEGER,
            notNull:true,
            defaultValue:1
        },
        role:{
            type:type.STRING(200),
            notNull:true
        }
    },{
    
        hooks:{
            beforeCreate:async (empleado) => {
                if (empleado.password) {
                 const salt = await bcrypt.genSaltSync(10, null);
                 empleado.password = bcrypt.hashSync(empleado.password, salt);
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