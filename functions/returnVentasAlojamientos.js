import VentaAlojamiento from "../models/ventaAlojamiento.js";

export const returnVentasAlojamientos = async (value) => {
    try {
        const result = await VentaAlojamiento.find({ contrato: value });
        console.log("result: ", result)
        return result
    } catch (error) {
        console.log(error)
    }
}
