import db1 from '../db/db.js';
import mongoose from 'mongoose';

const ventaAlojamientoSchema = new mongoose.Schema(
    {
        status: String, // 0: pendientePago, 1: pagado, 2: anulado
        nombreProducto: String,
        cantidad: String,
        precioUnitario: String,
        precioVenta: String,
        medioPago: String,
        fechaInicio: String,
        fechaFin: String,
        contrato: String, // contrato que realizo la compra del producto (number o externo)
        habitacion: String, // habitacion que realizo la compra del producto (number o externo)
        comentario: String, // usuario que agrego el ventaAlojamiento
        usuarioRegistro: String, // usuario que agrego el ventaAlojamiento
        proyecto: String,
    },
    {
        timestamps: true,
        collection: 'ventaAlojamiento'
    },
);

const VentaAlojamiento = db1.model('VentaAlojamiento', ventaAlojamientoSchema);

export default VentaAlojamiento;