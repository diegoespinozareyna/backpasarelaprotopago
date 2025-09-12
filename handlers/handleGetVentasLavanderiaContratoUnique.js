import VentaLavanderia from "../models/ventaLavanderia.js";

export const handleGetVentasLavanderiaContratoUnique = async (req, res) => {
    try {
        const { numeroContrato } = req.query;
        console.log("entre a getVentasLavanderiaContratoUnique")

        const filtro = {};

        if (numeroContrato) {
            filtro.contrato = numeroContrato;
        }

        console.log("filtro de getVentasLavanderiaContratoUnique: ", filtro);

        const getVentasLavanderiaContratoUnique = await VentaLavanderia.find(filtro).exec();

        res.status(201).json({
            message: 'Estos son los datos de la venta bazar de dicho contrato',
            data: getVentasLavanderiaContratoUnique, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getVentasLavanderiaContratoUnique:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}