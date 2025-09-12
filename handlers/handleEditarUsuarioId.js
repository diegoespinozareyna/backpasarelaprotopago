import { UsersModel } from "../models/users.js";

export const handleEditarUsuarioId = async (req, res) => {
    try {
        const body = await req.body;

        const { id, documentoUsuario, nombres, apellidoPaterno, apellidoMaterno, celular, direccion, distrito, provincia, departamento, membresia500, menbresia200, statusActive, password } = body;

        console.log("body de editarUsuarioId: ", body)

        const updatedUser = await UsersModel.findByIdAndUpdate(
            id,
            {
                documentoUsuario,
                nombres,
                apellidoPaterno,
                apellidoMaterno,
                celular,
                direccion,
                distrito,
                provincia,
                departamento,
                membresia500,
                menbresia200,
                statusActive,
                password,
            },
            { new: true }
        );

        // Respuesta exitosa
        return res.status(201).json({
            message: "Status actualizado correctamente",
            usuario: updatedUser,
            status: 201,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el status",
        });
    }
};