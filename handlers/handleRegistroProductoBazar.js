import Producto from "../models/producto.js";

export const handleRegistroProductoBazar = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de registroProductoBazar: ", body)

        const productoBazar = await Producto.create(body);

        console.log("productoBazar: ", productoBazar)

        res.status(201).json({
            message: 'Producto Bazar Registrado',
            data: productoBazar, // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log(error)
    }
}