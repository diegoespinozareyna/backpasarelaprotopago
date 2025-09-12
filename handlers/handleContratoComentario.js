import Planilla from "../models/planilla.js";

export const handleContratoComentario = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de editarContrato: ", body)

        const editarContrato = await Planilla.updateOne(
            { numero: body?.numeroContrato },
            {
                $set: {
                    comentario: body?.comentario,
                }
            },
            { new: true }
        );

        console.log("newContract: ", editarContrato)

        res.status(201).json({
            message: 'Contato editado',
            data: editarContrato, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}