import db1 from '../db/db.js';
import mongoose from 'mongoose';

const pagosSchema = new mongoose.Schema(
    {
        codPedido: String,
        nOperacion: String,
        documentoUsuario: String,
        fechaPago: String,
        formaPago: String,
        monto: String,
        fechaVerificacion: String,
        estadoVerificacion: String,
        conceptoPago: String,
        status: String, // "0" eliminado, "1" vigente
        observaciones: String,
        proyecto: String,
        url: [String],
    },
    {
        timestamps: true, // Agrega createdAt y updatedAt automáticamente
        collection: 'pagos', // Especifica el nombre de la colección
    }
);

const PagosModel = db1.model('Pagos', pagosSchema);

export { PagosModel };