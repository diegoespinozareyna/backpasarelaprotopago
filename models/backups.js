import { db1 } from '../db/db.js';
import mongoose from 'mongoose';

const backupsSchema = new mongoose.Schema(
    {
        ultimoBackupPropiedades: String,
        ultimoBackupUsers: String,
        ultimoBackupInvitados: String,
        ultimoBackupPagos: String,
        proyecto: String,
    },
    {
        timestamps: true, // Agrega createdAt y updatedAt automáticamente
        collection: 'backups', // Especifica el nombre de la colección
    }
);

const BackupsModel = db1.model('Backups', backupsSchema);

export { BackupsModel };