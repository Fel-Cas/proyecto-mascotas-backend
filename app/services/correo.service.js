const nodemailer=require('nodemailer');
const config=require('../config/config')

const  createTransporter =()=>{
    const transporter=nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: config.EMAIL_USER, // generated ethereal user
          pass: config.EMAIL_PASSWORD, // generated ethereal password
        }
      })
    return transporter;
} 
exports.sendMail=async(email,user,password)=>{
      const transporter=createTransporter();
      const info=await transporter.sendMail({
        from: `${config.EMAIL_USER}`, // sender address
        to: email, // list of receivers
        subject: "Usuario y Contraseña 🔒", // Subject line
        text: `Hola, !Bienvenido a  Mundo Mascotas🙌!\n Estos son los datos que vas a utilizar para loggearte en la página:\n usuario: ${user}\n contraseña:${password}` // plain text body
      });
  }
exports.EmailCita=async(email,fecha,hora,token)=>{
  const transporter=createTransporter();
      const info=await transporter.sendMail({
        from: `${config.EMAIL_USER}`, // sender address
        to: email, // list of receivers
        subject: "La fecha de la cita de SPA de su mascota 🐾🐶", // Subject line
        text: `Hola, !Bienvenido a  Mundo Mascotas🙌!\n La cita para su mascota es el día ${fecha} a las   ${hora}.\nEste es el token de acceso para que verifique el estado del baño de su mascota: ${token}` // plain text body
      });
}

