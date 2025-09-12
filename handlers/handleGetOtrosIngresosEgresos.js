import moment from "moment-timezone";
import VentaIngresosEgresos from "../models/ventaIngresosEgresos.js";

export const handleGetOtrosIngresosEgresos = async (req, res) => {
    try {
        console.log("entre a ingresosegresosexternos")
        const { fechaInicio, fechaFin } = req.query;
        console.log("query de ingresosegresosexternos: ", req.query);

        const filtro = {};

        if (fechaInicio && fechaFin) {

            const fechaInicioString = moment.tz(req.query.fechaInicio, "DD/MM/YYYY HH:mm", "America/Lima").format("YYYY-MM-DDTHH:mm:ss");
            const fechaFinString = moment.tz(req.query.fechaFin, "DD/MM/YYYY HH:mm", "America/Lima").format("YYYY-MM-DDTHH:mm:ss");

            filtro.fecha = {
                $gte: fechaInicioString,
                $lte: fechaFinString,
            };
        }

        console.log("filtro de getCaja: ", filtro);

        const getCaja = await VentaIngresosEgresos.find(filtro).exec();

        res.status(201).json({
            message: 'Estos son los datos de la caja',
            data: getCaja, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getcaja:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}