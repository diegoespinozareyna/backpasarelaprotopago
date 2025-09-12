import moment from "moment-timezone";
import VentaBazar from "../models/ventaBazar.js";

export const handleGetVentasBazarPorFecha = async (req, res) => {
    try {
        console.log("entre a bazarporfecha")
        const { fechaInicio, fechaFin, statusFiltro } = req.query;
        console.log("query de bazarporfecha: ", req.query);

        const filtro = { status: statusFiltro };

        if (fechaInicio && fechaFin) {

            const fechaInicioString = moment.tz(req.query.fechaInicio, "DD/MM/YYYY HH:mm", "America/Lima").format("YYYY-MM-DDTHH:mm:ss");
            const fechaFinString = moment.tz(req.query.fechaFin, "DD/MM/YYYY HH:mm", "America/Lima").format("YYYY-MM-DDTHH:mm:ss");

            filtro.fecha = {
                $gte: fechaInicioString,
                $lte: fechaFinString,
            };

            if (statusFiltro === "3" || statusFiltro === undefined || statusFiltro === null || statusFiltro === "") {
                delete filtro.status; // Eliminar el filtro de status si es 2
            }
        }

        console.log("filtro de getbazar: ", filtro);

        const getBazar = await VentaBazar.find(filtro).exec();

        res.status(201).json({
            message: 'Estos son los datos de la caja',
            data: getBazar, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getVentasBazarContratoUnique:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}