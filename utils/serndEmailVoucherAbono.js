import nodemailer from 'nodemailer';

export default async function serndEmailVoucherAbono(base64Content, dni, correo, nombre, typeFile, enviar, montoAbono, nvoucher, nroCta, nroCtaCci, titularCta, dateAbono) {
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

    const texto = `Sr. ${nombre}, se le acaba de realizar el abono respectivo de ${montoAbono} a la cuenta bancaria con los siguientes datos:
                        Nro Cuenta: ${nroCta}
                        Nro Cuenta CCI: ${nroCtaCci}
                        Titular: ${titularCta}
                        Monto enviado: ${montoAbono}
                        Fecha y hora de abono: ${new Date(new Date(dateAbono).setHours(new Date(dateAbono).getHours() - 5)).toLocaleString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true })}
    `;
    
    function changeDecimales(numero) {
        // Convertir el número a un formato con 3 decimales
        let numeroConDecimales = Number(numero).toFixed(3); // "101000.000"

        // Separar la parte entera y la parte decimal
        let [parteEntera, parteDecimal] = numeroConDecimales.split('.');

        // Agregar el separador de miles (') a la parte entera
        parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Unir la parte entera y la parte decimal con un punto
        let numeroFormateado = `${parteEntera}.${parteDecimal}`;

        console.log(numeroFormateado); // Salida: "101'000.000"

        return numeroFormateado;
    }

    const mailOptions = {
        from: process.env.GMAIL_USUARIO_PROD,
        to: [correo, process.env.GMAIL_USUARIO_PROD, "diegoespinozareyna@gmail.com", "jesusgonzales279@gmail.com"],
        // cc: correoCliente,
        subject: `Comprobante ABONO nro: ${nvoucher}`,
        text: `${texto}`,
        attachments: [
            {
                filename: `imagen.${typeFile}`, // Nombre del archivo adjunto
                content: base64Content, // Usamos solo la cadena Base64 pura
                encoding: "base64", // Asegúrate de usar la codificación base64
            },
        ]
    }
    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log(info)
}
