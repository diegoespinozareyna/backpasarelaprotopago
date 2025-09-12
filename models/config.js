import db1 from '../db/db.js';
import mongoose from 'mongoose';

const configSchema = new mongoose.Schema(
    {
        precioKiloHuevos: String,
        proyecto: String,
    },
    {
        timestamps: true,
        collection: 'config'
    },
);

const Config = db1.model('Config', configSchema);

export default Config;