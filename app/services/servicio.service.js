const Op = Sequelize.Op;

const servicio = require("../models/servicio");

module.exports= class Servicio{
    constructor(Servicio){
        this.ServicioModel=Servicio;
    }
    createServicio(datos){
        const servicio=this.ServicioModel.create(datos);
        return servicio;
    }

    obtenerServiciosbyFecha(fecha){
        const servicios=this.ServicioModel.findAll({
            where:{
                fechainicio:fecha
            }
        });

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

    validarServicio(fechainicial,fechafinal){
        const servicio=this.ServicioModel.findOne({
            where:{
                fechainicio: {
                    [Op.between]: [fechainicial, fechafinal]
                  }
            }
        });
        return servicio;
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
}