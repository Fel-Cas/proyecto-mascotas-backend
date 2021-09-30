module.exports= class Propietario{
    constructor(Propietario){
        this.PropietarioModel=Propietario;
    }
    createPropietario(datos){
        const propietario=this.PropietarioModel.create(datos);
        return propietario;
    }
    obtenerPropietarios(){
        const propietarios=this.PropietarioModel.findAll();
        return propietarios;
    }
    obtenerPropietario(id){
        const propietario=this.PropietarioModel.findOne({
            where:{
                id:id
            }
        });
        return propietario;
    }
    borrarPropietario(id){
        const propietario=this.PropietarioModel.destroy({
            where:{
                id:id
            }
        });
    }

    actualizarPropietario(id, datos){
        const propietario=this.PropietarioModel.update(datos, {
            where:{
                id:id
            }
        });
        return propietario;
    }
}