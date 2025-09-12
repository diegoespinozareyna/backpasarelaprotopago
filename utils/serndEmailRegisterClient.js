import nodemailer from 'nodemailer';

export default async function serndEmailRegisterClient(base64Content, dni, correo, nombre, typeFile, enviar, recibir, nvoucher) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USUARIO_PROD,
            pass: process.env.GMAIL_16DIGITOS_PROD,
        }
    });

    // const link = process.env.APP_URL_PRD;
    const link = "https://testdolar.vercel.app";
    const linkDev = "http://localhost:5173";

    const texto = `Credenciales de acceso:
                     Usuario: ${dni}
                     clave: ${dni}${nombre?.split(".")[0]}
    
    Su comprobante esta en estado de revision, una vez corroborado se le enviara el monto correspondiente al numero de cuenta indicado.
    `;

    const mailOptions = {
        from: process.env.GMAIL_USUARIO_PROD,
        to: [correo],
        // cc: correoCliente,
        subject: `Bienvenido ${nombre?.split(".")[0]}`,
        text: `${texto}`,
        // attachments: [
        //     {
        //         filename: `imagen.${typeFile}`, // Nombre del archivo adjunto
        //         content: base64Content, // Usamos solo la cadena Base64 pura
        //         encoding: "base64", // Asegúrate de usar la codificación base64
        //     },
        // ]
    }
    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log(info)
}
