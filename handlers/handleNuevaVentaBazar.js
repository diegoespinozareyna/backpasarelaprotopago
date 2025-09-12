import VentaBazar from "../models/ventaBazar.js";

export const handleNuevaVentaBazar = async (req, res) => {
    try {
        const body = await req.body;
        console.log("entre a handleNuevaVentaBazar", body)

        const { nombreProducto, cantidad, precioUnitario, precioVenta, medioPago, fecha, contrato, habitacion, comentario, usuarioRegistro, proyecto, status, prevStatus } = body;

        if (nombreProducto === undefined || nombreProducto === null || nombreProducto === "" ||
            cantidad === undefined || cantidad === null || cantidad === "" ||
            precioUnitario === undefined || precioUnitario === null || precioUnitario === "" ||
            precioVenta === undefined || precioVenta === null || precioVenta === "" ||
            medioPago === undefined || medioPago === null || medioPago === "") {
            res.status(400).json({
                message: 'Debe llenar todos los campos del producto',
                messageLarge: 'Todos los campos del producto son obligatorios',
                data: null, // Datos del usuario decodificados del token
                status: 400,
            });
        }
        else {
            if (prevStatus == "0") {
                console.log("STATUS PENDIENTE", body)

                const acctions = await VentaBazar.findByIdAndUpdate(body.id, { $set: { status: status, medioPago: medioPago } }).exec();
                console.log("acctions: ", acctions)

                if (acctions) {
                    res.status(201).json({
                        message: 'Estos son los datos de la nueva venta bazar',
                        data: acctions, // Datos del usuario decodificados del token
                        status: 201,
                    });
                }
                else {
                    res.status(400).json({
                        message: 'Error al actualizar la venta',
                        data: null, // Datos del usuario decodificados del token
                        status: 400,
                    });
                }
            }
            else if (prevStatus == "1") {
                console.log("STATUS PAGADO", body)
                const acctions = await VentaBazar.findByIdAndUpdate(body.id, { $set: { status: status, medioPago: medioPago } }).exec();
                console.log("acctions: ", acctions)

                if (acctions) {
                    res.status(201).json({
                        message: 'Estos son los datos de la nueva venta bazar',
                        data: acctions, // Datos del usuario decodificados del token
                        status: 201,
                    });
                }
                else {
                    res.status(400).json({
                        message: 'Error al actualizar la venta',
                        data: null, // Datos del usuario decodificados del token
                        status: 400,
                    });
                }
            }
            else if (prevStatus == "2") {
                console.log("STATUS ANULADO", body)
                res.status(201).json({
                    message: 'Estos son los datos de la nueva venta bazar',
                    data: "ANULADO", // Datos del usuario decodificados del token
                    status: 201,
                });
            }
            else {
                console.log("nueva venta registarda con exito", body)
                const addNewVentaBazar = await VentaBazar.create(body);
                res.status(201).json({
                    message: 'Estos son los datos de la nueva venta bazar',
                    data: addNewVentaBazar, // Datos del usuario decodificados del token
                    status: 201,
                });
            }
        }
    }
    catch (error) {
        console.error("❌ Error en handleNuevaVentaBazar:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}