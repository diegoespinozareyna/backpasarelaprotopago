import Config from "../models/config.js";

export const handleGetConfig = async (req, res) => {
    try {
        const params = req.query;
        const proyecto = params?.proyecto;

        console.log("params: ", proyecto)

        if (!proyecto) {
            return res.status(400).json({ message: "El parámetro 'proyecto' es obligatorio" });
        }

        // 2️⃣ Si no está en Redis, buscar en la base de datos
        // console.log("🔍 Buscando en la base de datos...");
        const configs = await Config.find({ proyecto }).exec();

        if (!configs || configs.length === 0) {
            return res.status(202).json({
                message: "No se encontraron propiedades",
                data: [],
                status: 202,
            });
        }

        return res.status(201).json({
            message: "Propiedades obtenidas desde la base de datos",
            data: configs,
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}