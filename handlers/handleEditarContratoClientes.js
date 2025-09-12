import Planilla from "../models/planilla.js";

export const handleEditarContratoClientes = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de editarContratoClientes: ", body)

        const contractOne = await Planilla.findOne({ numero: body?.prevNumero }).exec();
        console.log("contractOne: ", contractOne)

        const editarContrato = await Planilla.updateOne(
            { numero: body?.numero },
            {
                $set: {
                    clientes: body?.clientes,
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