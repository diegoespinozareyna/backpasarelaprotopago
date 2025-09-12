import Pedidos from "../models/pedidos.js";

export const handleEditarPedido = async (req, res) => {

    const { id,
        cantidadPaquetes,
        kilos,
        precio,
        pagoTotal,
        direccionEntrega,
        distritoEntrega,
        provinciaEntrega,
        departamentoEntrega,
        celularEntrega,
        zona,
    } = req.body;

    try {

        const updatedPedido = await Pedidos.findByIdAndUpdate(
            id,
            {
                cantidadPaquetes,
                kilos,
                precio,
                pagoTotal,
                direccionEntrega,
                distritoEntrega,
                provinciaEntrega,
                departamentoEntrega,
                celularEntrega,
                zona
            },
            { new: true }
        );

        // Respuesta exitosa
        return res.status(201).json({
            message: "Status actualizado correctamente",
            pedido: updatedPedido,
            status: 201,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error al actualizar el pedido" });
    }
};