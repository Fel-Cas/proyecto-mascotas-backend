const express=require('express');
const cors=require('cors');
const {sequelize}=require('./config/mysql');
const routerEmpleado=require('./routes/empleado.routes');
const app=express();

sequelize.sync({force:false}).then(()=>{
    console.log('Base de datos conectada');
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api-usuario',routerEmpleado);


module.exports=app;