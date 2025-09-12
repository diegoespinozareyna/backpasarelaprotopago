import { Router } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { UsersModel } from '../models/users.js';
import verifyToken from '../utils/validateToken.js';
import { PropiedadesModel } from '../models/propiedades.js';
// import { redis } from '../db/dbRedis.js';
import axios from 'axios';
import serndEmail from '../utils/serndEmail.js';
import { PagosModel } from '../models/pagos.js';
import moment from "moment-timezone";
import serndEmailReservaSinCorreo from '../utils/serndEmailReservaSinCorreo.js';
import { StatusLotes } from '../utils/StatusLote.js';
import mongoose from 'mongoose';
import Habitacion from '../models/habitaciones.js';
import { handleRegistroContrato } from '../handlers/handleRegistroContrato.js';
import { handleGetContratos } from '../handlers/handleGetContratos.js';
import { handleRetirarContrato } from '../handlers/handleRetirarContrato.js';
import { handleRegistroHabitacion } from '../handlers/handleRegistroHabitacion.js';
import { handleEstadoHabitacion } from '../handlers/handleEstadoHabitacion.js';
import { handleHabitacionUnica } from '../handlers/handleHabitacionUnica.js';
import { handleContratoUnico } from '../handlers/handleContratoUnico.js';
import { handleEditarContrato } from '../handlers/handleEditarContrato.js';
import { handleEditarContratoClientes } from '../handlers/handleEditarContratoClientes.js';
import { handleEditarConsumoAlojamiento } from '../handlers/handleEditarConsumoAlojamiento.js';
import { handleEditarConsumosVarios } from '../handlers/handleEditarConsumosVarios.js';
import { handleEditarIngresosEgresosCaja } from '../handlers/handleEditarIngresosEgresosCaja.js';
import { handleNumeroBoletaFactura } from '../handlers/handleNumeroBoletaFactura.js';
import { handleEditarIngresosEgresosCajaGeneral } from '../handlers/handleEditarIngresosEgresosCajaGeneral.js';
import { handleGetContratosPlanilla } from '../handlers/handleGetContratosPlanilla.js';
import { handleIngresosEgresosCajaReal } from '../handlers/handleIngresosEgresosCajaReal.js';
import { handleGetCaja } from '../handlers/handleGetCaja.js';
import { handleRegistroUsuario } from '../handlers/handleRegistroUsuario.js';
import { handleRegistrarCliente } from '../handlers/handleRegistrarCliente.js';
import { handleGetContratosRetirados } from '../handlers/handleGetContratosRetirados.js';
import { handleEditarContratoReserva } from '../handlers/handleEditarContratoReserva.js';
import { handleGetContratosClientes } from '../handlers/handleGetContratosClientes.js';
import { handleGetOtrosIngresosEgresos } from '../handlers/handleGetOtrosIngresosEgresos.js';
import { handleNuevaVentaBazar } from '../handlers/handleNuevaVentaBazar.js';
import { handleGetVentasBazarContratoUnique } from '../handlers/handleGetVentasBazarContratoUnique.js';
import { handleRegistroVentasBazarContrato } from '../handlers/handleRegistroVentasBazarContrato.js';
import { handleGetVentasLavanderiaContratoUnique } from '../handlers/handleGetVentasLavanderiaContratoUnique.js';
import { handleNuevaVentaLavanderia } from '../handlers/handleNuevaVentaLavanderia.js';
import { handleRegistroVentasLavanderiaContrato } from '../handlers/handleRegistroVentasLavanderiaContrato.js';
import { handleGetVentasExtraIgvContratoUnique } from '../handlers/handleGetVentasExtraIgvContratoUnique.js';
import { handleNuevaVentaExtraIgv } from '../handlers/handleNuevaVentaExtraIgv.js';
import { handleRegistroVentasExtraIgvContrato } from '../handlers/handleRegistroVentasExtraIgvContrato.js';
import { handleGetVentasVueltoContratoUnique } from '../handlers/handleGetVentasVueltoContratoUnique.js';
import { handleRegistroVentasVueltoContrato } from '../handlers/handleRegistroVentasVueltoContrato.js';
import { handleNuevaVentaVuelto } from '../handlers/handleNuevaVentaVuelto.js';
import { handleGetVentasAlojamientoContratoUnique } from '../handlers/handleGetVentasAlojamientoContratoUnique.js';
import { handleNuevaVentaAlojamiento } from '../handlers/handleNuevaVentaAlojamiento.js';
import { handleRegistroVentasAlojamientoContrato } from '../handlers/handleRegistroVentasAlojamientoContrato.js';
import { handleNuevaVentaExterna } from '../handlers/handleNuevaVentaExterna.js';
import { handleGetCuadreCajaPorFecha } from '../handlers/handleGetCuadreCajaPorFecha.js';
import { handleGetVentasBazarPorFecha } from '../handlers/handleGetVentasBazarPorFecha.js';
import { handleRegistroProductoBazar } from '../handlers/handleRegistroProductoBazar.js';
import { handleGetProcutosBazarTotales } from '../handlers/handleGetProcutosBazarTotales.js';
import { handleEditarProductoInventario } from '../handlers/handleEditarProductoInventario.js';
import { handleEditarStockProductoBazar } from '../handlers/handleEditarStockProductoBazar.js';
import { handleGetProductosBazarUnits } from '../handlers/handleGetProductosBazarUnits.js';
import { handleContratoComentario } from '../handlers/handleContratoComentario.js';
import { handleGetVentasAlojamientoContratoAll } from '../handlers/handleGetVentasAlojamientoContratoAll.js';
import { handleRegistroPedido } from '../handlers/handleRegistroPedido.js';
import { handleGetPedidos } from '../handlers/handleGetPedidos.js';
import { handlePedidosSemana } from '../handlers/handlePedidosSemana.js';
import { handleChangeStatusPedido } from '../handlers/handleChangeStatusPedido.js';
import { handleStock } from '../handlers/handleStock.js';
import { handleChangeStatusFechaEntregaPedido } from '../handlers/handleChangeStatusFechaEntregaPedido.js';
import { handleGetPedido } from '../handlers/handleGetPedido.js';
import { handleEditarPedido } from '../handlers/handleEditarPedido.js';
import { handleGetAllUsuarios } from '../handlers/handleGetAllUsuarios.js';
import { handleGetUserById } from '../handlers/handleGetUserById.js';
import { handleEditarUsuarioId } from '../handlers/handleEditarUsuarioId.js';
import { handleGetConfig } from '../handlers/handleGetConfig.js';
import { handlePacthConfig } from '../handlers/handlePacthConfig.js';
import { handleSubirVoucher } from '../handlers/handleSubirVoucher.js';
import { handleGetVouchersAll } from '../handlers/handleGetVouchersAll.js';
import { handleEditVouchers } from '../handlers/handleEditVouchers.js';
import { handleGetVouchersAllFull } from '../handlers/handleGetVouchersAllFull.js';
import { handleInsertUrlsPagos } from '../handlers/handleInsertUrlsPagos.js';

const app = express();

dotenv.config();

// console.log("prd?", process.env.NODE_ENV)
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

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.text({ limit: '200mb' }));

const router = Router();

// Función para validar el DNI
const validateDni = (dni) => {
    // Comprobar que el DNI tiene exactamente 8 caracteres
    if (dni.length !== 8) {
        return "El DNI debe tener exactamente 8 caracteres.";
    }

    // Comprobar que no haya 8 dígitos repetidos
    const isAllRepeated = /^(\d)\1{7}$/.test(dni);
    if (isAllRepeated) {
        return "El DNI no puede tener 8 dígitos repetidos.";
    }

    // Comprobar secuencias ascendentes o descendentes
    const isAscending = "12345678".includes(dni);
    const isDescending = "87654321".includes(dni);
    const isDescending2 = "876".includes(dni);
    const isDescending3 = "321".includes(dni);
    const isDescending4 = "123".includes(dni);
    if (isAscending || isDescending || isDescending2 || isDescending3 || isDescending4) {
        return "El DNI no puede ser una secuencia ascendente o descendente.";
    }

    // 5. No puede tener 3 o más dígitos consecutivos ascendentes o descendentes
    for (let i = 0; i <= dni.length - 4; i++) {
        const a = parseInt(dni[i]);
        const b = parseInt(dni[i + 1]);
        const c = parseInt(dni[i + 2]);

        const isAscending = b === a + 1 && c === b + 1;
        const isDescending = b === a - 1 && c === b - 1;

        if (isAscending || isDescending) {
            return "El DNI no puede ser una secuencia ascendente o descendente.";
        }
    }

    // Comprobar si hay más de 4 dígitos repetidos
    const digitCount = {};
    for (const digit of dni) {
        digitCount[digit] = (digitCount[digit] || 0) + 1;
    }
    const hasMoreThan4Repeated = Object.values(digitCount).some(count => count >= 4);
    if (hasMoreThan4Repeated) {
        return "El DNI no puede tener más de 4 dígitos repetidos.";
    }

    // Validación exitosa
    return null;
};

router.post('/login', async (req, res) => {
    try {
        const body = await req.body;

        // console.log("body de register usuario: ", body)

        const { documentoUsuario, password } = body;
        console.log("documentoUsuario: ", documentoUsuario)
        console.log("password: ", password)

        const user = await UsersModel.findOne({ documentoUsuario: documentoUsuario, statusActive: "1" }).lean().exec();
        if (!user) return res.status(406).json({
            message: 'Error en la autenticación',
            messageLarge: 'Lo sentimos, su usuario no existe o no esta activo, verifique y vuleva a intentarlo',
            data: null, // Datos del usuario decodificados del token
            status: 406,
        });

        // const validPassword = await bcrypt.compare(password, user.password);
        // if (!validPassword) return res.json({
        //     error: 'contraseña no válida',
        //     status: 401
        // })
        if (password !== user.password) return res.status(406).json({
            message: 'Clave incorrecta',
            messageLarge: 'Lo sentimos, su clave es incorrecta, verifique y vuleva a intentarlo',
            data: null, // Datos del usuario decodificados del token
            status: 406,
        });

        // if (user.role !== "admin") return res.status(406).json({
        //     message: 'Usuario no Autorizado',
        //     messageLarge: 'Lo sentimos, no tiene permisos para acceder, comuniquese con el administrador',
        //     data: null, // Datos del usuario decodificados del token
        //     status: 406,
        // });

        const data = {
            ...user,
            historico: "",
            password: "secret"
        }

        console.log("data: ", data)

        const token = jwt.sign(
            { user: data }, // Solo datos relevantes
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            error: null,
            data: 'exito bienvenido',
            token: token,
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `"Error desconocido" ${error}` });
    }
});

router.post("/registroClientes", handleRegistrarCliente);

router.post("/registerInvitado", async (req, res) => {
    try {
        const body = await req.body;

        const {
            documentoUsuario,
            nombres,
            apellidoPaterno,
            apellidoMaterno,
            email,
            celular,
            direccion,
            fechaInvitacionProyecto,
            voucherBase64,
            payType,
            amount,
            proyecto,
            emailAsesorInicial,
            usuarioAcount,
            numeroDocumentoPatrocinador,
            nombresPatrocinador,
            apellidoPaternoPatrocinador,
            apellidoMaternoPatrocinador,
        } = body;
        console.log("body de register usuario: ", body)

        const user = await UsersModel.findOne({ documentoUsuario: documentoUsuario, role: "user asesor" }).lean().exec();
        // if (user) return res.status(406).json({
        //     message: 'Usuario ya existe',
        //     messageLarge: 'Lo sentimos, su usuario no existe, verifique y vuleva a intentarlo',
        //     data: null, // Datos del usuario decodificados del token
        //     status: 406,
        // });

        // const validPassword = await bcrypt.compare(password, user.password);
        // if (!validPassword) return res.json({
        //     error: 'contraseña no válida',
        //     status: 401
        // })

        const invitedNew = {
            role: "user invited",
            userType: "invited",
            statusActive: "0",
            //datos personales
            nombres: nombres,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            documentoUsuario: documentoUsuario,
            fechaNacimiento: "",
            fechaInvitacionProyecto: fechaInvitacionProyecto,
            direccion: direccion,
            email: email,
            celular: celular,
            estadoCivil: "",
            ocupacion: "",
            numeroDocumentoPatrocinador: numeroDocumentoPatrocinador,
            nombresPatrocinador: nombresPatrocinador,
            apellidoPaternoPatrocinador: apellidoPaternoPatrocinador,
            apellidoMaternoPatrocinador: apellidoMaternoPatrocinador,
        }

        const userNew = await UsersModel.create(invitedNew);

        console.log("userNew: ", userNew)

        const nOperacion = new Date().getTime();

        const nuevoPago = {
            codLote: "Voucher Invitado",
            nOperacion: nOperacion,
            documentoUsuario: documentoUsuario,
            fechaPago: moment().tz("America/Lima").format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            fechaVerificacion: "",
            estadoVerificacion: "0",
            status: "1", // "0" eliminado, "1" vigente
            conceptoPago: "Voucher Invitado",
            formaPago: payType,
            monto: amount,
            proyecto: proyecto,
        };
        const newPay = await PagosModel.create(nuevoPago);

        const base64Content = (voucherBase64.split(",")[1] !== undefined && voucherBase64.split(",")[1] !== null) ? voucherBase64.split(",")[1] : archivo; // Obtiene la parte base64 pura

        const typeFileVoucher = "png"; // Tipo de archivo

        const info = await serndEmail(base64Content, documentoUsuario, email, nombres, typeFileVoucher, "Voucher Invitado", proyecto, payType, "Voucher Invitado", amount, nOperacion, moment().tz("America/Lima").format("YYYY-MM-DDTHH:mm:ss.SSSZ"), usuarioAcount, emailAsesorInicial);

        console.log(info)

        return res.status(201).json({
            error: null,
            data: userNew,
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: `"Error desconocido" ${error}` });
    }
});

router.get("/dashboard", verifyToken, async (req, res) => {
    try {
        console.log("entre a dashboard")

        return res.status(201).json({
            message: 'Estos son los datos del usuario con token okay',
            data: "user", // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: `"Error desconocido" ${error}` });
    }
});

router.get("/getAllHabitaciones", async (req, res) => {
    try {
        const params = req.query;
        const proyecto = params?.params?.proyecto;

        console.log("params: ", proyecto)

        if (!proyecto) {
            return res.status(400).json({ message: "El parámetro 'proyecto' es obligatorio" });
        }

        // 2️⃣ Si no está en Redis, buscar en la base de datos
        // console.log("🔍 Buscando en la base de datos...");
        const propiedades = await Habitacion.find({ proyecto }, { historialContratos: 0 }).exec();

        if (!propiedades || propiedades.length === 0) {
            return res.status(202).json({
                message: "No se encontraron propiedades",
                data: [],
                status: 202,
            });
        }

        return res.status(200).json({
            message: "Propiedades obtenidas desde la base de datos",
            data: propiedades,
            status: 200,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
});

router.post("/reniec", async (req, res) => {
    try {
        const body = await req.body;

        const { dni } = body;

        console.log("body de postCorreo: ", body)

        const responseReniec = await axios.post(
            'https://apiperu.dev/api/dni',
            { dni }, // Cuerpo de la solicitud
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.API_RENIEC_APISPERU}`, // Reemplaza con tu token
                },
            }
        );
        // const responseReniec = await axios.get(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImRpZWdvZXNwaW5vemFyZXluYUBnbWFpbC5jb20ifQ.-P0WobUjTcbUbsfvw31Zgh8N78vQBC2sVT9G6zcZWCA`);

        console.log('Datos del DNI:', responseReniec.data);

        return res.status(201).json({
            message: 'Estos son los datos del DNI',
            data: responseReniec.data, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: "Error" });
    }
});

router.post("/reservarVender", async (req, res) => {
    try {
        const body = await req.body;

        const {
            //lote
            codLote,
            status,
            nOperacion,
            fechaOperacion,
            metros,
            referencia,
            precioSoles,
            expirationTime,
            nroVoucherPasarela,
            //cliente
            documentoCliente,
            nombresCliente,
            apellidoPaternoCliente,
            apellidoMaternoCliente,
            emailCliente,
            celularCliente,
            ocupacionCliente,
            //sunat
            tipoComprobanteCliente,
            rucCliente,
            razonSocialCliente,
            estadoCivilCliente,
            //conyugue
            numeroDocumentoClienteConyugue,
            nombresClienteConyugue,
            apellidoClientePaternoConyugue,
            apellidoClienteMaternoConyugue,
            //asesor
            documentoAsesor,
            nombresAsesor,
            apellidoPaternoAsesor,
            apellidoMaternoAsesor,
            emailAsesor,
            celularAsesor,
            patrocinadorAsesor,
            proyecto,
            observaciones,
            usuarioAcount,
            emailAsesorInicial,
            acction,
        } = body;
        console.log("body de reserrvaVenta: ", body)

        // Validar el DNI (documentoUsuario)
        const dniError = validateDni(documentoCliente);
        if (dniError && acction !== "editar") {
            return res.status(202).json({
                message: dniError,
                data: dniError,
                // data: [loteChange],
                status: 202,
            });
        }
        else {
            const propiedadUniq = await PropiedadesModel.findOne({ codLote: codLote }).exec();
            // console.log("propiedadUniq: ", propiedadUniq)

            const newAccount = {
                documentoCliente: documentoCliente,
                documentoAsesor: documentoAsesor,
                status: status,
                observaciones: observaciones,
                fechaOperacion: fechaOperacion,
                nOperacion: nOperacion,
                usuarioRegistro: usuarioAcount,
            }

            // console.log("newAccount: ", newAccount)

            // const result = await UsersModel.updateMany({}, { $unset: { historico: "" } });
            // console.log("Registros actualizados:", result);

            const reservaVentaHistorico = await PropiedadesModel.findOneAndUpdate(
                { codLote: codLote },
                { $push: { historico: newAccount } },
                { new: true } // Opción para devolver el documento actualizado
            );

            console.log("reservaVentaHistorico: ", reservaVentaHistorico)

            const reservaVenta = await PropiedadesModel.findOneAndUpdate(
                { codLote: codLote, proyecto: proyecto }, // Criterio de búsqueda
                {
                    $set: {
                        //lote
                        status: status,
                        nOperacion,
                        fechaOperacion,
                        metros,
                        referencia,
                        precioSoles,
                        expirationTime,
                        nroVoucherPasarela,
                        //cliente
                        documentoCliente,
                        nombresCliente,
                        apellidoPaternoCliente,
                        apellidoMaternoCliente,
                        emailCliente,
                        celularCliente,
                        ocupacionCliente,
                        estadoCivilCliente,
                        //sunat
                        tipoComprobanteCliente,
                        rucCliente,
                        razonSocialCliente,
                        //conyugue
                        numeroDocumentoClienteConyugue,
                        nombresClienteConyugue,
                        apellidoClientePaternoConyugue,
                        apellidoClienteMaternoConyugue,
                        //asesor
                        documentoAsesor,
                        nombresAsesor,
                        apellidoPaternoAsesor,
                        apellidoMaternoAsesor,
                        emailAsesor,
                        celularAsesor,
                        patrocinadorAsesor,
                        observaciones,
                        usuarioRegistro: usuarioAcount,
                        historico: reservaVentaHistorico.historico,
                    }
                },
                { new: true } // Opción para devolver el documento actualizado
            );

            console.log("reservaVenta: ", reservaVenta)

            // // Actualizar la propiedad en Redis
            // const redisKey1 = `propiedadesAllHash:${proyecto}`;
            // redis.hset(redisKey1, codLote, JSON.stringify(reservaVenta), (err, reply) => {
            //     if (err) {
            //         console.error("Error al actualizar Redis propiedad:", err);
            //     } else {
            //         console.log("Propiedad actualizada en Redis:", reply);
            //     }
            // });

            const user = await UsersModel.findOne({ documentoUsuario: documentoCliente }).exec();
            // console.log("user: ", user)

            if (!user) {
                const nuevoCliente = {
                    role: "user client",
                    userType: "client",
                    password: documentoCliente,
                    statusActive: "0",
                    //patrocinador
                    numeroDocumentoPatrocinador: "",
                    nombresPatrocinador: "",
                    apellidoPaternoPatrocinador: "",
                    apellidoMaternoPatrocinador: "",
                    //datos personales
                    nombres: nombresCliente,
                    apellidoPaterno: apellidoPaternoCliente,
                    apellidoMaterno: apellidoMaternoCliente,
                    documentoUsuario: documentoCliente,
                    fechaNacimiento: "",
                    direccion: "",
                    email: emailCliente,
                    celular: celularCliente,
                    estadoCivil: estadoCivilCliente,
                    ocupacion: ocupacionCliente,
                    //datos sunat
                    tipoComprobante: tipoComprobanteCliente,
                    ruc: rucCliente,
                    razonSocial: razonSocialCliente,
                    // conyugue
                    nombresConyugue: nombresClienteConyugue,
                    apellidoPaternoConyugue: apellidoClientePaternoConyugue,
                    apellidoMaternoConyugue: apellidoClienteMaternoConyugue,
                    fechaNacimientoConyugue: "",
                    numeroDocumentoConyugue: numeroDocumentoClienteConyugue,
                };
                const newClient = await UsersModel.create(nuevoCliente);

                // // Actualizar el nuevo cliente en Redis
                // const redisKey2 = `usuariosAllHash:${proyecto}`;
                // redis.hset(redisKey2, documentoCliente, JSON.stringify(newClient), (err, reply) => {
                //     if (err) {
                //         console.error("Error al actualizar Redis usuario:", err);
                //     } else {
                //         console.log("Usuario actualizado en Redis:", reply);
                //     }
                // });
            }

            const newUserHistorico = {
                role: "user client",
                userType: "client",
                codLote: codLote,
                status: status,
                accion: "",
                observaciones: observaciones,
                fecha: fechaOperacion,
                nOperacion: nOperacion,
            }

            // console.log("newUserHistorico: ", newUserHistorico)

            const newClientHistorico = await UsersModel.findOneAndUpdate(
                { documentoUsuario: documentoCliente },
                { $push: { historico: newUserHistorico } },
                { new: true } // Opción para devolver el documento actualizado
            );

            // console.log("reservaVentaHistorico: ", newClientHistorico)

            // // Actualizar el historico del cliente en Redis
            // const redisKey2 = `usuariosAllHash:${proyecto}`;
            // redis.hset(redisKey2, documentoCliente, JSON.stringify(newClientHistorico), (err, reply) => {
            //     if (err) {
            //         console.error("Error al actualizar Redis usuario:", err);
            //     } else {
            //         console.log("Usuario actualizado en Redis:", reply);
            //     }
            // });

            const userAsesor = await UsersModel.findOne({ documentoUsuario: documentoAsesor }).exec();
            // console.log("userAsesor: ", userAsesor)

            let newAsesorHistorico = null;

            if (userAsesor) {
                const newUserAsesorHistorico = {
                    role: "user asesor",
                    userType: "asesor",
                    codLote: codLote,
                    status: status,
                    accion: "",
                    observaciones: observaciones,
                    fecha: fechaOperacion,
                    nOperacion: nOperacion,
                }

                // console.log("newUserAsesorHistorico: ", newUserAsesorHistorico)

                newAsesorHistorico = await UsersModel.findOneAndUpdate(
                    { documentoUsuario: documentoAsesor },
                    { $push: { historico: newUserAsesorHistorico } },
                    { new: true } // Opción para devolver el documento actualizado
                );

                // // Actualizar el historico del asesor en Redis
                // redis.hset(redisKey2, documentoAsesor, JSON.stringify(newAsesorHistorico), (err, reply) => {
                //     if (err) {
                //         console.error("Error al actualizar Redis asesor:", err);
                //     } else {
                //         console.log("Asesor actualizado en Redis:", reply);
                //     }
                // });
            }

            if (status === "Disponible") {
                // Actualizar los pagos en MongoDB
                const updatedPagos = await PagosModel.updateMany(
                    { codLote: codLote },
                    { $set: { status: "0" } }
                );

                // console.log("Pagos actualizados en MongoDB:", updatedPagos);
            }

            if (status !== "Disponible") {
                const info22 = await serndEmailReservaSinCorreo("base64Content", documentoCliente, emailCliente, nombresCliente, "typeFileVoucher", codLote, proyecto, "payType", "fileType", "amount", nOperacion, fechaOperacion, usuarioAcount, emailAsesorInicial, status, metros, precioSoles);

                // console.log("aqui llegue1", info22)
            }

            return res.status(200).json({
                message: 'Estos son los datos de la reservaVenta',
                data: [reservaVenta, newClientHistorico],
                // data: [loteChange],
                status: 200,
            });
        }

    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.post("/fechasEntrega", async (req, res) => {
    try {
        const body = await req.body;

        const {
            key,
            value,
            codLote,
        } = body;
        console.log("body de reserrvaVenta: ", body)

        const updatedFechasEntrega = await PropiedadesModel.updateMany(
            { codLote: codLote },
            { $set: { [key]: value } }, // ✅ Agrega la propiedad si no existe
            { upsert: true } // ✅ Crea el documento si no existe
        );

        return res.status(200).json({
            message: 'Estos son los datos de la reservaVenta',
            data: updatedFechasEntrega,
            // data: [loteChange],
            status: 200,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.get("/timeReservas", async (req, res) => {
    try {

        const params = req.query;
        const proyecto = params?.params?.proyecto;

        const propiedades = await PropiedadesModel.find({ status: StatusLotes.STATUS_RESERVADO, proyecto }).exec();
        let arr = [];
        const resultMasivo = await Promise.all(propiedades?.map(async (item, index) => {
            if (new Date() > new Date(item.expirationTime)) {
                console.log("item: ", item)
                const updatedPropiedad = await PropiedadesModel.findOneAndUpdate(
                    { codLote: item.codLote },
                    {
                        status: StatusLotes.STATUS_DISPONIBLE,
                        fechaOperacion: "",
                        nOperacion: moment().tz("America/Lima").valueOf(),
                        documentoCliente: "",
                        nombresCliente: "",
                        apellidoPaternoCliente: "",
                        apellidoMaternoCliente: "",
                        emailCliente: "",
                        celularCliente: "",
                        estadoCivilCliente: "",
                        ocupacionCliente: "",
                        nombresClienteConyugue: "",
                        apellidoClientePaternoConyugue: "",
                        apellidoClienteMaternoConyugue: "",
                        fechaNacimientoClienteConyugue: "",
                        numeroDocumentoClienteConyugue: "",
                        tipoComprobanteCliente: "",
                        rucCliente: "",
                        razonSocialCliente: "",
                        documentoAsesor: "",
                        nombresAsesor: "",
                        apellidoPaternoAsesor: "",
                        apellidoMaternoAsesor: "",
                        emailAsesor: "",
                        celularAsesor: "",
                        patrocinadorAsesor: "",
                        fechaEntregaPlanoMemoria: "",
                        fechaEntregaMinuta: "",
                        fechaEntregaEscrituraPublica: "",
                        fechaEntregaInspeccionMunicipal: "",
                        nKardex: "",
                        observacionesSeguimiento: "",
                        fechaPagoComision: "",
                        subidoComision: "",
                    },
                    { new: true } // Devuelve el documento actualizado
                );
                arr.push(updatedPropiedad)

                const deletedPagos = await PagosModel.updateMany(
                    { codLote: item.codLote },
                    { $set: { status: "0" } }
                );
                arr.push(deletedPagos)

                console.log("item: ", item.expirationTime)
            }
        }))

        return res.status(200).json({
            message: "ok",
            data: arr,
            status: 200,
        });

    }
    catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
})

router.post("/reservarVenderMasivo", async (req, res) => {
    try {
        const body = await req.body;

        const {
            //lote
            codLotes,
            status,
            nOperacion,
            fechaOperacion,
            // metros,
            // referencia,
            precioSoles,
            expirationTime,
            //cliente
            documentoCliente,
            nombresCliente,
            apellidoPaternoCliente,
            apellidoMaternoCliente,
            emailCliente,
            celularCliente,
            ocupacionCliente,
            //sunat
            tipoComprobanteCliente,
            rucCliente,
            razonSocialCliente,
            estadoCivilCliente,
            //conyugue
            numeroDocumentoClienteConyugue,
            nombresClienteConyugue,
            apellidoClientePaternoConyugue,
            apellidoClienteMaternoConyugue,
            //asesor
            documentoAsesor,
            nombresAsesor,
            apellidoPaternoAsesor,
            apellidoMaternoAsesor,
            emailAsesor,
            celularAsesor,
            patrocinadorAsesor,
            proyecto,
            observaciones,
        } = body;
        console.log("body de reserrvaVenta: ", body)
        let arr = []
        const resultMasivo = await Promise.all(codLotes?.map(async (codLote) => {
            const propiedadUniq = await PropiedadesModel.findOne({ codLote: codLote, proyecto: proyecto }).exec();
            // console.log("propiedadUniq: ", propiedadUniq)

            const newAccount = {
                documentoCliente: documentoCliente,
                documentoAsesor: documentoAsesor,
                status: status,
                observaciones: observaciones,
                fechaOperacion: fechaOperacion,
                nOperacion: nOperacion,
            }

            // console.log("newAccount: ", newAccount)

            // const result = await UsersModel.updateMany({}, { $unset: { historico: "" } });
            // console.log("Registros actualizados:", result);

            const reservaVentaHistorico = await PropiedadesModel.findOneAndUpdate(
                { codLote: codLote, proyecto: proyecto },
                { $push: { historico: newAccount } },
                { new: true } // Opción para devolver el documento actualizado
            );

            // console.log("reservaVentaHistorico: ", reservaVentaHistorico)

            const reservaVenta = await PropiedadesModel.findOneAndUpdate(
                { codLote: codLote, proyecto: proyecto }, // Criterio de búsqueda
                {
                    $set: {
                        //lote
                        status: status == "" ? propiedadUniq.status : status,
                        nOperacion,
                        fechaOperacion,
                        // metros,
                        // referencia,
                        precioSoles: precioSoles !== "" ? precioSoles : propiedadUniq.precioSoles,
                        expirationTime,
                        //cliente
                        documentoCliente,
                        nombresCliente,
                        apellidoPaternoCliente,
                        apellidoMaternoCliente,
                        emailCliente,
                        celularCliente,
                        ocupacionCliente,
                        estadoCivilCliente,
                        //sunat
                        tipoComprobanteCliente,
                        rucCliente,
                        razonSocialCliente,
                        //conyugue
                        numeroDocumentoClienteConyugue,
                        nombresClienteConyugue,
                        apellidoClientePaternoConyugue,
                        apellidoClienteMaternoConyugue,
                        //asesor
                        documentoAsesor,
                        nombresAsesor,
                        apellidoPaternoAsesor,
                        apellidoMaternoAsesor,
                        emailAsesor,
                        celularAsesor,
                        patrocinadorAsesor,
                        observaciones,
                    }
                },
                { new: true } // Opción para devolver el documento actualizado
            );

            // console.log("reservaVenta: ", reservaVenta)

            // // Actualizar la propiedad en Redis
            // const redisKey1 = `propiedadesAllHash:${proyecto}`;
            // redis.hset(redisKey1, codLote, JSON.stringify(reservaVenta), (err, reply) => {
            //     if (err) {
            //         console.error("Error al actualizar Redis propiedad:", err);
            //     } else {
            //         console.log("Propiedad actualizada en Redis:", reply);
            //     }
            // });


            if (documentoCliente !== null && documentoCliente !== undefined && documentoCliente !== "") {

                const user = await UsersModel.findOne({ documentoUsuario: documentoCliente }).exec();
                console.log("user: ", user)
                const nuevoCliente = {
                    role: "user client",
                    userType: "client",
                    password: documentoCliente,
                    statusActive: "0",
                    //patrocinador
                    numeroDocumentoPatrocinador: "",
                    nombresPatrocinador: "",
                    apellidoPaternoPatrocinador: "",
                    apellidoMaternoPatrocinador: "",
                    //datos personales
                    nombres: nombresCliente,
                    apellidoPaterno: apellidoPaternoCliente,
                    apellidoMaterno: apellidoMaternoCliente,
                    documentoUsuario: documentoCliente,
                    fechaNacimiento: "",
                    direccion: "",
                    email: emailCliente,
                    celular: celularCliente,
                    estadoCivil: estadoCivilCliente,
                    ocupacion: ocupacionCliente,
                    //datos sunat
                    tipoComprobante: tipoComprobanteCliente,
                    ruc: rucCliente,
                    razonSocial: razonSocialCliente,
                    // conyugue
                    nombresConyugue: nombresClienteConyugue,
                    apellidoPaternoConyugue: apellidoClientePaternoConyugue,
                    apellidoMaternoConyugue: apellidoClienteMaternoConyugue,
                    fechaNacimientoConyugue: "",
                    numeroDocumentoConyugue: numeroDocumentoClienteConyugue,
                };
                const newClient = await UsersModel.create(nuevoCliente);

                // // Actualizar el nuevo cliente en Redis
                // const redisKey2 = `usuariosAllHash:${proyecto}`;
                // redis.hset(redisKey2, documentoCliente, JSON.stringify(newClient), (err, reply) => {
                //     if (err) {
                //         console.error("Error al actualizar Redis usuario:", err);
                //     } else {
                //         console.log("Usuario actualizado en Redis:", reply);
                //     }
                // });
            }


            if (documentoCliente !== null && documentoCliente !== undefined && documentoCliente !== "") {
                const newUserHistorico = {
                    role: "user client",
                    userType: "client",
                    codLote: codLote,
                    status: status,
                    accion: "",
                    observaciones: observaciones,
                    fecha: fechaOperacion,
                    nOperacion: nOperacion,
                }

                console.log("newUserHistorico: ", newUserHistorico)
                const newClientHistorico = await UsersModel.findOneAndUpdate(
                    { documentoUsuario: documentoCliente },
                    { $push: { historico: newUserHistorico } },
                    { new: true } // Opción para devolver el documento actualizado
                );

                // console.log("reservaVentaHistorico: ", newClientHistorico)

                // // Actualizar el historico del cliente en Redis
                // const redisKey2 = `usuariosAllHash:${proyecto}`;
                // redis.hset(redisKey2, documentoCliente, JSON.stringify(newClientHistorico), (err, reply) => {
                //     if (err) {
                //         console.error("Error al actualizar Redis usuario:", err);
                //     } else {
                //         console.log("Usuario actualizado en Redis:", reply);
                //     }
                // });
            }

            if (documentoAsesor !== null && documentoAsesor !== undefined && documentoAsesor !== "") {

                const userAsesor = await UsersModel.findOne({ documentoUsuario: documentoAsesor }).exec();
                // console.log("userAsesor: ", userAsesor)

                let newAsesorHistorico = null;

                if (userAsesor) {
                    const newUserAsesorHistorico = {
                        role: "user asesor",
                        userType: "asesor",
                        codLote: codLote,
                        status: status,
                        accion: "",
                        observaciones: observaciones,
                        fecha: fechaOperacion,
                        nOperacion: nOperacion,
                    }

                    // console.log("newUserAsesorHistorico: ", newUserAsesorHistorico)

                    newAsesorHistorico = await UsersModel.findOneAndUpdate(
                        { documentoUsuario: documentoAsesor },
                        { $push: { historico: newUserAsesorHistorico } },
                        { new: true } // Opción para devolver el documento actualizado
                    );

                    // // Actualizar el historico del asesor en Redis
                    // const redisKey2 = `usuariosAllHash:${proyecto}`;
                    // redis.hset(redisKey2, documentoAsesor, JSON.stringify(newAsesorHistorico), (err, reply) => {
                    //     if (err) {
                    //         console.error("Error al actualizar Redis asesor:", err);
                    //     } else {
                    //         console.log("Asesor actualizado en Redis:", reply);
                    //     }
                    // });
                }
            }



        }))

        if (status === "Disponible") {
            // Actualizar los pagos en MongoDB
            const updatedPagos = codLotes.map(async (codLote) => {
                const deletedPagos = await PagosModel.updateMany(
                    { codLote: codLote },
                    { $set: { status: "0" } }
                );
                // const updatedPagos = await PagosModel.updateMany(
                //     { codLote: codLote },
                //     { $set: { status: "0" } }
                // );
            })

            // console.log("Pagos actualizados en MongoDB:", updatedPagos);
        }

        // console.log(await resultMasivo)
        return res.status(200).json({
            message: 'Estos son los datos de la reservaVenta',
            // data: [reservaVenta, newClientHistorico, newAsesorHistorico],
            data: "exito",
            // data: [loteChange],
            status: 200,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.post("/getUser", async (req, res) => {
    try {

        const { documentoUsuario } = req.body;

        const user = await UsersModel.findOne({ documentoUsuario }).exec();

        return res.status(200).json({
            message: "Usuario obtenido desde la base de datos",
            data: user,
            status: 200,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
});

router.post('/postCorreoVoucherPlano', async (req, res) => {

    try {

        const body = await req.body;

        const {
            proyecto,
            codLote,
            voucherBase64,
            documentoCliente, emailCliente, nombresCliente,
            documentoAsesor,
            nombresAsesor,
            apellidoPaternoAsesor,
            apellidoMaternoAsesor,
            correoUsuario,
            usuarioAcount,
            payType,
            fileType,
            amount,
            nOperacion,
            fechaOperacion,
            url,
            acction,
        } = body;

        console.log("body de postCorreo: ", proyecto, codLote, payType, fileType, amount, nOperacion, fechaOperacion, correoUsuario)

        // Validar el DNI (documentoUsuario)
        const dniError = validateDni(documentoCliente);
        if (dniError && acction !== "editar") {
            return res.status(202).json({
                message: dniError,
                data: dniError,
                // data: [loteChange],
                status: 202,
            });
        }
        else {
            const nuevoPago = {
                codLote: codLote,
                nOperacion: nOperacion,
                documentoUsuario: documentoCliente,
                fechaPago: fechaOperacion,
                formaPago: payType,
                monto: amount,
                fechaVerificacion: "",
                estadoVerificacion: "0",
                conceptoPago: fileType,
                status: "1", // "0" eliminado, "1" vigente,
                proyecto: proyecto,
                url: url,
            };
            const newPay = await PagosModel.create(nuevoPago);

            const base64Content = (voucherBase64.split(",")[1] !== undefined && voucherBase64.split(",")[1] !== null) ? voucherBase64.split(",")[1] : archivo; // Obtiene la parte base64 pura

            const typeFileVoucher = "png"; // Tipo de archivo

            const info = await serndEmail(base64Content, documentoCliente, emailCliente, nombresCliente, typeFileVoucher, codLote, proyecto, payType, fileType, amount, nOperacion, fechaOperacion, usuarioAcount, correoUsuario);

            console.log("response correo33:", info)

            if (info) {
                console.log("entre11")
                res.status(201).json({
                    message: 'Esta es una ruta protegida.',
                    data: "okay", // Datos del usuario decodificados del token
                    status: 201,
                });
            }
            else {
                console.log("entre22")
                res.status(400).json({
                    message: 'Error al enviar correo, imagen demasiado grande o internet lento, vuelva a intentarlo',
                    data: "okay", // Datos del usuario decodificados del token
                    status: 400,
                });
            }
        }
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.post('/postCorreoVoucher', async (req, res) => {

    try {

        const body = await req.body;

        const {
            proyecto,
            codLote,
            voucherBase64,
            documentoCliente, emailCliente, nombresCliente,
            documentoAsesor,
            nombresAsesor,
            apellidoPaternoAsesor,
            apellidoMaternoAsesor,
            correoUsuario,
            usuarioAcount,
            payType,
            fileType,
            amount,
            nOperacion,
            fechaOperacion,
            url,
        } = body;

        console.log("body de postCorreo: ", proyecto, codLote, payType, fileType, amount, nOperacion, fechaOperacion, correoUsuario)

        const nuevoPago = {
            codLote: codLote,
            nOperacion: nOperacion,
            documentoUsuario: documentoCliente,
            fechaPago: fechaOperacion,
            formaPago: payType,
            monto: amount,
            fechaVerificacion: "",
            estadoVerificacion: "0",
            conceptoPago: fileType,
            status: "1", // "0" eliminado, "1" vigente,
            proyecto: proyecto,
            url: url,
        };
        const newPay = await PagosModel.create(nuevoPago);

        const base64Content = (voucherBase64.split(",")[1] !== undefined && voucherBase64.split(",")[1] !== null) ? voucherBase64.split(",")[1] : archivo; // Obtiene la parte base64 pura

        const typeFileVoucher = "png"; // Tipo de archivo

        const info = await serndEmail(base64Content, documentoCliente, emailCliente, nombresCliente, typeFileVoucher, codLote, proyecto, payType, fileType, amount, nOperacion, fechaOperacion, usuarioAcount, correoUsuario);

        console.log("response correo33:", info)

        if (info) {
            console.log("entre11")
            res.status(201).json({
                message: 'Esta es una ruta protegida.',
                data: "okay", // Datos del usuario decodificados del token
                status: 201,
            });
        }
        else {
            console.log("entre22")
            res.status(400).json({
                message: 'Error al enviar correo, imagen demasiado grande o internet lento, vuelva a intentarlo',
                data: "okay", // Datos del usuario decodificados del token
                status: 400,
            });
        }

    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.post('/postCorreoVoucherPdf', async (req, res) => {

    try {

        const body = await req.body;

        const {
            proyecto,
            codLote,
            voucherBase64,
            documentoCliente, emailCliente, nombresCliente,
            documentoAsesor,
            nombresAsesor,
            apellidoPaternoAsesor,
            apellidoMaternoAsesor,
            correoUsuario,
            usuarioAcount,
            payType,
            fileType,
            amount,
            nOperacion,
            fechaOperacion,
        } = body;

        console.log("body de postCorreo: ", proyecto, codLote, payType, fileType, amount, nOperacion, fechaOperacion, correoUsuario)

        const nuevoPago = {
            codLote: codLote,
            nOperacion: nOperacion,
            documentoUsuario: documentoCliente,
            fechaPago: fechaOperacion,
            formaPago: payType,
            monto: amount,
            fechaVerificacion: "",
            estadoVerificacion: "0",
            conceptoPago: fileType,
            status: "1", // "0" eliminado, "1" vigente
        };
        const newPay = await PagosModel.create(nuevoPago);

        const base64Content = (voucherBase64.split(",")[1] !== undefined && voucherBase64.split(",")[1] !== null) ? voucherBase64.split(",")[1] : archivo; // Obtiene la parte base64 pura

        const typeFileVoucher = "pdf"; // Tipo de archivo

        const info = await serndEmail(base64Content, documentoCliente, emailCliente, nombresCliente, typeFileVoucher, codLote, proyecto, payType, fileType, amount, nOperacion, fechaOperacion, usuarioAcount, correoUsuario);

        console.log(info)

        res.status(201).json({
            message: 'Esta es una ruta protegida.',
            data: "okay", // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

router.post("/getPagosLote", async (req, res) => {
    try {
        const body = await req.body;

        const { codLote, proyecto } = body;

        console.log("codLote: ", codLote, proyecto)

        console.log("🔍 Buscando en la base de datos pagos...");
        const pagos = await PagosModel.find({ codLote, status: "1", proyecto: proyecto }).exec();

        if (!pagos || pagos.length === 0) {
            return res.status(202).json({
                message: `No se encontraron vouchers/archivos en el lote ${codLote} `,
                status: 202,
            });
        }

        return res.status(200).json({
            message: `Pagos del lote ${codLote} `,
            data: pagos,
            status: 200,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
});

router.get("/getPagosAll", async (req, res) => {
    try {

        console.log("🔍 Buscando en la base de datos pagos...");
        const pagos = await PagosModel.find({ status: "1" }).exec();

        if (!pagos || pagos.length === 0) {
            return res.status(202).json({
                message: `No se encontraron pagos`,
                status: 202,
            });
        }

        return res.status(200).json({
            message: "Pagos obtenidas desde la base de datos",
            data: pagos,
            status: 200,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
});

router.post("/changeStatusPago", async (req, res) => {
    try {
        const body = await req.body;

        const { nOperacion, estadoVerificacion, observaciones } = body;

        console.log("body de changeStatusPago: ", body)

        const pago = await PagosModel.findOneAndUpdate(
            { nOperacion: nOperacion },
            { estadoVerificacion: estadoVerificacion, fechaVerificacion: moment().tz("America/Lima").format("YYYY-MM-DDTHH:mm:ss.SSSZ"), observaciones },
            { new: true } // Devuelve el documento actualizado
        );

        console.log("pago: ", pago)

        return res.status(201).json({
            message: "Pago actualizado correctamente",
            data: pago,
            status: 201,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
});

router.patch("/statusEditVoucher", async (req, res) => {
    const { codLote, documentoUsuario } = req.body;

    try {
        // Verificar si el `nroVoucher` y el `status` están presentes en el body
        if (!codLote) {
            return res.status(400).json({
                message: "nroVoucher y status son campos obligatorios",
            });
        }

        // Buscar y actualizar el documento
        const updatedVoucher = await PagosModel.findOneAndUpdate(
            { codLote, status: "1" },
            { documentoUsuario },
            { new: true } // Devuelve el documento actualizado
        );

        // Si no se encontró el voucher
        if (!updatedVoucher) {
            return res.status(402).json({
                message: "Lo Sentimos",
                messageLarge: "Voucher no existe o ha sido borrado de la base de datos",
            });
        }

        // Respuesta exitosa
        return res.status(201).json({
            message: "Status actualizado correctamente",
            voucher: updatedVoucher,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el status",
        });
    }
});

router.patch("/changeStatusAgente", async (req, res) => {
    const { statusActive, documentoUsuario } = req.body;

    try {

        // Buscar y actualizar el documento
        const updatedUser = await UsersModel.findOneAndUpdate(
            { documentoUsuario },
            { statusActive },
            { new: true } // Devuelve el documento actualizado
        );

        // Si no se encontró el voucher
        if (!updatedUser) {
            return res.status(402).json({
                message: "Lo Sentimos",
                messageLarge: "Voucher no existe o ha sido borrado de la base de datos",
            });
        }

        // Respuesta exitosa
        return res.status(201).json({
            message: "Status actualizado correctamente",
            voucher: updatedUser,
            status: 201,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el status",
        });
    }
});

router.patch("/editUserRolesSedes", async (req, res) => {
    const {
        documentoUsuario,
        sedeAdministrador,
        proyecto,
        email,
        celular,
        direccion,
        fechaNacimiento,
        password,
    } = req.body;

    console.log("body de editUserRolesSedes: ", documentoUsuario, sedeAdministrador, proyecto, email, celular, direccion, fechaNacimiento)

    try {

        // Buscar y actualizar el documento
        const updatedUser = await UsersModel.findOneAndUpdate(
            { documentoUsuario },
            {
                sedeAdministrador,
                proyecto,
                email,
                celular,
                direccion,
                fechaNacimiento,
                password,
            },
            { new: true } // Devuelve el documento actualizado
        );

        // Si no se encontró el voucher
        if (!updatedUser) {
            return res.status(402).json({
                message: "Lo Sentimos",
                messageLarge: "Voucher no existe o ha sido borrado de la base de datos",
            });
        }

        // Respuesta exitosa
        return res.status(201).json({
            message: "Status actualizado correctamente",
            voucher: updatedUser,
            status: 201,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el status",
        });
    }
});

router.patch('/newPropertysAll', async (req, res) => {

    const body = await req.body;
    const { nuevoArregloPropiedades, proyecto } = body;
    console.log("nuevoArregloPropiedades: ", nuevoArregloPropiedades)
    console.log("proyecto: ", proyecto)
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        // Paso 1: Eliminar las propiedades existentes con el proyecto especificado
        await PropiedadesModel.deleteMany({ proyecto: proyecto })

        // Paso 2: Insertar el nuevo arreglo de propiedades
        const updatePropertyAll = await PropiedadesModel.insertMany(nuevoArregloPropiedades);

        // await session.commitTransaction();
        // session.endSession();

        return res.status(201).json({
            message: 'Propiedades reemplazadas exitosamente.',
            data: updatePropertyAll,
            status: 201,
        });

    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        console.error('Error al reemplazar propiedades:', error);
        return res.status(500).json({
            message: `'Error al reemplazar propiedades:' ${error}`,
        });
        // throw error;
    }
})

router.patch('/newPagosAll', async (req, res) => {

    const body = await req.body;
    const { nuevoArregloPagos, proyecto } = body;
    console.log("nuevoArregloPagos: ", nuevoArregloPagos)
    console.log("proyecto: ", proyecto)
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        // Paso 1: Eliminar las propiedades existentes con el proyecto especificado
        await PagosModel.deleteMany({ proyecto: proyecto })

        // Paso 2: Insertar el nuevo arreglo de propiedades
        const updatePagosAll = await PagosModel.insertMany(nuevoArregloPagos);

        // await session.commitTransaction();
        // session.endSession();

        return res.status(201).json({
            message: 'Pagos reemplazados exitosamente.',
            data: updatePagosAll,
            status: 201,
        });

    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        console.error('Error al reemplazar propiedades:', error);
        return res.status(500).json({
            message: `'Error al reemplazar propiedades:' ${error}`,
        });
        // throw error;
    }
})

router.patch('/newUsuariosAll', async (req, res) => {

    const body = await req.body;
    const { nuevoArregloUsuarios, proyecto } = body;
    console.log("nuevoArregloUsuarios: ", nuevoArregloUsuarios)
    console.log("proyecto: ", proyecto)
    // const session = await mongoose.startSession();
    // session.startTransaction();

    const camposProtegidos = ['historico', 'role', 'sedes'];

    try {
        const operaciones = nuevoArregloUsuarios.map((usuario) => {
            const usuarioFiltrado = {};

            // Iteramos por cada propiedad que viene
            Object.entries(usuario).forEach(([key, value]) => {
                // Si NO es un campo protegido y el valor es válido, lo mantenemos
                const esCampoValido = value !== null && value !== undefined && value !== '';
                if (!camposProtegidos.includes(key) && esCampoValido) {
                    usuarioFiltrado[key] = value;
                }
            });

            return {
                updateOne: {
                    filter: { documentoUsuario: usuario.documentoUsuario },
                    update: { $set: usuarioFiltrado },
                    upsert: true,
                },
            };
        });

        const resultado = await UsersModel.bulkWrite(operaciones);

        return res.status(200).json({
            message: 'Pagos reemplazados exitosamente.',
            data: resultado,
            status: 201,
        });
    } catch (error) {
        // await session.abortTransaction();
        // session.endSession();
        console.error('Error al reemplazar propiedades:', error);
        return res.status(500).json({
            message: `'Error al reemplazar propiedades:' ${error}`,
        });
        // throw error;
    }
})

// contratos
router.post("/registroContrato", handleRegistroContrato);
router.get("/getContratos", handleGetContratos);
router.patch("/retirarContrato", handleRetirarContrato);
router.get("/getContratoUnique", handleContratoUnico);
router.patch("/editarContrato", handleEditarContrato);
router.patch("/editarContratoReserva", handleEditarContratoReserva);
router.patch("/editarContratoClientes", handleEditarContratoClientes);
router.patch("/editarConsumoAlojamiento", handleEditarConsumoAlojamiento);
router.patch("/editarConsumosVarios", handleEditarConsumosVarios);
router.patch("/editarIngresosEgresosCaja", handleEditarIngresosEgresosCaja);
router.patch("/numeroBoletaFactura", handleNumeroBoletaFactura);
router.get("/getContratosPlanilla", handleGetContratosPlanilla);
router.get("/getContratosRetirados", handleGetContratosRetirados);
router.get("/getContratosClientes", handleGetContratosClientes);
// editar contrato
router.patch("/editarContratoComentario", handleContratoComentario);

// habitaciones
router.patch("/registroHabitacion", handleRegistroHabitacion);
router.patch("/editarStatusHabitacion", handleEstadoHabitacion);
router.get("/getHabitacionUnique", handleHabitacionUnica);

// caja
router.post("/ingresosEgresosCajaReal", handleIngresosEgresosCajaReal);
router.get("/getCaja", handleGetCaja);

// // usuarios
// router.post("/registroUsuario", handleRegistroUsuario);

// otros ingresos egresos
// router.get("/getOtrosIngresosEgresos", handleGetOtrosIngresosEgresos);

// ventas alojamiento
router.post("/nuevaVentaAlojamiento", handleNuevaVentaAlojamiento);
router.get("/getVentasAlojamientoContratoUnique", handleGetVentasAlojamientoContratoUnique);
router.get("/getVentasAlojamientoContratoAll", handleGetVentasAlojamientoContratoAll);

// ventas bazar
router.post("/nuevaVentaBazar", handleNuevaVentaBazar);
router.get("/getVentasBazarContratoUnique", handleGetVentasBazarContratoUnique);
router.get("/getVentasBazarPorFecha", handleGetVentasBazarPorFecha);

// ventas lavanderia
router.post("/nuevaVentaLavanderia", handleNuevaVentaLavanderia);
router.get("/getVentasLavanderiaContratoUnique", handleGetVentasLavanderiaContratoUnique);

// ventas ExtraIgv
router.post("/nuevaVentaExtraIgv", handleNuevaVentaExtraIgv);
router.get("/getVentasExtraIgvContratoUnique", handleGetVentasExtraIgvContratoUnique);

// ventas Vueltos
router.post("/nuevaVentaVuelto", handleNuevaVentaVuelto);
router.get("/getVentasVueltoContratoUnique", handleGetVentasVueltoContratoUnique);

// ventas externas
router.post("/nuevaVentaExterna", handleNuevaVentaExterna);
router.get("/getOtrosIngresosEgresos", handleGetOtrosIngresosEgresos);

//ventas bazar contrato
router.patch("/registroVentasAlojamientoContrato", handleRegistroVentasAlojamientoContrato);
router.patch("/registroVentasBazarContrato", handleRegistroVentasBazarContrato);
router.patch("/registroVentasLavanderiaContrato", handleRegistroVentasLavanderiaContrato);
router.patch("/registroVentasExtraIgvContrato", handleRegistroVentasExtraIgvContrato);
router.patch("/registroVentasVueltoContrato", handleRegistroVentasVueltoContrato);

// cuadre caja por fecha
router.get("/getCuadreCajaPorFecha", handleGetCuadreCajaPorFecha);

// inventario productos bazar
router.post("/registroProductoBazar", handleRegistroProductoBazar);
router.get("/getProcutosBazarTotales", handleGetProcutosBazarTotales);
router.patch("/editarProductoInventario", handleEditarProductoInventario);
router.post("/editarStockProductoBazar", handleEditarStockProductoBazar);

// inventario productos units
router.get("/getProductosBazarUnits", handleGetProductosBazarUnits);

// pedidos
router.post("/registroPedido", handleRegistroPedido);
router.get("/getpedidos", handleGetPedidos);
router.post("/pedidosSemana", handlePedidosSemana);
router.patch("/changeStatusPedido", handleChangeStatusPedido);
router.patch("/changeStatusFechaEntregaPedido", handleChangeStatusFechaEntregaPedido);
router.get("/getpedido", handleGetPedido);
router.patch("/editarPedido", handleEditarPedido);
router.patch("/insertUrlsPagos", handleInsertUrlsPagos);

// stock
// router.post("/registroStock", handleRegistroStock);
router.get("/stock", handleStock);

// usuarios
router.post("/registroUsuario", handleRegistroUsuario);
router.get("/getAllUsuarios", handleGetAllUsuarios);
router.get("/getUserById", handleGetUserById);
router.put("/editarUsuarioId", handleEditarUsuarioId);
// router.patch("/editUserRolesSedes", handleEditUserRolesSedes);

// configs
router.get("/getConfig", handleGetConfig);
router.patch("/pacthConfig", handlePacthConfig);

// vouchers
router.post("/subirVoucher", handleSubirVoucher);
router.get("/getVouchersAll", handleGetVouchersAll);
router.patch("/getEditVoucher", handleEditVouchers);
router.get("/getVouchersAllFull", handleGetVouchersAllFull);

export default router;