const config=require('./app/config/config');
const app=require('./app/app');
const port=config.PORT;
app.listen(port,()=>{
    console.log('Servidor corriendo en el puerto '+port);
});