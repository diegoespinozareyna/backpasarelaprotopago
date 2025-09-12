import Producto from "../models/producto.js";

export const handleGetProcutosBazarTotales = async (req, res) => {
    try {
        const productosTotales = await Producto.find().exec();

        return res.status(200).json({
            message: "productos obtenmidos desde la base de datos",
            data: productosTotales,
            status: 200,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}