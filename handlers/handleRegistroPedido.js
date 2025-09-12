import Pedidos from "../models/pedidos.js";

export const handleRegistroPedido = async (req, res) => {
    try {
        const body = await req.body;

        const {
            fechaPedido,
            fechaEntregaPedido,
            cantidadPaquetes,
            kilos,
            precioSemanal,
            medioPago,
            precio,
            lugarEntrega,
            direccionEntrega,
            pagoTotal,
            documentoUsuario,
            nombresUsuario,
            apellidoPaternoUsuario,
            apellidoMaternoUsuario,
            usuario,
            proyecto,
            membresia,
            distritoEntrega,
            provinciaEntrega,
            departamentoEntrega,
            celularEntrega,
            zona
        } = body;

        console.log("body de registro pedido: ", body)

        const nuevoPedido = {
            fechaPedido: fechaPedido,
            fechaEntregaPedido: fechaEntregaPedido,
            cantidadPaquetes: cantidadPaquetes,
            kilos: kilos,
            precioSemanal: precioSemanal,
            medioPago: medioPago,
            precio: precio,
            lugarEntrega: lugarEntrega,
            direccionEntrega: direccionEntrega,
            pagoTotal: pagoTotal,
            documentoUsuario: documentoUsuario,
            nombresUsuario: nombresUsuario,
            apellidoPaternoUsuario: apellidoPaternoUsuario,
            apellidoMaternoUsuario: apellidoMaternoUsuario,
            membresia: membresia,
            distritoEntrega: distritoEntrega,
            provinciaEntrega: provinciaEntrega,
            departamentoEntrega: departamentoEntrega,
            celularEntrega: celularEntrega,
            zona: zona,
            usuario: usuario,
            proyecto: proyecto,
        };
        const newPedido = await Pedidos.create(body);

        return res.status(201).json({
            message: 'Pedido registrado exitosamente.',
            data: newPedido,
            status: 201,
        });
    } catch (error) {
        console.error('Error al registrar pedido:', error);
        return res.status(500).json({
            message: `'Error al registrar pedido:' ${error}`,
        });
    }
};