import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URIALL = `mongodb://localhost:27017/granjadeoromunoz`;

let db1 = null;

const getDbInstance = () => {
    if (!db1) {
        console.log("Conectándome a MongoDB...");
        db1 = mongoose.createConnection(DB_URIALL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });

        db1.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
        db1.once('open', () => console.log('Conectado a MongoDB!'));
    }
    return db1;
};

db1 = getDbInstance();

export default db1;