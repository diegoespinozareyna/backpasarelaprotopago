import moment from "moment-timezone";
import Planilla from "../models/planilla.js";

export const handleGetContratosPlanilla = async (req, res) => {
    try {
        console.log("entre a getContratos")
        const { fechaInicio, fechaFin, statusFiltro, numeroContrato } = req.query;
        console.log("query de getContratos: ", req.query);

        const filtro = { status: statusFiltro, numero: numeroContrato };

        if (fechaInicio && fechaFin) {
            const fechaInicioString = moment.tz(fechaInicio, "DD/MM/YYYY HH:mm", "America/Lima").format();
            const fechaFinString = moment.tz(fechaFin, "DD/MM/YYYY HH:mm", "America/Lima").format();

            filtro.fechaInicio = {
                $gte: fechaInicioString,
                $lte: fechaFinString,
            };

            if (statusFiltro === "3" || statusFiltro === undefined || statusFiltro === null || statusFiltro === "") {
                delete filtro.status; // Eliminar el filtro de status si es 2
            }

            if (numeroContrato === "" || numeroContrato === undefined || numeroContrato === null) {
                delete filtro.numero;
            }
            else {
                delete filtro.fechaInicio;
                delete filtro.status;
            }

        }

        console.log("filtro de getContratos: ", filtro);

        const getContractsPlanillaFiltro = await Planilla.find(filtro).exec();

        res.status(201).json({
            message: 'Estos son los datos del usuario con token okay',
            data: getContractsPlanillaFiltro, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}