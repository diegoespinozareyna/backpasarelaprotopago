import moment from "moment-timezone";
import Pedidos from "../models/pedidos.js";

export const handleGetPedidos = async (req, res) => {
    try {
        const documentoUsuario = req.query.documentoUsuario || '';
        const fechaInicio = req.query.fechaInicio || '';
        const fechaFin = req.query.fechaFin || '';
        const status = req.query.statusFiltro || '';

        console.log("documentoUsuario: ", documentoUsuario)
        console.log("fechaInicio: ", fechaInicio)
        console.log("fechaFin: ", fechaFin)
        console.log("status: ", status)

        const filtro = { documentoUsuario: documentoUsuario, status: status };

        if (fechaInicio && fechaFin) {
            const fechaInicioDate = new Date(moment.tz(fechaInicio, "DD-MM-YYYY", "").startOf("day").format());
            const fechaFinDate = new Date(moment.tz(fechaFin, "DD-MM-YYYY", "").endOf("day").format());

            filtro.fechaPedido = {
                $gte: fechaInicioDate,
                $lte: fechaFinDate,
            };

            if (documentoUsuario === "") {
                delete filtro.documentoUsuario; // Eliminar el filtro de status si es 2
            }

            if (status === "") {
                delete filtro.status; // Eliminar el filtro de status si es 2
            }

        }

        console.log("filtro de pedidosSemana: ", filtro);

        const pedidosSemana = await Pedidos.find(filtro).exec();

        // const pedidos = await Pedidos.find({
        //     documentoUsuario: documentoUsuario, // insensitive search
        // }); // Limitar a 10 resultados

        return res.status(201).json({
            message: "pedidos obtenmidos desde la base de datos",
            data: pedidosSemana,
            status: 201,
        });
    } catch (error) {
        console.error('Error al buscar pedidos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}