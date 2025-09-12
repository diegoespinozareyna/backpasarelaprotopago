// models/User.js
import db from '../db/db.js';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        // Datos de cuenta
        role: String,
        userType: String,
        password: String,
        statusActive: String,

        // Datos personales
        documentoUsuario: String,
        nombres: String,
        apellidoPaterno: String,
        apellidoMaterno: String,
        celular: String,
        direccion: String,
        distrito: String,
        provincia: String,
        departamento: String,
        membresia500: String,
        menbresia200: String,
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

const UsersModel = db.model('Users', userSchema);

export { UsersModel };