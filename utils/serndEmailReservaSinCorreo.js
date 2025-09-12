import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'

export default async function serndEmailReservaSinCorreo(base64Content, documentoCliente, emailCliente, nombresCliente, typeFileVoucher, codLote, proyecto, payType, fileType, amount, nOperacion, fechaOperacion, usuarioAcount, correoUsuario, statusLote, metros, precioSoles) {
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
        subject: `Lote ${codLote} ${statusLote} con éxito`,
        text: `
        Proyecto: ${proyecto}
        documento de cliente: ${documentoCliente}
        nombre de cliente: ${nombresCliente}
        fecha de pago: ${fechaOperacion}
        Precio Lote: ${precioSoles}
        Área Lote: ${metros}
        Usuario que registró: ${usuarioAcount}
        `,
    }
    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log("aqui llegue2", info)

    console.log(info)
}
