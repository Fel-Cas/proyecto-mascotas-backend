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
    obtenerEmpleado(username){
        const empleado=this.EmpleadoModel.findAll({
            where:{
                user:username
            }
        });
        return empleado;
    }
}