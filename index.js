import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';  // Asegúrate de agregar ".js" a la ruta
import cors from 'cors';
import axios from 'axios';
import db1 from './db/db.js';

dotenv.config();

const app = express();
// Configuración de CORS
// app.use(cors({
//     origin: [
//         "https://inmobackend.site",
//         "http://localhost:3000",
//         "http://localhost:3001",
//         "http://localhost:3002",
//         "http://localhost:3003",
//         "https://parquesdeparacas.inmobackend.site",
//         "https://mirafloresdelnorte1.inmobackend.site",
//         "https://mirafloresdelnorte2.inmobackend.site",
//         "https://portalesdeparaiso.inmobackend.site",
//         "https://vallehermosocanete.inmobackend.site",
//     ], // Permite solo solicitudes desde tu frontend
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Métodos HTTP permitidos
//     allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
//     credentials: true // Permitir cookies o credenciales
// }));
app.use(cors());

// capturar body
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.text({ limit: '200mb' }));

// Conexión a Base de datos

// import routes

// route middlewares
// app.get('/', async (req, res) => {
//     console.log("ruta /", req?.query)
//     try {
//         // const response = await axios.get('https://cuantoestaeldolar.pe/_next/data/mjOfCl-dfhRu_DC0KWUDQ/dolar-interbancario.json');
//         // const response = await axios.get('https://cuantoestaeldolar.pe/_next/data/tG2mSPp9VBINqLaUp6SWb/calcular.json');
//         // const response = await axios.get('https://cuantoestaeldolar.pe/_next/data/cLkR_uoJGRIgTBk7WNKOo/cambio-de-dolar-online.json');
//         const response = await axios.get('https://cuantoestaeldolar.pe/cambio-de-dolar-online?_rsc=1e1kf');
//         // console.log(response.data);

//         return res.status(201).json({
//             message: 'tabla tc alls.',
//             data: response.data, // Datos del usuario decodificados del token
//             status: 201,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Error" });
//     }
// });


app.use('/api/auth', authRoutes);

// iniciar server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`servidor andando en: ${PORT}`)
// })
const PORT = process.env.PORT || 6003;
const HOST = "0.0.0.0"; // Asegura que escucha en todas las IPs

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

app.listen(PORT, HOST, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});