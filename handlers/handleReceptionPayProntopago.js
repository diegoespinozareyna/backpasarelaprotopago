export const handleReceptionPayProntopago = async (req, res) => {
    try {
        const body = req.body;
        console.log("body: ", body)

    } catch (error) {
        console.error("Error al insertar url de pago:", error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};