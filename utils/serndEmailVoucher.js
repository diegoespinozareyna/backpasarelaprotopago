import nodemailer from 'nodemailer';

export default async function serndEmailVoucher(base64Content, dni, correo, nombre, typeFile, enviar, recibir, nvoucher, fecha) {
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

    function changeDecimales(numero) {
        console.log("nuemnro", numero)
        // Convertir el número a un formato con 3 decimales
        let numeroConDecimales = Number(numero).toFixed(3); // "101000.000"

        // Separar la parte entera y la parte decimal
        let [parteEntera, parteDecimal] = numeroConDecimales.split('.');

        // Agregar el separador de miles (') a la parte entera
        parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Unir la parte entera y la parte decimal con un punto
        let numeroFormateado = `${parteEntera}.${parteDecimal}`;

        console.log("formateado", numeroFormateado); // Salida: "101'000.000"

        return numeroFormateado;
    }

    const texto = `Se envió un comprobante con los siguientes datos:
                        DNI: ${dni}
                        Usuario: ${nombre}
                        Número de comprobante: ${nvoucher}
                        Monto enviado: ${enviar}
                        Fecha y hora de depósito: ${(new Date(new Date().setHours(new Date().getHours() - 5)).toLocaleString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).replace(",", "") + " hrs")}

    `;

    const mailOptions = {
        from: process.env.GMAIL_USUARIO_PROD,
        to: [process.env.GMAIL_USUARIO_PROD, "diegoespinozareyna@gmail.com", "jesusgonzales279@gmail.com"],
        // cc: correoCliente,
        subject: `Comprobante nro: ${nvoucher}`,
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
