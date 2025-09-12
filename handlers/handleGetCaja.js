import moment from "moment-timezone";
import Caja from "../models/caja.js";
import VentaVuelto from "../models/ventaVuelto.js";

export const handleGetCaja = async (req, res) => {
    try {
        console.log("entre a getCaja")
        const { fechaInicio, fechaFin } = req.query;
        console.log("query de getCaja: ", req.query);

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

        const getCaja = await Caja.find(filtro).exec();

        const getVueltosTotales = await VentaVuelto.find().exec();
        const sumVueltos = getVueltosTotales?.filter(x => x.status == "0")?.reduce((acum, item) => acum + Number(item?.precioVenta), 0);

        res.status(201).json({
            message: 'Estos son los datos de la caja',
            data: getCaja,
            dataVueltos: sumVueltos, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getcaja:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}