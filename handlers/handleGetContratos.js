import Planilla from "../models/planilla.js";

export const handleGetContratos = async (req, res) => {
    try {
        console.log("entre a getContratos")
        // const body = await req.body;
        // console.log("body de getContratos: ", body)

        const getContracts = await Planilla.find({ status: "1" }).exec();

        // console.log("newContract: ", getContracts)

        res.status(201).json({
            message: 'Estos son los datos del usuario con token okay',
            data: getContracts, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}