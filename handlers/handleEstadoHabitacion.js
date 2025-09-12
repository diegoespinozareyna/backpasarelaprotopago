import Habitacion from "../models/habitaciones.js";

export const handleEstadoHabitacion = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de esitarHabitacion: ", body)

        const esitarHabitacion = await Habitacion.updateOne(
            { numeroHabitacion: body.numero },
            {
                $set: {
                    estado: body.status,
                    piso: body?.piso,
                    tipoHabitacion: body?.tipoHabitacion,
                    capacidad: body?.capacidad,
                    precioBase: body?.precioBase,
                    amenidades: body?.amenidades,
                    descripcion: body?.descripcion,
                    tipoRetiro: body?.tipoRetiro,
                }
            },
        );

        console.log("esitarHabitacion: ", esitarHabitacion)

        res.status(201).json({
            message: 'Habitacion actualizada',
            data: esitarHabitacion, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}