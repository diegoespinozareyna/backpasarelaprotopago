import Planilla from "../models/planilla.js";

export const handleGetContratosClientes = async (req, res) => {
    try {
        const { documentoCliente, nombreCliente } = req.query;
        console.log("Número de contrato recibido: ", documentoCliente);

        if (documentoCliente === "") return res.status(200).json({
            message: 'Contratos obtenidos correctamente',
            data: [],
            status: 200,
        });

        const contratosClientes = await Planilla.find({
            "clientes.documentoCliente": documentoCliente
        });

        res.status(200).json({
            message: 'Contratos obtenidos correctamente',
            data: contratosClientes,
            status: 200,
        });
    } catch (error) {
        console.error("Error al obtener contratos: ", error);
        res.status(500).json({
            message: 'Error interno del servidor',
            status: 500,
        });
    }
}