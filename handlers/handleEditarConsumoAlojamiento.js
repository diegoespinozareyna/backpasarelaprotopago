import Planilla from "../models/planilla.js";

export const handleEditarConsumoAlojamiento = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de editarConsumoAlojamiento: ", body)

        const contractOne = await Planilla.findOne({ numero: body?.numero }).exec();
        console.log("contractOne: ", contractOne)

        const consumoAlojamiento = await Planilla.findOneAndUpdate(
            { numero: body?.numero },
            {
                $set: {
                    consumo: {
                        ...contractOne?.consumo,
                        alojamiento: body?.consumoAlojamiento,
                    },
                }
            },
            { new: true }
        );

        console.log("consumoAlojamiento: ", consumoAlojamiento)

        res.status(201).json({
            message: 'Consumo de alojamiento actualizado',
            data: consumoAlojamiento, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}