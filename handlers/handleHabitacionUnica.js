import Habitacion from "../models/habitaciones.js";

export const handleHabitacionUnica = async (req, res) => {
    try {
        console.log("entre a getHabitacionUnica")
        const query = req.query;
        console.log("body de getHabitacionUnica: ", query)

        const getHabitacionUnica = await Habitacion.find({ numeroHabitacion: query?.numeroHabitacion }).exec();

        console.log("getHabitacionUnica: ", getHabitacionUnica)

        res.status(201).json({
            message: 'Estos son los datos del usuario con token okay',
            data: getHabitacionUnica, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}