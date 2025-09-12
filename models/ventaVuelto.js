import db1 from '../db/db.js';
import mongoose from 'mongoose';

const ventaVueltoSchema = new mongoose.Schema(
    {
        status: String, // 0: pendientePago, 1: pagado, 2: sumar a caja
        statusEntrega: String, // 0: pendiente por tiempo, 1: pendiente del dia
        nombreProducto: String,
        cantidad: String,
        precioUnitario: String,
        precioVenta: String,
        medioPago: String,
        fecha: String,
        contrato: String, // contrato que realizo la compra del producto (number o externo)
        habitacion: String, // habitacion que realizo la compra del producto (number o externo)
        comentario: String, // usuario que agrego el ventaVuelto
        usuarioRegistro: String, // usuario que agrego el ventaVuelto
        proyecto: String,
    },
    {
        timestamps: true,
        collection: 'ventaVuelto'
    },
);

const VentaVuelto = db1.model('VentaVuelto', ventaVueltoSchema);

export default VentaVuelto;