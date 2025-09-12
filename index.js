import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';  // Asegúrate de agregar ".js" a la ruta
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

// capturar body
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.text({ limit: '200mb' }));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 6003;
const HOST = "0.0.0.0"; // Asegura que escucha en todas las IPs

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

app.listen(PORT, HOST, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});