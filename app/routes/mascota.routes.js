const express=require('express');
const router=express.Router();
const controllerMascota=require('../controllers/mascota.controllers')

router.get('/mascotas',controllerMascota.obtenerMascotas);
router.post('/mascotas',controllerMascota.createMascota);
router.get('/mascotas/:id',controllerMascota.obtenerMascota);
router.put('/mascotas/:id',controllerMascota.actualizarMascota);
router.delete('/mascotas/:id',controllerMascota.borrarMascota);

module.exports=router;