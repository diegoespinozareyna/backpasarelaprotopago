import { UsersModel } from "../models/users.js";

export const handleGetAllUsuarios = async (req, res) => {
    try {
        const params = req.query;

        console.log("🔍 Buscando en la base de datos usuarios...");
        const usuarios = await UsersModel.find().exec();

        if (!usuarios || usuarios.length === 0) {
            return res.status(404).json({ message: "No se encontraron usuarios" });
        }

        return res.status(201).json({
            message: "usuarios obtenidas desde la base de datos",
            data: usuarios,
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}