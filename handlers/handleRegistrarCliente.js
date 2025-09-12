import { UsersModel } from "../models/users.js";

export const handleRegistrarCliente = async (req, res) => {
    try {
        const body = await req.body;

        const {
            // documentoCliente,
            // nombresCliente,
            // apellidoPaternoCliente,
            // apellidoMaternoCliente,
            // celularCliente,
            // email,
            // direccion,
            clientes
        } = body;
        console.log("body de register usuario: ", clientes)
        let arr = [];

        const clientesNew = clientes?.map(async (cliente) => {
            const clienteExists = await UsersModel.findOne({ documentoUsuario: cliente?.documentoCliente }).lean().exec();
            if (clienteExists) {
                return res.status(202).json({
                    message: 'Cliente ya existe',
                    messageLarge: 'Ya es cliente',
                    status: 202,
                });
            }
            else {
                const newClient = {
                    //datos de cuenta
                    role: "user cliente",
                    userType: "cliente",
                    password: cliente?.password,
                    statusActive: "1",
                    //datos personales
                    documentoUsuario: cliente?.documentoCliente,
                    nombres: cliente?.nombresCliente,
                    apellidoPaterno: cliente?.apellidoPaternoCliente,
                    apellidoMaterno: cliente?.apellidoMaternoCliente,
                    celular: cliente?.celularCliente,
                    fechaNacimiento: cliente?.fechaNacimiento,
                    direccion: cliente?.direccion,
                    email: cliente?.email,
                    estadoCivil: cliente?.estadoCivil,
                    ocupacion: cliente?.ocupacion,
                    //datos corporativos (si aplica)
                    empresa: cliente?.empresa,
                    ruc: cliente?.ruc,
                    razonSocial: cliente?.razonSocial,
                    rucEmpresa: cliente?.rucEmpresa,
                }

                console.log("clientesNew: ", newClient)
                const userNew = await UsersModel.create(newClient);
                console.log("userNew: ", userNew)
                arr.push(userNew);

            }
            return res.status(201).json({
                error: null,
                data: arr ? arr : [],
                // data: clientes,
                status: 201,
            });

        }); // Devuelve el documento actualizado        

        // const user = await UsersModel.findOne({ documentoUsuario: documentoUsuario }).lean().exec();
        // if (user?.role === "user cliente") {
        //     return res.status(202).json({
        //         message: 'cliente ya existe',
        //         messageLarge: 'Ya es cliente',
        //         status: 202,
        //     });
        // }
        // else if (!user) {
        //     const clientNew = {
        //         role: "user cliente",
        //         userType: "cliente",
        //         password: "123",
        //         statusActive: "1",
        //         //datos personales
        //         nombres: nombres,
        //         apellidoPaterno: apellidoPaterno,
        //         apellidoMaterno: apellidoMaterno,
        //         documentoUsuario: documentoUsuario,
        //         direccion: direccion,
        //         email: email,
        //         celular: celular,
        //     }

        //     const userNew = await UsersModel.create(clientNew);

        //     console.log("userNew: ", userNew)

        //     return res.status(201).json({
        //         error: null,
        //         data: userNew,
        //         status: 201,
        //     });
        // }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `"Error desconocido" ${error}` });
    }
}