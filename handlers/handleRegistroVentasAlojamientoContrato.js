import { returnVentasAlojamientos } from "../functions/returnVentasAlojamientos.js";
import Planilla from "../models/planilla.js";

export const handleRegistroVentasAlojamientoContrato = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de registroVentasAlojamientoContrato: ", body)

        const ventasAlojaminetoContrato = await returnVentasAlojamientos(body.contrato);

        const patchContrato = await Planilla.findOneAndUpdate(
            { numero: body.contrato },
            {
                $set: {
                    consumoAlojamiento: ventasAlojaminetoContrato,
                }
            },
            { new: true }
        );

        console.log("patchContrato: ", patchContrato)

        res.status(201).json({
            message: 'ventaAlojamiento Registrada',
            data: patchContrato, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}