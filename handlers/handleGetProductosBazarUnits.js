import Producto from "../models/producto.js";

export const handleGetProductosBazarUnits = async (req, res) => {
    try {
        const query = req.query.query || '';
        console.log('query: ', query);

        const productos = await Producto.find({
            nombreProducto: { $regex: query, $options: 'i' }, // insensitive search
        }).limit(10); // Limitar a 10 resultados

        return res.status(201).json({
            message: "productos obtenmidos desde la base de datos",
            data: productos,
            status: 201,
        });
    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}