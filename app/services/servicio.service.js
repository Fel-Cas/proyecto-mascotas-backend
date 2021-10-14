
const { Op } = require('sequelize');

module.exports= class Servicio{
    constructor(Servicio){
        this.ServicioModel=Servicio;
    }
    createServicio(datos){
        const servicio=this.ServicioModel.create(datos);
        return servicio;
    }

    obtenerServicios(){
        const servicios=this.ServicioModel.findAll();
        return servicios;
    }

    obtenerServicioById(servicioId){
        const servicio=this.ServicioModel.findOne({
            where:{
                id:servicioId
            }
        });
        return servicio;
    }

    validarServicio(fecha){
        const servicios=this.ServicioModel.findAll({
            where:{
                fecha:fecha}
            });
        return servicios;
    }


    borrarServicio(id){
        const servicio=this.ServicioModel.destroy({
            where:{
                id:id
            }
        });
    }
    
    borrarServicioByMascotaId(id){
        this.ServicioModel.destroy({
            where:{
                idMascota:id
            }
        })
    }

    actualizarServicio(id, datos){
        const servicio=this.ServicioModel.update(datos, {
            where:{
                id:id
            }
        });
        return servicio;
    }

    desactivarServicio(id,datos){
        const servicio=this.ServicioModel.update(datos,
            {
                where:
                {
                    id:id
                }
            });
        console.log(servicio)
        return servicio;
    }
}