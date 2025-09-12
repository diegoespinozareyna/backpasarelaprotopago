import Producto from "../models/producto.js";


export const handleEditarStockProductoBazar = async (req, res) => {
    const { nombreProducto, tipoOperacion, cantidad } = req.body;
    console.log("body de editarStockProductoBazar: ", nombreProducto, tipoOperacion, cantidad)

    try {
        if (!nombreProducto || !tipoOperacion || !cantidad) {
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
        }

        if (cantidad <= 0) {
            return res.status(400).json({ message: 'Cantidad debe ser mayor que cero.' });
        }

        const ajuste = (tipoOperacion === "1" || tipoOperacion === "0") ? -(cantidad) : (cantidad);
        console.log("ajuste: ", ajuste)

        const query = {
            nombreProducto: nombreProducto,
            ...(ajuste < 0 && { stock: { $gte: cantidad } }), // ✅ validación solo si es venta
        };
        console.log("query: ", query)

        const producto = await Producto.findOneAndUpdate(
            query,
            { $inc: { stock: ajuste } },
            { new: true }
        );

        if (!producto) {
            return res.status(404).json({ message: 'Stock insuficiente. Revise la cantidad de prodcuto que desea vender!!' });
        }

        res.status(201).json({
            message: 'Habitacion actualizada',
            data: producto, // Datos del usuario decodificados del token
            status: 201,
        });

    } catch (error) {
        console.error("Error actualizando stock:", error.message);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}