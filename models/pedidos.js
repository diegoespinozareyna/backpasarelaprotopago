import db1 from '../db/db.js';
import mongoose from 'mongoose';

const pedidosSchema = new mongoose.Schema(
    {
        status: String, // 0: pendiente, 1: entregado, 2: cancelado 
        fechaPedido: Date,
        fechaEntregaPedido: String,
        cantidadPaquetes: String,
        kilos: String,
        precioSemanal: String, // 1: efectivo, 2: yape/transferencia
        medioPago: String,
        precio: String,
        lugarEntrega: String,
        direccionEntrega: String,
        zona: String,
        pagoTotal: String,
        documentoUsuario: String,
        nombresUsuario: String,
        apellidoPaternoUsuario: String,
        apellidoMaternoUsuario: String,
        membresia: String,
        distritoEntrega: String,
        provinciaEntrega: String,
        departamentoEntrega: String,
        celularEntrega: String,
        comentario: String,
        urlsPago: [String],
        usuario: String,
        proyecto: String,
    },
    {
        timestamps: true,
        collection: 'pedidos'
    },
);

const Pedidos = db1.model('Pedidos', pedidosSchema);

export default Pedidos;