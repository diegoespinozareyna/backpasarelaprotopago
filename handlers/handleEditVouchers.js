import { PagosModel } from "../models/pagos.js";

export const handleEditVouchers = async (req, res) => {
    try {
        const body = await req.body;
        console.log("body de handleEditVouchers: ", body);

        const updatedVoucher = await PagosModel.findOneAndUpdate(
            { _id: body.id },
            { $set: { status: body.status, observaciones: body.observaciones } },
            { new: true }
        );

        console.log("updatedVoucher: ", updatedVoucher);

        res.status(201).json({
            message: 'Voucher Updated',
            data: updatedVoucher,
            status: 201,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error',
            status: 500,
        });
    }
}