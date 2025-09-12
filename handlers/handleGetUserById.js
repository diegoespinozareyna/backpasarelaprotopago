import { UsersModel } from "../models/users.js";

export const handleGetUserById = async (req, res) => {
    try {
        const id = req.query.id;

        console.log("id: ", id)

        const filtro = id;

        console.log("filtro de usuarios: ", filtro);

        const usuarios = await UsersModel.findById(filtro).exec();

        return res.status(201).json({
            message: "usuarios obtenidos desde la base de datos",
            data: usuarios,
            status: 201,
        });
    } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}