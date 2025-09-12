import Planilla from "../models/planilla.js";

export const handleEditarIngresosEgresosCaja = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de editarIngresosEgresosCaja: ", body)

        const contractOne = await Planilla.findOne({ numero: body?.numero }).exec();
        console.log("contractOne: ", contractOne)

        const editarIngresosEgresosCaja = await Planilla.findOneAndUpdate(
            { numero: body?.numero },
            {
                $set: {
                    caja: {
                        ...contractOne?.caja,
                        [body.key]: body?.ingresosEgresosCaja,
                    },
                }
            },
            { new: true }
        );

        console.log("editarIngresosEgresosCaja: ", editarIngresosEgresosCaja)

        res.status(201).json({
            message: 'Caja actualizada',
            data: editarIngresosEgresosCaja, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}