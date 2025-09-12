import VentaAlojamiento from "../models/ventaAlojamiento.js";

export const handleGetVentasAlojamientoContratoUnique = async (req, res) => {
    try {
        const { numeroContrato } = req.query;
        console.log("entre a getVentasAlojamientoContratoUnique")

        const filtro = {};

        if (numeroContrato) {
            filtro.contrato = numeroContrato;
        }

        console.log("filtro de getVentasAlojamientoContratoUnique: ", filtro);

        const getVentasAlojamientoContratoUnique = await VentaAlojamiento.find(filtro).exec();

        res.status(201).json({
            message: 'Estos son los datos de la venta bazar de dicho contrato',
            data: getVentasAlojamientoContratoUnique, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getVentasAlojamientoContratoUnique:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}