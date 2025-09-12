import Planilla from "../models/planilla.js";

export const handleEditarConsumosVarios = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de editarConsumosVarios: ", body)

        const contractOne = await Planilla.findOne({ numero: body?.numero }).exec();
        console.log("contractOne: ", contractOne)

        const consumosVarios = await Planilla.findOneAndUpdate(
            { numero: body?.numero },
            {
                $set: {
                    consumo: {
                        ...contractOne?.consumo,
                        [body.key]: body?.consumosVarios,
                    },
                }
            },
            { new: true }
        );

        console.log("editarConsumosVarios: ", consumosVarios)

        res.status(201).json({
            message: 'Consumo actualizado',
            data: consumosVarios, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}