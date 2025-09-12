import db1 from '../db/db.js';
import mongoose from 'mongoose';

const cajaGeneralSchema = new mongoose.Schema(
    {
        egresos: {
            efectivo: [
                {
                    fechaInicio: String,
                    cantidad: String,
                    concepto: String,
                }
            ],
            visas: [
                {
                    fechaInicio: String,
                    cantidad: String,
                    concepto: String,
                }
            ],
            yapes: [
                {
                    fechaInicio: String,
                    cantidad: String,
                    concepto: String,
                }
            ],
        },
        ingresos: {
            alojamiento: {
                efectivo: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
                visas: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
                yapes: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
            },
            bazar: {
                efectivo: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
                visas: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
                yapes: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
            },
            lavanderia: {
                efectivo: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
                visas: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
                yapes: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
            },
            otros: {
                efectivo: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
                visas: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
                yapes: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
            },
            vueltos: {
                efectivo: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
                visas: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
                yapes: [
                    {
                        fechaInicio: String,
                        cantidad: String,
                        concepto: String,
                    }
                ],
            },
        },
        numeroBoletaFactura: String,
    },
    {
        timestamps: true,
        collection: 'cajageneral'
    },
);

const CajaGeneral = db1.model('CajaGeneral', cajaGeneralSchema);

export default CajaGeneral;