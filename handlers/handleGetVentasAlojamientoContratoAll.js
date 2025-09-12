import moment from "moment-timezone";
import VentaAlojamiento from "../models/ventaAlojamiento.js";
import VentaBazar from "../models/ventaBazar.js";
import VentaLavanderia from "../models/ventaLavanderia.js";

export const handleGetVentasAlojamientoContratoAll = async (req, res) => {
    try {
        console.log("entre a getVentasAlojamientoContratoAll")

        // Crear fecha desde la cual filtrar (25 junio 2025 a las 05:00 AM hora Lima)
        const fechaDesde = moment.tz("2025-06-24 05:00", "America/Lima").format("YYYY-MM-DDTHH:mm");

        // Filtros
        const filtroAlojamiento = { status: "0", fechaInicio: { $gte: fechaDesde } };
        const filtroBazarLavanderia = { status: "0", fecha: { $gte: fechaDesde } };

        const getVentasAlojamientoContratoAll = await VentaAlojamiento.find(filtroAlojamiento).exec();
        const getVentasAlojamientoContratoAll2 = await VentaBazar.find(filtroBazarLavanderia).exec();
        const getVentasAlojamientoContratoAll3 = await VentaLavanderia.find(filtroBazarLavanderia).exec();

        res.status(201).json({
            message: 'Estos son los datos de la venta bazar de dicho contrato',
            data: getVentasAlojamientoContratoAll, // Datos del usuario decodificados del token
            data2: getVentasAlojamientoContratoAll2, // Datos del usuario decodificados del token
            data3: getVentasAlojamientoContratoAll3, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getVentasAlojamientoContratoAll:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}