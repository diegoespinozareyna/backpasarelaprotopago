import db1 from '../db/db.js';
import mongoose from 'mongoose';

const habitacionSchema = new mongoose.Schema(
    {
        // Información básica habitacion
        numeroHabitacion: String,
        tipoHabitacion: String,
        piso: String,
        capacidad: String,
        camas: String,
        precioBase: String,
        tipoRetiro: String, // 0: R, 1: R HOY
        amenidades: [
            {
                id: Number,
                description: String,
                name: String
            }
        ], // wifi, minibar, balcón, etc.
        descripcion: String,
        imagenes: [String],
        reservasTotales: String,

        // estado de la habitacion
        estado: String, // Disponible 0, Ocupado 1, sucia 2, no disponible 3, reservado 4,=

        // Historial Contratos
        historialContratos: [
            {
                numeroContrato: String,
                fechaInicio: String,
                fechaFin: String,
                clientes: [
                    {
                        nacionalidad: String,
                        documentoCliente: String,
                        nombresCliente: String,
                        apellidoPaternoCliente: String,
                        apellidoMaternoCliente: String,
                    },
                ],
                consumoTotal: String,
            }
        ],
    },
    {
        timestamps: true,
        collection: 'habitaciones'
    }
);

const Habitacion = db1.model('Habitacion', habitacionSchema);

export default Habitacion;