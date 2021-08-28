module.exports= class Empleado{
    constructor(Empleado){
        this.EmpleadoModel=Empleado;
    }
    createEmpleado(datos){
        const empleado=this.EmpleadoModel.create(datos);
        return empleado;
    }
    obtenerEmpleados(){
        const empleados=this.EmpleadoModel.findAll();
        return empleados;
    }
    obtenerEmpleado(id){
        const empleado=this.EmpleadoModel.findOne({
            where:{
                id:id
            }
        });
        return empleado;
    }
    obtenerEmpleadoByEmail(email){
        const empleado=this.EmpleadoModel.findOne({
            where:{
                email:email
            }
        });
        return empleado;
    }
    borrarEmpleado(id){
        const empleado=this.EmpleadoModel.destroy({
            where:{
                id:id
            }
        });
    }

    actualizarEmpleado(id, datos){
        const empleado=this.EmpleadoModel.update(datos, {
            where:{
                id:id
            }
        });
        return empleado;
    }
}