import db1 from '../db/db.js';
import mongoose from 'mongoose';

const stockHuevosSchema = new mongoose.Schema(
    {
        stockContable: String,
        stockDisponible: String,
        stockEntregado: String,
        proyecto: String,
    },
    {
        timestamps: true,
        collection: 'stockHuevos'
    },
);

const StockHuevos = db1.model('stockHuevos', stockHuevosSchema);

export { StockHuevos };