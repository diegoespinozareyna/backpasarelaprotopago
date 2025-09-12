import db1 from '../db/db.js';
import mongoose from 'mongoose';

const propiedadesSchema = new mongoose.Schema(
    {
        codLote: String,
        accion: String, // 0:inicio con disponible, 1:disponible->reservado, 2:reservado->disponible, 3:reservado->vendido, 4:vendido->disponible, 5:disponible->vendido, 6:reservado->reservado, 7:vendido->vendido, 8:disponible->disponible
        fechaOperacion: String,
        nOperacion: String,
        fechaInicioProyecto: String,
        inmobiliaria: String,
        proyecto: String,
        metros: String,
        referencia: String, // ubicación: esquina, avenida, etc
        precioDolares: String,
        precioSoles: String,
        status: String, // disponible, reservado, vendido, etc
        expirationTime: String, // expiracion de la reserva
        tipoCompra: String, // contado, financiado
        aplicoDescuento: String,
        descuentoFinanciado: String,
        descuentoContado: String,
        nroVoucherPasarela: String,
        // Datos del cliente
        documentoCliente: String,
        nombresCliente: String,
        apellidoPaternoCliente: String,
        apellidoMaternoCliente: String,
        emailCliente: String,
        celularCliente: String,
        estadoCivilCliente: String,
        ocupacionCliente: String,
        // datos conyugue cliente
        nombresClienteConyugue: String,
        apellidoClientePaternoConyugue: String,
        apellidoClienteMaternoConyugue: String,
        fechaNacimientoClienteConyugue: String,
        numeroDocumentoClienteConyugue: String,
        //datos sunat,
        tipoComprobanteCliente: String,
        rucCliente: String,
        razonSocialCliente: String,
        // Datos del asesor
        documentoAsesor: String,
        nombresAsesor: String,
        apellidoPaternoAsesor: String,
        apellidoMaternoAsesor: String,
        emailAsesor: String,
        celularAsesor: String,
        patrocinadorAsesor: String,
        usuarioRegistro: String,
        // Histórico
        observaciones: String,
        historico: [
            {
                documentoCliente: String,
                documentoAsesor: String,
                status: String,
                accion: String,
                observaciones: String,
                fechaOperacion: String,
                nOperacion: String,
                usuarioRegistro: String,
            }
        ],
        fechaEntregaPlanoMemoria: String,
        fechaEntregaMinuta: String,
        fechaEntregaEscrituraPublica: String,
        fechaEntregaInspeccionMunicipal: String,
        nKardex: String,
        observacionesSeguimiento: String,
        fechaPagoComision: String,
        subidoComision: String,
    },
    {
        timestamps: true,
        collection: 'propiedades',
    }
);

const PropiedadesModel = db1.model('Propiedades', propiedadesSchema);

export { PropiedadesModel };