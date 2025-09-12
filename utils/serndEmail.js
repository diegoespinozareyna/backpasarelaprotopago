import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'

export default async function serndEmail(base64Content, documentoCliente, emailCliente, nombresCliente, typeFileVoucher, codLote, proyecto, payType, fileType, amount, nOperacion, fechaOperacion, usuario, correoUsuario) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USUARIO_PROD,
            pass: process.env.GMAIL_16DIGITOS_PROD,
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USUARIO_PROD,
        to: ["diegoespinozareyna@gmail.com", process.env.GMAIL_USUARIO_PROD, emailCliente, correoUsuario, "jesusgonzales279@gmail.com", "sistemas@consorciomuñoz.com"],
        // cc: correoCliente,
        subject: `Pago - ${nOperacion} - ${codLote} - ${documentoCliente} - ${nombresCliente} - ${fechaOperacion}`,
        text: `
        Proyecto: ${proyecto}
        Número Operacion: ${nOperacion}
        Voucher de pago de lote: ${codLote}
        documento de cliente: ${documentoCliente}
        nombre de cliente: ${nombresCliente}
        fecha de pago: ${fechaOperacion}
        Concepto de pago: ${fileType}
        Medio de pago: ${payType}
        Monto de pago: ${amount}
        Usuario que subió: ${usuario}
        `,
        attachments: [
            {
                filename: `imagen.${typeFileVoucher}`, // Nombre del archivo adjunto
                content: base64Content, // Usamos solo la cadena Base64 pura
                encoding: "base64", // Asegúrate de usar la codificación base64
            },
        ]
    }
    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log("entre correo directo final", info.response)

    return info
}
