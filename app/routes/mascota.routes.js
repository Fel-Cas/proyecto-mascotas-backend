const express=require('express');
const router=express.Router();
const controllerUser=require('../controllers/mascota.controller')

router.get('/users',controllerUser.obtenerUsers);
router.post('/users',controllerUser.createUser);
router.get('/users/:id',controllerUser.obtenerUser);
router.put('/users/:id',controllerUser.actualizarUser);
router.delete('/users/:id',controllerUser.borrarUser);

module.exports=router;