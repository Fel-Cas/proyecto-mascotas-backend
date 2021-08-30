const app=require('./app/app');
const port=procces.env.PORT ||3000
app.listen(port,()=>{
    console.log('Servidor corriendo en el puerto 4000')
});