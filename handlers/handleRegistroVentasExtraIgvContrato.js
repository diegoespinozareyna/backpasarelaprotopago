import Planilla from "../models/planilla.js";

export const handleRegistroVentasExtraIgvContrato = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de registroVentasExtraIgvContrato: ", body)

        const patchContrato = await Planilla.findOneAndUpdate(
            { numero: body.contrato },
            {
                $set: {
                    consumoExtraIgv: {
                        total: body.total,
                        porCobrar: body.porCobrar,
                    },
                }
            },
            { new: true }
        );

        console.log("patchContrato: ", patchContrato)

        res.status(201).json({
            message: 'ventaExtraIgv Registrada',
            data: patchContrato, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}