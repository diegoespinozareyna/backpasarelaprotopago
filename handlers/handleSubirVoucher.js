import { PagosModel } from "../models/pagos.js";

export const handleSubirVoucher = async (req, res) => {
    try {
        const body = await req.body;

        console.log("body de subirVoucher: ", body)

        const newPay = await PagosModel.create(body);

        res.status(201).json({
            message: 'Pago subido exitosamente.',
            data: newPay, // Datos del usuario decodificados del token
            status: 201,
        });

    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
};