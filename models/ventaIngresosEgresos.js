import db1 from '../db/db.js';
import mongoose from 'mongoose';

const ventaIngresosEgresosSchema = new mongoose.Schema(
    {
        status: String, // 0: pendientePago, 1: pagado, 2: anulado
        type: String, // 1: ingreso o 0: egreso
        nombreIngresoEgreso: String,
        medioPago: String,
        precioVenta: String,
        fecha: String,
        comentario: String, // usuario que agrego el ventaIngresosEgresos
        numeroFactura: String,
        usuarioRegistro: String, // usuario que agrego el ventaIngresosEgresos
        proyecto: String,
    },
    {
        timestamps: true,
        collection: 'ventaIngresosEgresos'
    },
);

const VentaIngresosEgresos = db1.model('VentaIngresosEgresos', ventaIngresosEgresosSchema);

export default VentaIngresosEgresos;