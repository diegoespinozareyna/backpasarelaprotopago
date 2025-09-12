import Planilla from "../models/planilla.js";

export const handleRegistroVentasVueltoContrato = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de registroVentasVueltorContrato: ", body)

        const patchContrato = await Planilla.findOneAndUpdate(
            { numero: body.contrato },
            {
                $set: {
                    consumoVuelto: {
                        total: body.total,
                        porCobrar: body.porCobrar,
                    },
                }
            },
            { new: true }
        );

        console.log("patchContrato: ", patchContrato)

        res.status(201).json({
            message: 'ventaBazar Registrada',
            data: patchContrato, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}