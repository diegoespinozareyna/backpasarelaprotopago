import VentaExtraIgv from "../models/ventaExtraIgv.js";


export const handleGetVentasExtraIgvContratoUnique = async (req, res) => {
    try {
        const { numeroContrato } = req.query;
        console.log("entre a getVentasExtraIgvContratoUnique")

        const filtro = {};

        if (numeroContrato) {
            filtro.contrato = numeroContrato;
        }

        console.log("filtro de getVentasExtraIgvContratoUnique: ", filtro);

        const getVentasExtraIgvContratoUnique = await VentaExtraIgv.find(filtro).exec();

        res.status(201).json({
            message: 'Estos son los datos de la venta bazar de dicho contrato',
            data: getVentasExtraIgvContratoUnique, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getVentasExtraIgvContratoUnique:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}