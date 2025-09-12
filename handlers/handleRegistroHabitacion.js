import Habitacion from "../models/habitaciones.js";

export const handleRegistroHabitacion = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de registroHabitacion: ", body)

        const hab = await Habitacion.find({ numeroHabitacion: body.numeroHabitacion }).exec();
        console.log("hab: ", hab)

        // const pushHistorial = await Habitacion.findOneAndUpdate(
        //     { numeroHabitacion: body.numeroHabitacion },
        //     { $push: { historialContratos: body?.historialContratos } },
        //     { new: true }
        // );
        const changeState = await Habitacion.findOneAndUpdate(
            { numeroHabitacion: body.numeroHabitacion },
            { $set: { estado: body.estado } },
            { new: true }
        );

        console.log("changeState: ", changeState)

        res.status(201).json({
            message: 'Habitacion Registrada',
            data: changeState, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}