// import Habitacion from "../models/habitaciones.js";
import Planilla from "../models/planilla.js";

export const handleContratoUnico = async (req, res) => {
    try {
        console.log("entre a getContratoUnico")
        const query = req.query;
        console.log("body de getContratoUnico: ", query)

        const getContratoUnico = await Planilla.find({ numero: query?.numeroContrato }).exec();

        console.log("getContratoUnico: ", getContratoUnico)

        res.status(201).json({
            message: 'Estos son los datos del usuario con token okay',
            data: getContratoUnico, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}