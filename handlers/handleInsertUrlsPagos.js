import Pedidos from "../models/pedidos.js";

export const handleInsertUrlsPagos = async (req, res) => {
    try {
        const body = req.body;
        const { id, urlPago } = body;

        if (!id || !urlPago) {
            return res.status(400).json({ message: "ID y urlPago son requeridos" });
        }

        // Agregar urlPago al array urlsPago sin sobrescribir los existentes
        const updatedPedido = await Pedidos.findByIdAndUpdate(
            id,
            {
                $push: { urlsPago: urlPago }
            },
            { new: true }
        );

        if (!updatedPedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        return res.status(201).json({
            message: "URL de pago agregada correctamente",
            pedido: updatedPedido,
            status: 201,
        });
    } catch (error) {
        console.error("Error al insertar url de pago:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};