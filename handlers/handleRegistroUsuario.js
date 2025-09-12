import { UsersModel } from "../models/users.js";

export const handleRegistroUsuario = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de registroUsuario: ", body)

        // const {
        //     documentoUsuario,
        //     nombres,
        //     apellidoPaterno,
        //     apellidoMaterno,
        //     email,
        //     celular,
        //     direccion,
        //     fechaNacimiento,
        //     password,
        //     statusActive,
        //     proyecto,
        //     sedeAdministrador,
        //     emailAsesorInicial,
        //     numeroDocumentoPatrocinador,
        //     nombresPatrocinador,
        //     apellidoPaternoPatrocinador,
        //     apellidoMaternoPatrocinador,
        // } = body;

        console.log("body de registroUsuario: ", body)

        const user = await UsersModel.findOne({ documentoUsuario: body.documentoCliente }).lean().exec();
        if (user) return res.status(406).json({
            message: 'Usuario ya existe',
            messageLarge: 'Lo sentimos, su usuario no existe, verifique y vuleva a intentarlo',
            data: null, // Datos del usuario decodificados del token
            status: 406,
        });

        const newUser = await UsersModel.create(body);

        console.log("newUser: ", newUser)

        return res.status(201).json({
            error: null,
            data: newUser,
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}