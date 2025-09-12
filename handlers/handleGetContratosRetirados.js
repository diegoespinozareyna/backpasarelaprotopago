import moment from "moment-timezone";
import Planilla from "../models/planilla.js";

export const handleGetContratosRetirados = async (req, res) => {
    try {
        console.log("entre a getContratosRetirados")
        const { fechaInicio, fechaFin } = req.query;
        console.log("query de getContratosRetirados: ", req.query);

        const filtro = { status: "0" }; // Filtro para contratos retirados

        if (fechaInicio && fechaFin) {
            const fechaInicioString = moment.tz(fechaInicio, "DD/MM/YYYY HH:mm", "America/Lima").format();
            const fechaFinString = moment.tz(fechaFin, "DD/MM/YYYY HH:mm", "America/Lima").format();

            filtro.fechaRetiro = {
                $gte: fechaInicioString,
                $lte: fechaFinString,
            };
        }

        console.log("filtro de getContratosRetirados: ", filtro);

        const getContratosRetirados = await Planilla.find(filtro).exec();

        res.status(201).json({
            message: 'Estos son los contratos retirados',
            data: getContratosRetirados, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}