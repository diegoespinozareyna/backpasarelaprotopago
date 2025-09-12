import Caja from "../models/caja.js";

export const handleGetCuadreCajaPorFecha = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        console.log("entre a getCuadreCajaPorFecha")

        const filtro = {};

        if (fechaInicio && fechaFin) {

            const fechaInicioString = moment.tz(req.query.fechaInicio, "DD/MM/YYYY HH:mm", "America/Lima").format("YYYY-MM-DDTHH:mm:ss");
            const fechaFinString = moment.tz(req.query.fechaFin, "DD/MM/YYYY HH:mm", "America/Lima").format("YYYY-MM-DDTHH:mm:ss");

            filtro.fecha = {
                $gte: fechaInicioString,
                $lte: fechaFinString,
            };
        }

        console.log("filtro de getCuadreCajaPorFecha: ", filtro);

        const getCuadreCajaPorFecha = await Caja.find(filtro).exec();

        res.status(201).json({
            message: 'Estos son los datos de la caja',
            data: getCuadreCajaPorFecha, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getCuadreCajaPorFecha:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}