import db1 from '../db/db.js';
import mongoose from 'mongoose';

const planillaSchema = new mongoose.Schema(
    {
        numero: String, // numero de contrato
        status: String, // 0: retirado, 1: ocupado
        fechaInicio: String,
        fechaFin: String,
        fechaRetiro: String,
        fechaReserva: String,
        tipoRetiro: String, // 0: R, 1: R HOY
        consumoAlojamiento: [
            {
                status: String,
                nombreProducto: String,
                precioVenta: String,
                medioPago: String,
                fechaInicio: String,
                fechaFin: String,
                contrato: String,
                habitacion: String,
                comentario: String,
                usuarioRegistro: String,
                proyecto: String,
            },
        ],
        consumoBazar: {
            total: String,
            porCobrar: String,
        },
        consumoLavanderia: {
            total: String,
            porCobrar: String,
        },
        consumoExtraIgv: {
            total: String,
            porCobrar: String,
        },
        consumoVuelto: {
            total: String,
            porCobrar: String,
        },
        contrato: {
            numero: String,
            habitacion: String,
            tarifaContrato: String,
            fechaIngreso: String,
            numeroPersonas: String,
            recepcionistaIngreso: String,
            status: String, // 0: retirado, 1: ocupado
        },
        clientes: [
            {
                nacionalidad: String,
                documentoCliente: String,
                nombresCliente: String,
                apellidoPaternoCliente: String,
                apellidoMaternoCliente: String,
                celular: String,
                ruc: String,
                razonSocial: String,
            },
        ],
        consumo: {
            alojamiento: [
                {
                    fechaInicio: String,
                    fechaFin: String,
                    precio: String,
                    comentario: String,
                }
            ],
            lavanderia: [
                {
                    fechaInicio: String,
                    cantidad: String,
                    item: String,
                    precioUnitario: String,
                    precio: String,
                    comentario: String,
                }
            ],
            bazar: [
                {
                    fechaInicio: String,
                    cantidad: String,
                    item: String,
                    precioUnitario: String,
                    precio: String,
                    comentario: String,
                }
            ],
            extraIgv: [
                {
                    fechaInicio: String,
                    item: String,
                    precio: String,
                    comentario: String,
                }
            ],
        },
        caja: {
            efectivo: [
                {
                    fechaInicio: String,
                    cantidad: String,
                    concepto: String,
                    comentario: String,
                    usuario: String,
                }
            ],
            visas: [
                {
                    fechaInicio: String,
                    cantidad: String,
                    concepto: String,
                    comentario: String,
                    usuario: String,
                }
            ],
            yapes: [
                {
                    fechaInicio: String,
                    cantidad: String,
                    concepto: String,
                    comentario: String,
                    usuario: String,
                }
            ],
            vuelto: [
                {
                    fechaInicio: String,
                    cantidad: String,
                    concepto: String,
                    comentario: String,
                    usuario: String,
                }
            ],
        },
        salida: {
            hasta: String,
            retiro: String,
            recepcionista: String,
        },
        numeroBoletaFactura: String,
        comentario: String,
    },
    {
        timestamps: true,
        collection: 'planilla'
    },
);

const Planilla = db1.model('Planilla', planillaSchema);

export default Planilla;