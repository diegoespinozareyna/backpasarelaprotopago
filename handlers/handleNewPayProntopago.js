import axios from "axios";
import crypto from "crypto";

export const handleNewPayProntopago = async (req, res) => {
    try {
        const body = req.body;
        console.log("body: ", body)

        const options = {
            currency: body?.currency,
            country: body?.country,
            amount: body?.amount,
            clientName: body?.clientName,
            clientEmail: body?.clientEmail,
            clientPhone: body?.clientPhone,
            clientDocument: body?.clientDocument,
            paymentMethod: body?.paymentMethod,
            urlConfirmation: body?.urlConfirmation,
            urlFinal: body?.urlFinal,
            urlRejected: body?.urlRejected,
            order: body?.order,
            theme: body?.theme,
        }

        // 👉 Secret key proporcionada por ProntoPaga
        const secretKey = process.env.API_KEY_PRONTOPAGA;

        // 1. Ordenar las keys alfabéticamente
        const keys = Object.keys(options).sort();

        // 2. Concatenar en formato key+value
        let toSign = "";
        keys.forEach((key) => {
            toSign += key + options[key];
        });

        // 3. Firmar con HMAC SHA256
        const sign = crypto
            .createHmac("sha256", secretKey)
            .update(toSign)
            .digest("hex");

        console.log("Cadena a firmar:", toSign);
        console.log("Firma generada:", sign);

        // 👉 Añadir la firma al objeto
        const requestPayload = { ...options, sign };

        console.log("Payload final:", requestPayload);

        const dataSend = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${process.env.TOKEN_PRONTOPAGA}`
            },
            body: JSON.stringify(requestPayload)
        };

        // const responseFinal = await fetch('https://sandbox.prontopaga.com/api/payment/new', dataSend)
        // const data = await responseFinal.json();
        // const text = await responseFinal.text();
        // console.log("Respuesta cruda:", text);
        // console.log("data: ", data)
        // 🚀 Enviar con Axios
        const response = await axios.post(
            "https://sandbox.prontopaga.com/api/payment/new",
            requestPayload,
            {
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization: `Bearer ${process.env.TOKEN_PRONTOPAGA}`,
                },
                validateStatus: () => true, // <- para capturar también errores 4xx/5xx
            }
        );

        console.log("Respuesta cruda:", "response");

        return res.status(201).json({
            message: "prespuesta pp correcta",
            data: response.data,
            body: requestPayload,
            status: 201,
        });

    } catch (error) {
        console.error("Error al insertar url de pago:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};