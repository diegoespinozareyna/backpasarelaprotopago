import { PagosModel } from "../models/pagos.js";

export const handleGetVouchersAll = async (req, res) => {
    try {
        const params = req.query;
        const proyecto = params?.proyecto;
        const id = params?.id;

        console.log("proyecto: ", proyecto)
        console.log("id: ", id)

        if (!proyecto) {
            return res.status(400).json({ message: "El parámetro 'proyecto' es obligatorio" });
        }

        const pagos = await PagosModel.find({ proyecto, codPedido: id }).exec();

        if (!pagos || pagos.length === 0) {
            return res.status(202).json({
                message: "No se encontraron pagos para el pedido especificado",
                data: [],
                status: 202,
            });
        }

        return res.status(200).json({
            message: "Propiedades obtenidas desde la base de datos",
            data: pagos,
            status: 200,
        });
    } catch (error) {
        console.error("❌ Error en getAllPropiedades:", error);
        return res.status(500).json({ message: `Error desconocido: ${error.message}` });
    }
}