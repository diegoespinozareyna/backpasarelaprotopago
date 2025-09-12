import CajaGeneral from "../models/cajageneral.js";

export const handleEditarIngresosEgresosCajaGeneral = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de editarIngresosEgresosCajaGeneral: ", body)

        const cajaGeneraltOne = await CajaGeneral.findOne({ proyecto: body?.proyecto }).exec();
        console.log("editarIngresosEgresosCajaGeneral: ", contractOne)

        const editarIngresosEgresosCajaGeneral = await CajaGeneral.findOneAndUpdate(
            { numero: body?.numero },
            {
                $set: {
                    ingresos: {
                        ...cajaGeneraltOne?.ingresos,
                        [body.key]: body?.ingresosEgresosCaja,
                    },
                }
            },
            { new: true }
        );

        console.log("editarIngresosEgresosCajaGeneral: ", editarIngresosEgresosCajaGeneral)

        res.status(201).json({
            message: 'Caja actualizada',
            data: editarIngresosEgresosCajaGeneral, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}