import { StockHuevos } from "../models/stockHuevos.js";

export const handleStock = async (req, res) => {
    try {
        const proyecto = req.query.proyecto || '';
        console.log('query: ', proyecto);

        const stockHuevos = await StockHuevos.find({
            proyecto: proyecto
        })

        return res.status(201).json({
            message: "stocks obtenmidos desde la base de datos",
            data: stockHuevos,
            status: 201,
        });
    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}