import Planilla from "../models/planilla.js";

export const handleRegistroContrato = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de registroContrato: ", body)

        const oneContract = await Planilla.find({ numero: body.numero }).exec();
        console.log("oneContract: ", oneContract)

        if (oneContract.length === 0) {
            const newContract = await Planilla.create(body);

            console.log("newContract: ", newContract)
            return res.status(201).json({
                message: 'Contrato Creado con exito',
                data: body, // Datos del usuario decodificados del token
                status: 201,
            });

        }
        else {
            res.status(400).json({
                message: 'Número de contrato ya existe, debe colocar el número de contrato correcto',
                data: "body", // Datos del usuario decodificados del token
                status: 400,
            });
        }

    } catch (error) {
        console.log(error)
    }
}