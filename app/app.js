const express=require('express');
const cors=require('cors');
const {sequelize}=require('./config/mysql');
const routerEmpleado=require('./routes/empleado.routes');
const routerUser=require('./routes/user.routes');
const routerAuth=require('./routes/auth.routes');
const routerMascota=require('./routes/mascota.routes');
const logger = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;

const app=express();

sequelize.sync({force:false}).then(()=>{
    console.log('Base de datos conectada');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api-empleado',routerEmpleado);
app.use('/api-user',routerUser);
app.use('/api-auth',routerAuth);
app.use('/api-mascota',routerMascota);

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({
      message:res.locals.message,
      error:res.locals.error
    })
  });
module.exports=app;