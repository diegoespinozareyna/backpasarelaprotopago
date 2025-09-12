import Config from "../models/config.js";

export const handlePacthConfig = async (req, res) => {
    try {
        const body = await req.body;

        const { precioKiloHuevos, proyecto } = body;

        console.log("body de pacthConfig: ", body)

        const updatedConfig = await Config.findOneAndUpdate(
            { proyecto },
            {
                precioKiloHuevos,
            },
            { new: true }
        );

        // Respuesta exitosa
        return res.status(201).json({
            message: "Status actualizado correctamente",
            config: updatedConfig,
            status: 201,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el status",
        });
    }
};