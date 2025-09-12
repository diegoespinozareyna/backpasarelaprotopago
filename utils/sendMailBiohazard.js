import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'

export default async function sendMailBiohazard(base64Content) {

    try {
        console.log("base64: ", "base64Content")
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USUARIO_PROD,
                pass: process.env.GMAIL_16DIGITOS_PROD,
            }
        });

        const mailOptions = {
            from: process.env.GMAIL_USUARIO_PROD,
            to: ["Telestereo100@gmail.com", process.env.GMAIL_USUARIO_PROD],
            // cc: correoCliente,
            subject: `Cotizacion`,
            text: `
            
            `,
            attachments: [
                {
                    filename: `pdbio.pdf`, // Nombre del archivo adjunto
                    content: base64Content, // Usamos solo la cadena Base64 pura
                    encoding: "base64", // Asegúrate de usar la codificación base64
                },
            ]
        }
        // Enviar el correo
        const info = await transporter.sendMail(mailOptions);
        console.log(info)
    } catch (error) {
        console.log(error)
    }

}
