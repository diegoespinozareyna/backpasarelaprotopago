import { db1 } from '../db/db.js';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: String,
        numberDocument: String,
        email: String,
        celular: String,
        role: String,
        password: String,
        accountNumberSoles: String,
        accountNumberSolesCci: String,
        accountNumberDolares: String,
        accountNumberDolaresCci: String,
        accountsAll: [
            {
                tipo: String, // Ejemplo: "Ahorros", "Corriente"
                numero: String, // Número de la cuenta bancaria
                numerocci: String,
                divisa: String, // divisa
                bank: String, // divisa
                titular: String, // divisa
            },
        ],
    },
    {
        timestamps: true, // Agrega createdAt y updatedAt automáticamente
        collection: 'users', // Especifica el nombre de la colección
    }
);

const UserModel = db1.model('User', userSchema);

export { UserModel };