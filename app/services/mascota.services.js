module.exports= class Mascota{
    constructor(Mascota){
        this.MascotaModel=Mascota;
    }
    createMascota(datos){
        const mascota=this.MascotaModel.create(datos);
        return mascota;
    }
    obtenerMascotas(){
        const mascotas=this.MascotaModel.findAll();
        return mascotas;
    }
    obtenerMascota(mascotaname){
        const mascota=this.MascotaModel.findOne({
            where:{
                mascotaname:mascotaname
            }
        });
        return mascota;
    }

    borrarMascota(id){
        const mascota=this.MascotaModel.destroy({
            where:{
                id:id
            }
        });
    }

    actualizarMascota(id, datos){
        const mascota=this.MascotaModel.update(datos, {
            where:{
                id:id
            }
        });
        return mascota;
    }
}