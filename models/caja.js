import db1 from '../db/db.js';
import mongoose from 'mongoose';

const cajaSchema = new mongoose.Schema(
    {
        typeMovement: String, // 1: Ingreso, 0: Egreso
        fecha: String,
        typeWallet: String, // efectivo, visas, yapes, vuelto; 0: efectivo, 1: yapes, 2: visas, 3: vuelto
        monto: String,
        concepto: String, // 0: alojamiento, 1: bazar, 2: bano, 3: lavanderia, 4: vuelto, 5: extraigv, 6: otros, 9: egreso
        detalle: String, // detalle de transaccion
        comentario: String, // Comentario adicional
        contrato: String, // contrato que realizo la compra del producto (number o externo)
        habitacion: String, // habitacion que realizo la compra del producto (number o externo)
        usuario: String,
        proyecto: String,
    },
    {
        timestamps: true,
        collection: 'caja'
    },
);

const Caja = db1.model('Caja', cajaSchema);

export default Caja;