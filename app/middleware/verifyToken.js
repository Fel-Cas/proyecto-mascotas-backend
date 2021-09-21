
const jwt=require('jsonwebtoken');
const {Empleado,Role}=require('../config/mysql');
const config=require('../config/config');
const ServiceEmpleado=require('../services/empleado.services');
const service=new ServiceEmpleado(Empleado);

exports.verifytoken=async(req,res,next)=>{
    try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauthorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauthorized Request');
		}
		const contenido = await jwt.verify(token, config.SECRET_TOKEN);
        let empleado=await service.obtenerEmpleado(contenido.id);
        if(!empleado) return res.status(404).send({message:'Empleado no encontrado'});
        req.body.userId=contenido.id;
		next();
    } catch (error) {
        return res.status(500).send({message:'Unauthorized'});
    }
}

exports.autorizacionEmpleados=async(req,res,next)=>{
    try {
        let empleado=await service.obtenerEmpleado(req.body.userId);
        let role=await Role.findOne({
            where:{
                id:empleado.role
            }
        })
        let roles=['ASISTENTE RECURSOS HUMANOS','GERENTE GENERAL','ASISTENTE DE GERENCIA']
        if(!roles.includes(role.role)) return res.status(403).send({message:'Unauthorized'});
        next();
    } catch (error) {
        return res.status(500).send({ message:'Unauthorized' });
    }
}

exports.autorizacionMascotas=async(req,res,next)=>{
    try {
        let empleado=await service.obtenerEmpleado(req.body.userId);
        let role=await Role.findOne({
            where:{
                id:empleado.role
            }
        })
        let roles=['PROFESOR DE GUARDERIA']
        if(!roles.includes(role.role)) return res.status(403).send({message:'Unauthorized'});
        next();
    } catch (error) {
        return res.status(500).send({ message:'Unauthorized' });
    }
}