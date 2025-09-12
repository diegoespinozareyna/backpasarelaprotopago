import VentaBazar from "../models/ventaBazar.js";

export const handleGetVentasBazarContratoUnique = async (req, res) => {
    try {
        const { numeroContrato } = req.query;
        console.log("entre a getVentasBazarContratoUnique")

        const filtro = {};

        if (numeroContrato) {
            filtro.contrato = numeroContrato;
        }

        console.log("filtro de getVentasBazarContratoUnique: ", filtro);

        const getVentasBazarContratoUnique = await VentaBazar.find(filtro).exec();

        res.status(201).json({
            message: 'Estos son los datos de la venta bazar de dicho contrato',
            data: getVentasBazarContratoUnique, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getVentasBazarContratoUnique:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}