import db1 from '../db/db.js';
import mongoose from 'mongoose';

const ventaExtraIgvSchema = new mongoose.Schema(
    {
        status: String, // 0: pendientePago, 1: pagado, 2: anulado
        nombreProducto: String,
        cantidad: String,
        precioUnitario: String,
        precioVenta: String,
        medioPago: String,
        fecha: String,
        contrato: String, // contrato que realizo la compra del producto (number o externo)
        habitacion: String, // habitacion que realizo la compra del producto (number o externo)
        comentario: String, // usuario que agrego el ventaExtraIgv
        usuarioRegistro: String, // usuario que agrego el ventaExtraIgv
        proyecto: String,
    },
    {
        timestamps: true,
        collection: 'ventaExtraIgv'
    },
);

const VentaExtraIgv = db1.model('VentaExtraIgv', ventaExtraIgvSchema);

export default VentaExtraIgv;