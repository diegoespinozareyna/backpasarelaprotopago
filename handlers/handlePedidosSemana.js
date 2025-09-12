import moment from "moment-timezone";
import Pedidos from "../models/pedidos.js";

export const handlePedidosSemana = async (req, res) => {
    try {

        const body = await req.body;

        const {
            fechaInicio,
            fechaFin,
            documentoUsuario,
        } = body;

        console.log('body de pedidos semana: ', body)

        const filtro = { documentoUsuario: documentoUsuario };

        if (fechaInicio && fechaFin) {
            const fechaInicioDate = new Date(moment.tz(fechaInicio, "DD-MM-YYYY", "America/Lima").startOf("day").format());
            const fechaFinDate = new Date(moment.tz(fechaFin, "DD-MM-YYYY", "America/Lima").endOf("day").format());

            filtro.fechaPedido = {
                $gte: fechaInicioDate,
                $lte: fechaFinDate,
            };
        }

        console.log("filtro de pedidosSemana: ", filtro);

        const pedidosSemana = await Pedidos.find(filtro).exec();

        return res.status(201).json({
            message: "pedidos obtenmidos desde la base de datos",
            data: pedidosSemana,
            status: 201,
        });

    }
    catch (error) {
        console.error('Error al buscar pedidos semana:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}