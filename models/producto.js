import db1 from '../db/db.js';
import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema(
    {
        nombreProducto: String,
        descripcion: String,
        stock: Number,
        precioCompra: String,
        precioVenta: String,
        categoria: String, // 0: sancks, 1: bebidas, 2: aseo, 3: otros
        factura: [String],
        imagen: String,
        usuario: String, // usuario que agrego el producto
        proyecto: String,
    },
    {
        timestamps: true,
        collection: 'producto'
    },
);

const Producto = db1.model('Producto', productoSchema);

export default Producto;