import Planilla from "../models/planilla.js";

export const handleNumeroBoletaFactura = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de numeroBoletaFactura: ", body)

        const numeroBoletaFactura = await Planilla.updateOne(
            { numero: body.numero },
            { $set: { numeroBoletaFactura: body.numeroBoletaFactura } },
        );

        console.log("newContract: ", numeroBoletaFactura)

        res.status(201).json({
            message: 'Numero de boleta factura actualizado',
            data: numeroBoletaFactura, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}