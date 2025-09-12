import Planilla from "../models/planilla.js";

export const handleRetirarContrato = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de retirarContrato: ", body)

        const retirarContract = await Planilla.updateOne(
            { numero: body.numero },
            { $set: { 
                status: body?.status, 
                contrato: body.contrato, 
                fechaRetiro: body.fechaRetiro, 
                salida: body.salida,
                tipoRetiro: body.tipoRetiro,
            } },
        );

        console.log("newContract: ", retirarContract)

        res.status(201).json({
            message: 'Contato retirado',
            data: retirarContract, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}