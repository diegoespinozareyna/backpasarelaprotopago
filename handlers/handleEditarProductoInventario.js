import Producto from "../models/producto.js";

export const handleEditarProductoInventario = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de editarProductoInventario: ", body)

        const editProductoBazar = await Producto.findOneAndUpdate(
            { nombreProducto: body?.prevNombreProducto },
            {
                $set: {
                    nombreProducto: body?.nombreProducto,
                    descripcion: body?.descripcion,
                    precioVenta: body?.precioVenta,
                    categoria: body?.categoria,
                }
            },
            { new: true }
        );

        console.log("productoBazar: ", editProductoBazar)

        res.status(201).json({
            message: 'Producto Bazar Actualizado',
            data: editProductoBazar, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}