import VentaVuelto from "../models/ventaVuelto.js";


export const handleGetVentasVueltoContratoUnique = async (req, res) => {
    try {
        const { numeroContrato } = req.query;
        console.log("entre a getVentasVueltoContratoUnique")

        const filtro = {};

        if (numeroContrato) {
            filtro.contrato = numeroContrato;
        }

        console.log("filtro de getVentasVueltoContratoUnique: ", filtro);

        const getVentasVueltoContratoUnique = await VentaVuelto.find(filtro).exec();

        res.status(201).json({
            message: 'Estos son los datos de la venta bazar de dicho contrato',
            data: getVentasVueltoContratoUnique, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getVentasVueltoContratoUnique:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}