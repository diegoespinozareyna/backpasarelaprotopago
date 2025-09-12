import Caja from "../models/caja.js";

export const handleIngresosEgresosCajaReal = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de ingresosEgresosCajaReal: ", body)

        const ingresosEgresosCajaReal = await Caja.create(body);

        console.log("ingresosEgresosCajaReal: ", ingresosEgresosCajaReal)

        res.status(201).json({
            message: 'Caja actualizada',
            data: ingresosEgresosCajaReal, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}