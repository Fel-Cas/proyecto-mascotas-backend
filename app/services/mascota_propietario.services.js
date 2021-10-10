module.exports= class MascotaPropietario{
    constructor(MascotaPropietario){
        this.MascotaPropietarioModel=MascotaPropietario;
    }
    createMascotaPropietario(idMascota, idPropietario){
        const mascotaPropietario=this.MascotaPropietarioModel.create({ idMascota: idMascota, idPropietario: idPropietario });
        return mascotaPropietario;
    }
    obtenerMascotaPropietarios(){
        const mascotaPropietario=this.MascotaPropietarioModel.findAll();
        return mascotaPropietario;
    }
    obtenerMascotaPropietario(idMascota, idPropietario){
        const mascotaPropietario=this.MascotaPropietarioModel.findOne({
            where:{
                idMascota:idMascota,
                idPropietario:idPropietario
            }
        });
        return mascotaPropietario;
    }

    borrarMascotaPropietario(idMascota,idPropietario){
        const mascotaPropietario=this.MascotaPropietarioModel.destroy({
            where:{
                idMascota:idMascota,
                idPropietario:idPropietario
            }
        });
    }

    actualizarMascotaPropietario(idMascota, idPropietario, datos){
        const mascotaPropietario=this.MascotaPropietarioModel.update(datos, {
            where:{
                idMascota:idMascota,
                idPropietario:idPropietario
            }
        });
        return mascotaPropietario;
    }
    borrarAllMascotaPropietario(){
        const mascotaPropietario=this.MascotaPropietarioModel.destroy({
            where:{
                idMascota:idMascota
            }
        });
    }
    obtenerAllMascotasPropietarios(id){
        const mascotaPropietario=this.MascotaPropietarioModel.findAll({
            where:{
                idMascota:id,
            }});
        return mascotaPropietario;
    }
    
}