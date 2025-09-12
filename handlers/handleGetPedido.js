import moment from "moment-timezone";
import Pedidos from "../models/pedidos.js";

export const handleGetPedido = async (req, res) => {
    try {
        const id = req.query.id

        console.log("id: ", id)

        const filtro = id;

        console.log("filtro de pedidosSemana: ", filtro);

        const pedidoUnique = await Pedidos.findById(filtro).exec();

        return res.status(201).json({
            message: "pedidos obtenmidos desde la base de datos",
            data: pedidoUnique,
            status: 201,
        });
    } catch (error) {
        console.error('Error al buscar pedidos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}