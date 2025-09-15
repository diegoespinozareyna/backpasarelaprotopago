import axios from "axios";

export const handleReceptionPayProntopago = async (req, res) => {
    try {
        const body = req.body;
        console.log("body: ", body)

        const optionsBody = JSON.stringify(body)

        const response = await axios.post(
            "https://apipozosanto.inmobackend.site/api/auth/receptionPayProntopaga",
            optionsBody,
            {
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                },
                validateStatus: () => true, // <- para capturar también errores 4xx/5xx
            }
        );

        console.log("Respuesta cruda:", response.data);

        return res.status(201).json({
            message: "prespuesta pp correcta",
            data: response.data,
            dataCruda: response,
            body: body,
            status: 201,
        });

    } catch (error) {
        console.error("Error al insertar url de pago:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};