import jwt from "jsonwebtoken"

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization'); // Busca el header "Authorization"
    const token = authHeader?.split(' ')[1]; // Extrae el token eliminando el prefijo "Bearer"

    // console.log("token: ", token)
    if (!token) return res.status(400).json({ error: 'Debe Colocar su DNI y Correo primero', data: "No hay token en la cabecera de la petición", status: 400 })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(402).json({ error: 'token no es válido', data: "No hay token en la cabecera de la petición", status: 402 })
    }
}

export default verifyToken;